import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { WalletSettingsRepository } from './wallet-settings.repository';
import { UpdateWalletSettingsDto } from './dto/update-wallet-settings.dto';
import { WalletSetting } from '@/database/entities/wallet-setting.entity';

@Injectable()
export class WalletSettingsService {
  private readonly logger = new Logger(WalletSettingsService.name);

  constructor(
    private readonly walletSettingsRepository: WalletSettingsRepository,
  ) {}

  /**
   * Get current wallet settings
   */
  async getSettings(): Promise<WalletSetting> {
    try {
      let settings = await this.walletSettingsRepository.getSettings();

      // Initialize default settings if not exists
      if (!settings) {
        settings =
          await this.walletSettingsRepository.initializeDefaultSettings();
        this.logger.log('Initialized default wallet settings');
      }

      return settings;
    } catch (error) {
      this.logger.error('Failed to get wallet settings:', error);
      throw new NotFoundException('Failed to retrieve wallet settings');
    }
  }

  /**
   * Update wallet settings
   */
  async updateSettings(data: UpdateWalletSettingsDto): Promise<WalletSetting> {
    try {
      return await this.walletSettingsRepository.updateSettings(data);
    } catch (error) {
      this.logger.error('Failed to update wallet settings:', error);
      throw new BadRequestException('Failed to update wallet settings');
    }
  }
}
