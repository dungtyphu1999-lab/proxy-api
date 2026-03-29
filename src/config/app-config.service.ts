import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigValidation, ConfigValidationSchema } from './configuration';

@Injectable()
export class AppConfigService {
  private readonly validatedConfig: ConfigValidation;

  constructor(private readonly configService: ConfigService) {
    const rawConfig: Record<string, unknown> = {
      app: this.configService.get('app'),
      redis: this.configService.get('redis'),
      database: this.configService.get('database'),
      jwt: this.configService.get('jwt'),
      email: this.configService.get('email'),
      blogView: this.configService.get('blogView') || { uniqueMinutes: 5 },
      ekyc: this.configService.get('ekyc'),
      pay2s: this.configService.get('pay2s'),
      logger: this.configService.get('logger') || { verbose: false },
      oauth: this.configService.get('oauth'),
    };
    this.validatedConfig = ConfigValidationSchema.parse(rawConfig);
  }

  get app() {
    return this.validatedConfig.app;
  }

  get redis() {
    return this.validatedConfig.redis;
  }

  get database() {
    return this.validatedConfig.database;
  }

  get jwt() {
    return this.validatedConfig.jwt;
  }

  get email() {
    return this.validatedConfig.email;
  }

  get blogView() {
    return this.validatedConfig.blogView;
  }

  get ekyc() {
    return this.validatedConfig.ekyc;
  }

  get pay2s() {
    return this.validatedConfig.pay2s;
  }

  get logger() {
    return this.validatedConfig.logger;
  }

  get oauth() {
    return this.validatedConfig.oauth;
  }
}
