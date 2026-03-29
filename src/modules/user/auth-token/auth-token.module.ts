import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenRepository } from './auth-token.repository';

@Module({
  providers: [AuthTokenService, AuthTokenRepository],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
