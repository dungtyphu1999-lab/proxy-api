import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { ProxyRepository } from './proxy.repository';
import { WalletModule } from '../wallet/wallet.module';
import { DatabaseModule } from '@/database/database.module';
import { ProxyMasterModule } from '@/modules/guest/proxy-master/proxy-master.module';
import { WebshareConfigModule } from '@/modules/webshare/webshare-config.module';
import { AdminNotificationModule } from '@/modules/admin/notifications/admin-notification.module';
import { ProxyPendingOrdersScheduler } from './proxy-pending-orders.scheduler';
import { ProxyAutoRenewEnforcerScheduler } from './proxy-auto-renew-enforcer.scheduler';

@Module({
  imports: [
    WalletModule,
    DatabaseModule,
    ProxyMasterModule,
    WebshareConfigModule,
    AdminNotificationModule,
  ],
  controllers: [ProxyController],
  providers: [
    ProxyService,
    ProxyRepository,
    ProxyPendingOrdersScheduler,
    ProxyAutoRenewEnforcerScheduler,
  ],
  exports: [ProxyService, ProxyRepository],
})
export class ProxyModule {}
