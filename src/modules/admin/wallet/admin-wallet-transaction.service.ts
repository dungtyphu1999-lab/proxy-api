import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { WalletRepository } from '../../user/wallet/wallet.repository';
import { AdminWalletTransactionRepository } from './admin-wallet-transaction.repository';
import { AdminWithdrawResponseDto } from '../../user/wallet/dto/admin-withdraw-response.dto';
import { GetWithdrawalsResponseDto } from './dto/get-withdrawals-response.dto';
import {
  WalletTransaction,
  WalletTransactionStatus,
} from '@/database/entities/wallet-transaction.entity';
import { PaginationOptions } from '@/shared/pagination/pagination.interface';
import { FileUploadService } from '@/modules/file-upload/file-upload.service';
import { NotificationGateway } from '@/modules/user/notification/notification.gateway';
import { NotificationService } from '@/modules/user/notification/notification.service';
import { createNotificationHash } from '@/shared/utils/notification-hashing.util';
import { WALLET_NOTIFICATION_TEMPLATES } from '@/shared/constants/notification-templates';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { WalletSettingsService } from './wallet-settings.service';

interface WalletTransactionWithUser {
  id: string;
  transaction_number: string;
  user_id: string;
  amount: number;
  fee_amount: number;
  status: string;
  bank_info?: {
    bank_code: string;
    bank_name: string;
    account_number: string;
    account_name: string;
    note?: string;
  };
  note?: string;
  transfer_proof_path?: string;
  created_at: Date;
  completed_at?: Date;
  user_email?: string;
  user_username?: string;
  type?: string;
}

@Injectable()
export class AdminWalletTransactionService {
  private readonly logger = new Logger(AdminWalletTransactionService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly fileUploadService: FileUploadService,
    private readonly walletRepository: WalletRepository,
    private readonly adminWalletTransactionRepository: AdminWalletTransactionRepository,
    private readonly notificationGateway: NotificationGateway,
    private readonly notificationService: NotificationService,
    private readonly walletSettingsService: WalletSettingsService,
  ) {}

  async getWithdrawalsWithPagination(
    options: PaginationOptions & {
      status?: string[];
      authorId?: string;
      typeTransaction?: string[];
    } = {},
  ): Promise<GetWithdrawalsResponseDto> {
    const result =
      await this.adminWalletTransactionRepository.getWithdrawalsWithPagination({
        ...options,
      });

    // Get wallet settings to include money_holding_days
    const walletSettings = await this.walletSettingsService.getSettings();
    const moneyHoldingDays = walletSettings?.money_holding_days || 7;

    const records: AdminWithdrawResponseDto[] = result.records.map(
      (transaction: WalletTransactionWithUser) => ({
        transaction_id: transaction.id,
        transaction_number: transaction.transaction_number,
        user_id: transaction.user_id,
        user: {
          id: transaction.user_id,
          username: transaction.user_username || '',
          email: transaction.user_email || '',
        },
        amount: transaction.amount,
        fee_amount: transaction.fee_amount,
        bank_info: transaction.bank_info || {
          bank_code: '',
          bank_name: '',
          account_number: '',
          account_name: '',
        },
        typeTransaction: transaction.type,
        status: transaction.status,
        note: transaction.note,
        transfer_proof_path: transaction.transfer_proof_path,
        created_at: transaction.created_at,
        completed_at: transaction.completed_at,
      }),
    );

    return {
      records,
      meta: result.meta,
      money_holding_days: moneyHoldingDays,
    };
  }

