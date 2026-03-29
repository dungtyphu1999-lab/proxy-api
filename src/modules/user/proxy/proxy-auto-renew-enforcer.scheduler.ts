import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Injectable()
export class ProxyAutoRenewEnforcerScheduler
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(ProxyAutoRenewEnforcerScheduler.name);
  private timer?: NodeJS.Timeout;
  private isRunning = false;
  // GMT+7 (Asia/Ho_Chi_Minh). Vietnam has no DST.
  private readonly timezoneOffsetMinutes = 7 * 60;

  constructor(private readonly proxyService: ProxyService) {}

  onModuleInit() {
    this.scheduleNextTick();
    this.logger.log(
      'Proxy auto-renew enforcer started (runs daily at 00:00 Asia/Ho_Chi_Minh)',
    );
  }

  onModuleDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  private getDelayUntilNextMidnightHcmMs(): number {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    const hcmMs = utcMs + this.timezoneOffsetMinutes * 60_000;
    const hcmNow = new Date(hcmMs);
    const hcmNextMidnight = new Date(hcmNow);
    hcmNextMidnight.setHours(24, 0, 0, 0);
    const delay = hcmNextMidnight.getTime() - hcmNow.getTime();
    return Math.max(1_000, delay);
  }

  private scheduleNextTick() {
    const delayMs = this.getDelayUntilNextMidnightHcmMs();
    this.timer = setTimeout(() => {
      void this.handleTick();
    }, delayMs);
  }

  private async handleTick(): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;
    try {
      const result =
        await this.proxyService.enforceWebshareAutoRenewOffForAllAccounts();
      this.logger.log(
        `Proxy auto-renew enforcer done: total=${result.total}, disabled=${result.disabled}, failed=${result.failed}`,
      );
    } catch (error) {
      this.logger.error(
        `Proxy auto-renew enforcer error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      this.isRunning = false;
      this.scheduleNextTick();
    }
  }
}
