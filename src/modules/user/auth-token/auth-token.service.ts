import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AuthTokenRepository } from './auth-token.repository';
import { AuthToken } from '@/database/entities';
import { AppConfigService } from '@/config/app-config.service';

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly appConfigService: AppConfigService,
  ) {}

  /**
   * Parse expires time from config string (e.g., '30d', '2m', '1h') to milliseconds
   */
  private parseExpiresInMs(expiresIn: string): number {
    const regex = /^(\d+)([dwhmsy]?)$/;
    const match = regex.exec(expiresIn);
    if (!match) {
      return 30 * 24 * 60 * 60 * 1000; // default 30 days in ms
    }

    const value = parseInt(match[1], 10);
    const unit = match[2] || 'd';

    switch (unit) {
      case 's': // seconds
        return value * 1000;
      case 'm': // minutes
        return value * 60 * 1000;
      case 'h': // hours
        return value * 60 * 60 * 1000;
      case 'd': // days
        return value * 24 * 60 * 60 * 1000;
      case 'w': // weeks
        return value * 7 * 24 * 60 * 60 * 1000;
      case 'y': // years
        return value * 365 * 24 * 60 * 60 * 1000;
      default:
        return value * 24 * 60 * 60 * 1000; // default to days
    }
  }

  async createRefreshToken(
    userId: string,
    customExpiresInMs?: number,
  ): Promise<AuthToken> {
    const refreshToken = uuidv4();

    // Get expires time from config or use custom value
    const configExpiresIn = this.appConfigService.jwt.refreshTokenExpiresIn;
    const expiresInMs =
      customExpiresInMs ?? this.parseExpiresInMs(configExpiresIn);

    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + expiresInMs);

    const tokenData: Partial<AuthToken> = {
      id: uuidv4(),
      user_id: userId,
      refresh_token: refreshToken,
      expires_at: expiresAt,
      revoked: false,
      created_at: new Date(),
    };

    return this.authTokenRepository.createToken(tokenData);
  }

  async findByRefreshToken(refreshToken: string): Promise<AuthToken | null> {
    return this.authTokenRepository.findByRefreshToken(refreshToken);
  }

  async revokeToken(tokenId: string): Promise<AuthToken> {
    return this.authTokenRepository.revokeToken(tokenId);
  }

  async revokeAllUserTokens(userId: string): Promise<void> {
    await this.authTokenRepository.revokeAllUserTokens(userId);
  }

  async findActiveTokensByUserId(userId: string): Promise<AuthToken[]> {
    return this.authTokenRepository.findActiveTokensByUserId(userId);
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.authTokenRepository.deleteExpiredTokens();
  }

  async isRefreshTokenValid(refreshToken: string): Promise<boolean> {
    const token = await this.findByRefreshToken(refreshToken);
    return token !== null && !token.revoked && token.expires_at > new Date();
  }
}
