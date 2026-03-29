import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RateLimitService } from './rate-limit.service';
import {
  SIGNIN_RATE_LIMIT_KEY,
  SignInRateLimitOptions,
} from './signin-rate-limit.decorator';

@Injectable()
export class SignInRateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly rateLimitService: RateLimitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<SignInRateLimitOptions>(
      SIGNIN_RATE_LIMIT_KEY,
      context.getHandler(),
    );

    if (!options) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const ip = String(request.ip || '').trim();
    const emailRaw = request.body?.['email'];
    const email =
      typeof emailRaw === 'string' ? emailRaw.trim().toLowerCase() : '';

    // Prefer fine-grained key with both IP + email to reduce false positives.
    const key = email ? `signin:${ip}:${email}` : `signin:${ip}`;

    const { allowed, timeUntilReset } =
      await this.rateLimitService.checkRateLimit(
        key,
        options.windowMs,
        options.maxAttempts,
      );

    if (!allowed) {
      const minutesUntilReset = Math.ceil((timeUntilReset || 0) / 60000);
      throw new BadRequestException(
        options.message ||
          `Too many sign-in attempts. Please try again in ${minutesUntilReset} minute(s).`,
      );
    }

    return true;
  }
}

