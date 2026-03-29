import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import appConfig from './app.config';
import redisConfig from './redis.config';
import dbConfig from './db.config';
import jwtConfig from './jwt.config';
import emailConfig from './email.config';
import blogViewConfig from './blog-view.config';
import ekycConfig from './ekyc.config';
import pay2sConfig from './pay2s.config';
import loggerConfig from './logger.config';
import oauthConfig from './oauth.config';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        appConfig,
        redisConfig,
        dbConfig,
        jwtConfig,
        emailConfig,
        blogViewConfig,
        ekycConfig,
        pay2sConfig,
        loggerConfig,
        oauthConfig,
      ],
      envFilePath: [resolve(process.cwd(), '.env')],
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
