import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SocialAuthService } from './social-auth.service';
import { VerificationService } from './verification.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
import { AppConfigModule } from '@/config/app-config.module';
import { AppConfigService } from '@/config/app-config.service';
import { EmailModule } from '@/modules/email/email.module';
import { RedisModule } from '@/redis/redis.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { UserModule } from '../user/user.module';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import { RolesModule } from '../roles/roles.module';
import { RateLimitModule } from '@/modules/rate-limit/rate-limit.module';
import { ShopsModule } from '../shops/shops.module';
import { WalletModule } from '../wallet/wallet.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    PassportModule,
    EmailModule,
    RedisModule,
    UserModule,
    UserProfileModule,
    AuthTokenModule,
    RolesModule,
    RateLimitModule,
    ShopsModule,
    WalletModule,
    ChatModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwt.secret,
        signOptions: {
          expiresIn: (appConfigService.jwt.expiresIn || '1d') as any,
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SocialAuthService,
    VerificationService,
    LocalStrategy,
    JwtStrategy,
    AdminJwtStrategy,
  ],
  exports: [AuthService, SocialAuthService],
})
export class AuthModule {}
