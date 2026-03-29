import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('[Public] Telegram')
@Controller()
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly configService: ConfigService,
  ) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Telegram webhook endpoint' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhook received',
  })
  async handleWebhook(
    @Body() update: Record<string, unknown>,
    @Headers('x-telegram-bot-api-secret-token') secretToken?: string,
  ) {
    const expectedSecret =
      this.configService.get<string>('TELEGRAM_WEBHOOK_SECRET_TOKEN') || '';
    if (expectedSecret && secretToken !== expectedSecret) {
      throw new UnauthorizedException('Invalid Telegram webhook secret');
    }
    await this.telegramService.handleWebhook(update);
    return { success: true };
  }
}
