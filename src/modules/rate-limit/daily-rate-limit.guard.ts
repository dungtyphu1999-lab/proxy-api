import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimitService } from './rate-limit.service';
import {
  DailyRateLimitOptions,
  DAILY_RATE_LIMIT_KEY,
} from './daily-rate-limit.decorator';
import { Request } from 'express';

@Injectable()
export class DailyRateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rateLimitService: RateLimitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<DailyRateLimitOptions>(
      DAILY_RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userId = request.user?.['sub'] || request.ip;

    if (!userId) {
      throw new BadRequestException(
        'Unable to identify user for rate limiting',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const endpointPath = request.route?.['path'] || request.path;
    const dailyWindowMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const { allowed, timeUntilReset } =
      await this.rateLimitService.checkRateLimit(
        `daily:${userId}:${endpointPath}`,
        dailyWindowMs,
        options.maxAttempts,
      );

    if (!allowed) {
      const hoursUntilReset = Math.ceil(
        (timeUntilReset || 0) / (1000 * 60 * 60),
      );
      const message =
        options.message ||
        `Daily limit exceeded. Please try again in ${hoursUntilReset} hour(s).`;
      throw new BadRequestException(message);
    }

    return true;
  }
}
