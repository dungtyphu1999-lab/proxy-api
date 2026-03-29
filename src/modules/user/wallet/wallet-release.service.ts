import { Injectable, Logger, Inject } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { WalletRepository } from './wallet.repository';
import { WalletTransactionRepository } from './wallet-transaction.repository';
import { WalletSettingsService } from '@/modules/admin/wallet/wallet-settings.service';
import { OrderComplaintsRepository } from '@/modules/user/order-complaints/order-complaints.repository';
import { RESOLVED_STATUSES } from '@/database/entities/order-complaint.entity';
import { Knex } from 'knex';

interface OrderReleaseTransaction {
  id: string;
  wallet_id: string;
  user_id: string;
  amount: number;
  note: string;
  created_at: Date;
}

interface ReleaseResult {
  order_id: string;
  order_number: string;
  shop_id: string;
  shop_name: string;
  amount: number;
  success: boolean;
  reason: string;
}

@Injectable()
export class WalletReleaseService {
  private readonly logger = new Logger(WalletReleaseService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly walletRepository: WalletRepository,
    private readonly walletTransactionRepository: WalletTransactionRepository,
    private readonly walletSettingsService: WalletSettingsService,
    private readonly orderComplaintsRepository: OrderComplaintsRepository,
    @Inject('KnexConnection')
    private readonly knex: Knex,
  ) {}

