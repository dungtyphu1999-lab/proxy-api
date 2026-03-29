import { Module } from '@nestjs/common';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { AdminJwtStrategy } from '@/modules/user/auth/strategies/admin-jwt.strategy';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { UserModule } from '@/modules/user/user/user.module';
import { AuthModule } from '@/modules/user/auth/auth.module';
import { AuthTokenModule } from '@/modules/user/auth-token/auth-token.module';
import { RolesModule } from '@/modules/user/roles/roles.module';
import { VerificationService } from '@/modules/user/auth/verification.service';
import { EmailModule } from '@/modules/email/email.module';
import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [
    RedisModule,
    EmailModule,
    UserModule,
    AuthModule,
    AuthTokenModule,
    RolesModule,
  ],
  controllers: [AdminAuthController],
  providers: [
    AdminJwtAuthGuard,
    AdminJwtStrategy,
    AdminAuthService,
    VerificationService,
  ],
  exports: [AdminJwtAuthGuard, AdminAuthService],
})
export class AdminAuthModule {}
