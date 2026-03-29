import { SetMetadata } from '@nestjs/common';

export const DAILY_RATE_LIMIT_KEY = 'daily_rate_limit';

export interface DailyRateLimitOptions {
  maxAttempts: number;
  message?: string;
}

export const DailyRateLimit = (options: DailyRateLimitOptions) =>
  SetMetadata(DAILY_RATE_LIMIT_KEY, options);