  /**
   * Release money from locked_balance to sale_balance for eligible orders
   * Runs daily at 12:00 AM (midnight)
   */
  async releaseLockedBalanceToSaleBalance(): Promise<ReleaseResult[]> {
    this.logger.log('Starting daily release of locked balance to sale balance');

    try {
      // Get money holding days setting
      const walletSettings = await this.walletSettingsService.getSettings();
      const moneyHoldingDays = walletSettings?.money_holding_days || 7;

      // Calculate the cutoff date (orders completed before this date are eligible)
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - moneyHoldingDays);
      cutoffDate.setHours(0, 0, 0, 0); // Start of the day

      this.logger.log(
        `Processing orders completed before: ${cutoffDate.toISOString()} (${moneyHoldingDays} days ago)`,
      );

      // Get all order_release transactions that are eligible for release
      const eligibleTransactions =
        await this.getEligibleOrderReleaseTransactions(cutoffDate);

      this.logger.log(
        `Found ${eligibleTransactions.length} eligible transactions to process`,
      );

      const results: ReleaseResult[] = [];

      for (const transaction of eligibleTransactions) {
        try {
          // Extract order_number from note (format: "Order release for ORDER_NUMBER")
          const orderNumber = this.extractOrderNumberFromNote(transaction.note);
          if (!orderNumber) {
            const result: ReleaseResult = {
              order_id: 'unknown',
              order_number: 'unknown',
              shop_id: 'unknown',
              shop_name: 'unknown',
              amount: transaction.amount,
              success: false,
              reason: `Cannot extract order number from transaction note: ${transaction.note}`,
            };
            results.push(result);
            this.logger.warn(
              `[RELEASE FAILED] Transaction: ${transaction.id} | Order: unknown | Shop: unknown | Amount: ${transaction.amount} VND | Reason: Cannot extract order number from note`,
            );
            continue;
          }

          // Get order and shop info
          const orderInfo = await this.getOrderInfo(orderNumber);
          if (!orderInfo) {
            const result: ReleaseResult = {
              order_id: 'unknown',
              order_number: orderNumber,
              shop_id: 'unknown',
              shop_name: 'unknown',
              amount: transaction.amount,
              success: false,
              reason: `Order not found: ${orderNumber}`,
            };
            results.push(result);
            this.logger.warn(
              `[RELEASE FAILED] Transaction: ${transaction.id} | Order: ${orderNumber} | Shop: unknown | Amount: ${transaction.amount} VND | Reason: Order not found`,
            );
            continue;
          }

          // Check if order has valid complaint status
          const canReleaseResult = await this.canReleaseOrderWithReason(
            orderNumber,
            orderInfo.order_id,
          );
          if (!canReleaseResult.canRelease) {
            const result: ReleaseResult = {
              order_id: orderInfo.order_id,
              order_number: orderNumber,
              shop_id: orderInfo.shop_id,
              shop_name: orderInfo.shop_name,
              amount: transaction.amount,
              success: false,
              reason: canReleaseResult.reason,
            };
            results.push(result);
            this.logger.warn(
              `[RELEASE SKIPPED] Transaction: ${transaction.id} | Order: ${orderNumber} (${orderInfo.order_id}) | Shop: ${orderInfo.shop_name} (${orderInfo.shop_id}) | Amount: ${transaction.amount} VND | Reason: ${canReleaseResult.reason}`,
            );
            continue;
          }

          // Release money from locked_balance to sale_balance
          await this.releaseMoney(
            transaction.wallet_id,
            transaction.amount,
            transaction.id,
          );

          const result: ReleaseResult = {
            order_id: orderInfo.order_id,
            order_number: orderNumber,
            shop_id: orderInfo.shop_id,
            shop_name: orderInfo.shop_name,
            amount: transaction.amount,
            success: true,
            reason: 'Successfully released from locked_balance to sale_balance',
          };
          results.push(result);

          this.logger.log(
            `[RELEASE SUCCESS] Transaction: ${transaction.id} | Order: ${orderNumber} (${orderInfo.order_id}) | Shop: ${orderInfo.shop_name} (${orderInfo.shop_id}) | Amount: ${transaction.amount} VND | Reason: Successfully released`,
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : String(error);
          const result: ReleaseResult = {
            order_id: 'unknown',
            order_number: 'unknown',
            shop_id: 'unknown',
            shop_name: 'unknown',
            amount: transaction.amount,
            success: false,
            reason: `Error: ${errorMessage}`,
          };
          results.push(result);
          this.logger.error(
            `[RELEASE FAILED] Transaction: ${transaction.id} | Order: unknown | Shop: unknown | Amount: ${transaction.amount} VND | Reason: ${errorMessage}`,
          );
        }
      }

      const successCount = results.filter((r) => r.success).length;
      const failedCount = results.filter((r) => !r.success).length;

      this.logger.log(
        `Release process completed. Success: ${successCount}, Failed/Skipped: ${failedCount}`,
      );

      return results;
    } catch (error) {
      this.logger.error(
        'Error in releaseLockedBalanceToSaleBalance:',
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }
  }

  /**
   * Get all order_release transactions that are eligible for release
   */
  private async getEligibleOrderReleaseTransactions(
    cutoffDate: Date,
  ): Promise<OrderReleaseTransaction[]> {
    const transactions = await this.knex('wallet_transactions')
      .select([
        'wallet_transactions.id',
        'wallet_transactions.wallet_id',
        'wallet_transactions.user_id',
        'wallet_transactions.amount',
        'wallet_transactions.note',
        'wallet_transactions.created_at',
      ])
      .where('wallet_transactions.type', 'order_release')
      .where('wallet_transactions.status', 'success')
      .where('wallet_transactions.created_at', '<=', cutoffDate)
      .orderBy('wallet_transactions.created_at', 'asc');

    return transactions as OrderReleaseTransaction[];
  }

  /**
   * Extract order number from transaction note
   * Note format: "Order release for ORDER_NUMBER"
   */
  private extractOrderNumberFromNote(note: string): string | null {
    if (!note) return null;

    const match = note.match(/Order release for (.+)/i);
    return match ? match[1].trim() : null;
  }

  /**
   * Get order info including shop name
   */
  private async getOrderInfo(
    orderNumber: string,
  ): Promise<{ order_id: string; shop_id: string; shop_name: string } | null> {
    const order = (await this.knex('orders')
      .select(
        'orders.id as order_id',
        'orders.shop_id',
        'shops.name as shop_name',
      )
      .leftJoin('shops', 'orders.shop_id', 'shops.id')
      .where('orders.order_number', orderNumber)
      .first()) as
      | { order_id: string; shop_id: string; shop_name: string | null }
      | undefined;

    if (!order) {
      return null;
    }

    return {
      order_id: String(order.order_id),
      shop_id: String(order.shop_id),
      shop_name: order.shop_name || 'Unknown Shop',
    };
  }

  /**
   * Check if order can be released (no complaint or complaint has valid status)
   * Returns both boolean and reason
   */
  private async canReleaseOrderWithReason(
    orderNumber: string,
    orderId: string,
  ): Promise<{ canRelease: boolean; reason: string }> {
    // Check if order has any complaints
    const complaints = (await this.knex('order_complaints')
      .select('id', 'status', 'resolution_type')
      .where('order_id', orderId)) as Array<{
      id: string;
      status: string;
      resolution_type: string | null;
    }>;

    // If no complaints, can release
    if (complaints.length === 0) {
      return {
        canRelease: true,
        reason: 'No complaints found',
      };
    }

    // If has complaints, check if all are in resolved status
    // Valid statuses: dismissed, resolved, closed, cancelled, rejected
    // OR resolution_type = 'replacement' (shop chose to update product/link)
    const unresolvedComplaints = complaints.filter((complaint) => {
      // Check if status is resolved
      if (
        RESOLVED_STATUSES.includes(
          complaint.status as (typeof RESOLVED_STATUSES)[number],
        )
      ) {
        return false; // This complaint is resolved
      }

      // Check if resolution_type is replacement (shop updated product/link)
      if (complaint.resolution_type === 'replacement') {
        return false; // This complaint is resolved via replacement
      }

      return true; // This complaint is still unresolved
    });

    if (unresolvedComplaints.length === 0) {
      return {
        canRelease: true,
        reason: 'All complaints are resolved',
      };
    }

    // Build reason with complaint statuses
    const complaintStatuses = unresolvedComplaints
      .map((c) => `status: ${c.status}`)
      .join(', ');
    return {
      canRelease: false,
      reason: `Order has unresolved complaints (${complaintStatuses})`,
    };
  }

  /**
   * Release money from locked_balance to sale_balance
   */
  private async releaseMoney(
    walletId: string,
    amount: number,
    _transactionId: string,
  ): Promise<void> {
    const amountNumber = Number(amount);

    if (!Number.isFinite(amountNumber)) {
      throw new Error(`Invalid amount: ${amount}`);
    }

    return await this.databaseService.transaction(
      async (trx: Knex.Transaction) => {
        // Lock wallet row
        const wallet = await trx<{
          id: string;
          locked_balance: number;
          sale_balance: number;
        }>('wallets')
          .where('id', walletId)
          .forUpdate()
          .first();

        if (!wallet) {
          throw new Error(`Wallet not found: ${walletId}`);
        }

        const currentLockedBalance = Number(wallet.locked_balance || 0);
        const currentSaleBalance = Number(wallet.sale_balance || 0);

        // Validate locked_balance is sufficient
        if (currentLockedBalance < amountNumber) {
          this.logger.warn(
            `Insufficient locked_balance. Wallet: ${walletId}, Required: ${amountNumber}, Available: ${currentLockedBalance}`,
          );
          // Still proceed with available amount
          const releaseAmount = currentLockedBalance;
          const newLockedBalance = 0;
          const newSaleBalance = currentSaleBalance + releaseAmount;

          await trx('wallets').where('id', walletId).update({
            locked_balance: newLockedBalance,
            sale_balance: newSaleBalance,
            updated_at: trx.fn.now(),
          });

          this.logger.log(
            `Released partial amount ${releaseAmount} VND (requested ${amountNumber} VND) for wallet ${walletId} transactionId: ${_transactionId}`,
          );
        } else {
          // Release full amount
          const newLockedBalance = currentLockedBalance - amountNumber;
          const newSaleBalance = currentSaleBalance + amountNumber;

          await trx('wallets').where('id', walletId).update({
            locked_balance: newLockedBalance,
            sale_balance: newSaleBalance,
            updated_at: trx.fn.now(),
          });

          this.logger.log(
            `Released ${amountNumber} VND from locked_balance to sale_balance for wallet ${walletId} transactionId: ${_transactionId}`,
          );
        }
      },
    );
  }
}
