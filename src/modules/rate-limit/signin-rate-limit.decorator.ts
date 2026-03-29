import { SetMetadata } from '@nestjs/common';

export const SIGNIN_RATE_LIMIT_KEY = 'signin_rate_limit';

export interface SignInRateLimitOptions {
  windowMs: number;
  maxAttempts: number;
  message?: string;
}

export const SignInRateLimit = (options: SignInRateLimitOptions) =>
  SetMetadata(SIGNIN_RATE_LIMIT_KEY, options);

