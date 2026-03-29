/* eslint-disable
  @typescript-eslint/no-unsafe-argument,
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-member-access
*/
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { WalletRepository } from './wallet.repository';
import { WalletTransactionRepository } from './wallet-transaction.repository';
import { Pay2SService } from './pay2s.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { DepositResponseDto } from './dto/deposit-response.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { WithdrawResponseDto } from './dto/withdraw-response.dto';
import { TransactionHistoryDto } from './dto/transaction-history.dto';
import { TransactionStatusResponseDto } from './dto/transaction-status-response.dto';
import { Wallet } from '@/database/entities/wallet.entity';
import {
  WalletTransactionStatus,
  WalletTransactionType,
} from '@/database/entities/wallet-transaction.entity';
import { PAYMENT_METHOD } from '@/shared/enum/payment-menthod.enum';
import {
  generateTransactionNumber,
  isAutoCancelledPendingTransaction,
} from '@/shared/utils/wallet-transaction.util';
import { ShopRequestsRepository } from '../shop-requests/shop-requests.repository';
import { ShopRequestStatus } from '@/modules/admin/shop-requests/dto/update-shop-request-status.dto';
import { PaginatedResult } from '@/shared/pagination/pagination.interface';
import { Knex } from 'knex';
import { AdminNotificationService } from '@/modules/admin/notifications/admin-notification.service';
import { NotificationGateway } from '@/modules/user/notification/notification.gateway';
import { createNotificationHash } from '@/shared/utils/notification-hashing.util';
import { ADMIN_NOTIFICATION_TEMPLATES } from '@/shared/constants/notification-templates';
import { UserService } from '../user/user.service';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import axios from 'axios';
import { TOKEN_MUALIKE } from '@/modules/mualikes/mualikeconstant';

