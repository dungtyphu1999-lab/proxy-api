import { Module } from '@nestjs/common';
import { UserTelegramController } from './telegram.controller';
import { UserTelegramService } from './telegram.service';
import { TelegramRepository } from '@/modules/guest/telegram/telegram.repository';

@Module({
  controllers: [UserTelegramController],
  providers: [UserTelegramService, TelegramRepository],
  exports: [UserTelegramService],
})
export class UserTelegramModule {}
