import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { TelegramRepository } from '@/modules/guest/telegram/telegram.repository';
import { DatabaseService } from '@/database/database.service';
import { UpdateTelegramSettingsDto } from './dto/telegram-settings.dto';
import { v4 as uuidv4 } from 'uuid';

type TelegramConnectionStatus = {
  is_connected: boolean;
  telegram_user_id?: string;
  telegram_username?: string | null;
  connected_at?: Date;
};

type UserSummary = {
  id: string;
  username?: string | null;
  email?: string | null;
  full_name?: string | null;
  shop_name?: string | null;
};

type TelegramSettings = {
  notify_new_message: boolean;
  notify_new_order: boolean;
  notify_new_preorder: boolean;
  notify_warranty_request: boolean;
  notify_new_complaint: boolean;
  notify_admin: boolean;
};

type TelegramSettingsRow = TelegramSettings & {
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
};

export type TelegramReplyMarkup = {
  inline_keyboard: Array<Array<{ text: string; url: string }>>;
};

export type TelegramSendOptions = {
  parse_mode?: 'HTML';
  disable_preview?: boolean;
  reply_markup?: TelegramReplyMarkup;
  message_thread_id?: number;
  allow_topic_fallback?: boolean;
};

export type TelegramNotificationType =
  | 'new_message'
  | 'new_order'
  | 'new_preorder'
  | 'warranty_request'
  | 'new_complaint'
  | 'admin_notification';

@Injectable()
export class UserTelegramService {
  private readonly logger = new Logger(UserTelegramService.name);
  private readonly botToken: string;
  private readonly webBaseUrl: string;
  private readonly linkTokenTtlMinutes = 10;

  constructor(
    private readonly telegramRepository: TelegramRepository,
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN') || '';
    const rawBaseUrl =
      this.configService.get<string>('WEB_BASE_URL') ||
      'https://bachhoammo.net';
    this.webBaseUrl = rawBaseUrl.replace(/\/+$/, '');
  }

  async getConnectionStatus(userId: string): Promise<TelegramConnectionStatus> {
    const connection = await this.telegramRepository.findActiveByUserId(userId);

    if (!connection) {
      return {
        is_connected: false,
      };
    }

    return {
      is_connected: true,
      telegram_user_id: String(connection.telegram_user_id),
      telegram_username: connection.telegram_username ?? null,
      connected_at: connection.connected_at,
    };
  }

  async disconnect(userId: string): Promise<TelegramConnectionStatus> {
    const connection = await this.telegramRepository.deactivateByUserId(userId);
    if (!connection) {
      return {
        is_connected: false,
      };
    }

    const user = await this.findUserSummary(userId);
    const displayName =
      user?.shop_name ||
      user?.full_name ||
      user?.username ||
      user?.email ||
      'tài khoản';

    await this.sendMessage(
      connection.chat_id,
      [
        '🔓 Đã hủy liên kết Telegram',
        `• Tài khoản: ${displayName}`,
        '• Trạng thái: Ngừng nhận thông báo từ bachhoammo.',
      ].join('\n'),
    );

    return {
      is_connected: false,
      telegram_user_id: String(connection.telegram_user_id),
      telegram_username: connection.telegram_username ?? null,
    };
  }