@Injectable()
export class WalletService {
  private readonly logger = new Logger(WalletService.name);
  private readonly mualikesServiceNameCache: {
    expiresAtMs: number;
    byId: Map<number, string>;
  } | null = null;

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly walletRepository: WalletRepository,
    private readonly walletTransactionRepository: WalletTransactionRepository,
    private readonly pay2SService: Pay2SService,
    private readonly shopRequestsRepository: ShopRequestsRepository,
    private readonly adminNotificationService: AdminNotificationService,
    private readonly notificationGateway: NotificationGateway,
    private readonly userService: UserService,
  ) {}

  async getOrCreateWallet(
    userId: string,
    trx?: Knex.Transaction,
  ): Promise<Wallet> {
    let wallet = await this.walletRepository.findByUserId(userId, trx);

    if (!wallet) {
      wallet = await this.walletRepository.createWallet(userId, trx);
      this.logger.log(`Created new wallet for user ${userId}`);
    }

    return wallet;
  }

  async findWallet(userId: string): Promise<Wallet | null> {
    return await this.walletRepository.findByUserId(userId);
  }

  async createDeposit(
    userId: string,
    createDepositDto: CreateDepositDto,
  ): Promise<DepositResponseDto> {
    // Get or create wallet
    const wallet = await this.getOrCreateWallet(userId);

    if (wallet.is_locked) {
      throw new BadRequestException(ErrorCode.WALLET_IS_LOCKED);
    }

    const content = this.generateContentPayment();
    // Generate payment QR link
    const paymentQrLink = this.pay2SService.generateQrCode({
      amount: createDepositDto.amount,
      content: content,
    });

    // Get bank information
    const bankInfo = this.pay2SService.getBankInfo();

    // Create transaction record
    const transaction =
      await this.walletTransactionRepository.createTransaction({
        transaction_number: generateTransactionNumber(),
        wallet_id: wallet.id,
        user_id: userId,
        type: 'deposit' as WalletTransactionType,
        method: PAYMENT_METHOD.PAY2S,
        amount: createDepositDto.amount,
        status: 'pending' as WalletTransactionStatus,
        reference_code: content,
      });

    return {
      transaction_id: transaction.id,
      transaction_number: transaction.transaction_number,
      amount: createDepositDto.amount,
      content: content,
      payment_qr_link: paymentQrLink,
      bank_info: {
        bank_code: bankInfo.bankCode,
        bank_number: bankInfo.bankNumber,
        bank_name: bankInfo.bankName,
      },
      created_at: transaction.created_at,
    };
  }

  async processDepositFailure(transactionId: string): Promise<void> {
    const transaction =
      await this.walletTransactionRepository.findById(transactionId);

    if (!transaction) {
      throw new NotFoundException(ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
    }

    await this.walletTransactionRepository.updateStatus(
      transactionId,
      'failed' as WalletTransactionStatus,
      new Date(),
    );
  }

  async checkTransactionStatus(
    userId: string,
    transactionId: string,
  ): Promise<TransactionStatusResponseDto> {
    const transaction =
      await this.walletTransactionRepository.findStatusById(transactionId);

    if (!transaction || transaction.user_id !== userId) {
      throw new NotFoundException(ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
    }

    return {
      transaction_id: transaction.id,
      status: transaction.status,
    };
  }

  generateContentPayment(): string {
    const randomChars = Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase();

    const randomNumbers = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(5, '0');

    return `NH${randomChars}${randomNumbers}`;
  }

  async createWithdraw(
    userId: string,
    createWithdrawDto: CreateWithdrawDto,
  ): Promise<WithdrawResponseDto> {
    // Get or create wallet
    const wallet = await this.getOrCreateWallet(userId);

    if (wallet.is_locked) {
      throw new BadRequestException(ErrorCode.WALLET_IS_LOCKED);
    }

    // Check if user has sufficient sale balance
    if (
      Number(wallet.sale_balance) - Number(wallet.locked_balance) <
      createWithdrawDto.amount
    ) {
      throw new BadRequestException(ErrorCode.WALLET_INSUFFICIENT_BALANCE);
    }

    // Validate shop request and ownership
    const shopRequest = await this.shopRequestsRepository.findById(
      createWithdrawDto.shop_request_id,
    );
    if (!shopRequest || shopRequest.user_id !== userId) {
      throw new BadRequestException(ErrorCode.SHOP_REQUEST_NOT_FOUND);
    }
    if (shopRequest.status !== ('approved' as ShopRequestStatus)) {
      throw new BadRequestException(ErrorCode.SHOP_REQUEST_NOT_APPROVED);
    }

    // Create bank_info object from shop request
    const bankInfo = {
      bank_code: shopRequest.bank_code,
      bank_name: shopRequest.bank_name,
      account_number: shopRequest.bank_account_number,
      account_name: shopRequest.bank_account_name,
    };

    // Create transaction record
    const transaction =
      await this.walletTransactionRepository.createTransaction({
        transaction_number: generateTransactionNumber(),
        wallet_id: wallet.id,
        user_id: userId,
        type: 'withdraw' as WalletTransactionType,
        method: PAYMENT_METHOD.BANK_TRANSFER,
        amount: createWithdrawDto.amount,
        status: 'pending' as WalletTransactionStatus,
        bank_info: bankInfo,
      });

    // Deduct balance immediately (pending status)
    const newLockedBalance =
      Number(wallet.locked_balance) + createWithdrawDto.amount;
    await this.walletRepository.updateLockedBalance(
      wallet.id,
      newLockedBalance,
    );

    this.logger.log(
      `Withdraw request created: ${transaction.id} for user ${userId}`,
    );

    // Get user information for notification
    const user = await this.userService.findById(userId);
    const userName = user?.username || 'Người dùng';

    // Create notification and emit to admin
    try {
      const notificationTemplate =
        ADMIN_NOTIFICATION_TEMPLATES.WITHDRAW_REQUEST_CREATED(
          userName,
          createWithdrawDto.amount,
          bankInfo.bank_name,
          bankInfo.account_number,
        );

      const notificationResult =
        await this.adminNotificationService.createNotification(
          {
            type: 'wallet',
            title: notificationTemplate.title,
            message: notificationTemplate.message,
            link_url: notificationTemplate.link_url as string,
            related_entity_type: 'wallet',
            related_entity_id: transaction.id,
          },
          userId,
        );

      // Create hash from the saved notification object
      const notificationHash = createNotificationHash(
        notificationResult.id,
        notificationResult.type,
        notificationResult.title,
        notificationResult.message,
      );

      // Emit notification to admin via WebSocket
      this.notificationGateway.emitWithdrawRequestCreated({
        transaction_id: transaction.id,
        transaction_number: transaction.transaction_number,
        user_id: userId,
        amount: createWithdrawDto.amount,
        bank_info: transaction.bank_info || {
          bank_name: shopRequest.bank_code,
          account_number: shopRequest.bank_account_number,
          account_name: shopRequest.bank_account_name,
        },
        created_at: transaction.created_at.toISOString(),
        hash: notificationHash,
        notification_title: notificationTemplate.title,
        notification_message: notificationTemplate.message,
        notification_id: notificationResult.id,
        notification_created_at: notificationResult.created_at.toISOString(),
      });
    } catch (error) {
      // Log error but don't fail the withdraw request
      this.logger.error(
        'Failed to create or emit withdraw request notification:',
        error instanceof Error ? error.message : String(error),
      );
    }

    return {
      transaction_id: transaction.id,
      transaction_number: transaction.transaction_number,
      amount: createWithdrawDto.amount,
      bank_info: transaction.bank_info || {
        bank_name: shopRequest.bank_code,
        account_number: shopRequest.bank_account_number,
        account_name: shopRequest.bank_account_name,
      },
      status: transaction.status,
      note: undefined,
      created_at: transaction.created_at,
    };
  }

  async getTransactionHistory(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      search?: string;
      orderBy?: string;
      orderDir?: 'asc' | 'desc';
      status?: string;
      searchFields?: string[];
      start_date?: string;
      end_date?: string;
      type?: string;
    } = {},
  ): Promise<PaginatedResult<TransactionHistoryDto>> {
    // If user searches by provider order id (numeric, e.g. "78934879"), translate it to our SMM
    // order_number so it can be found via wallet_transactions.reference_code.
    const rawSearch = String(options.search || '').trim();
    if (rawSearch && /^\d{5,}$/.test(rawSearch)) {
      try {
        const found = await this.databaseService
          .getKnex()('smm_orders')
          .select('order_number')
          .where('provider_order_id', rawSearch)
          .first<{ order_number?: string }>();
        if (found?.order_number) {
          options = { ...options, search: String(found.order_number) };
        }
      } catch {
        // ignore - fallback to original search
      }
    }

    // If type is specified, use it; otherwise default to core wallet activities.
    // Include SMM/payment flows (payment/refund) so wallet history reflects deductions + refunds.
    const types = options.type
      ? ([options.type] as WalletTransactionType[])
      : ([
          'deposit',
          'withdraw',
          'payment',
          'PROXY',
          // Legacy/admin analytics type for service deductions (SMM orders)
          'SERVICE',
          'refund',
          // "order" is a synthetic type from orders table (see WalletTransactionRepository).
          'order',
        ] as WalletTransactionType[]);

    const result =
      await this.walletTransactionRepository.getByUserIdWithPagination(userId, {
        ...options,
        types,
      });

    // Enrich wallet history for SMM flows: show service name in `note` for payment/refund.
    // We link by `reference_code` == SMM order_number.
    const smmRefCodes = Array.from(
      new Set(
        result.records
          .filter(
            (t: any) =>
              t?.type === 'payment' ||
              t?.type === 'refund' ||
              t?.type === 'SERVICE',
          )
          .map((t: any) => String(t?.reference_code || '').trim())
          .filter((x: string) => x.startsWith('SMM-')),
      ),
    );
    let serviceNameByOrderNumber: Record<string, string> = {};
    let displayTxnBySmmOrderNumber: Record<string, string> = {};
    if (smmRefCodes.length) {
      const rows = await this.databaseService
        .getKnex()('smm_orders')
        .select([
          'order_number',
          'service_name',
          'service_id',
          'provider_order_id',
        ])
        .whereIn('order_number', smmRefCodes);

      // If old data stored service_name like "Service #597", map it to real provider service name.
      const idsToResolve = Array.from(
        new Set(
          (rows || [])
            .map((r: any) => Number(r.service_id))
            .filter((n: number) => Number.isFinite(n) && n > 0),
        ),
      );
      const providerNameById = idsToResolve.length
        ? await this.getMualikesServiceNamesByIds(idsToResolve)
        : {};

      serviceNameByOrderNumber = Object.fromEntries(
        (rows || [])
          .map((r: any) => {
            const orderNumber = String(r.order_number);
            const rawName = String(r.service_name || '').trim();
            const sid = Number(r.service_id);
            const resolved =
              (!rawName || /^Service\\s+#\\d+$/i.test(rawName)) &&
              Number.isFinite(sid) &&
              sid > 0
                ? providerNameById[sid] || rawName
                : rawName;
            return [orderNumber, resolved];
          })
          .filter(([, name]) => Boolean(name)),
      );

      // Prefer provider order id if present, else fall back to our SMM order number.
      displayTxnBySmmOrderNumber = Object.fromEntries(
        (rows || [])
          .map((r: any) => {
            const orderNumber = String(r.order_number || '').trim();
            if (!orderNumber) return null;
            const providerOrderId =
              r.provider_order_id != null && String(r.provider_order_id).trim()
                ? String(r.provider_order_id).trim()
                : orderNumber;
            return [orderNumber, providerOrderId] as const;
          })
          .filter(Boolean) as any,
      );
    }

    // Enrich wallet history for PROXY flows: show detailed proxy action note
    // from proxy_transactions.metadata.note_vi (fallback metadata.note).
    const proxyOrderIds = Array.from(
      new Set(
        result.records
          .filter((t: any) => t?.type === 'PROXY')
          .map((t: any) => String(t?.reference_code || '').trim())
          .filter((x: string) => /^[0-9a-f-]{36}$/i.test(x)),
      ),
    );
    const proxyTxRows = proxyOrderIds.length
      ? await this.databaseService
          .getKnex()('proxy_transactions')
          .select(['proxy_order_id', 'metadata', 'created_at'])
          .whereIn('proxy_order_id', proxyOrderIds)
          .whereIn('type', ['payment', 'renewal'])
          .where('status', 'success')
          .orderBy('created_at', 'desc')
      : [];

    const proxyNoteByWalletTxNumber = new Map<string, string>();
    const proxyNoteByOrderId = new Map<string, string>();
    for (const row of proxyTxRows as Array<{
      proxy_order_id: string;
      metadata?: Record<string, unknown> | null;
    }>) {
      const meta =
        row?.metadata && typeof row.metadata === 'object'
          ? (row.metadata as Record<string, unknown>)
          : {};
      const note = String(meta.note_vi ?? meta.note ?? '').trim();
      if (!note) continue;

      const walletTxNumber = String(meta.wallet_transaction_number ?? '').trim();
      if (walletTxNumber && !proxyNoteByWalletTxNumber.has(walletTxNumber)) {
        proxyNoteByWalletTxNumber.set(walletTxNumber, note);
      }

      const orderId = String(row.proxy_order_id ?? '').trim();
      if (orderId && !proxyNoteByOrderId.has(orderId)) {
        proxyNoteByOrderId.set(orderId, note);
      }
    }

    return {
      records: result.records.map((transaction) => ({
        id: transaction.id,
        transaction_number: transaction.transaction_number,
        display_transaction_number:
          (transaction.type === ('payment' as any) ||
            transaction.type === ('refund' as any) ||
            transaction.type === ('SERVICE' as any)) &&
          displayTxnBySmmOrderNumber[
            String((transaction as any).reference_code || '').trim()
          ]
            ? displayTxnBySmmOrderNumber[
                String((transaction as any).reference_code || '').trim()
              ]
            : transaction.transaction_number,
        type: transaction.type,
        amount: transaction.amount,
        fee_amount: transaction.fee_amount,
        status:
          transaction.status === ('pending' as WalletTransactionStatus) &&
          isAutoCancelledPendingTransaction(transaction.created_at, 30)
            ? ('cancelled' as WalletTransactionStatus)
            : transaction.status,
        method: transaction.method,
        bank_info: transaction.bank_info,
        note:
          transaction.type === ('PROXY' as any)
            ? proxyNoteByWalletTxNumber.get(
                String(transaction.transaction_number || '').trim(),
              ) ||
              proxyNoteByOrderId.get(
                String((transaction as any).reference_code || '').trim(),
              ) ||
              transaction.note
            : (transaction.type === ('payment' as any) ||
                  transaction.type === ('refund' as any) ||
                  transaction.type === ('SERVICE' as any)) &&
                serviceNameByOrderNumber[
                  String((transaction as any).reference_code || '').trim()
                ]
              ? serviceNameByOrderNumber[
                  String((transaction as any).reference_code || '').trim()
                ]
              : transaction.note,
        created_at: transaction.created_at,
        completed_at: transaction.completed_at,
      })),
      meta: result.meta,
    };
  }

  private async getMualikesServiceNamesByIds(
    ids: number[],
  ): Promise<Record<number, string>> {
    const now = Date.now();
    if (
      this.mualikesServiceNameCache &&
      this.mualikesServiceNameCache.expiresAtMs > now
    ) {
      const out: Record<number, string> = {};
      for (const id of ids) {
        const name = this.mualikesServiceNameCache.byId.get(id);
        if (name) out[id] = name;
      }
      return out;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('token', TOKEN_MUALIKE);

      const res = await axios.post(
        'https://mualikes.net/api/listService',
        formData,
        {
          maxRedirects: 0,
          validateStatus: (s) => s < 500,
          timeout: 15_000,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
          },
        },
      );

      const list = res?.data?.status ? res?.data?.message || [] : [];
      const byId = new Map<number, string>();
      for (const s of list) {
        const id = Number(s?.id);
        const name = String(s?.name || '').trim();
        if (Number.isFinite(id) && id > 0 && name) byId.set(id, name);
      }

      // cache 10 minutes
      (this as any).mualikesServiceNameCache = {
        expiresAtMs: now + 10 * 60 * 1000,
        byId,
      };

      const out: Record<number, string> = {};
      for (const id of ids) {
        const name = byId.get(id);
        if (name) out[id] = name;
      }
      return out;
    } catch {
      (this as any).mualikesServiceNameCache = null;
      return {};
    }
  }

  async processPaymentDeductionForPayment(
    trx: Knex.Transaction,
    wallet: Wallet,
    amount: number,
    userId: string,
    note: string,
    referenceCode: string,
  ): Promise<void> {
    // Deduct balance from wallet
    await this.walletRepository.deductBalance(trx, wallet.id, Number(amount));

    // Create wallet transaction log
    const transactionNumber = generateTransactionNumber();
    await trx('wallet_transactions').insert({
      transaction_number: transactionNumber,
      wallet_id: wallet.id,
      user_id: userId,
      type: 'payment' as WalletTransactionType,
      amount: Number(amount),
      status: 'success' as WalletTransactionStatus,
      note: note,
      reference_code: referenceCode,
      created_at: trx.fn.now(),
      completed_at: trx.fn.now(),
    });

    this.logger.log(
      `Processed payment deduction: ${amount} for user ${userId}, reference: ${referenceCode}`,
    );
  }
}
