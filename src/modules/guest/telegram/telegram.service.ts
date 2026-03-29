import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TelegramRepository } from './telegram.repository';
import { DatabaseService } from '@/database/database.service';

type TelegramUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
};

type TelegramChat = {
  id: number;
  type?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
};

type TelegramMessage = {
  message_id: number;
  date?: number;
  text?: string;
  from?: TelegramUser;
  chat?: TelegramChat;
};

type TelegramUpdate = {
  update_id?: number;
  message?: TelegramMessage;
  edited_message?: TelegramMessage;
  channel_post?: TelegramMessage;
  edited_channel_post?: TelegramMessage;
  callback_query?: {
    message?: TelegramMessage;
  };
};

type UserSummary = {
  id: string;
  username?: string | null;
  email?: string | null;
  full_name?: string | null;
  shop_name?: string | null;
};

type TelegramSendOptions = {
  parse_mode?: 'HTML';
  disable_preview?: boolean;
};

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly telegramRepository: TelegramRepository,
    private readonly databaseService: DatabaseService,
  ) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
  }

  async handleWebhook(update: Record<string, unknown>): Promise<void> {
    const message = this.extractMessage(update as TelegramUpdate);
    if (!message) {
      return;
    }

    const chatId = message.chat?.id;
    const chatType = message.chat?.type;
    const from = message.from;
    if (!chatId || !from) {
      return;
    }

    // Link/unlink flow is only supported in private chat with bot.
    // Ignore group/topic messages to avoid noisy "Chưa liên kết tài khoản" replies.
    if (chatType !== 'private') {
      return;
    }

    const text =
      typeof message.text === 'string' ? message.text.trim() : undefined;
    if (!text) {
      return;
    }

    if (this.isDisconnectCommand(text)) {
      await this.handleDisconnect(chatId, String(from.id));
      return;
    }

    const startPayload = this.extractStartPayload(text);
    if (startPayload === undefined) {
      return;
    }

    if (!startPayload) {
      await this.sendMessage(chatId, this.buildMissingPayloadMessage(), {
        parse_mode: 'HTML',
        disable_preview: true,
      });
      return;
    }

    const linkToken = this.parseLinkToken(startPayload);
    if (!linkToken) {
      await this.sendMessage(chatId, this.buildInvalidPayloadMessage(), {
        parse_mode: 'HTML',
        disable_preview: true,
      });
      return;
    }

    const tokenRecord =
      await this.telegramRepository.consumeLinkToken(linkToken);
    if (!tokenRecord) {
      await this.sendMessage(chatId, this.buildInvalidPayloadMessage(), {
        parse_mode: 'HTML',
        disable_preview: true,
      });
      return;
    }

    const userId = tokenRecord.user_id;

    const existingTelegramConnection =
      await this.telegramRepository.findActiveByTelegramUserId(String(from.id));
    if (existingTelegramConnection) {
      const linkedUser = await this.findUserSummary(
        existingTelegramConnection.user_id,
      );
      const linkedName =
        linkedUser?.shop_name ||
        linkedUser?.full_name ||
        linkedUser?.username ||
        linkedUser?.email ||
        'tài khoản khác';
      await this.sendMessage(
        chatId,
        this.buildAlreadyLinkedMessage(linkedName),
        { parse_mode: 'HTML', disable_preview: true },
      );
      return;
    }

    const user = await this.findUserSummary(userId);
    if (!user) {
      await this.sendMessage(chatId, this.buildInvalidPayloadMessage(), {
        parse_mode: 'HTML',
        disable_preview: true,
      });
      return;
    }

    await this.telegramRepository.upsertConnection({
      user_id: userId,
      telegram_user_id: String(from.id),
      chat_id: String(chatId),
      telegram_username: from.username ?? null,
    });

    const displayName =
      user.shop_name || user.full_name || user.username || user.email || 'bạn';
    await this.sendMessage(chatId, this.buildWelcomeMessage(displayName), {
      parse_mode: 'HTML',
      disable_preview: true,
    });
  }

  private extractMessage(update: TelegramUpdate): TelegramMessage | null {
    return (
      update.message ||
      update.edited_message ||
      update.channel_post ||
      update.edited_channel_post ||
      update.callback_query?.message ||
      null
    );
  }

  private extractStartPayload(text: string): string | null | undefined {
    const match = text.match(/^\/start(?:@\w+)?(?:\s+(.+))?$/i);
    if (!match) {
      return undefined;
    }
    const payload = match[1]?.trim();
    return payload && payload.length > 0 ? payload : null;
  }

  private isDisconnectCommand(text: string): boolean {
    return /^\/disconnect(?:@\w+)?$/i.test(text);
  }

  private parseLinkToken(payload: string): string | null {
    const trimmed = payload.trim();
    if (!trimmed) {
      return null;
    }

    const raw = trimmed.startsWith('link_') ? trimmed.slice(5) : trimmed;
    if (!raw) {
      return null;
    }

    if (
      /^[0-9a-fA-F-]{16,64}$/.test(raw) &&
      !raw.toLowerCase().startsWith('web_connect')
    ) {
      return raw;
    }

    return null;
  }

  private async findUserSummary(userId: string): Promise<UserSummary | null> {
    const row = await this.databaseService
      .getKnex()<UserSummary>('users as u')
      .leftJoin('user_profiles as up', 'u.id', 'up.user_id')
      .leftJoin('shops as s', 'u.id', 's.owner_id')
      .select(
        'u.id',
        'u.username',
        'u.email',
        'up.full_name',
        's.name as shop_name',
      )
      .where('u.id', userId)
      .first<UserSummary | undefined>();

    return row ?? null;
  }

  private buildWelcomeMessage(displayName: string): string {
    return [
      '✅ <b>Liên kết Telegram thành công</b>',
      '----------------------',
      '',
      `👋 <b>Xin chào:</b> ${this.escapeHtml(displayName)}`,
      '🔗 <b>Tài khoản:</b> bachhoammo',
      '',
      '<b>Thông báo bạn sẽ nhận:</b>',
      '• 📩 Tin nhắn mới',
      '• 🛒 Đơn hàng mới',
      '• ✅ Đơn hàng hoàn thành',
      '• ⚠️ Khiếu nại',
      '',
      '👉 Cài đặt thông báo trên website bachhoammo.',
    ].join('\n');
  }

  private buildAlreadyLinkedMessage(displayName: string): string {
    return [
      '⚠️ <b>Telegram đã được liên kết</b>',
      '----------------------',
      `👤 <b>Tài khoản hiện tại:</b> ${this.escapeHtml(displayName)}`,
      '',
      '👉 Nếu muốn liên kết tài khoản khác, hãy /disconnect trước.',
    ].join('\n');
  }

  private buildMissingPayloadMessage(): string {
    return [
      '⚠️ <b>Chưa liên kết tài khoản</b>',
      '----------------------',
      'Vui lòng quay lại website bachhoammo và nhấn “Kết nối Telegram”.',
    ].join('\n');
  }

  private buildInvalidPayloadMessage(): string {
    return [
      '⚠️ <b>Liên kết không hợp lệ hoặc đã hết hạn</b>',
      '----------------------',
      'Vui lòng quay lại website bachhoammo và nhấn “Kết nối Telegram” để tạo liên kết mới.',
    ].join('\n');
  }

  private async handleDisconnect(
    chatId: number,
    telegramUserId: string,
  ): Promise<void> {
    const connection =
      await this.telegramRepository.deactivateByTelegramUserId(telegramUserId);

    if (!connection) {
      await this.sendMessage(
        chatId,
        'Telegram của bạn chưa được liên kết với tài khoản nào.',
      );
      return;
    }

    const user = await this.findUserSummary(connection.user_id);
    const displayName =
      user?.shop_name ||
      user?.full_name ||
      user?.username ||
      user?.email ||
      'tài khoản';
    await this.sendMessage(
      chatId,
      [
        '🔓 <b>Đã hủy liên kết Telegram</b>',
        '----------------------',
        `👤 <b>Tài khoản:</b> ${this.escapeHtml(displayName)}`,
        '✅ <b>Trạng thái:</b> Ngừng nhận thông báo từ bachhoammo.',
      ].join('\n'),
      { parse_mode: 'HTML', disable_preview: true },
    );
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private async sendMessage(
    chatId: number,
    text: string,
    options?: TelegramSendOptions,
  ): Promise<void> {
    if (!this.botToken) {
      this.logger.warn('TELEGRAM_BOT_TOKEN is not configured.');
      return;
    }

    try {
      await axios.post(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        {
          chat_id: chatId,
          text,
          parse_mode: options?.parse_mode,
          disable_web_page_preview: options?.disable_preview,
        },
      );
    } catch (error) {
      this.logger.error('Failed to send Telegram message', error);
    }
  }
}
