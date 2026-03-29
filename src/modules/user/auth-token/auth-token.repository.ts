import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { AuthToken } from '@/database/entities';

@Injectable()
export class AuthTokenRepository extends BaseRepository<AuthToken> {
  constructor() {
    super('auth_tokens');
  }

  async findByRefreshToken(refreshToken: string) {
    const token = await this.qb
      .where('refresh_token', refreshToken)
      .where('revoked', false)
      .where('expires_at', '>', new Date())
      .first();
    return token || null;
  }

  async findActiveTokensByUserId(userId: string) {
    const tokens = await this.qb
      .where('user_id', userId)
      .where('revoked', false)
      .where('expires_at', '>', new Date());
    return tokens;
  }

  async createToken(data: Partial<AuthToken>) {
    const [token] = await this.qb.insert(data).returning('*');
    return token;
  }

  async revokeToken(id: string) {
    const [token] = await this.qb
      .where('id', id)
      .update({ revoked: true })
      .returning('*');
    return token;
  }

  async revokeAllUserTokens(userId: string) {
    await this.qb.where('user_id', userId).update({ revoked: true });
  }

  async deleteExpiredTokens() {
    await this.qb.where('expires_at', '<', new Date()).del();
  }
}
