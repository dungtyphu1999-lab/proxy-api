import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chat.gateway';
import { ChatSocketService } from './services/chat-socket.service';
import { UserModule } from '../user/user.module';
import { ShopsModule } from '../shops/shops.module';
import { AppConfigModule } from '@/config/app-config.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { UserTelegramModule } from '@/modules/user/telegram/telegram.module';

@Module({
  imports: [
    UserModule,
    ShopsModule,
    AppConfigModule,
    UploadModule,
    UserTelegramModule,
    JwtModule.register({}),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway, ChatSocketService],
  exports: [ChatService, ChatRepository, ChatGateway],
})
export class ChatModule {}
