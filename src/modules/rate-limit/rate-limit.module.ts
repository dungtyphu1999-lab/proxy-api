import { Module } from '@nestjs/common';
import { RateLimitService } from './rate-limit.service';
import { ResendCodeRateLimitGuard } from './resend-code-rate-limit.guard';
import { DailyRateLimitGuard } from './daily-rate-limit.guard';
import { SignInRateLimitGuard } from './signin-rate-limit.guard';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [
    RateLimitService,
    ResendCodeRateLimitGuard,
    DailyRateLimitGuard,
    SignInRateLimitGuard,
  ],
  exports: [
    RateLimitService,
    ResendCodeRateLimitGuard,
    DailyRateLimitGuard,
    SignInRateLimitGuard,
  ],
})
export class RateLimitModule {}
