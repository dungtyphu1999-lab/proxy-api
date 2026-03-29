import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { WalletReleaseService } from './wallet-release.service';

@Injectable()
export class WalletReleaseScheduler implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WalletReleaseScheduler.name);
  private intervalId?: NodeJS.Timeout;
  private nextRunTime?: Date;

  constructor(private readonly walletReleaseService: WalletReleaseService) {}

  onModuleInit() {
    this.scheduleNextRun();
    this.logger.log('Wallet release scheduler initialized');
  }

  /**
   * Schedule the next run at 12:00 AM (midnight)
   */
  private scheduleNextRun(): void {
    const now = new Date();
    const nextRun = new Date();

    // Set to 12:00 AM (midnight) today
    nextRun.setHours(0, 0, 0, 0);

    // If it's already past midnight today, schedule for tomorrow
    if (now >= nextRun) {
      nextRun.setDate(nextRun.getDate() + 1);
    }

    this.nextRunTime = nextRun;
    const msUntilNextRun = nextRun.getTime() - now.getTime();

    this.logger.log(
      `Scheduled next wallet release at ${nextRun.toISOString()} (in ${Math.round(msUntilNextRun / 1000 / 60)} minutes)`,
    );

    // Clear existing interval if any
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }

    // Schedule the run
    this.intervalId = setTimeout(() => {
      void this.handleRelease();
      // After first run, schedule daily at 12:00 AM (midnight)
      this.scheduleDaily();
    }, msUntilNextRun);
  }

  /**
   * Schedule daily runs at 12:00 AM (midnight)
   */
  private scheduleDaily(): void {
    // Run every 24 hours
    const dailyInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      void this.handleRelease();
    }, dailyInterval);

    this.logger.log('Scheduled daily wallet release at 12:00 AM (midnight)');
  }

  /**
   * Handle the release process
   */
  private async handleRelease(): Promise<void> {
    try {
      this.logger.log('Starting scheduled wallet release process');
      await this.walletReleaseService.releaseLockedBalanceToSaleBalance();
      this.logger.log('Scheduled wallet release process completed');
    } catch (error) {
      this.logger.error(
        'Error in scheduled wallet release:',
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  onModuleDestroy() {
    if (this.intervalId) {
      if (typeof this.intervalId === 'number') {
        clearInterval(this.intervalId);
      } else {
        clearTimeout(this.intervalId);
      }
    }
    this.logger.log('Wallet release scheduler destroyed');
  }
}
