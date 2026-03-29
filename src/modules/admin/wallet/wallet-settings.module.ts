import { Module } from '@nestjs/common';
import { WalletSettingsService } from './wallet-settings.service';
import { WalletSettingsRepository } from './wallet-settings.repository';

@Module({
  providers: [WalletSettingsService, WalletSettingsRepository],
  exports: [WalletSettingsService],
})
export class WalletSettingsModule {}
