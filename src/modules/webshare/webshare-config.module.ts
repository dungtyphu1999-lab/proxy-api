import { Module } from '@nestjs/common';
import { WebshareConfigService } from './webshare-config.service';

@Module({
  providers: [WebshareConfigService],
  exports: [WebshareConfigService],
})
export class WebshareConfigModule {}

