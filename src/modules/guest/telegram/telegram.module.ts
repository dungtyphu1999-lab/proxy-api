import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { TelegramRepository } from './telegram.repository';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService, TelegramRepository],
})
export class TelegramModule {}
