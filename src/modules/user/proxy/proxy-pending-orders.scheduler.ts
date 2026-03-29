import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Injectable()
export class ProxyPendingOrdersScheduler
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(ProxyPendingOrdersScheduler.name);
  private readonly intervalMs = (() => {
    const value = Number(process.env.PROXY_PENDING_SYNC_INTERVAL_MS);
    return Number.isFinite(value) && value >= 10_000
      ? Math.trunc(value)
      : 60_000;
  })();
  private timer?: NodeJS.Timeout;
  private isRunning = false;

  constructor(private readonly proxyService: ProxyService) {}

  onModuleInit() {
    this.timer = setInterval(() => {
      void this.handleTick();
    }, this.intervalMs);
    this.logger.log(
      `Proxy pending scheduler started (interval=${this.intervalMs}ms)`,
    );
  }

  onModuleDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private async handleTick(): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;
    try {
      await this.proxyService.processPendingOrders();
    } catch (error) {
      this.logger.error(
        `Proxy pending scheduler error: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      this.isRunning = false;
    }
  }
}

