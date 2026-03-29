import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { NotificationGateway } from './notification.gateway';
import { AppConfigModule } from '@/config/app-config.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AppConfigModule, JwtModule.register({}), UserModule],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, NotificationGateway],
  exports: [NotificationService, NotificationRepository, NotificationGateway],
})
export class NotificationModule {}