  async approveWithdraw(
    transactionId: string,
    file: Express.Multer.File,
    adminUserId: string,
  ): Promise<void> {
    let updateData: Partial<WalletTransaction>;

    try {
      const uploadResult = await this.fileUploadService.uploadImage(
        file,
        'transfer_proof',
      );

      updateData = {
        status: 'success' as WalletTransactionStatus,
        transfer_proof_path: `/${uploadResult.url.replace(/\\/g, '/')}`,
        completed_at: new Date(),
      };
    } catch (error) {
      this.logger.error('Failed to upload image:', error);
      throw new BadRequestException(ErrorCode.FAILED_TO_UPLOAD_IMAGE);
    }

    return await this.databaseService.transaction(async (trx) => {
      try {
        const transaction =
          await this.adminWalletTransactionRepository.findById(transactionId);

        if (!transaction) {
          throw new NotFoundException(ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
        }

        if (transaction.status !== ('pending' as WalletTransactionStatus)) {
          throw new BadRequestException(
            ErrorCode.WALLET_TRANSACTION_NOT_PENDING,
          );
        }

        // Update transaction status
        await this.adminWalletTransactionRepository.update(
          transactionId,
          updateData,
          trx,
        );

        // Update wallet balance
        await this.walletRepository.deductBalance(
          trx,
          transaction.wallet_id,
          Number(transaction.amount),
          true,
        );

        this.logger.log(`Withdraw completed successfully: ${transactionId}`);

        // Create notification and emit to user
        try {
          // Create notification template
          const notificationTemplate =
            WALLET_NOTIFICATION_TEMPLATES.STATUS_CHANGED({
              amount: transaction.amount,
              status: 'success',
              bankName: transaction.bank_info?.bank_name,
              bankNumber: transaction.bank_info?.account_number,
            });

          // Create notification record in database for user
          const notificationResult =
            await this.notificationService.createNotification(
              {
                type: 'wallet',
                title: notificationTemplate.title,
                message: notificationTemplate.message,
                link_url: `/wallet/history`,
                is_global: false,
                target_audience: 'user',
                user_ids: [transaction.user_id],
              },
              adminUserId,
            );

          // Generate hash from the saved notification record
          const notificationHash = createNotificationHash(
            notificationResult.id,
            notificationResult.type,
            notificationResult.title,
            notificationResult.message,
          );

          // Emit notification to user about withdraw approval
          this.notificationGateway.emitWithdrawStatusChanged({
            transaction_id: transaction.id,
            transaction_number: transaction.transaction_number,
            user_id: transaction.user_id,
            old_status: 'pending',
            new_status: 'success',
            amount: transaction.amount,
            bank_info: transaction.bank_info,
            note: 'Yêu cầu rút tiền đã được duyệt',
            admin_user_id: adminUserId,
            updated_at: new Date().toISOString(),
            hash: notificationHash,
            link_url: `/wallet/history`,
            notification_title: notificationTemplate.title,
            notification_message: notificationTemplate.message,
            notification_id: notificationResult.id,
            notification_created_at:
              notificationResult.created_at.toISOString(),
          });
        } catch (error) {
          // Log error but don't fail the approval
          this.logger.error(
            'Failed to create or emit withdraw approval notification:',
            error instanceof Error ? error.message : String(error),
          );
        }
      } catch (error) {
        if (
          error instanceof NotFoundException ||
          error instanceof BadRequestException
        ) {
          throw error;
        }

        this.logger.error('Failed to approve withdraw:', error);
        throw new BadRequestException(ErrorCode.WALLET_WITHDRAW_APPROVE_FAILED);
      }
    });
  }

  async rejectWithdraw(
    transactionId: string,
    note?: string,
    adminUserId?: string,
  ): Promise<void> {
    return await this.databaseService.transaction(async (trx) => {
      const transaction =
        await this.adminWalletTransactionRepository.findById(transactionId);

      if (!transaction) {
        throw new NotFoundException(ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
      }

      if (transaction.status !== ('pending' as WalletTransactionStatus)) {
        throw new BadRequestException(ErrorCode.WALLET_TRANSACTION_NOT_PENDING);
      }

      // Update transaction status and note
      await this.adminWalletTransactionRepository.updateStatus(
        transactionId,
        'failed' as WalletTransactionStatus,
        new Date(),
        note,
      );

      // Refund the balance back to wallet
      const wallet = await this.walletRepository.findByUserId(
        transaction.user_id,
      );
      if (wallet) {
        const transactionAmount = Number(transaction.amount) || 0;
        const currentLockedBalance = Number(wallet.locked_balance) || 0;
        const newLockedBalance = currentLockedBalance - transactionAmount;

        await this.walletRepository.updateLockedBalance(
          wallet.id,
          newLockedBalance,
          trx,
        );
      }

      // Create notification and emit to user
      if (adminUserId) {
        try {
          // Create notification template
          const notificationTemplate =
            WALLET_NOTIFICATION_TEMPLATES.STATUS_CHANGED({
              amount: transaction.amount,
              status: 'failed',
              reason: note,
            });

          const notificationResult =
            await this.notificationService.createNotification(
              {
                type: 'wallet',
                title: notificationTemplate.title,
                message: notificationTemplate.message,
                link_url: notificationTemplate.link_url as string,
                is_global: false,
                target_audience: 'user',
                user_ids: [transaction.user_id],
              },
              adminUserId,
            );

          // Generate hash from the saved notification record
          const notificationHash = createNotificationHash(
            notificationResult.id,
            notificationResult.type,
            notificationResult.title,
            notificationResult.message,
          );

          // Emit notification to user about withdraw rejection
          this.notificationGateway.emitWithdrawStatusChanged({
            transaction_id: transaction.id,
            transaction_number: transaction.transaction_number,
            user_id: transaction.user_id,
            old_status: 'pending',
            new_status: 'failed',
            amount: transaction.amount,
            bank_info: transaction.bank_info,
            note: note || 'Yêu cầu rút tiền đã bị từ chối',
            admin_user_id: adminUserId,
            updated_at: new Date().toISOString(),
            hash: notificationHash,
            link_url: notificationTemplate.link_url as string,
            notification_title: notificationTemplate.title,
            notification_message: notificationTemplate.message,
            notification_id: notificationResult.id,
            notification_created_at:
              notificationResult.created_at.toISOString(),
          });
        } catch (error) {
          // Log error but don't fail the rejection
          this.logger.error(
            'Failed to create or emit withdraw rejection notification:',
            error instanceof Error ? error.message : String(error),
          );
        }
      }
    });
  }
}
