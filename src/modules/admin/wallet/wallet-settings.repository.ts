import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { WalletSetting } from '@/database/entities/wallet-setting.entity';
import { UpdateWalletSettingsDto } from './dto/update-wallet-settings.dto';

@Injectable()
export class WalletSettingsRepository extends BaseRepository<WalletSetting> {
  constructor() {
    super('wallet_settings');
  }

  /**
   * Get current wallet settings (singleton pattern)
   */
  async getSettings(): Promise<WalletSetting | null> {
    return (await this.qb.first()) as WalletSetting | null;
  }

  /**
   * Initialize default settings if not exists
   */
  async initializeDefaultSettings(): Promise<WalletSetting> {
    const existing = await this.getSettings();

    if (existing) {
      return existing;
    }

    const now = new Date();
    const [defaultSettings] = await this.qb
      .insert({
        money_holding_days: 7,
        created_at: now,
        updated_at: now,
      })
      .returning('*');

    return defaultSettings;
  }

  /**
   * Update wallet settings (singleton pattern)
   */
  async updateSettings(data: UpdateWalletSettingsDto): Promise<WalletSetting> {
    const now = new Date();

    // Ensure settings exist
    await this.initializeDefaultSettings();

    // Update settings
    const [updated] = await this.qb
      .update({
        ...data,
        updated_at: now,
      })
      .returning('*');

    return updated;
  }
}
