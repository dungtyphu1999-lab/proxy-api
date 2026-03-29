import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

interface StoredData {
  count: number;
  windowStart: number;
}
@Injectable()
export class RateLimitService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async checkRateLimit(
    key: string,
    windowMs: number,
    maxAttempts: number = 1,
  ): Promise<{ allowed: boolean; timeUntilReset?: number }> {
    const cacheKey = `rate_limit:${key}`;
    const now = Date.now();

    // Get existing record
    const existing = await this.cacheManager.get<StoredData>(cacheKey);

    if (!existing || now - existing.windowStart >= windowMs) {
      const data: StoredData = { count: 1, windowStart: now };
      await this.cacheManager.set(cacheKey, data, windowMs);
      return { allowed: true, timeUntilReset: windowMs };
    }

    if (existing.count >= maxAttempts) {
      const timeUntilReset = windowMs - (now - existing.windowStart);
      return { allowed: false, timeUntilReset };
    }

    const data: StoredData = {
      count: existing.count + 1,
      windowStart: existing.windowStart,
    };
    const timeUntilReset = windowMs - (now - existing.windowStart);
    await this.cacheManager.set(cacheKey, data, timeUntilReset);

    return { allowed: true, timeUntilReset };
  }
}
