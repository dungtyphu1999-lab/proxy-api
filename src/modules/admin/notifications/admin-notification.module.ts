import { Module } from '@nestjs/common';
import { AdminNotificationController } from './admin-notification.controller';
import { AdminNotificationService } from './admin-notification.service';
import { AdminNotificationRepository } from './admin-notification.repository';
import { AdminNotificationHelper } from './admin-notification.helper';
import { DatabaseModule } from '@/database/database.module';
import { NotificationModule } from '@/modules/user/notification/notification.module';
import { AdminUserModule } from '@/modules/admin/users/admin-users.module';
import { UserTelegramModule } from '@/modules/user/telegram/telegram.module';

@Module({
  imports: [
    DatabaseModule,
    NotificationModule,
    AdminUserModule,
    UserTelegramModule,
  ],
  controllers: [AdminNotificationController],
  providers: [
    AdminNotificationService,
    AdminNotificationRepository,
    AdminNotificationHelper,
  ],
  exports: [AdminNotificationService, AdminNotificationHelper],
})
export class AdminNotificationModule {}