  async getSettings(userId: string): Promise<TelegramSettings> {
    const knex = this.databaseService.getKnex();
    const existing = await knex<TelegramSettingsRow>(
      'telegram_notification_settings',
    )
      .where('user_id', userId)
      .first<TelegramSettingsRow | undefined>();

    if (existing) {
      return {
        notify_new_message: existing.notify_new_message,
        notify_new_order: existing.notify_new_order,
        notify_new_preorder: existing.notify_new_preorder,
        notify_warranty_request: existing.notify_warranty_request,
        notify_new_complaint: existing.notify_new_complaint,
        notify_admin: existing.notify_admin,
      };
    }

    const defaults = this.getDefaultSettings();

    await knex<TelegramSettingsRow>('telegram_notification_settings').insert({
      user_id: userId,
      ...defaults,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return defaults;
  }

  async updateSettings(
    userId: string,
    input: UpdateTelegramSettingsDto,
  ): Promise<TelegramSettings> {
    const current = await this.getSettings(userId);
    const next: TelegramSettings = {
      ...current,
      ...input,
    };

    const knex = this.databaseService.getKnex();
    await knex<TelegramSettingsRow>('telegram_notification_settings')
      .where('user_id', userId)
      .update({
        ...next,
        updated_at: new Date(),
      });

    return next;
  }

  async createLinkToken(userId: string): Promise<{
    token: string;
    expires_at: Date;
  }> {
    const token = uuidv4();
    const expiresAt = new Date(
      Date.now() + this.linkTokenTtlMinutes * 60 * 1000,
    );
    await this.telegramRepository.createLinkToken(userId, token, expiresAt);
    return {
      token,
      expires_at: expiresAt,
    };
  }

  async notifyUser(
    userId: string,
    type: TelegramNotificationType,
    text: string,
    options?: TelegramSendOptions,
  ): Promise<boolean> {
    const connection = await this.telegramRepository.findActiveByUserId(userId);
    if (!connection) {
      return false;
    }

    const settings = await this.getSettings(userId);
    if (!this.isNotificationEnabled(settings, type)) {
      return false;
    }

    await this.sendMessage(connection.chat_id, text, options);
    return true;
  }

  async notifyUsers(
    userIds: string[],
    type: TelegramNotificationType,
    text: string,
    options?: TelegramSendOptions,
  ): Promise<number> {
    if (userIds.length === 0) {
      return 0;
    }

    const connections =
      await this.telegramRepository.findActiveByUserIds(userIds);
    if (connections.length === 0) {
      return 0;
    }

    const knex = this.databaseService.getKnex();
    const settingsRows = await knex<TelegramSettingsRow>(
      'telegram_notification_settings',
    )
      .whereIn('user_id', userIds)
      .select<TelegramSettingsRow[]>(
        'user_id',
        'notify_new_message',
        'notify_new_order',
        'notify_new_preorder',
        'notify_warranty_request',
        'notify_new_complaint',
        'notify_admin',
      );

    const settingsMap = new Map<string, TelegramSettings>();
    for (const row of settingsRows) {
      settingsMap.set(row.user_id, {
        notify_new_message: row.notify_new_message,
        notify_new_order: row.notify_new_order,
        notify_new_preorder: row.notify_new_preorder,
        notify_warranty_request: row.notify_warranty_request,
        notify_new_complaint: row.notify_new_complaint,
        notify_admin: row.notify_admin,
      });
    }

    const defaults = this.getDefaultSettings();
    const tasks = connections.map(async (connection) => {
      const settings = settingsMap.get(connection.user_id) ?? defaults;
      if (!this.isNotificationEnabled(settings, type)) {
        return false;
      }

      await this.sendMessage(connection.chat_id, text, options);
      return true;
    });

    const results = await Promise.allSettled(tasks);
    return results.filter(
      (result) => result.status === 'fulfilled' && result.value,
    ).length;
  }

  async notifyChat(
    chatId: string | number,
    text: string,
    options?: TelegramSendOptions,
  ): Promise<boolean> {
    const normalizedChatId =
      typeof chatId === 'string' ? chatId.trim() : String(chatId);
    if (!normalizedChatId) {
      return false;
    }

    await this.sendMessage(normalizedChatId, text, options);
    return true;
  }

  buildWebLink(path?: string | null): string {
    if (!path) {
      return this.webBaseUrl;
    }

    const normalized = path.trim();
    if (!normalized) {
      return this.webBaseUrl;
    }

    if (/^https?:\/\//i.test(normalized)) {
      return normalized;
    }

    return `${this.webBaseUrl}${normalized.startsWith('/') ? '' : '/'}${normalized}`;
  }

  buildInlineButton(
    text: string,
    path?: string | null,
  ): { text: string; url: string } | null {
    const url = this.buildWebLink(path);
    if (!this.isValidInlineUrl(url)) {
      return null;
    }

    return { text, url };
  }

  escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  buildHtmlLink(text: string, path?: string | null): string {
    const url = this.buildWebLink(path);
    return `<a href="${this.escapeHtml(url)}">${this.escapeHtml(text)}</a>`;
  }

  private isValidInlineUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return false;
      }
      const host = parsed.hostname.toLowerCase();
      if (
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host === '0.0.0.0' ||
        host.endsWith('.local')
      ) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  private async findUserSummary(userId: string): Promise<UserSummary | null> {
    const knex = this.databaseService.getKnex();
    const row = await knex<UserSummary>('users as u')
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

  private getDefaultSettings(): TelegramSettings {
    return {
      notify_new_message: true,
      notify_new_order: true,
      notify_new_preorder: true,
      notify_warranty_request: true,
      notify_new_complaint: true,
      notify_admin: true,
    };
  }

  private isNotificationEnabled(
    settings: TelegramSettings,
    type: TelegramNotificationType,
  ): boolean {
    switch (type) {
      case 'new_message':
        return settings.notify_new_message;
      case 'new_order':
        return settings.notify_new_order;
      case 'new_preorder':
        return settings.notify_new_preorder;
      case 'warranty_request':
        return settings.notify_warranty_request;
      case 'new_complaint':
        return settings.notify_new_complaint;
      case 'admin_notification':
        return settings.notify_admin;
      default:
        return false;
    }
  }

  private async sendMessage(
    chatId: string | number,
    text: string,
    options?: TelegramSendOptions,
  ): Promise<void> {
    if (!this.botToken) {
      this.logger.warn('TELEGRAM_BOT_TOKEN is not configured.');
      return;
    }

    const payload = {
      chat_id: chatId,
      text,
      parse_mode: options?.parse_mode,
      disable_web_page_preview: options?.disable_preview,
      reply_markup: options?.reply_markup,
      message_thread_id: options?.message_thread_id,
    };

    try {
      await axios.post(
        `https://api.telegram.org/bot${this.botToken}/sendMessage`,
        payload,
      );
    } catch (error) {
      if (options?.message_thread_id && options.allow_topic_fallback !== false) {
        try {
          const fallbackPayload = { ...payload };
          delete fallbackPayload.message_thread_id;
          await axios.post(
            `https://api.telegram.org/bot${this.botToken}/sendMessage`,
            fallbackPayload,
          );
          this.logger.warn(
            `Failed to send with topic (${options.message_thread_id}), resent without topic.`,
          );
          return;
        } catch (fallbackError) {
          this.logger.error(
            'Failed to send Telegram message (topic + fallback)',
            fallbackError,
          );
          return;
        }
      }

      this.logger.error('Failed to send Telegram message', error);
    }
  }
}
