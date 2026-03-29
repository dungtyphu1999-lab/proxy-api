import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { AppConfigService } from '../config/app-config.service';
import { AppConfigModule } from '../config/app-config.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => {
        const redisConfig = appConfigService.redis;
        return {
          store: redisStore,
          host: redisConfig.host,
          port: redisConfig.port,
          password: redisConfig.password,
          ttl: 3600,
        };
      },
      inject: [AppConfigService],
    }),
  ],
  exports: [CacheModule],
})
export class RedisModule {}
