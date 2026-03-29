import { Module } from '@nestjs/common';
import { ProxyMasterModule } from '@/modules/guest/proxy-master/proxy-master.module';
import { ProxyModule } from '@/modules/user/proxy/proxy.module';
import { WebshareConfigModule } from '@/modules/webshare/webshare-config.module';
import { WebshareAdminController } from './webshare-admin.controller';
import { WebshareAdminService } from './webshare-admin.service';

@Module({
  imports: [WebshareConfigModule, ProxyMasterModule, ProxyModule],
  controllers: [WebshareAdminController],
  providers: [WebshareAdminService],
  exports: [WebshareAdminService],
})
export class WebshareAdminModule {}
