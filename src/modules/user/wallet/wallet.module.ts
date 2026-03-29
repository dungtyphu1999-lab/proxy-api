import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletTransactionRepository } from './wallet-transaction.repository';
import { Pay2SService } from './pay2s.service';
import { WebhookService } from './webhook.service';
import { WalletReleaseService } from './wallet-release.service';
import { WalletReleaseScheduler } from './wallet-release.scheduler';
import { DatabaseModule } from '@/database/database.module';
import { ShopRequestsRepository } from '../shop-requests/shop-requests.repository';
import { AdminNotificationModule } from '@/modules/admin/notifications/admin-notification.module';
import { NotificationModule } from '@/modules/user/notification/notification.module';
import { UserModule } from '../user/user.module';
import { OrderComplaintsRepository } from '../order-complaints/order-complaints.repository';
import { WalletSettingsModule } from '@/modules/admin/wallet/wallet-settings.module';

@Module({
  imports: [
    DatabaseModule,
    AdminNotificationModule,
    NotificationModule,
    UserModule,
    WalletSettingsModule,
  ],
  controllers: [WalletController],
  providers: [
    WalletService,
    WalletRepository,
    WalletTransactionRepository,
    Pay2SService,
    WebhookService,
    ShopRequestsRepository,
    WalletReleaseService,
    WalletReleaseScheduler,
    OrderComplaintsRepository,
  ],
  exports: [
    WalletService,
    WalletRepository,
    WalletTransactionRepository,
    WalletReleaseService,
  ],
})
export class WalletModule {}
