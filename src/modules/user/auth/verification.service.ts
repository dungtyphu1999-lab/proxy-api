import { Injectable, Logger, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { EmailService } from '@/modules/email/email.service';
import { EmailRecipient } from '@/modules/email/types/email.types';
import { Cache } from 'cache-manager';

@Injectable()
export class VerificationService {
  private readonly logger = new Logger(VerificationService.name);

  constructor(
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getRedisKey(email: string, type: string = 'verification'): string {
    return `${type}:${email}`;
  }

  private getPasswordResetKey(email: string): string {
    return this.getRedisKey(email, 'password-reset');
  }

  async sendVerificationCode(email: string) {
    try {
      const verificationCode = this.generateVerificationCode();
      const redisKey = this.getRedisKey(email);

      // Store code in cache with 3 minutes expiration (180 seconds)
      await this.cacheManager.set(redisKey, verificationCode, 180 * 1000);
      // Send email
      const recipient: EmailRecipient = { email };
      const success = await this.emailService.sendVerificationCodeEmail(
        recipient,
        { verificationCode },
      );

      if (success) {
        this.logger.log(`Verification code sent to ${email}`);
        return true;
      } else {
        // Clean up cache if email failed
        await this.cacheManager.del(redisKey);
        return false;
      }
    } catch (error) {
      this.logger.error('Failed to send verification code:', error);
      return false;
    }
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    try {
      const redisKey = this.getRedisKey(email);
      const storedCode = await this.cacheManager.get<string>(redisKey);

      if (!storedCode) {
        this.logger.warn(`Verification code not found or expired for ${email}`);
        return false;
      }

      if (storedCode === code) {
        // Remove code after successful verification
        await this.cacheManager.del(redisKey);
        this.logger.log(`Email verification successful for ${email}`);
        return true;
      } else {
        this.logger.warn(`Invalid verification code provided for ${email}`);
        return false;
      }
    } catch (error) {
      this.logger.error('Failed to verify code:', error);
      return false;
    }
  }

  async getCodeTTL(email: string): Promise<number> {
    try {
      const redisKey = this.getRedisKey(email);
      const storedCode = await this.cacheManager.get<string>(redisKey);
      return storedCode ? 1 : -1; // Cache manager doesn't expose TTL, return 1 if exists, -1 if not
    } catch (error) {
      this.logger.error('Failed to get code TTL:', error);
      return -1;
    }
  }

  async deleteCode(email: string): Promise<boolean> {
    try {
      const redisKey = this.getRedisKey(email);
      await this.cacheManager.del(redisKey);
      return true;
    } catch (error) {
      this.logger.error('Failed to delete verification code:', error);
      return false;
    }
  }

  async sendPasswordResetCode(email: string): Promise<boolean> {
    try {
      const resetCode = this.generateVerificationCode();
      const redisKey = this.getPasswordResetKey(email);

      // Store code in cache with 3 minutes expiration (180 seconds)
      await this.cacheManager.set(redisKey, resetCode, 180 * 1000);

      // Send email
      const recipient: EmailRecipient = { email };
      const success = await this.emailService.sendPasswordResetCodeEmail(
        recipient,
        { resetCode },
      );

      if (success) {
        this.logger.log(`Password reset code sent to ${email}`);
        return true;
      } else {
        // Clean up cache if email failed
        await this.cacheManager.del(redisKey);
        return false;
      }
    } catch (error) {
      this.logger.error('Failed to send password reset code:', error);
      return false;
    }
  }

  async checkPasswordResetCode(email: string, code: string): Promise<boolean> {
    try {
      const redisKey = this.getPasswordResetKey(email);
      const storedCode = await this.cacheManager.get<string>(redisKey);

      if (!storedCode) {
        this.logger.warn(
          `Password reset code not found or expired for ${email}`,
        );
        return false;
      }

      if (storedCode === code) {
        this.logger.log(`Password reset code check successful for ${email}`);
        return true;
      } else {
        this.logger.warn(`Invalid password reset code provided for ${email}`);
        return false;
      }
    } catch (error) {
      this.logger.error('Failed to check password reset code:', error);
      return false;
    }
  }

  async verifyPasswordResetCode(email: string, code: string): Promise<boolean> {
    try {
      const redisKey = this.getPasswordResetKey(email);
      const storedCode = await this.cacheManager.get<string>(redisKey);

      if (!storedCode) {
        this.logger.warn(
          `Password reset code not found or expired for ${email}`,
        );
        return false;
      }

      if (storedCode === code) {
        // Remove code after successful verification
        await this.cacheManager.del(redisKey);
        this.logger.log(
          `Password reset code verification successful for ${email}`,
        );
        return true;
      } else {
        this.logger.warn(`Invalid password reset code provided for ${email}`);
        return false;
      }
    } catch (error) {
      this.logger.error('Failed to verify password reset code:', error);
      return false;
    }
  }

  async sendPassword(
    fullName: string,
    email: string,
    newPassword: string,
  ): Promise<boolean> {
    try {
      const recipient: EmailRecipient = { email };
      const success = await this.emailService.sendPasswordResetEndUser(
        recipient,
        { fullName, newPassword },
      );

      if (success) {
        this.logger.log(`Password reset email sent to ${email}`);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.logger.error('Failed to send password reset email:', error);
      return false;
    }
  }
}
