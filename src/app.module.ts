import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { resolve } from 'path';

// Infrastructure
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from './redis/redis.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import redisConfiguration from './config/redis.config';

// Health
import { HealthModule } from './modules/health/health.module';

// Auth (JWT)
import { AuthModule } from './modules/user/auth/auth.module';

// Proxy (user)
import { ProxyModule } from './modules/user/proxy/proxy.module';

// Proxy (public / guest)
import { ProxyMasterModule } from './modules/guest/proxy-master/proxy-master.module';

// Webshare admin
import { WebshareAdminModule } from './modules/admin/webshare/webshare-admin.module';

// Wallet (cần để trừ tiền khi mua proxy)
import { WalletModule } from './modules/user/wallet/wallet.module';

// Telegram (user liên kết Telegram)
import { UserTelegramModule } from './modules/user/telegram/telegram.module';

// Notifications (dùng bởi ProxyService để thông báo admin)
import { AdminNotificationModule } from './modules/admin/notifications/admin-notification.module';
import { NotificationModule } from './modules/user/notification/notification.module';

// Admin users (dùng bởi AdminNotificationModule)
import { AdminUserModule } from './modules/admin/users/admin-users.module';

// User profile management
import { UserProfileModule } from './modules/user/user-profile/user-profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [redisConfiguration],
      isGlobal: true,
      envFilePath: [resolve(process.cwd(), '.env')],
    }),
    AppConfigModule,
    DatabaseModule,
    RedisModule,
    FileUploadModule,

    // Feature modules
    HealthModule,
    AuthModule,
    WalletModule,
    ProxyModule,
    ProxyMasterModule,
    WebshareAdminModule,
    UserTelegramModule,
    NotificationModule,
    AdminNotificationModule,
    AdminUserModule,
    UserProfileModule,

    RouterModule.register([
      {
        path: 'health',
        module: HealthModule,
      },
      {
        path: 'api/v1',
        children: [
          // ─── Admin routes ───────────────────────────────────────────────
          {
            path: 'admin',
            children: [
              {
                path: 'webshare',
                module: WebshareAdminModule,
              },
              {
                path: 'notifications',
                module: AdminNotificationModule,
              },
              {
                path: 'users',
                module: AdminUserModule,
              },
              {
                path: 'wallet',
                module: WalletModule,
              },
            ],
          },

          // ─── User (authenticated) routes ────────────────────────────────
          {
            path: 'user',
            children: [
              {
                path: 'auth',
                module: AuthModule,
              },
              {
                path: 'proxy',
                module: ProxyModule,
              },
              {
                path: 'wallet',
                module: WalletModule,
              },
              {
                path: 'profile',
                module: UserProfileModule,
              },
              {
                path: 'telegram',
                module: UserTelegramModule,
              },
              {
                path: 'notifications',
                module: NotificationModule,
              },
            ],
          },

          // ─── Public (unauthenticated) routes ────────────────────────────
          {
            path: 'public',
            children: [
              {
                path: 'proxy',
                module: ProxyMasterModule,
              },
            ],
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
