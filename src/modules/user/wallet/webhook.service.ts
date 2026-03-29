import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '@/database/database.service';
import { WalletTransactionRepository } from './wallet-transaction.repository';
import { WalletRepository } from './wallet.repository';
import { WebhookTransactionDto } from './dto/webhook-transaction.dto';
import { WalletTransactionStatus } from '@/database/entities/wallet-transaction.entity';
import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { NotificationGateway } from '@/modules/user/notification/notification.gateway';

@Injectable()
export class WebhookService {
  private readonly logger = new Logger(WebhookService.name);
  private readonly webhookSecretKey: string;
  private readonly strictChecksum: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
    private readonly walletTransactionRepository: WalletTransactionRepository,
    private readonly walletRepository: WalletRepository,
    private readonly notificationGateway: NotificationGateway,
  ) {
    this.webhookSecretKey =
      this.configService.get<string>('PAY2S_WEBHOOK_SECRET_KEY') || '';
    this.strictChecksum =
      this.configService.get<string>('PAY2S_STRICT_CHECKSUM') === 'true';
  }

  verifyBearerToken(authorizationHeader: string): boolean {
    if (!authorizationHeader || !this.webhookSecretKey) {
      return false;
    }

    const token = authorizationHeader.replace('Bearer ', '');
    if (!token) {
      return false;
    }

    return this.safeCompare(token, this.webhookSecretKey);
  }

  async processDepositWebhook(transactions: WebhookTransactionDto[]): Promise<{
    processed: number;
    failed: number;
    results: Array<{
      transactionId: string;
      status: 'success' | 'failed';
      message: string;
    }>;
  }> {
    const results: Array<{
      transactionId: string;
      status: 'success' | 'failed';
      message: string;
    }> = [];
    let processed = 0;
    let failed = 0;

    for (const transaction of transactions) {
      try {
        if (!this.verifyTransactionChecksum(transaction)) {
          if (this.strictChecksum) {
            throw new BadRequestException(
              `Invalid checksum for transaction ${transaction.id}`,
            );
          }

          this.logger.warn(
            `Checksum mismatch for transaction ${transaction.id}; continue processing because PAY2S_STRICT_CHECKSUM=false`,
          );
        }

        if (transaction.transferType !== 'IN') {
          this.logger.log(`Skipping OUT transaction ${transaction.id}`);
          results.push({
            transactionId: transaction.id,
            status: 'success',
            message: 'Skipped OUT transaction',
          });
          processed++;
          continue;
        }

        // Process the deposit
        const result = await this.processDepositTransaction(transaction);

        if (result) {
          const wallet = await this.walletRepository.findById(result.wallet_id);
          if (wallet) {
            this.notificationGateway.emitWalletBalanceUpdated({
              user_id: result.user_id,
              wallet_id: result.wallet_id,
              transaction_id: result.transaction_id,
              reference_code: result.reference_code,
              amount: result.amount,
              balance: Number(wallet.balance),
              deposit_balance: Number(wallet.deposit_balance),
              sale_balance: Number(wallet.sale_balance),
              locked_balance: Number(wallet.locked_balance),
              status: 'success',
              timestamp: new Date().toISOString(),
            });
          }
        }

        results.push({
          transactionId: transaction.id,
          status: 'success',
          message: 'Deposit processed successfully',
        });
        processed++;
      } catch (error) {
        this.logger.error(
          `Error processing transaction ${transaction.id}:`,
          error,
        );
        results.push({
          transactionId: transaction.id,
          status: 'failed',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
        failed++;
      }
    }

    return { processed, failed, results };
  }

  private verifyTransactionChecksum(
    transaction: WebhookTransactionDto,
  ): boolean {
    const checksum = String(transaction.checksum || '')
      .trim()
      .toLowerCase();
    if (!checksum || !/^[a-f0-9]{32,64}$/i.test(checksum)) {
      return false;
    }

    if (!this.webhookSecretKey) {
      return false;
    }

    const fingerprint =
      [
        transaction.id,
        transaction.gateway,
        transaction.transactionDate,
        transaction.transactionNumber,
        transaction.accountNumber,
        transaction.content,
        String(transaction.transferAmount),
        transaction.transferType,
      ].join('|') + `|${this.webhookSecretKey}`;

    // Accept common checksum variants to stay compatible with gateway formats.
    const candidates = [
      createHash('md5').update(fingerprint).digest('hex'),
      createHash('sha256').update(fingerprint).digest('hex'),
      createHmac('md5', this.webhookSecretKey)
        .update(fingerprint)
        .digest('hex'),
      createHmac('sha256', this.webhookSecretKey)
        .update(fingerprint)
        .digest('hex'),
    ];

    return candidates.some((candidate) =>
      this.safeCompare(candidate, checksum),
    );
  }

  private safeCompare(a: string, b: string): boolean {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    if (left.length !== right.length) {
      return false;
    }
    return timingSafeEqual(left, right);
  }

  private async processDepositTransaction(
    transaction: WebhookTransactionDto,
  ): Promise<{
    user_id: string;
    wallet_id: string;
    transaction_id: string;
    reference_code: string;
    amount: number;
  }> {
    return await this.databaseService.transaction(async (trx) => {
      const match = transaction.content.match(/\bNH[A-Z0-9]{4}[0-9]{5}\b/); // WalletService -> generateContentPayment

      if (!match) {
        throw new BadRequestException(
          `Transaction referenceCode ${transaction.content} not found`,
        );
      }

      const referenceCode = match[0];

      // Find the pending transaction
      const pendingTransaction =
        await this.walletTransactionRepository.findByReferenceCode(
          referenceCode,
          30,
        );

      if (!pendingTransaction) {
        throw new BadRequestException(
          `Transaction ${transaction.content} not found`,
        );
      }

      if (
        pendingTransaction.status !== ('pending' as WalletTransactionStatus)
      ) {
        throw new BadRequestException(
          `Transaction ${transaction.content} is not in pending status`,
        );
      }

      // Verify amount matches
      const expectedAmount = Number(pendingTransaction.amount);
      const receivedAmount = Number(transaction.transferAmount);

      if (expectedAmount !== receivedAmount) {
        throw new BadRequestException(
          `Amount mismatch: expected ${expectedAmount}, got ${receivedAmount}`,
        );
      }

      // Update transaction status to success
      await this.walletTransactionRepository.updateStatus(
        pendingTransaction.id,
        'success' as WalletTransactionStatus,
        new Date(),
      );

      // Update wallet balance
      const wallet = await this.walletRepository.findById(
        pendingTransaction.wallet_id,
      );

      if (wallet) {
        const transferAmount = Number(transaction.transferAmount);

        await this.walletRepository.incrementBalance(trx, wallet.id, {
          deposit_balance: transferAmount,
        });

        this.logger.log(
          `Updated wallet balance for transaction ${pendingTransaction.id}: +${transferAmount} VND`,
        );
      }

      this.logger.log(
        `Successfully processed deposit for transaction ${pendingTransaction.id}`,
      );

      return {
        user_id: pendingTransaction.user_id,
        wallet_id: pendingTransaction.wallet_id,
        transaction_id: pendingTransaction.id,
        reference_code: pendingTransaction.reference_code || referenceCode,
        amount: Number(transaction.transferAmount),
      };
    });
  }
}
