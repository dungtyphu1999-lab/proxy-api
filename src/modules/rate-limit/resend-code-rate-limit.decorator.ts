import { SetMetadata } from '@nestjs/common';

export const RESEND_CODE_RATE_LIMIT_KEY = 'resend_code_rate_limit';

export interface ResendCodeRateLimitOptions {
  windowMs: number;
  maxAttempts?: number;
  message?: string;
}

export const ResendCodeRateLimit = (options: ResendCodeRateLimitOptions) =>
  SetMetadata(RESEND_CODE_RATE_LIMIT_KEY, options);
