import { Module } from '@nestjs/common';
import { ProxyMasterController } from './proxy-master.controller';
import { ProxyMasterService } from './proxy-master.service';
import { ProxyMasterRepository } from './proxy-master.repository';
import { WebshareConfigModule } from '@/modules/webshare/webshare-config.module';

@Module({
  imports: [WebshareConfigModule],
  controllers: [ProxyMasterController],
  providers: [ProxyMasterService, ProxyMasterRepository],
  exports: [ProxyMasterService, ProxyMasterRepository],
})
export class ProxyMasterModule {}
