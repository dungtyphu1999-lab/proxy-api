import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';

type TelegramConnectionRow = {
  id: string;
  user_id: string;
  telegram_user_id: string;
  chat_id: string;
  telegram_username?: string | null;
  is_active: boolean;
  connected_at: Date;
  created_at: Date;
  updated_at: Date;
};

type TelegramLinkTokenRow = {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  used_at?: Date | null;
  created_at: Date;
};

@Injectable()
export class TelegramRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  private qb() {
    return this.databaseService.getKnex();
  }

  async findByUserId(userId: string): Promise<TelegramConnectionRow | null> {
    const row = await this.qb()<TelegramConnectionRow>('telegram_connections')
      .where('user_id', userId)
      .first();
    return row ?? null;
  }

  async findActiveByUserId(
    userId: string,
  ): Promise<TelegramConnectionRow | null> {
    const row = await this.qb()<TelegramConnectionRow>('telegram_connections')
      .where('user_id', userId)
      .andWhere('is_active', true)
      .first();
    return row ?? null;
  }

  async findActiveByUserIds(
    userIds: string[],
  ): Promise<TelegramConnectionRow[]> {
    if (userIds.length === 0) {
      return [];
    }

    const rows = await this.qb()<TelegramConnectionRow>('telegram_connections')
      .whereIn('user_id', userIds)
      .andWhere('is_active', true);

    return rows;
  }

  async findByTelegramUserId(
    telegramUserId: string,
  ): Promise<TelegramConnectionRow | null> {
    const row = await this.qb()<TelegramConnectionRow>('telegram_connections')
      .where('telegram_user_id', telegramUserId)
      .first();
    return row ?? null;
  }

  async findActiveByTelegramUserId(
    telegramUserId: string,
  ): Promise<TelegramConnectionRow | null> {
    const row = await this.qb()<TelegramConnectionRow>('telegram_connections')
      .where('telegram_user_id', telegramUserId)
      .andWhere('is_active', true)
      .first();
    return row ?? null;
  }

  async deactivateByTelegramUserId(
    telegramUserId: string,
  ): Promise<TelegramConnectionRow | null> {
    const existing = await this.findActiveByTelegramUserId(telegramUserId);
    if (!existing) {
      return null;
    }

    const now = new Date();
    await this.qb()
      .from('telegram_connections')
      .where('id', existing.id)
      .update({
        is_active: false,
        updated_at: now,
      });

    return {
      ...existing,
      is_active: false,
      updated_at: now,
    };
  }

  async deactivateByUserId(
    userId: string,
  ): Promise<TelegramConnectionRow | null> {
    const existing = await this.findActiveByUserId(userId);
    if (!existing) {
      return null;
    }

    const now = new Date();
    await this.qb()
      .from('telegram_connections')
      .where('id', existing.id)
      .update({
        is_active: false,
        updated_at: now,
      });

    return {
      ...existing,
      is_active: false,
      updated_at: now,
    };
  }

  async upsertConnection(input: {
    user_id: string;
    telegram_user_id: string;
    chat_id: string;
    telegram_username?: string | null;
  }): Promise<TelegramConnectionRow> {
    const now = new Date();
    const existingByUser = await this.findByUserId(input.user_id);
    if (existingByUser) {
      await this.qb()
        .from('telegram_connections')
        .where('id', existingByUser.id)
        .update({
          telegram_user_id: input.telegram_user_id,
          chat_id: input.chat_id,
          telegram_username: input.telegram_username ?? null,
          is_active: true,
          connected_at: now,
          updated_at: now,
        });
      return {
        ...existingByUser,
        telegram_user_id: input.telegram_user_id,
        chat_id: input.chat_id,
        telegram_username: input.telegram_username ?? null,
        is_active: true,
        connected_at: now,
        updated_at: now,
      };
    }

    const existingByTelegram = await this.findByTelegramUserId(
      input.telegram_user_id,
    );
    if (existingByTelegram) {
      await this.qb()
        .from('telegram_connections')
        .where('id', existingByTelegram.id)
        .update({
          user_id: input.user_id,
          chat_id: input.chat_id,
          telegram_username: input.telegram_username ?? null,
          is_active: true,
          connected_at: now,
          updated_at: now,
        });
      return {
        ...existingByTelegram,
        user_id: input.user_id,
        chat_id: input.chat_id,
        telegram_username: input.telegram_username ?? null,
        is_active: true,
        connected_at: now,
        updated_at: now,
      };
    }

    const rows = await this.qb()<TelegramConnectionRow>('telegram_connections')
      .insert({
        user_id: input.user_id,
        telegram_user_id: input.telegram_user_id,
        chat_id: input.chat_id,
        telegram_username: input.telegram_username ?? null,
        is_active: true,
        connected_at: now,
        created_at: now,
        updated_at: now,
      })
      .returning('*');

    return rows[0];
  }

  async createLinkToken(
    userId: string,
    token: string,
    expiresAt: Date,
  ): Promise<TelegramLinkTokenRow> {
    const now = new Date();
    await this.qb()<TelegramLinkTokenRow>('telegram_link_tokens')
      .where('user_id', userId)
      .whereNull('used_at')
      .del();

    const rows = await this.qb()<TelegramLinkTokenRow>('telegram_link_tokens')
      .insert({
        user_id: userId,
        token,
        expires_at: expiresAt,
        created_at: now,
      })
      .returning('*');

    return rows[0];
  }

  async consumeLinkToken(token: string): Promise<TelegramLinkTokenRow | null> {
    const now = new Date();
    const row = await this.qb()<TelegramLinkTokenRow>('telegram_link_tokens')
      .where('token', token)
      .andWhere('expires_at', '>', now)
      .whereNull('used_at')
      .first();

    if (!row) {
      return null;
    }

    await this.qb()<TelegramLinkTokenRow>('telegram_link_tokens')
      .where('id', row.id)
      .update({ used_at: now });

    return row;
  }
}
