import { Module, forwardRef } from '@nestjs/common';
import { AdminWalletTransactionController } from './admin-wallet-transaction.controller';
import { AdminWalletTransactionService } from './admin-wallet-transaction.service';
import { AdminWalletTransactionRepository } from './admin-wallet-transaction.repository';
import { AdminAuthModule } from '../auth/admin-auth.module';
import { DatabaseModule } from '@/database/database.module';
import { WalletRepository } from '../../user/wallet/wallet.repository';
import { FileUploadModule } from '@/modules/file-upload/file-upload.module';
import { NotificationModule } from '@/modules/user/notification/notification.module';
import { WalletSettingsModule } from './wallet-settings.module';
import { WalletModule } from '@/modules/user/wallet/wallet.module';

@Module({
  imports: [
    AdminAuthModule,
    DatabaseModule,
    FileUploadModule,
    NotificationModule,
    WalletSettingsModule,
    forwardRef(() => WalletModule),
  ],
  controllers: [AdminWalletTransactionController],
  providers: [
    AdminWalletTransactionService,
    AdminWalletTransactionRepository,
    WalletRepository,
  ],
  exports: [AdminWalletTransactionService],
})
export class AdminWalletTransactionModule {}
