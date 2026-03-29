import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RateLimitService } from './rate-limit.service';
import {
  ResendCodeRateLimitOptions,
  RESEND_CODE_RATE_LIMIT_KEY,
} from './resend-code-rate-limit.decorator';

@Injectable()
export class ResendCodeRateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rateLimitService: RateLimitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<ResendCodeRateLimitOptions>(
      RESEND_CODE_RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const email = request.body?.['email'] as unknown;

    if (!email || typeof email !== 'string') {
      throw new BadRequestException('Email is required');
    }

    const { allowed, timeUntilReset } =
      await this.rateLimitService.checkRateLimit(
        `email:${email}`,
        options.windowMs,
        options.maxAttempts || 1,
      );

    if (!allowed) {
      const minutesUntilReset = Math.ceil((timeUntilReset || 0) / (1000 * 60));
      const message =
        options.message ||
        `Too many requests. Please try again in ${minutesUntilReset} minute(s).`;
      throw new BadRequestException(message);
    }

    return true;
  }
}
