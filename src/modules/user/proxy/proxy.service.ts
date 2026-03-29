import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { createHash } from 'crypto';
import axios, { type AxiosRequestConfig } from 'axios';
import { createPaginationMeta } from '@/shared/pagination/pagination.helpers';
import { ProxyRepository } from './proxy.repository';
import type { ProxyRow, ProxyOrderRow } from './proxy.repository';
import { GetProxiesQueryDto } from './dto/get-proxies-query.dto';
import { GetProxyOrdersQueryDto } from './dto/get-proxy-orders-query.dto';
import { CreateProxyOrderDto } from './dto/create-proxy-order.dto';
import { WalletRepository } from '../wallet/wallet.repository';
import { DatabaseService } from '@/database/database.service';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { generateTransactionNumber } from '@/shared/utils/wallet-transaction.util';
import { ProxyMasterService } from '@/modules/guest/proxy-master/proxy-master.service';
import { CalculateProxyPriceDto } from '@/modules/guest/proxy-master/dto/calculate-proxy-price.dto';
import { CheckLiveProxiesDto } from './dto/check-live-proxies.dto';
import type { WebsharePoolKey } from '@/modules/webshare/webshare-config.types';
import { WebshareConfigService } from '@/modules/webshare/webshare-config.service';
import { AdminNotificationService } from '@/modules/admin/notifications/admin-notification.service';

class RetryableProxyActivationError extends Error {
  constructor(
    message: string,
    readonly details: {
      planId?: number | null;
      webshareMeta?: Record<string, unknown> | null;
      code?: string;
    } = {},
  ) {
    super(message);
    this.name = 'RetryableProxyActivationError';
  }
}

type WebshareOrderConfig = {
  product: { code: string };
  query: Record<string, unknown>;
  proxyCount: number;
  bandwidth: number;
  mode: 'direct' | 'backbone';
  poolKey?: WebsharePoolKey | null;
};

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private socksProxyAgentCtor:
    | ((new (proxyUrl: string) => unknown) & { prototype: unknown })
    | null
    | undefined;

  constructor(
    private readonly repo: ProxyRepository,
    private readonly walletRepository: WalletRepository,
    private readonly databaseService: DatabaseService,
    private readonly proxyMasterService: ProxyMasterService,
    private readonly webshareConfigService: WebshareConfigService,
    private readonly adminNotificationService: AdminNotificationService,
  ) {}

  private readonly retryDelayMs = (() => {
    const value = Number(process.env.PROXY_PENDING_RETRY_DELAY_MS);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 60 * 1000;
  })();
  private readonly retryMaxAttempts = (() => {
    const value = Number(process.env.PROXY_PENDING_RETRY_MAX_ATTEMPTS);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 3;
  })();
  private readonly retryBatchSize = (() => {
    const value = Number(process.env.PROXY_PENDING_RETRY_BATCH_SIZE);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 10;
  })();
  private readonly liveCheckTimeoutMs = 8000;
  private readonly liveCheckConcurrency = 5;
  private readonly liveCheckDefaultLimit = 20;
  private readonly liveCheckMaxLimit = 50;
  private readonly liveCheckIpProbeUrl =
    process.env.PROXY_LIVE_CHECK_IP_PROBE_URL?.trim() ||
    'http://api.ipify.org?format=json';
  private readonly liveCheckGeoLookupUrlTemplate =
    process.env.PROXY_LIVE_CHECK_GEO_LOOKUP_URL_TEMPLATE?.trim() ||
    'https://ipwho.is/{ip}?fields=success,country_code';
  private readonly liveCheckUrl =
    process.env.PROXY_LIVE_CHECK_URL?.trim() ||
    'https://ipv4.bachhoammo.net/';
  private readonly rotatingFetchPageSize = (() => {
    const value = Number(process.env.PROXY_ROTATING_FETCH_PAGE_SIZE);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 50;
  })();
  private readonly rotatingFetchMaxPages = (() => {
    const value = Number(process.env.PROXY_ROTATING_FETCH_MAX_PAGES);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 1;
  })();
  private readonly rotatingFetchMaxResults = (() => {
    const value = Number(process.env.PROXY_ROTATING_FETCH_MAX_RESULTS);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 50;
  })();
  private readonly rotatingBackboneHost =
    process.env.PROXY_ROTATING_BACKBONE_HOST?.trim() ||
    process.env.PROXY_ROTATING_ENDPOINT_HOST?.trim() ||
    'p.webshare.io';
  private readonly autoDowngradeWindowHours = (() => {
    const value = Number(process.env.PROXY_AUTO_DOWNGRADE_WINDOW_HOURS);
    return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 48;
  })();
  private readonly supportedProxyTypes = [
    'proxy_server',
    'static_residential',
    'rotating_residential',
  ] as const;

  private isSupportedProxyType(
    value?: string,
  ): value is (typeof this.supportedProxyTypes)[number] {
    return Boolean(
      value &&
        this.supportedProxyTypes.includes(
          value as (typeof this.supportedProxyTypes)[number],
        ),
    );
  }

  private toNumber(value: unknown): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private ceil(value: number): number {
    return Math.ceil(this.toNumber(value));
  }

  private normalizeProxyCountriesForFingerprint(
    input: Record<string, number> | undefined,
  ): Record<string, number> | null {
    if (!input) return null;
    const entries = Object.entries(input)
      .map(([rawCode, rawQty]) => {
        const code = String(rawCode ?? '')
          .trim()
          .toUpperCase();
        const qty = Math.trunc(Number(rawQty));
        if (!/^[A-Z]{2}$/.test(code)) return null;
        if (!Number.isFinite(qty) || qty <= 0) return null;
        return [code, qty] as const;
      })
      .filter((item): item is readonly [string, number] => item != null)
      .sort(([a], [b]) => a.localeCompare(b));
    if (!entries.length) return null;
    return Object.fromEntries(entries);
  }

  private buildCreateOrderRequestFingerprint(params: {
    userId: string;
    amount: number;
    dto: CalculateProxyPriceDto;
  }): string {
    const payload = {
      user_id: params.userId,
      amount_total: Math.trunc(Number(params.amount)),
      product_id: Number(params.dto.product_id ?? 0),
      exclusivity_option_id:
        params.dto.exclusivity_option_id != null
          ? Number(params.dto.exclusivity_option_id)
          : null,
      exclusivity_value:
        params.dto.exclusivity_value != null
          ? String(params.dto.exclusivity_value)
              .trim()
              .toLowerCase()
          : null,
      quantity_option_id:
        params.dto.quantity_option_id != null
          ? Number(params.dto.quantity_option_id)
          : null,
      quantity_value:
        params.dto.quantity_value != null ? Number(params.dto.quantity_value) : null,
      proxy_countries: this.normalizeProxyCountriesForFingerprint(
        params.dto.proxy_countries,
      ),
      bandwidth_option_id:
        params.dto.bandwidth_option_id != null
          ? Number(params.dto.bandwidth_option_id)
          : null,
      bandwidth_value:
        params.dto.bandwidth_value != null
          ? Number(params.dto.bandwidth_value)
          : null,
      location_id:
        params.dto.location_id != null ? Number(params.dto.location_id) : null,
      additional_feature_id:
        params.dto.additional_feature_id != null
          ? Number(params.dto.additional_feature_id)
          : null,
      billing_cycle: String(params.dto.billing_cycle ?? 'monthly'),
      discount_percent:
        params.dto.discount_percent != null
          ? Number(params.dto.discount_percent)
          : null,
    };
    return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  }

  private async getPoolBufferFactor(params: {
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
  }): Promise<number> {
    void params;
    return 1;
  }

  private async getUserSummary(userId: string): Promise<{
    email: string | null;
    username: string | null;
  }> {
    const row = await this.databaseService
      .getKnex()('users')
      .select('email', 'username')
      .where('id', userId)
      .first();

    return {
      email: row?.email == null ? null : String(row.email),
      username: row?.username == null ? null : String(row.username),
    };
  }

  private getProxyProductLabel(value?: string | null): string {
    const normalized = String(value ?? '')
      .trim()
      .toLowerCase();

    if (normalized === 'proxy_server') {
      return 'Proxy máy chủ';
    }
    if (normalized === 'static_residential') {
      return 'Proxy dân cư tĩnh';
    }
    if (normalized === 'rotating_residential') {
      return 'Proxy dân cư xoay';
    }

    return value?.trim() || 'Proxy';
  }

  private getProxyOptionLabel(params: {
    poolKey?: string | null;
    exclusivityValue?: string | null;
    proxyType?: string | null;
    proxySubtype?: string | null;
  }): string | null {
    const poolKey = String(params.poolKey ?? '')
      .trim()
      .toLowerCase();
    switch (poolKey) {
      case 'proxy_server_shared':
        return 'Shared';
      case 'proxy_server_private':
        return 'Private';
      case 'proxy_server_dedicated':
        return 'Dedicated';
      case 'static_residential_shared':
        return 'Shared ISP';
      case 'static_residential_private':
        return 'Private ISP';
      case 'static_residential_dedicated':
        return 'Dedicated ISP';
      case 'rotating_residential':
        return 'Residential';
      default:
        break;
    }

    const exclusivity = String(params.exclusivityValue ?? '')
      .trim()
      .toLowerCase();
    if (exclusivity === 'shared') return 'Shared';
    if (exclusivity === 'private' || exclusivity === 'semidedicated') {
      return 'Private';
    }
    if (exclusivity === 'dedicated') return 'Dedicated';

    const proxyType = String(params.proxyType ?? '')
      .trim()
      .toLowerCase();
    const proxySubtype = String(params.proxySubtype ?? '')
      .trim()
      .toLowerCase();
    if (proxyType === 'shared' && proxySubtype === 'isp') return 'Shared ISP';
    if (proxyType === 'semidedicated' && proxySubtype === 'isp') {
      return 'Private ISP';
    }
    if (proxyType === 'dedicated' && proxySubtype === 'isp') {
      return 'Dedicated ISP';
    }
    if (proxyType === 'shared' && proxySubtype === 'residential') {
      return 'Residential';
    }
    if (proxyType === 'shared') return 'Shared';
    if (proxyType === 'semidedicated') return 'Private';
    if (proxyType === 'dedicated') return 'Dedicated';

    return null;
  }

  private isWaitingForWebshareAccount(message: string): boolean {
    const normalized = String(message ?? '').trim().toLowerCase();
    return (
      normalized.includes('thiếu webshare api key') ||
      normalized.includes('không có tài khoản webshare') ||
      normalized.includes('không còn tài khoản webshare') ||
      normalized.includes('chờ gán email webshare')
    );
  }

  private async tryReserveCredentialForUserPurchase(params: {
    userId: string;
    context: {
      poolKey?: WebsharePoolKey | null;
      query?: Record<string, unknown> | null;
      requestedQuantity?: number | null;
      requestedBandwidthGb?: number | null;
      requiresUnlimitedBandwidth?: boolean | null;
    };
  }) {
    try {
      return await this.proxyMasterService.reserveWebshareCredentialForUserPurchase(
        params,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        this.logger.warn(
          `Reserve Webshare credential skipped for user ${params.userId}: ${
            error.message
          }`,
        );
        return null;
      }
      throw error;
    }
  }

  private async ensurePendingOrderCredential(
    order: ProxyOrderRow,
    priceInput: CalculateProxyPriceDto,
  ): Promise<ProxyOrderRow | null> {
    if (String(order.webshare_account_id ?? '').trim()) {
      return order;
    }

    const orderConfigPreview =
      await this.proxyMasterService.buildWebshareOrderConfig(priceInput);
    const requestedPoolKey = this.proxyMasterService.derivePoolKeyFromQuery(
      orderConfigPreview.query,
    );
    const resolvedCredential = await this.tryReserveCredentialForUserPurchase({
      userId: order.user_id,
      context: {
        poolKey: requestedPoolKey ?? undefined,
        query: orderConfigPreview.query,
        requestedQuantity:
          Number.isFinite(orderConfigPreview.proxyCount) &&
          orderConfigPreview.proxyCount > 0
            ? orderConfigPreview.proxyCount
            : null,
        requestedBandwidthGb:
          Number.isFinite(orderConfigPreview.bandwidth) &&
          orderConfigPreview.bandwidth >= 0
            ? orderConfigPreview.bandwidth
            : null,
        requiresUnlimitedBandwidth:
          Number(orderConfigPreview.bandwidth ?? 0) === 0,
      },
    });

    if (!resolvedCredential?.accountId) {
      return null;
    }

    const nextMeta = {
      ...(order.webshare_meta ?? {}),
      webshare_account_id: resolvedCredential.accountId,
      webshare_pool_key: resolvedCredential.poolKey ?? requestedPoolKey ?? null,
      webshare_account_source: resolvedCredential.source,
    };

    return this.repo.updateProxyOrder(order.id, {
      webshare_account_id: resolvedCredential.accountId,
      webshare_pool_key: resolvedCredential.poolKey ?? requestedPoolKey ?? null,
      webshare_meta: nextMeta,
      webshare_error: null,
    });
  }

  private async notifyProxyOrderPurchased(params: {
    order: ProxyOrderRow;
    productCode: string;
    optionName?: string | null;
    billingCycle: string;
    amountTotal: number;
    requestedQuantity?: number | null;
    requestedBandwidthGb?: number | null;
    requestedProxyCountries?: Record<string, number> | null;
    mappedWebshareEmail?: string | null;
    provisioningAction?: 'new_purchase' | 'update';
  }): Promise<void> {
    const user = await this.getUserSummary(params.order.user_id);
    await this.adminNotificationService.sendProxyOrderPurchasedAlert({
      orderId: params.order.id,
      userId: params.order.user_id,
      userName: user.username,
      userEmail: user.email,
      mappedWebshareEmail: params.mappedWebshareEmail ?? null,
      productName: this.getProxyProductLabel(params.productCode),
      optionName: params.optionName ?? null,
      billingCycle: params.billingCycle,
      amountTotalVnd: params.amountTotal,
      quantity: params.requestedQuantity ?? null,
      bandwidthGb: params.requestedBandwidthGb ?? null,
      proxyCountries: params.requestedProxyCountries ?? null,
      provisioningAction: params.provisioningAction ?? 'new_purchase',
    });
  }

  private async notifyProxyOrderActivated(
    order: ProxyOrderRow,
    productCode: string,
  ): Promise<void> {
    const claimed = await this.claimActivationNotification(order.id);
    if (!claimed) {
      return;
    }

    const user = await this.getUserSummary(order.user_id);
    const config = await this.webshareConfigService.getConfig();
    const mappedWebshareEmail =
      config.accounts.find(
        (account) => account.id === String(order.webshare_account_id ?? '').trim(),
      )?.email ?? null;

    await this.adminNotificationService.sendProxyOrderActivatedAlert({
      orderId: order.id,
      userId: order.user_id,
      userName: user.username,
      userEmail: user.email,
      mappedWebshareEmail,
      productName: this.getProxyProductLabel(productCode),
      expiresAt: order.expires_at ?? null,
    });
  }

  private getSupersededOrderId(order: ProxyOrderRow): string | null {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const candidates = [
      meta.replaced_order_id,
      meta.superseded_order_id,
      meta.upgrade_from_order_id,
    ];
    for (const value of candidates) {
      const id = String(value ?? '').trim();
      if (id) return id;
    }
    return null;
  }

  private async finalizeSupersededOrderAfterActivation(
    activeOrder: ProxyOrderRow,
    productCode: string,
  ): Promise<void> {
    const supersededOrderId = this.getSupersededOrderId(activeOrder);
    if (!supersededOrderId || supersededOrderId === activeOrder.id) {
      return;
    }

    const superseded = await this.repo.findProxyOrderByIdAndUserId(
      supersededOrderId,
      activeOrder.user_id,
    );
    if (!superseded) return;

    await this.databaseService.transaction(async (trx) => {
      await this.repo.deleteProxiesByOrderId(superseded.id, trx);
      await this.repo.updateProxyOrder(
        superseded.id,
        {
          status: 'expired',
          webshare_status: 'replaced',
          webshare_error: null,
        },
        trx,
      );
      await this.repo.updateProxyOrder(
        activeOrder.id,
        {
          webshare_meta: {
            ...((activeOrder.webshare_meta ?? {}) as Record<string, unknown>),
            replaced_order_closed_at: new Date().toISOString(),
            replaced_order_closed_id: superseded.id,
          },
        },
        trx,
      );
    });

    this.logger.log(
      `Closed superseded ${productCode} order ${superseded.id} after activating ${activeOrder.id}`,
    );
  }

  private async markOrderAutoRenewStatus(
    orderId: string,
    currentMeta: Record<string, unknown> | null | undefined,
    nextFields: Record<string, unknown>,
  ): Promise<void> {
    const nextMeta: Record<string, unknown> = {
      ...(currentMeta ?? {}),
      ...nextFields,
    };
    await this.repo.updateProxyOrder(orderId, {
      webshare_meta: nextMeta,
    });
  }

  private async disableWebshareAutoRenewForOrder(params: {
    order: ProxyOrderRow;
    productCode: string;
  }): Promise<void> {
    const webshareContext = this.getWebshareContext({
      order: params.order,
      productCode: params.productCode,
    });
    if (!webshareContext.accountId) {
      return;
    }

    const actionAt = new Date().toISOString();
    try {
      await this.proxyMasterService.disableWebshareSubscriptionRenewal({
        accountId: webshareContext.accountId,
        poolKey: webshareContext.poolKey,
        query: webshareContext.query,
      });
      await this.markOrderAutoRenewStatus(
        params.order.id,
        (params.order.webshare_meta ?? null) as Record<string, unknown> | null,
        {
          auto_renew_enabled: false,
          auto_renew_disabled_at: actionAt,
          auto_renew_disable_error: null,
        },
      );
    } catch (error) {
      const detail =
        this.proxyMasterService.getWebshareErrorMessage(error) ??
        (error instanceof Error ? error.message : 'Không thể tắt auto-renew');
      this.logger.warn(
        `Disable Webshare auto-renew failed for order ${params.order.id} / account ${
          webshareContext.accountId
        }: ${detail}`,
      );
      await this.markOrderAutoRenewStatus(
        params.order.id,
        (params.order.webshare_meta ?? null) as Record<string, unknown> | null,
        {
          auto_renew_disable_error: detail,
          auto_renew_disable_failed_at: actionAt,
        },
      );
    }
  }

  async enforceWebshareAutoRenewOffForAllAccounts(): Promise<{
    total: number;
    disabled: number;
    failed: number;
  }> {
    const config = await this.webshareConfigService.getConfig();
    const accounts = config.accounts.filter(
      (item) =>
        item.enabled !== false &&
        String(item.id ?? '').trim() &&
        String(item.api_key ?? '').trim(),
    );

    let disabled = 0;
    let failed = 0;
    for (const account of accounts) {
      try {
        await this.proxyMasterService.disableWebshareSubscriptionRenewal({
          accountId: account.id,
        });
        disabled += 1;
      } catch (error) {
        failed += 1;
        const detail =
          this.proxyMasterService.getWebshareErrorMessage(error) ??
          (error instanceof Error ? error.message : 'Không thể tắt auto-renew');
        this.logger.warn(
          `Daily auto-renew enforcement failed for account ${account.id} (${account.email}): ${detail}`,
        );
      }
    }

    return {
      total: accounts.length,
      disabled,
      failed,
    };
  }

  private async claimActivationNotification(orderId: string): Promise<boolean> {
    const markerAt = new Date().toISOString();
    const result = await this.databaseService
      .getKnex()('proxy_orders')
      .where('id', orderId)
      .whereRaw("(webshare_meta->>'activated_notice_sent_at') IS NULL")
      .update({
        webshare_meta: this.databaseService
          .getKnex()
          .raw(
            `jsonb_set(COALESCE(webshare_meta, '{}'::jsonb), '{activated_notice_sent_at}', to_jsonb(?::text), true)`,
            [markerAt],
          ),
        updated_at: this.databaseService.getKnex().fn.now(),
      });

    return Number(result) > 0;
  }

  private applyBufferedDemand(
    demand: {
      totalQuantity: number;
      totalBandwidthGb: number;
      requiresUnlimitedBandwidth: boolean;
      activeSubusers: number;
      proxyCountries: Record<string, number>;
    },
    bufferFactor: number,
    mode: 'direct' | 'backbone',
  ) {
    void bufferFactor;
    void mode;
    return {
      ...demand,
    };
  }

  private normalizeProxyCountriesInput(
    value: unknown,
  ): Record<string, number> | undefined {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return undefined;
    }
    const normalized: Record<string, number> = {};
    for (const [rawCode, rawQty] of Object.entries(
      value as Record<string, unknown>,
    )) {
      const code = String(rawCode ?? '')
        .trim()
        .toUpperCase();
      if (!/^[A-Z]{2}$/.test(code)) continue;
      const qty = Math.trunc(Number(rawQty));
      if (!Number.isFinite(qty) || qty < 1) continue;
      normalized[code] = qty;
    }
    return Object.keys(normalized).length > 0 ? normalized : undefined;
  }

  private buildPriceInputFromOrder(order: ProxyOrderRow): CalculateProxyPriceDto {
    const meta = (order.webshare_meta ?? null) as Record<string, unknown> | null;
    const requestedProxyCountries = this.normalizeProxyCountriesInput(
      meta?.requested_proxy_countries,
    );
    const requestedQuantityValue = Number(meta?.requested_quantity_value);
    const requestedBandwidthValue = Number(meta?.requested_bandwidth_value);
    const requestedExclusivityValueRaw = meta?.requested_exclusivity_value;
    const requestedExclusivityValue =
      typeof requestedExclusivityValueRaw === 'string'
        ? requestedExclusivityValueRaw.trim()
        : '';
    return {
      product_id: order.product_id,
      exclusivity_option_id: order.exclusivity_option_id ?? undefined,
      quantity_option_id: order.quantity_option_id ?? undefined,
      quantity_value:
        Number.isFinite(requestedQuantityValue) && requestedQuantityValue > 0
          ? requestedQuantityValue
          : undefined,
      proxy_countries: requestedProxyCountries,
      bandwidth_option_id: order.bandwidth_option_id ?? undefined,
      bandwidth_value:
        Number.isFinite(requestedBandwidthValue) && requestedBandwidthValue >= 0
          ? requestedBandwidthValue
          : undefined,
      exclusivity_value: requestedExclusivityValue || undefined,
      location_id: order.location_id ?? undefined,
      additional_feature_id: order.additional_feature_id ?? undefined,
      billing_cycle: order.billing_cycle as 'monthly' | 'yearly',
      discount_percent: this.toNumber(order.discount_percent ?? 0),
    };
  }

  private getOrderPlanId(order: ProxyOrderRow): number | null {
    const planIdRaw =
      order.webshare_plan_id ??
      ((order.webshare_meta as Record<string, unknown> | null)?.plan_id ??
        null);
    const planId = Number(planIdRaw);
    return Number.isFinite(planId) && planId > 0 ? planId : null;
  }

  private bytesToGb(bytes: number): number {
    if (!Number.isFinite(bytes) || bytes <= 0) return 0;
    return Number((bytes / (1024 * 1024 * 1024)).toFixed(4));
  }

  private derivePoolKeyFromProductCode(params: {
    productCode?: string | null;
    exclusivityValue?: string | null;
    query?: Record<string, unknown> | null;
  }): WebsharePoolKey | null {
    const fromQuery = this.proxyMasterService.derivePoolKeyFromQuery(
      params.query ?? undefined,
    );
    if (fromQuery) return fromQuery;

    const productCode = String(params.productCode ?? '')
      .trim()
      .toLowerCase();
    const exclusivity = String(params.exclusivityValue ?? '')
      .trim()
      .toLowerCase();

    if (productCode === 'rotating_residential') {
      return 'rotating_residential';
    }
    if (productCode === 'proxy_server') {
      if (exclusivity === 'dedicated') return 'proxy_server_dedicated';
      if (exclusivity === 'private' || exclusivity === 'semidedicated') {
        return 'proxy_server_private';
      }
      return 'proxy_server_shared';
    }
    if (productCode === 'static_residential') {
      if (exclusivity === 'dedicated') return 'static_residential_dedicated';
      if (exclusivity === 'private' || exclusivity === 'semidedicated') {
        return 'static_residential_private';
      }
      return 'static_residential_shared';
    }
    return null;
  }

  private getPoolProfile(poolKey: WebsharePoolKey): {
    productCode: string;
    query: Record<string, unknown>;
  } {
    switch (poolKey) {
      case 'proxy_server_shared':
        return {
          productCode: 'proxy_server',
          query: { proxy_type: 'shared', proxy_subtype: 'default' },
        };
      case 'proxy_server_private':
        return {
          productCode: 'proxy_server',
          query: { proxy_type: 'semidedicated', proxy_subtype: 'premium' },
        };
      case 'proxy_server_dedicated':
        return {
          productCode: 'proxy_server',
          query: { proxy_type: 'dedicated', proxy_subtype: 'premium' },
        };
      case 'static_residential_shared':
        return {
          productCode: 'static_residential',
          query: { proxy_type: 'shared', proxy_subtype: 'isp' },
        };
      case 'static_residential_private':
        return {
          productCode: 'static_residential',
          query: { proxy_type: 'semidedicated', proxy_subtype: 'isp' },
        };
      case 'static_residential_dedicated':
        return {
          productCode: 'static_residential',
          query: { proxy_type: 'dedicated', proxy_subtype: 'isp' },
        };
      case 'rotating_residential':
        return {
          productCode: 'rotating_residential',
          query: { proxy_type: 'shared', proxy_subtype: 'residential' },
        };
    }
  }

  private buildDummyOrderForDemand(): ProxyOrderRow {
    const now = new Date();
    return {
      id: '__auto_downgrade__',
      user_id: '',
      product_id: 0,
      exclusivity_option_id: null,
      quantity_option_id: null,
      bandwidth_option_id: null,
      location_id: null,
      additional_feature_id: null,
      discount_percent: '0',
      amount_total: '0',
      billing_cycle: 'monthly',
      status: 'pending',
      webshare_plan_id: null,
      webshare_subuser_id: null,
      webshare_status: null,
      webshare_error: null,
      webshare_meta: null,
      webshare_activated_at: null,
      expires_at: null,
      webshare_account_id: null,
      webshare_pool_key: null,
      created_at: now,
      updated_at: now,
    };
  }

  private getPlanRenewalDate(plan: Record<string, unknown>): Date | null {
    const explicitRaw =
      plan.end_date ??
      plan.renewal_date ??
      plan.next_renewal_date ??
      plan.next_billing_date ??
      null;
    if (explicitRaw) {
      const explicitDate = new Date(String(explicitRaw));
      if (!Number.isNaN(explicitDate.getTime())) {
        return explicitDate;
      }
    }

    const createdAtRaw = plan.created_at ?? plan.start_date ?? null;
    if (!createdAtRaw) return null;
    const createdAt = new Date(String(createdAtRaw));
    if (Number.isNaN(createdAt.getTime())) return null;

    const term = String(plan.term ?? 'monthly')
      .trim()
      .toLowerCase();
    const renewalDate = new Date(createdAt);
    if (term === 'yearly' || term === 'annual') {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    } else {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    }
    return renewalDate;
  }

  private isWithinRenewalWindow(renewalDate: Date | null): boolean {
    if (!renewalDate) return false;
    const now = Date.now();
    const renewalTime = renewalDate.getTime();
    if (!Number.isFinite(renewalTime) || renewalTime <= now) {
      return false;
    }
    const windowMs = this.autoDowngradeWindowHours * 60 * 60 * 1000;
    return renewalTime - now <= windowMs;
  }

  private normalizePlanProxyCountries(
    plan: Record<string, unknown>,
    fallbackProxyCount: number,
  ): Record<string, number> {
    const countries = this.normalizeProxyCountriesInput(plan.proxy_countries);
    if (countries) return countries;
    if (fallbackProxyCount > 0) {
      return { ZZ: fallbackProxyCount };
    }
    return { ZZ: 1 };
  }

  private buildAutoDowngradePayload(params: {
    currentPlan: Record<string, unknown>;
    poolKey: WebsharePoolKey;
    targetQuantity: number;
    targetBandwidthGb: number;
    requiresUnlimitedBandwidth: boolean;
    activeSubusers: number;
    proxyCountries: Record<string, number>;
  }): Record<string, unknown> {
    const currentPlan = params.currentPlan;
    const currentProxyCount = Number(currentPlan.proxy_count ?? 0);
    const normalizedCurrentProxyCount =
      Number.isFinite(currentProxyCount) && currentProxyCount > 0
        ? Math.trunc(currentProxyCount)
        : 1;
    const currentBandwidth = this.parsePlanBandwidthLimit(currentPlan);
    const normalizedTargetBandwidth =
      params.requiresUnlimitedBandwidth || currentBandwidth.isUnlimited
        ? 0
        : Math.max(
            1,
            Math.min(
              Math.trunc(params.targetBandwidthGb),
              Math.max(1, Math.trunc(currentBandwidth.valueGb)),
            ),
          );
    const currentSubusersTotal = Number(currentPlan.subusers_total ?? 0);
    const targetProxyCount =
      params.poolKey === 'rotating_residential'
        ? normalizedCurrentProxyCount
        : Math.max(
            1,
            Math.min(
              Math.trunc(params.targetQuantity),
              normalizedCurrentProxyCount,
            ),
          );
    return {
      proxy_count: targetProxyCount,
      proxy_countries:
        params.poolKey === 'rotating_residential'
          ? this.normalizePlanProxyCountries(
              currentPlan,
              normalizedCurrentProxyCount,
            )
          : params.proxyCountries,
      bandwidth_limit: normalizedTargetBandwidth,
      on_demand_refreshes_total: Number(
        currentPlan.on_demand_refreshes_total ?? 0,
      ),
      automatic_refresh_frequency: Number(
        currentPlan.automatic_refresh_frequency ?? 0,
      ),
      proxy_replacements_total: Number(
        currentPlan.proxy_replacements_total ?? 0,
      ),
      subusers_total: Math.max(
        3,
        params.activeSubusers + 1,
        Number.isFinite(currentSubusersTotal) && currentSubusersTotal > 0
          ? Math.min(
              Math.max(3, params.activeSubusers + 1),
              Math.trunc(currentSubusersTotal),
            )
          : 0,
      ),
      term:
        typeof currentPlan.term === 'string' ? currentPlan.term : 'monthly',
      is_unlimited_ip_authorizations: Boolean(
        currentPlan.is_unlimited_ip_authorizations,
      ),
      is_high_concurrency: Boolean(currentPlan.is_high_concurrency),
      is_high_priority_network: Boolean(currentPlan.is_high_priority_network),
      required_site_checks: Array.isArray(currentPlan.required_site_checks)
        ? currentPlan.required_site_checks
        : [],
    };
  }

  private doesAutoDowngradePayloadReducePlan(
    currentPlan: Record<string, unknown>,
    payload: Record<string, unknown>,
    poolKey: WebsharePoolKey,
  ): boolean {
    const currentProxyCount = Number(currentPlan.proxy_count ?? 0);
    const nextProxyCount = Number(payload.proxy_count ?? 0);
    if (
      poolKey !== 'rotating_residential' &&
      Number.isFinite(currentProxyCount) &&
      Number.isFinite(nextProxyCount) &&
      nextProxyCount > 0 &&
      nextProxyCount < currentProxyCount
    ) {
      return true;
    }

    const currentBandwidth = this.parsePlanBandwidthLimit(currentPlan);
    const nextBandwidth = this.parsePlanBandwidthLimit({
      bandwidth_limit: payload.bandwidth_limit,
    });
    if (currentBandwidth.isUnlimited && !nextBandwidth.isUnlimited) {
      return true;
    }
    if (
      !currentBandwidth.isUnlimited &&
      !nextBandwidth.isUnlimited &&
      nextBandwidth.valueGb > 0 &&
      nextBandwidth.valueGb < currentBandwidth.valueGb
    ) {
      return true;
    }

    const currentSubusers = Number(currentPlan.subusers_total ?? 0);
    const nextSubusers = Number(payload.subusers_total ?? 0);
    if (
      Number.isFinite(currentSubusers) &&
      Number.isFinite(nextSubusers) &&
      nextSubusers > 0 &&
      nextSubusers < currentSubusers
    ) {
      return true;
    }

    return false;
  }

  private getWebshareContext(params: {
    order?: ProxyOrderRow | null;
    productCode?: string | null;
    query?: Record<string, unknown> | null;
  }): {
    accountId?: string;
    poolKey?: WebsharePoolKey;
    query?: Record<string, unknown>;
  } {
    const meta = (params.order?.webshare_meta ??
      null) as Record<string, unknown> | null;
    const accountId = String(
      params.order?.webshare_account_id ?? meta?.webshare_account_id ?? '',
    )
      .trim();
    const requestedExclusivityValue = String(
      meta?.requested_exclusivity_value ?? '',
    ).trim();
    const requestedProxyType = String(meta?.requested_proxy_type ?? '')
      .trim()
      .toLowerCase();
    const requestedProxySubtype = String(meta?.requested_proxy_subtype ?? '')
      .trim()
      .toLowerCase();
    const fallbackQuery =
      requestedProxyType && requestedProxySubtype
        ? ({
            proxy_type: requestedProxyType,
            proxy_subtype: requestedProxySubtype,
          } as Record<string, unknown>)
        : undefined;
    const query = params.query ?? fallbackQuery;
    const poolKeyFromMeta = this.proxyMasterService.derivePoolKeyFromQuery({
      proxy_type: String(meta?.requested_proxy_type ?? '').trim().toLowerCase(),
      proxy_subtype: String(meta?.requested_proxy_subtype ?? '')
        .trim()
        .toLowerCase(),
    });
    const poolKeyFromStoredString = this.proxyMasterService.derivePoolKeyFromQuery(
      (() => {
        const storedPool =
          String(
            params.order?.webshare_pool_key ?? meta?.webshare_pool_key ?? '',
          ).trim() ||
          String(meta?.requested_pool_key ?? '').trim();
        if (!storedPool) return undefined;
        switch (storedPool) {
          case 'proxy_server_shared':
            return { proxy_type: 'shared', proxy_subtype: 'default' };
          case 'proxy_server_private':
            return { proxy_type: 'semidedicated', proxy_subtype: 'premium' };
          case 'proxy_server_dedicated':
            return { proxy_type: 'dedicated', proxy_subtype: 'premium' };
          case 'static_residential_shared':
            return { proxy_type: 'shared', proxy_subtype: 'isp' };
          case 'static_residential_private':
            return { proxy_type: 'semidedicated', proxy_subtype: 'isp' };
          case 'static_residential_dedicated':
            return { proxy_type: 'dedicated', proxy_subtype: 'isp' };
          case 'rotating_residential':
            return { proxy_type: 'shared', proxy_subtype: 'residential' };
          default:
            return undefined;
        }
      })(),
    );
    const poolKeyRaw =
      poolKeyFromStoredString ||
      poolKeyFromMeta ||
      this.derivePoolKeyFromProductCode({
        productCode: params.productCode,
        exclusivityValue: requestedExclusivityValue,
        query,
      }) ||
      null;

    return {
      accountId: accountId || undefined,
      poolKey: poolKeyRaw || undefined,
      query: query ?? undefined,
    };
  }

  private mapWebshareProxyListToRows(
    proxyList: Array<Record<string, unknown>>,
    proxyType: string,
    proxyOrderId?: string,
    fallbackAddress?: string,
  ): Array<{
    proxy_order_id?: string | null;
    address: string;
    port: number;
    username: string;
    password: string;
    country_code: string;
    city?: string | null;
    status?: string;
    proxy_type?: string;
    last_checked_at?: Date | null;
  }> {
    const pickString = (value: unknown) =>
      typeof value === 'string' ? value : '';
    const pickNumber = (value: unknown) =>
      typeof value === 'number' ? value : Number(value || 0);
    const pickDate = (value: unknown): Date | null => {
      if (!value) return null;
      const dt = new Date(String(value));
      return Number.isNaN(dt.getTime()) ? null : dt;
    };

    return proxyList
      .map((p) => ({
        proxy_order_id: proxyOrderId ?? null,
        address:
          pickString(p.proxy_address) ||
          pickString(p.address) ||
          (fallbackAddress ?? ''),
        port: pickNumber(p.port),
        username: pickString(p.username),
        password: pickString(p.password),
        country_code: pickString(p.country_code).toUpperCase(),
        city: pickString(p.city_name) || pickString(p.city) || null,
        status: p.valid === false ? 'inactive' : 'active',
        proxy_type: proxyType,
        last_checked_at:
          pickDate(p.last_checked_at) ??
          pickDate(p.last_checked) ??
          pickDate(p.last_verification) ??
          pickDate(p.checked_at),
      }))
      .filter((p) => p.address && p.port && p.username && p.password);
  }

  private buildProxyCountryDistribution(
    proxies: Array<{ country_code?: string | null }>,
  ): Record<string, number> {
    const distribution: Record<string, number> = {};
    for (const proxy of proxies) {
      const code = String(proxy.country_code ?? '')
        .trim()
        .toUpperCase();
      if (!/^[A-Z]{2}$/.test(code)) continue;
      distribution[code] = (distribution[code] ?? 0) + 1;
    }
    return distribution;
  }

  private async syncWebshareProxiesByType(
    userId: string,
    proxyType?: string,
  ): Promise<void> {
    if (!this.isSupportedProxyType(proxyType)) {
      return;
    }

    const activeOrders = await this.repo.findActiveOrdersByUserAndProductCode(
      userId,
      proxyType,
    );
    if (!activeOrders.length) {
      return;
    }

    let hasClearedLegacyRows = false;

    for (const order of activeOrders) {
      const planId = this.getOrderPlanId(order);
      const mode: 'direct' | 'backbone' =
        proxyType === 'rotating_residential' ? 'backbone' : 'direct';

      try {
        const webshareContext = this.getWebshareContext({
          order,
          productCode: proxyType,
        });
        const rotatingFetchOptions =
          proxyType === 'rotating_residential'
            ? {
                pageSize: this.rotatingFetchPageSize,
                maxPages: this.rotatingFetchMaxPages,
                maxResults: this.rotatingFetchMaxResults,
              }
            : {};
        const proxyList = await this.proxyMasterService.listWebshareProxies({
          mode,
          planId,
          accountId: webshareContext.accountId,
          poolKey: webshareContext.poolKey,
          query: webshareContext.query,
          ...rotatingFetchOptions,
        });
        const mapped = this.mapWebshareProxyListToRows(
          proxyList,
          proxyType,
          order.id,
          mode === 'backbone' ? this.rotatingBackboneHost : undefined,
        );
        if (!mapped.length) {
          continue;
        }
        const syncedProxyCountries = this.buildProxyCountryDistribution(mapped);
        const nextMeta = {
          ...(order.webshare_meta ?? {}),
          synced_proxy_count: mapped.length,
          synced_proxy_countries: syncedProxyCountries,
        };
        await this.databaseService.transaction(async (trx) => {
          if (!hasClearedLegacyRows) {
            await this.repo.deleteLegacyProxiesWithoutOrderByUserAndType(
              userId,
              proxyType,
              trx,
            );
          }
          await this.repo.deleteProxiesByOrderId(order.id, trx);
          await this.repo.upsertUserProxies(userId, mapped, trx);
          await this.repo.updateProxyOrder(
            order.id,
            {
              webshare_meta: nextMeta,
              webshare_error: null,
            },
            trx,
          );
        });
        hasClearedLegacyRows = true;
      } catch (error) {
        this.logger.warn(
          `Sync ${proxyType} failed for order ${order.id}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
  }

  private async syncWebshareProxies(
    userId: string,
    proxyType?: string,
  ): Promise<void> {
    if (this.isSupportedProxyType(proxyType)) {
      await this.syncWebshareProxiesByType(userId, proxyType);
      return;
    }
    for (const type of this.supportedProxyTypes) {
      await this.syncWebshareProxiesByType(userId, type);
    }
  }

  private async resolveOrderFilter(params: {
    userId: string;
    orderId?: string;
    proxyType?: string;
  }): Promise<{ order: ProxyOrderRow | null; proxyType: string | undefined }> {
    const rawOrderId = String(params.orderId ?? '').trim();
    if (!rawOrderId) {
      return { order: null, proxyType: params.proxyType };
    }

    const order = await this.repo.findProxyOrderByIdAndUserId(
      rawOrderId,
      params.userId,
    );
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn proxy');
    }

    const orderProductCode = await this.repo.findProxyProductCodeById(
      Number(order.product_id),
    );
    if (!orderProductCode || !this.isSupportedProxyType(orderProductCode)) {
      throw new BadRequestException('Đơn proxy không hợp lệ');
    }

    if (params.proxyType && params.proxyType !== orderProductCode) {
      throw new BadRequestException(
        'order_id không khớp với loại proxy đang truy cập',
      );
    }

    return { order, proxyType: params.proxyType ?? orderProductCode };
  }

  private async runWithConcurrency<T, R>(
    items: T[],
    concurrency: number,
    worker: (item: T, index: number) => Promise<R>,
  ): Promise<R[]> {
    if (items.length === 0) return [];
    const results: R[] = new Array(items.length);
    let idx = 0;
    const limit = Math.max(1, concurrency);

    const runners = Array.from({ length: Math.min(limit, items.length) }).map(
      async () => {
        while (idx < items.length) {
          const current = idx;
          idx += 1;
          results[current] = await worker(items[current], current);
        }
      },
    );

    await Promise.all(runners);
    return results;
  }

  private getProxyCheckError(error: unknown): string {
    if (this.isTlsProtocolError(error)) {
      return 'TLS handshake failed (EPROTO). Proxy có thể chỉ hỗ trợ HTTP hoặc không hỗ trợ CONNECT cho HTTPS.';
    }
    if (error instanceof Error && error.message) return error.message;
    return 'Unknown error';
  }

  private isTlsProtocolError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const message = `${error.name} ${error.message}`.toLowerCase();
    return (
      message.includes('eproto') ||
      message.includes('tls_get_more_records') ||
      message.includes('packet length too long') ||
      message.includes('ssl routines')
    );
  }

  private isLikelyHttpProxyFailure(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const message = `${error.name} ${error.message}`.toLowerCase();
    return (
      this.isTlsProtocolError(error) ||
      message.includes('socket hang up') ||
      message.includes('read econnreset') ||
      message.includes('proxy connection ended') ||
      message.includes('tunneling socket could not be established')
    );
  }

  private normalizeProxyProtocol(
    value: unknown,
  ): 'auto' | 'http' | 'socks5' {
    const raw = String(value ?? '')
      .trim()
      .toLowerCase();
    if (raw === 'http' || raw === 'socks5' || raw === 'auto') return raw;
    return 'auto';
  }

  private buildAxiosProxyConfig(params: {
    protocol: 'http' | 'socks5';
    address: string;
    port: number;
    username?: string;
    password?: string;
    timeout: number;
  }): AxiosRequestConfig {
    const baseConfig: AxiosRequestConfig = {
      timeout: params.timeout,
      validateStatus: () => true,
    };

    if (params.protocol === 'socks5') {
      const SocksProxyAgentCtor = this.getSocksProxyAgentCtor();
      if (!SocksProxyAgentCtor) {
        throw new BadRequestException(
          'SOCKS5 proxy check requires socks-proxy-agent package',
        );
      }

      const userInfo =
        params.username || params.password
          ? `${encodeURIComponent(params.username ?? '')}:${encodeURIComponent(
              params.password ?? '',
            )}@`
          : '';
      const proxyUrl = `socks5://${userInfo}${params.address}:${params.port}`;
      const agent = new SocksProxyAgentCtor(proxyUrl);
      return {
        ...baseConfig,
        proxy: false,
        httpAgent: agent,
        httpsAgent: agent,
      };
    }

    return {
      ...baseConfig,
      proxy:
        params.username || params.password
          ? {
              host: params.address,
              port: params.port,
              auth: {
                username: params.username ?? '',
                password: params.password ?? '',
              },
            }
          : {
              host: params.address,
              port: params.port,
            },
    };
  }

  private getSocksProxyAgentCtor():
    | ((new (proxyUrl: string) => unknown) & { prototype: unknown })
    | null {
    if (this.socksProxyAgentCtor !== undefined) {
      return this.socksProxyAgentCtor;
    }

    try {
      const socksModule = require('socks-proxy-agent') as {
        SocksProxyAgent?: (new (proxyUrl: string) => unknown) & {
          prototype: unknown;
        };
      };

      if (typeof socksModule.SocksProxyAgent === 'function') {
        this.socksProxyAgentCtor = socksModule.SocksProxyAgent;
        return this.socksProxyAgentCtor;
      }
    } catch {
      this.socksProxyAgentCtor = null;
      return this.socksProxyAgentCtor;
    }

    this.socksProxyAgentCtor = null;
    return this.socksProxyAgentCtor;
  }

  private isProxyAuthFailureStatus(status: number): boolean {
    return status === 401 || status === 407;
  }

  private async runSingleProxyCheck(params: {
    protocol: 'http' | 'socks5';
    testUrl: string;
    timeout: number;
    address: string;
    port: number;
    username?: string;
    password?: string;
  }): Promise<{
    status: 'active' | 'dead';
    error: string | null;
    public_ip: string | null;
    country_code: string | null;
  }> {
    const requestConfig = this.buildAxiosProxyConfig({
      protocol: params.protocol,
      timeout: params.timeout,
      address: params.address,
      port: params.port,
      username: params.username,
      password: params.password,
    });

    const tryRequest = async (url: string) => {
      const res = await axios.get(url, requestConfig);
      const statusCode = Number(res.status);
      if (!Number.isFinite(statusCode) || statusCode < 100 || statusCode > 599) {
        return 'Invalid HTTP status';
      }
      // Check-live focuses on proxy reachability.
      // Any HTTP response from target is treated as live,
      // except explicit proxy auth failures.
      if (this.isProxyAuthFailureStatus(statusCode)) {
        return `HTTP ${statusCode} (proxy authentication failed)`;
      }
      return null;
    };

    const extractPublicIpFromData = (payload: unknown): string | null => {
      const ipRegex =
        /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/;
      if (typeof payload === 'string') {
        const matched = payload.match(ipRegex);
        return matched ? matched[0] : null;
      }
      if (payload && typeof payload === 'object') {
        const obj = payload as Record<string, unknown>;
        const candidates = ['ip', 'query', 'origin', 'address'];
        for (const key of candidates) {
          const value = obj[key];
          if (typeof value !== 'string') continue;
          const matched = value.match(ipRegex);
          if (matched) return matched[0];
        }
      }
      return null;
    };

    const lookupCountryCodeByIp = async (
      ip: string,
    ): Promise<string | null> => {
      try {
        const geoUrl = this.liveCheckGeoLookupUrlTemplate.replace('{ip}', ip);
        const geoRes = await axios.get(geoUrl, {
          timeout: Math.min(params.timeout, 6000),
          validateStatus: () => true,
        });
        if (geoRes.status < 200 || geoRes.status >= 300) return null;
        const data = geoRes.data as
          | {
              success?: boolean;
              country_code?: string | null;
              countryCode?: string | null;
            }
          | undefined;
        const candidate = (
          data?.country_code ??
          data?.countryCode ??
          null
        )?.toString();
        if (!candidate) return null;
        const normalized = candidate.trim().toUpperCase();
        return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
      } catch {
        return null;
      }
    };

    const detectPublicInfo = async (): Promise<{
      public_ip: string | null;
      country_code: string | null;
    }> => {
      try {
        const ipRes = await axios.get(this.liveCheckIpProbeUrl, {
          ...requestConfig,
          validateStatus: () => true,
        });
        if (ipRes.status < 200 || ipRes.status >= 300) {
          return { public_ip: null, country_code: null };
        }
        const publicIp = extractPublicIpFromData(ipRes.data);
        if (!publicIp) return { public_ip: null, country_code: null };
        const countryCode = await lookupCountryCodeByIp(publicIp);
        return { public_ip: publicIp, country_code: countryCode };
      } catch {
        return { public_ip: null, country_code: null };
      }
    };

    try {
      const error = await tryRequest(params.testUrl);
      if (!error) {
        const publicInfo = await detectPublicInfo();
        return { status: 'active', error: null, ...publicInfo };
      }
      return { status: 'dead', error, public_ip: null, country_code: null };
    } catch (err) {
      if (
        params.protocol === 'http' &&
        params.testUrl.startsWith('https://') &&
        this.isTlsProtocolError(err)
      ) {
        const fallbackUrl = `http://${params.testUrl.slice('https://'.length)}`;
        try {
          const fallbackError = await tryRequest(fallbackUrl);
          if (!fallbackError) {
            const publicInfo = await detectPublicInfo();
            return { status: 'active', error: null, ...publicInfo };
          }
          return {
            status: 'dead',
            error: fallbackError,
            public_ip: null,
            country_code: null,
          };
        } catch (fallbackErr) {
          return {
            status: 'dead',
            error: this.getProxyCheckError(fallbackErr),
            public_ip: null,
            country_code: null,
          };
        }
      }
      return {
        status: 'dead',
        error: this.getProxyCheckError(err),
        public_ip: null,
        country_code: null,
      };
    }
  }

  private getRetryCount(order: ProxyOrderRow): number {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const retry = meta.retry as Record<string, unknown> | undefined;
    const count = retry?.count;
    return typeof count === 'number' && Number.isFinite(count) && count >= 0
      ? count
      : 0;
  }

  private getRetryCode(order: ProxyOrderRow): string | null {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const retry = meta.retry as Record<string, unknown> | undefined;
    const code = String(retry?.code ?? '')
      .trim()
      .toLowerCase();
    return code || null;
  }

  private getOrderProvisioningAction(
    order: ProxyOrderRow,
  ): 'new_purchase' | 'update' {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const action = String(meta.provisioning_action ?? '')
      .trim()
      .toLowerCase();
    return action === 'update' ? 'update' : 'new_purchase';
  }

  private shouldPauseRetry(order: ProxyOrderRow): boolean {
    const code = this.getRetryCode(order);
    // `proxy_not_ready` có thể tự hồi phục sau vài phút, không nên pause vĩnh viễn.
    if (code === 'proxy_not_ready') return false;
    return true;
  }

  private buildRetryMeta(
    order: ProxyOrderRow,
    message: string,
    code?: string,
  ): Record<string, unknown> {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const retry = meta.retry as Record<string, unknown> | undefined;
    const count =
      typeof retry?.count === 'number' && Number.isFinite(retry.count)
        ? retry.count
        : 0;
    return {
      ...meta,
      retry: {
        count: count + 1,
        last_attempt_at: new Date().toISOString(),
        reason: message,
        code,
        paused: retry?.paused === true,
      },
    };
  }

  private isRetryPaused(order: ProxyOrderRow): boolean {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const retry = meta.retry as Record<string, unknown> | undefined;
    return retry?.paused === true;
  }

  private clearRetryMeta(order: ProxyOrderRow): Record<string, unknown> | null {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const retryRaw = meta.retry as Record<string, unknown> | undefined;
    const nextMeta: Record<string, unknown> = { ...meta };
    nextMeta.retry = {
      ...(retryRaw ?? {}),
      count: 0,
      paused: false,
      recovered_at: new Date().toISOString(),
    };
    return nextMeta;
  }

  private calculateOrderExpiry(
    order: Pick<ProxyOrderRow, 'billing_cycle'> & {
      expires_at?: Date | null;
    },
  ): Date {
    const now = new Date();
    const base =
      order.expires_at && new Date(order.expires_at).getTime() > now.getTime()
        ? new Date(order.expires_at)
        : now;
    const next = new Date(base);
    const cycle = String(order.billing_cycle ?? 'monthly')
      .trim()
      .toLowerCase();
    if (cycle === 'yearly' || cycle === 'annual') {
      next.setFullYear(next.getFullYear() + 1);
      return next;
    }
    next.setMonth(next.getMonth() + 1);
    return next;
  }

  private async markOrderPending(params: {
    order: ProxyOrderRow;
    message: string;
    planId?: number | null;
    webshareMeta?: Record<string, unknown> | null;
    code?: string;
  }): Promise<ProxyOrderRow> {
    const meta = params.webshareMeta ?? params.order.webshare_meta ?? null;
    const updatedMeta = this.buildRetryMeta(
      { ...params.order, webshare_meta: meta },
      params.message,
      params.code,
    );
    return this.repo.updateProxyOrder(params.order.id, {
      status: 'pending',
      webshare_plan_id: params.planId ?? params.order.webshare_plan_id ?? null,
      webshare_subuser_id: null,
      webshare_account_id:
        String(
          (updatedMeta as Record<string, unknown> | null)?.webshare_account_id ??
            params.order.webshare_account_id ??
            '',
        ).trim() || null,
      webshare_pool_key:
        String(
          (updatedMeta as Record<string, unknown> | null)?.webshare_pool_key ??
            params.order.webshare_pool_key ??
            '',
        ).trim() || null,
      webshare_status: 'pending',
      webshare_error: params.message,
      webshare_meta: updatedMeta,
      expires_at:
        params.order.expires_at ?? this.calculateOrderExpiry(params.order),
    });
  }

  private async refundProxyOrder(params: {
    order: ProxyOrderRow;
    walletId?: string;
    reason: string;
  }): Promise<ProxyOrderRow> {
    if (params.order.status === 'refunded') {
      return params.order;
    }
    const amount = this.toNumber(params.order.amount_total ?? 0);
    return this.databaseService.transaction(async (trx) => {
      const wallet =
        params.walletId != null
          ? { id: params.walletId }
          : await this.walletRepository.findByUserId(params.order.user_id, trx);
      if (wallet?.id) {
        await this.walletRepository.incrementBalance(trx, wallet.id, {
          deposit_balance: amount,
        });
        const refundTransactionNumber = generateTransactionNumber();
        await trx('wallet_transactions').insert({
          transaction_number: refundTransactionNumber,
          wallet_id: wallet.id,
          user_id: params.order.user_id,
          type: 'refund',
          method: 'wallet',
          amount,
          fee_amount: 0,
          status: 'success',
          reference_code: params.order.id,
          note: `Hoàn tiền proxy: ${params.reason}`,
          created_at: new Date(),
          completed_at: new Date(),
        });
      }

      await this.repo.createProxyTransaction(
        {
          proxy_order_id: params.order.id,
          type: 'refund',
          amount,
          currency: 'VND',
          status: 'success',
          paid_at: new Date(),
          metadata: {
            reason: params.reason,
          },
        },
        trx,
      );

      return this.repo.updateProxyOrder(
        params.order.id,
        {
          status: 'refunded',
          webshare_status: 'failed',
          webshare_error: params.reason,
        },
        trx,
      );
    });
  }

  private isPlanMatchingProfile(
    plan: Record<string, unknown>,
    query: Record<string, unknown>,
  ): boolean {
    const planType = String(plan.proxy_type ?? '')
      .trim()
      .toLowerCase();
    const planSubtype = String(plan.proxy_subtype ?? '')
      .trim()
      .toLowerCase();
    const queryType = String(query.proxy_type ?? '')
      .trim()
      .toLowerCase();
    const querySubtype = String(query.proxy_subtype ?? '')
      .trim()
      .toLowerCase();
    return Boolean(
      planType && planSubtype && queryType && querySubtype &&
        planType === queryType &&
        planSubtype === querySubtype,
    );
  }

  private parsePlanBandwidthLimit(plan: Record<string, unknown>): {
    isUnlimited: boolean;
    valueGb: number;
  } {
    const raw = plan.bandwidth_limit;
    const text = String(raw ?? '')
      .trim()
      .toLowerCase();
    if (
      text === 'unlimited' ||
      text === 'infinite' ||
      text === 'infinity' ||
      text === 'inf'
    ) {
      return { isUnlimited: true, valueGb: 0 };
    }
    const value = Number(raw);
    if (Number.isFinite(value) && value === 0) {
      return { isUnlimited: true, valueGb: 0 };
    }
    return {
      isUnlimited: false,
      valueGb: Number.isFinite(value) && value > 0 ? value : 0,
    };
  }

  private isPlanSufficient(
    plan: Record<string, unknown>,
    required: {
      totalQuantity: number;
      totalBandwidthGb: number;
      requiresUnlimitedBandwidth: boolean;
    },
  ): boolean {
    const proxyCount = Number(plan.proxy_count ?? 0);
    if (!Number.isFinite(proxyCount) || proxyCount < required.totalQuantity) {
      return false;
    }
    const bandwidth = this.parsePlanBandwidthLimit(plan);
    if (required.requiresUnlimitedBandwidth) {
      return bandwidth.isUnlimited;
    }
    return bandwidth.isUnlimited || bandwidth.valueGb >= required.totalBandwidthGb;
  }

  private async resolveOrderDemand(
    order: ProxyOrderRow,
    productCode: string,
    prebuiltConfig?: WebshareOrderConfig,
  ): Promise<{
    quantity: number;
    bandwidthGb: number;
    isUnlimitedBandwidth: boolean;
  }> {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    // If caller already has a fresh config (e.g. current upgrade request),
    // always prioritize it over stale values in webshare_meta.
    let quantity = prebuiltConfig
      ? Number(prebuiltConfig.proxyCount ?? 0)
      : Number(meta.requested_quantity_value ?? 0);
    let bandwidthGb = prebuiltConfig
      ? Number(prebuiltConfig.bandwidth ?? -1)
      : Number(meta.requested_bandwidth_value ?? -1);

    try {
      const orderConfig =
        prebuiltConfig ??
        (await this.proxyMasterService.buildWebshareOrderConfig(
          this.buildPriceInputFromOrder(order),
        ));
      if (!Number.isFinite(quantity) || quantity <= 0) {
        quantity = Number(orderConfig.proxyCount ?? 0);
      }
      if (!Number.isFinite(bandwidthGb) || bandwidthGb < 0) {
        bandwidthGb = Number(orderConfig.bandwidth ?? -1);
      }
    } catch (error) {
      this.logger.warn(
        `Resolve demand from config failed for order ${order.id}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      quantity = await this.repo.countProxiesByOrderId(order.id);
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      quantity = productCode === 'rotating_residential' ? 1 : 0;
    }

    if (!Number.isFinite(bandwidthGb) || bandwidthGb < 0) {
      bandwidthGb = 0;
    }
    const isUnlimitedBandwidth = bandwidthGb === 0;

    return {
      quantity: Math.max(0, Math.trunc(quantity)),
      bandwidthGb: Math.max(0, Math.trunc(bandwidthGb)),
      isUnlimitedBandwidth,
    };
  }

  private getQueryProfile(query: Record<string, unknown>): {
    proxyType: string;
    proxySubtype: string;
  } {
    return {
      proxyType: String(query.proxy_type ?? '')
        .trim()
        .toLowerCase(),
      proxySubtype: String(query.proxy_subtype ?? '')
        .trim()
        .toLowerCase(),
    };
  }

  private isQueryProfileMatching(
    lhsQuery: Record<string, unknown>,
    rhsQuery: Record<string, unknown>,
  ): boolean {
    const lhs = this.getQueryProfile(lhsQuery);
    const rhs = this.getQueryProfile(rhsQuery);
    return Boolean(
      lhs.proxyType &&
        lhs.proxySubtype &&
        rhs.proxyType &&
        rhs.proxySubtype &&
        lhs.proxyType === rhs.proxyType &&
        lhs.proxySubtype === rhs.proxySubtype,
    );
  }

  private async computeTargetPlanDemand(params: {
    order: ProxyOrderRow;
    config: WebshareOrderConfig;
    targetAccountId?: string | null;
    targetPoolKey?: WebsharePoolKey | null;
  }): Promise<{
    totalQuantity: number;
    totalBandwidthGb: number;
    requiresUnlimitedBandwidth: boolean;
    activeSubusers: number;
    proxyCountries: Record<string, number>;
  }> {
    const currentMeta = (params.order.webshare_meta ?? {}) as Record<
      string,
      unknown
    >;
    const replacedOrderId = String(
      currentMeta.replaced_order_id ??
        currentMeta.superseded_order_id ??
        currentMeta.upgrade_from_order_id ??
        '',
    ).trim();

    const orders = await this.repo.findOrdersByProductCode(
      params.config.product.code,
      ['active', 'pending', 'paid', 'processing'],
    );

    let totalQuantity = 0;
    let totalBandwidthGb = 0;
    let requiresUnlimitedBandwidth = false;
    const activeSubusers = new Set<number>();
    const countryDemand: Record<string, number> = {};

    for (const order of orders) {
      if (
        replacedOrderId &&
        order.id !== params.order.id &&
        order.id === replacedOrderId
      ) {
        continue;
      }
      const orderAccountId = String(order.webshare_account_id ?? '').trim();
      const targetAccountId = String(params.targetAccountId ?? '').trim();
      if (targetAccountId && order.id !== params.order.id) {
        if (orderAccountId !== targetAccountId) {
          continue;
        }
      }
      const orderPoolKey = String(order.webshare_pool_key ?? '').trim();
      const targetPoolKey = String(params.targetPoolKey ?? '').trim();
      if (
        !targetAccountId &&
        targetPoolKey &&
        order.id !== params.order.id &&
        orderPoolKey &&
        orderPoolKey !== targetPoolKey
      ) {
        continue;
      }

      let orderConfig: WebshareOrderConfig | null = null;
      if (order.id === params.order.id) {
        orderConfig = params.config;
      } else {
        try {
          orderConfig = await this.proxyMasterService.buildWebshareOrderConfig(
            this.buildPriceInputFromOrder(order),
          );
        } catch (error) {
          this.logger.warn(
            `Resolve profile from config failed for order ${order.id}: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }

      if (
        orderConfig &&
        !this.isQueryProfileMatching(orderConfig.query, params.config.query)
      ) {
        continue;
      }

      const demand = await this.resolveOrderDemand(
        order,
        params.config.product.code,
        orderConfig ?? undefined,
      );
      if (demand.quantity <= 0) {
        continue;
      }

      totalQuantity += demand.quantity;
      if (demand.isUnlimitedBandwidth) {
        requiresUnlimitedBandwidth = true;
      } else {
        totalBandwidthGb += demand.bandwidthGb;
      }
      const legacySlotId = Number(order.webshare_subuser_id ?? 0);
      if (Number.isFinite(legacySlotId) && legacySlotId > 0) {
        activeSubusers.add(legacySlotId);
      }

      const proxyCountries = this.normalizeProxyCountriesInput(
        (orderConfig?.query as Record<string, unknown> | undefined)
          ?.proxy_countries,
      );
      if (proxyCountries) {
        for (const [countryCode, qty] of Object.entries(proxyCountries)) {
          countryDemand[countryCode] = (countryDemand[countryCode] ?? 0) + qty;
        }
      } else {
        countryDemand.ZZ = (countryDemand.ZZ ?? 0) + demand.quantity;
      }
    }

    const countryDemandSum = Object.values(countryDemand).reduce(
      (sum, value) => sum + Number(value || 0),
      0,
    );
    const targetQuantity = Math.max(totalQuantity, countryDemandSum);
    if (targetQuantity > countryDemandSum) {
      countryDemand.ZZ = (countryDemand.ZZ ?? 0) + (targetQuantity - countryDemandSum);
    } else if (targetQuantity > 0 && countryDemandSum <= 0) {
      countryDemand.ZZ = targetQuantity;
    }

    return {
      totalQuantity: Math.max(0, targetQuantity),
      totalBandwidthGb: Math.max(0, totalBandwidthGb),
      requiresUnlimitedBandwidth,
      activeSubusers: Math.max(0, activeSubusers.size),
      proxyCountries: countryDemand,
    };
  }

  private async ensurePlanCapacityForNonRotating(params: {
    order: ProxyOrderRow;
    config: WebshareOrderConfig;
    currentPlanId?: number | null;
    currentMeta?: Record<string, unknown> | null;
  }): Promise<{ planId: number; meta: Record<string, unknown> | null }> {
    const baseContext = this.getWebshareContext({
      order: params.order,
      productCode: params.config.product.code,
      query: params.config.query,
    });
    const resolvedCredential = await this.proxyMasterService.resolveWebshareCredential({
      accountId: baseContext.accountId,
      poolKey: baseContext.poolKey,
      query: params.config.query,
      requestedQuantity:
        Number.isFinite(params.config.proxyCount) && params.config.proxyCount > 0
          ? params.config.proxyCount
          : null,
      requestedBandwidthGb:
        Number.isFinite(params.config.bandwidth) && params.config.bandwidth >= 0
          ? params.config.bandwidth
          : null,
      requiresUnlimitedBandwidth: Number(params.config.bandwidth ?? 0) === 0,
    });
    const webshareContext = {
      accountId: resolvedCredential.accountId ?? undefined,
      poolKey: resolvedCredential.poolKey ?? baseContext.poolKey,
      query: params.config.query,
    };
    const demand = await this.computeTargetPlanDemand({
      order: params.order,
      config: params.config,
      targetAccountId: webshareContext.accountId,
      targetPoolKey: webshareContext.poolKey,
    });
    if (demand.totalQuantity <= 0) {
      throw new BadRequestException('Không xác định được tổng số lượng proxy cần cấp');
    }
    const bufferFactor = await this.getPoolBufferFactor({
      accountId: webshareContext.accountId,
      poolKey: webshareContext.poolKey,
    });
    const bufferedDemand = this.applyBufferedDemand(
      demand,
      bufferFactor,
      params.config.mode,
    );

    const plans = await this.proxyMasterService.listWebsharePlans(
      webshareContext,
    );
    const matchedActivePlans = plans
      .filter((plan) => {
        const status = String(plan.status ?? '')
          .trim()
          .toLowerCase();
        return status === 'active' && this.isPlanMatchingProfile(plan, params.config.query);
      })
      .sort((a, b) => {
        const aTime = Date.parse(String(a.updated_at ?? a.created_at ?? 0)) || 0;
        const bTime = Date.parse(String(b.updated_at ?? b.created_at ?? 0)) || 0;
        return bTime - aTime;
      });
    const sufficientPlan = matchedActivePlans.find((plan) =>
      this.isPlanSufficient(plan, bufferedDemand),
    );
    if (sufficientPlan) {
      return {
        planId: Number(sufficientPlan.id),
        meta: {
          ...(params.currentMeta ?? {}),
          webshare_account_id: webshareContext.accountId ?? null,
          webshare_pool_key: webshareContext.poolKey ?? null,
          reused_plan_id: Number(sufficientPlan.id),
          reused_plan_source: 'capacity_match',
          target_proxy_count: bufferedDemand.totalQuantity,
          target_proxy_countries: demand.proxyCountries,
          target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
            ? 'unlimited'
            : bufferedDemand.totalBandwidthGb,
        },
      };
    }

    const targetQuery: Record<string, unknown> = {
      ...params.config.query,
      proxy_countries: demand.proxyCountries,
      bandwidth_limit: bufferedDemand.requiresUnlimitedBandwidth
        ? 0
        : bufferedDemand.totalBandwidthGb,
      subusers_total: Math.max(3, demand.activeSubusers + 1),
      behavior: 'upgrade',
    };
    const candidatePlanId =
      Number(matchedActivePlans[0]?.id ?? 0) || null;

    try {
      let ensuredPlanId: number | null = null;
      let ensuredRaw: Record<string, unknown> | null = null;
      let ensuredPaymentRequired = false;
      let ensuredAction: 'upgrade' | 'purchase' = 'upgrade';

      if (candidatePlanId) {
        const upgraded = await this.proxyMasterService.upgradeWebsharePlan(
          candidatePlanId,
          targetQuery,
          webshareContext,
          {
            autoResolvePaymentMethod: true,
            autoSolveRecaptcha: true,
          },
        );
        ensuredPlanId = upgraded.planId ?? candidatePlanId;
        ensuredRaw = upgraded.raw;
        ensuredPaymentRequired = Boolean(upgraded.paymentRequired);
      } else {
        const purchased = await this.proxyMasterService.purchaseWebsharePlan(
          {
            ...targetQuery,
            behavior: 'add',
          },
          webshareContext,
          {
            autoResolvePaymentMethod: true,
            autoSolveRecaptcha: true,
          },
        );
        ensuredPlanId = purchased.planId;
        ensuredRaw = purchased.raw;
        ensuredPaymentRequired = Boolean(purchased.paymentRequired);
        ensuredAction = 'purchase';
      }

      if (!ensuredPlanId) {
        throw new BadRequestException(
          'Webshare không trả về plan id sau khi nâng/mua gói',
        );
      }

      return {
        planId: ensuredPlanId,
        meta: {
          ...(params.currentMeta ?? {}),
          webshare_account_id: webshareContext.accountId ?? null,
          webshare_pool_key: webshareContext.poolKey ?? null,
          target_proxy_count: bufferedDemand.totalQuantity,
          target_proxy_countries: demand.proxyCountries,
          target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
            ? 'unlimited'
            : bufferedDemand.totalBandwidthGb,
          ensured_plan_action: ensuredAction,
          ensured_plan_payment_required: ensuredPaymentRequired,
          ensured_plan_raw: ensuredRaw,
        },
      };
    } catch (error) {
      const detail = this.proxyMasterService.getWebshareErrorMessage(error);
      const message =
        detail ??
        (error instanceof Error ? error.message : 'Không thể nâng/mua gói Webshare');

      if (
        candidatePlanId &&
        this.proxyMasterService.isPlanSameProxyTypeExistsError(error)
      ) {
        try {
          await this.proxyMasterService.cancelWebsharePlan(
            candidatePlanId,
            webshareContext,
          );
          const purchased = await this.proxyMasterService.purchaseWebsharePlan(
            {
              ...targetQuery,
              behavior: 'add',
            },
            webshareContext,
            {
              autoResolvePaymentMethod: true,
              autoSolveRecaptcha: true,
            },
          );
          if (!purchased.planId) {
            throw new BadRequestException(
              'Đã hủy plan cũ nhưng Webshare không trả về plan mới',
            );
          }
          return {
            planId: purchased.planId,
            meta: {
              ...(params.currentMeta ?? {}),
              webshare_account_id: webshareContext.accountId ?? null,
              webshare_pool_key: webshareContext.poolKey ?? null,
              target_proxy_count: bufferedDemand.totalQuantity,
              target_proxy_countries: demand.proxyCountries,
              target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                ? 'unlimited'
                : bufferedDemand.totalBandwidthGb,
              ensured_plan_action: 'cancel_and_rebuy',
              ensured_plan_payment_required: Boolean(
                purchased.paymentRequired,
              ),
              ensured_plan_raw: purchased.raw,
              cancelled_plan_id: candidatePlanId,
            },
          };
        } catch (fallbackError) {
          const fallbackDetail =
            this.proxyMasterService.getWebshareErrorMessage(fallbackError) ??
            (fallbackError instanceof Error
              ? fallbackError.message
              : 'Hủy/mua lại plan thất bại');
          throw new RetryableProxyActivationError(fallbackDetail, {
            planId: candidatePlanId,
            webshareMeta: {
              ...(params.currentMeta ?? {}),
              webshare_account_id: webshareContext.accountId ?? null,
              webshare_pool_key: webshareContext.poolKey ?? null,
              target_proxy_count: bufferedDemand.totalQuantity,
              target_proxy_countries: demand.proxyCountries,
              target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                ? 'unlimited'
                : bufferedDemand.totalBandwidthGb,
              purchase_error: fallbackDetail,
              purchase_error_code: 'cancel_rebuy_failed',
            },
            code: 'manual_purchase_required',
          });
        }
      }

      if (
        candidatePlanId &&
        this.proxyMasterService.isPlanAccessDeniedError(error)
      ) {
        try {
          let cancelErrorMessage: string | null = null;
          try {
            await this.proxyMasterService.cancelWebsharePlan(
              candidatePlanId,
              webshareContext,
            );
          } catch (cancelError) {
            cancelErrorMessage =
              this.proxyMasterService.getWebshareErrorMessage(cancelError) ??
              (cancelError instanceof Error
                ? cancelError.message
                : 'Không thể hủy plan cũ');
          }

          const purchased = await this.proxyMasterService.purchaseWebsharePlan(
            {
              ...targetQuery,
              behavior: 'add',
            },
            webshareContext,
            {
              autoResolvePaymentMethod: true,
              autoSolveRecaptcha: true,
            },
          );
          if (!purchased.planId) {
            throw new BadRequestException(
              'Webshare không trả về plan mới sau khi fallback mua thêm',
            );
          }
          return {
            planId: purchased.planId,
            meta: {
              ...(params.currentMeta ?? {}),
              webshare_account_id: webshareContext.accountId ?? null,
              webshare_pool_key: webshareContext.poolKey ?? null,
              target_proxy_count: bufferedDemand.totalQuantity,
              target_proxy_countries: demand.proxyCountries,
              target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                ? 'unlimited'
                : bufferedDemand.totalBandwidthGb,
              ensured_plan_action: 'access_denied_cancel_and_rebuy',
              ensured_plan_payment_required: Boolean(
                purchased.paymentRequired,
              ),
              ensured_plan_raw: purchased.raw,
              denied_plan_id: candidatePlanId,
              ...(cancelErrorMessage
                ? { cancel_plan_error: cancelErrorMessage }
                : {}),
            },
          };
        } catch (fallbackError) {
          const fallbackDetail =
            this.proxyMasterService.getWebshareErrorMessage(fallbackError) ??
            (fallbackError instanceof Error
              ? fallbackError.message
              : 'Fallback mua plan mới thất bại');
          throw new RetryableProxyActivationError(fallbackDetail, {
            planId: candidatePlanId,
            webshareMeta: {
              ...(params.currentMeta ?? {}),
              webshare_account_id: webshareContext.accountId ?? null,
              webshare_pool_key: webshareContext.poolKey ?? null,
              target_proxy_count: bufferedDemand.totalQuantity,
              target_proxy_countries: demand.proxyCountries,
              target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                ? 'unlimited'
                : bufferedDemand.totalBandwidthGb,
              purchase_error: fallbackDetail,
              purchase_error_code: 'access_denied_rebuy_failed',
            },
            code: 'manual_purchase_required',
          });
        }
      }

      if (this.proxyMasterService.isRetryableWebshareError(error)) {
        throw new RetryableProxyActivationError(message, {
          planId: candidatePlanId,
          webshareMeta: {
            ...(params.currentMeta ?? {}),
            webshare_account_id: webshareContext.accountId ?? null,
            webshare_pool_key: webshareContext.poolKey ?? null,
            target_proxy_count: bufferedDemand.totalQuantity,
            target_proxy_countries: demand.proxyCountries,
            target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
              ? 'unlimited'
              : bufferedDemand.totalBandwidthGb,
            purchase_error: message,
            purchase_error_code: 'retryable_webshare_error',
          },
          code: 'purchase_retry',
        });
      }

      throw new RetryableProxyActivationError(message, {
        planId: candidatePlanId,
        webshareMeta: {
          ...(params.currentMeta ?? {}),
          webshare_account_id: webshareContext.accountId ?? null,
          webshare_pool_key: webshareContext.poolKey ?? null,
          target_proxy_count: bufferedDemand.totalQuantity,
          target_proxy_countries: demand.proxyCountries,
          target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
            ? 'unlimited'
            : bufferedDemand.totalBandwidthGb,
          purchase_error: message,
          purchase_error_code: 'manual_purchase_required',
        },
        code: 'manual_purchase_required',
      });
    }
  }

  private async activateNonRotatingOrder(params: {
    userId: string;
    order: ProxyOrderRow;
    label: string;
    config: WebshareOrderConfig;
  }): Promise<ProxyOrderRow> {
    let planId = Number(params.order.webshare_plan_id || 0) || null;
    const provisioningAction = this.getOrderProvisioningAction(params.order);
    let webshareMeta: Record<string, unknown> | null =
      params.order.webshare_meta ?? null;
    if (webshareMeta?.force_reconfigure != null) {
      const nextMeta = { ...webshareMeta };
      delete nextMeta.force_reconfigure;
      webshareMeta = nextMeta;
    }

    const ensuredPlan = await this.ensurePlanCapacityForNonRotating({
      order: params.order,
      config: params.config,
      currentPlanId: planId,
      currentMeta: webshareMeta,
    });
    planId = ensuredPlan.planId;
    webshareMeta = ensuredPlan.meta ?? webshareMeta;
    const webshareContext = this.getWebshareContext({
      order: {
        ...params.order,
        webshare_meta: webshareMeta,
      },
      productCode: params.config.product.code,
      query: params.config.query,
    });
    if (provisioningAction === 'update') {
      await this.computeTargetPlanDemand({
        order: params.order,
        config: params.config,
        targetAccountId: webshareContext.accountId,
        targetPoolKey: webshareContext.poolKey,
      });
    }

    const proxyList = await this.proxyMasterService.listWebshareProxies({
      mode: 'direct',
      planId,
      accountId: webshareContext.accountId,
      poolKey: webshareContext.poolKey,
      query: webshareContext.query,
    });
    const proxies = this.mapWebshareProxyListToRows(
      proxyList,
      params.config.product.code,
      params.order.id,
    );
    const syncedProxyCountries = this.buildProxyCountryDistribution(proxies);
    const nextWebshareMeta = {
      ...(webshareMeta ?? {}),
      synced_proxy_count: proxies.length,
      synced_proxy_countries: syncedProxyCountries,
    };
    if (!proxies.length) {
          throw new RetryableProxyActivationError(
            'Webshare chưa trả về proxy khả dụng. Hệ thống sẽ tự thử lại sau ít phút.',
            {
              planId,
              webshareMeta: {
                ...(webshareMeta ?? {}),
                proxy_list_count: proxyList.length,
            mapped_proxy_count: proxies.length,
          },
          code: 'proxy_not_ready',
        },
      );
    }

    const updatedOrder = await this.databaseService.transaction(async (trx) => {
      await this.repo.upsertUserProxies(params.userId, proxies, trx);
      return this.repo.updateProxyOrder(
        params.order.id,
        {
          status: 'active',
          webshare_plan_id: planId,
          webshare_subuser_id: null,
          webshare_account_id: webshareContext.accountId ?? null,
          webshare_pool_key: webshareContext.poolKey ?? null,
          webshare_status: 'active',
          webshare_error: null,
          webshare_meta: nextWebshareMeta,
          webshare_activated_at: new Date(),
          expires_at:
            params.order.expires_at ?? this.calculateOrderExpiry(params.order),
        },
        trx,
      );
    });

    await this.notifyProxyOrderActivated(
      updatedOrder,
      params.config.product.code,
    );
    await this.finalizeSupersededOrderAfterActivation(
      updatedOrder,
      params.config.product.code,
    );
    await this.disableWebshareAutoRenewForOrder({
      order: updatedOrder,
      productCode: params.config.product.code,
    });

    return updatedOrder;
  }

  private async activateProxyOrder(params: {
    userId: string;
    order: ProxyOrderRow;
    priceInput: CalculateProxyPriceDto;
    label: string;
  }): Promise<ProxyOrderRow> {
    const config = await this.proxyMasterService.buildWebshareOrderConfig(
      params.priceInput,
    );
    if (config.product.code !== 'rotating_residential') {
      return this.activateNonRotatingOrder({
        userId: params.userId,
        order: params.order,
        label: params.label,
        config: config as WebshareOrderConfig,
      });
    }
    let planId: number | null =
      params.order.webshare_plan_id ??
      (await this.repo.findLatestWebsharePlanIdByUserAndProduct(
        params.userId,
        Number(params.priceInput.product_id),
      ));
    const provisioningAction = this.getOrderProvisioningAction(params.order);
    let webshareMeta: Record<string, unknown> | null =
      params.order.webshare_meta ?? null;
    if (webshareMeta?.force_reconfigure != null) {
      const nextMeta = { ...webshareMeta };
      delete nextMeta.force_reconfigure;
      webshareMeta = nextMeta;
    }
    const baseWebshareContext = this.getWebshareContext({
      order: params.order,
      productCode: config.product.code,
      query: config.query,
    });
    const resolvedCredential = await this.proxyMasterService.resolveWebshareCredential({
      accountId: baseWebshareContext.accountId,
      poolKey: baseWebshareContext.poolKey,
      query: config.query,
    });
    const webshareContext = {
      accountId: resolvedCredential.accountId ?? undefined,
      poolKey: resolvedCredential.poolKey ?? baseWebshareContext.poolKey,
      query: config.query,
    };
    const bufferFactor = await this.getPoolBufferFactor({
      accountId: webshareContext.accountId,
      poolKey: webshareContext.poolKey,
    });
    if (provisioningAction === 'update') {
      await this.computeTargetPlanDemand({
        order: params.order,
        config,
        targetAccountId: webshareContext.accountId,
        targetPoolKey: webshareContext.poolKey,
      });
    }
    webshareMeta = {
      ...(webshareMeta ?? {}),
      webshare_account_id: webshareContext.accountId ?? null,
      webshare_pool_key: webshareContext.poolKey ?? null,
    };

    if (planId) {
      try {
        const isCompatible = await this.proxyMasterService.isPlanCompatibleWithQuery(
          planId,
          config.query,
          webshareContext,
        );
        if (!isCompatible) {
          webshareMeta = {
            ...(webshareMeta ?? {}),
            ignored_plan_id: planId,
            ignored_plan_reason: 'mismatch_proxy_profile',
          };
          planId = null;
        }
      } catch (error) {
        this.logger.warn(
          `Plan compatibility check failed for order ${params.order.id}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }

    if (!planId) {
      try {
        const matchedPlanId = await this.proxyMasterService.findActivePlanIdByQuery(
          config.query,
          webshareContext,
        );
        if (matchedPlanId) {
          planId = matchedPlanId;
          webshareMeta = {
            ...(webshareMeta ?? {}),
            reused_plan_id: matchedPlanId,
            reused_plan_source: 'webshare_plan_lookup',
          };
        }
      } catch (error) {
        this.logger.warn(
          `Active plan lookup failed for order ${params.order.id}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }

    let allowHistoryPlan = true;
    const ensurePlanId = async () => {
      if (planId) return;
      try {
        const demand = await this.computeTargetPlanDemand({
          order: params.order,
          config,
          targetAccountId: webshareContext.accountId,
          targetPoolKey: webshareContext.poolKey,
        });
        const bufferedDemand = this.applyBufferedDemand(
          demand,
          bufferFactor,
          config.mode,
        );
        const rotatingPurchaseQuery: Record<string, unknown> = {
          ...config.query,
          bandwidth_limit: bufferedDemand.requiresUnlimitedBandwidth
            ? 0
            : bufferedDemand.totalBandwidthGb,
          subusers_total: Math.max(3, demand.activeSubusers + 1),
        };
        const purchaseResult =
          await this.proxyMasterService.purchaseWebsharePlan(
            rotatingPurchaseQuery,
            webshareContext,
          );
        webshareMeta = {
          ...(purchaseResult.raw ?? {}),
          ...(webshareMeta ?? {}),
          webshare_account_id:
            purchaseResult.account?.id ??
            webshareContext.accountId ??
            null,
          webshare_pool_key:
            purchaseResult.account?.pool_key ??
            webshareContext.poolKey ??
            null,
          target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
            ? 'unlimited'
            : bufferedDemand.totalBandwidthGb,
          upgrade_query: rotatingPurchaseQuery,
        };
        if (purchaseResult.paymentRequired) {
          throw new BadRequestException(
            'Webshare yêu cầu thanh toán. Vui lòng nạp credits vào tài khoản Webshare.',
          );
        }
        planId = purchaseResult.planId;
      } catch (error) {
        const detail = this.proxyMasterService.getWebshareErrorMessage(error);
        const message =
          detail ?? (error instanceof Error ? error.message : 'Webshare tạm lỗi');
        if (this.proxyMasterService.isPlanSameProxyTypeExistsError(error)) {
          const historyPlanIdCandidate = allowHistoryPlan
            ? await this.repo.findLatestWebsharePlanIdByUserAndProduct(
                params.userId,
                Number(params.priceInput.product_id),
              )
            : null;
          let historyPlanId: number | null = null;
          if (historyPlanIdCandidate) {
            const isHistoryCompatible =
              await this.proxyMasterService.isPlanCompatibleWithQuery(
                historyPlanIdCandidate,
                config.query,
                webshareContext,
              );
            if (isHistoryCompatible) {
              historyPlanId = historyPlanIdCandidate;
            } else {
              webshareMeta = {
                ...(webshareMeta ?? {}),
                ignored_plan_id: historyPlanIdCandidate,
                ignored_plan_reason: 'mismatch_proxy_profile',
              };
            }
          }

          const matchedPlanId = await this.proxyMasterService.findActivePlanIdByQuery(
            config.query,
            webshareContext,
          );
          const fallbackPlanId = historyPlanId ?? matchedPlanId;
          if (fallbackPlanId) {
            const source = historyPlanId
              ? 'user_history'
              : 'webshare_plan_lookup';
            webshareMeta = {
              ...(webshareMeta ?? {}),
              reused_plan_id: fallbackPlanId,
              reused_plan_source: source,
            };
            planId = fallbackPlanId;
            return;
          }
          throw new BadRequestException(
            `${message}. Không tìm thấy plan cùng loại để tái sử dụng.`,
          );
        }

        const matchedPlanId = await this.proxyMasterService.findActivePlanIdByQuery(
          config.query,
          webshareContext,
        );
        if (matchedPlanId) {
          webshareMeta = {
            ...(webshareMeta ?? {}),
            reused_plan_id: matchedPlanId,
            reused_plan_source: 'webshare_plan_lookup_after_error',
          };
          planId = matchedPlanId;
          return;
        }

        if (this.proxyMasterService.isRecaptchaRequiredError(error)) {
          throw new BadRequestException(
            'Webshare yêu cầu reCAPTCHA khi tạo plan mới. Vui lòng tạo sẵn plan rotating trên Webshare hoặc dùng plan active để hệ thống tái sử dụng.',
          );
        }

        if (this.proxyMasterService.isRetryableWebshareError(error)) {
          throw new RetryableProxyActivationError(message, {
            planId,
            webshareMeta,
          });
        }
        if (detail) {
          throw new BadRequestException(message);
        }
        throw error;
      }
    };

    if (planId) {
      webshareMeta = {
        ...(webshareMeta ?? {}),
        reused_plan_id: planId,
        reused_plan_source: 'user_history',
      };
    } else {
      await ensurePlanId();
    }

    if (!planId) {
      throw new BadRequestException('Không thể xác định plan Webshare');
    }

    if (!planId) {
      await ensurePlanId();
    }

    let proxyList: Array<Record<string, unknown>> = [];
    let retriedListWithoutPlan = false;
    while (true) {
      try {
        const rotatingFetchOptions =
          config.product.code === 'rotating_residential'
            ? {
                pageSize: this.rotatingFetchPageSize,
                maxPages: this.rotatingFetchMaxPages,
                maxResults: this.rotatingFetchMaxResults,
              }
            : {};
        proxyList = await this.proxyMasterService.listWebshareProxies({
          mode: config.mode,
          planId,
          accountId: webshareContext.accountId,
          poolKey: webshareContext.poolKey,
          query: webshareContext.query,
          ...rotatingFetchOptions,
        });
        break;
      } catch (error) {
        if (
          planId &&
          !retriedListWithoutPlan &&
          this.proxyMasterService.isPlanAccessDeniedError(error)
        ) {
          planId = null;
          allowHistoryPlan = false;
          retriedListWithoutPlan = true;
          continue;
        }
        const detail = this.proxyMasterService.getWebshareErrorMessage(error);
        const message =
          detail ??
          (error instanceof Error ? error.message : 'Webshare tạm lỗi');
        if (this.proxyMasterService.isRetryableWebshareError(error)) {
          throw new RetryableProxyActivationError(message, {
            planId,
            webshareMeta,
          });
        }
        if (detail) {
          throw new BadRequestException(message);
        }
        throw error;
      }
    }

    const proxies = this.mapWebshareProxyListToRows(
      proxyList,
      config.product.code,
      params.order.id,
      config.mode === 'backbone' ? this.rotatingBackboneHost : undefined,
    );
    const syncedProxyCountries = this.buildProxyCountryDistribution(proxies);
    const nextWebshareMeta = {
      ...(webshareMeta ?? {}),
      synced_proxy_count: proxies.length,
      synced_proxy_countries: syncedProxyCountries,
    };

    if (proxies.length === 0) {
          throw new RetryableProxyActivationError(
            'Webshare chưa trả về proxy khả dụng. Hệ thống sẽ tự thử lại sau ít phút.',
            {
              planId,
              webshareMeta: {
                ...(webshareMeta ?? {}),
                proxy_list_count: proxyList.length,
            mapped_proxy_count: proxies.length,
          },
          code: 'proxy_not_ready',
        },
      );
    }

    const updatedOrder = await this.databaseService.transaction(async (trx) => {
      await this.repo.upsertUserProxies(params.userId, proxies, trx);
      return this.repo.updateProxyOrder(
        params.order.id,
        {
          status: 'active',
          webshare_plan_id: planId,
          webshare_subuser_id: null,
          webshare_account_id: webshareContext.accountId ?? null,
          webshare_pool_key: webshareContext.poolKey ?? null,
          webshare_status: 'active',
          webshare_error: null,
          webshare_meta: nextWebshareMeta,
          webshare_activated_at: new Date(),
          expires_at:
            params.order.expires_at ?? this.calculateOrderExpiry(params.order),
        },
        trx,
      );
    });

    await this.notifyProxyOrderActivated(updatedOrder, config.product.code);
    await this.finalizeSupersededOrderAfterActivation(
      updatedOrder,
      config.product.code,
    );
    await this.disableWebshareAutoRenewForOrder({
      order: updatedOrder,
      productCode: config.product.code,
    });

    return updatedOrder;
  }

  private async recoverOrderFromExistingWebshare(
    order: ProxyOrderRow,
  ): Promise<boolean> {
    const productCode = await this.repo.findProxyProductCodeById(
      Number(order.product_id),
    );
    if (!productCode || !this.isSupportedProxyType(productCode)) {
      return false;
    }

    let planId = this.getOrderPlanId(order);
    const mode: 'direct' | 'backbone' =
      productCode === 'rotating_residential' ? 'backbone' : 'direct';

    const rotatingFetchOptions =
      productCode === 'rotating_residential'
        ? {
            pageSize: this.rotatingFetchPageSize,
            maxPages: this.rotatingFetchMaxPages,
            maxResults: this.rotatingFetchMaxResults,
          }
        : {};
    const webshareContext = this.getWebshareContext({
      order,
      productCode,
    });

    let proxyList: Array<Record<string, unknown>> = [];
    try {
      proxyList = await this.proxyMasterService.listWebshareProxies({
        mode,
        planId,
        accountId: webshareContext.accountId,
        poolKey: webshareContext.poolKey,
        query: webshareContext.query,
        ...rotatingFetchOptions,
      });
    } catch (error) {
      this.logger.warn(
        `List proxies by current plan failed for order ${order.id}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
    let mapped = this.mapWebshareProxyListToRows(
      proxyList,
      productCode,
      order.id,
      mode === 'backbone' ? this.rotatingBackboneHost : undefined,
    );
    // Fallback: local plan_id may be stale after Webshare upgrade succeeded.
    if (!mapped.length) {
      try {
        const matchedPlanId = await this.proxyMasterService.findActivePlanIdByQuery(
          webshareContext.query ?? {},
          webshareContext,
        );
        if (
          Number.isFinite(Number(matchedPlanId ?? 0)) &&
          Number(matchedPlanId) > 0 &&
          Number(matchedPlanId) !== Number(planId ?? 0)
        ) {
          planId = Math.trunc(Number(matchedPlanId));
          proxyList = await this.proxyMasterService.listWebshareProxies({
            mode,
            planId,
            accountId: webshareContext.accountId,
            poolKey: webshareContext.poolKey,
            query: webshareContext.query,
            ...rotatingFetchOptions,
          });
          mapped = this.mapWebshareProxyListToRows(
            proxyList,
            productCode,
            order.id,
            mode === 'backbone' ? this.rotatingBackboneHost : undefined,
          );
        }
      } catch (error) {
        this.logger.warn(
          `Fallback recover by account for order ${order.id} failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
    if (!mapped.length) return false;
    const syncedProxyCountries = this.buildProxyCountryDistribution(mapped);
    const nextWebshareMeta = {
      ...(this.clearRetryMeta(order) ?? {}),
      synced_proxy_count: mapped.length,
      synced_proxy_countries: syncedProxyCountries,
    };

    await this.databaseService.transaction(async (trx) => {
      await this.repo.deleteProxiesByOrderId(order.id, trx);
      await this.repo.upsertUserProxies(order.user_id, mapped, trx);
      await this.repo.updateProxyOrder(
        order.id,
        {
          status: 'active',
          webshare_plan_id: planId ?? order.webshare_plan_id ?? null,
          webshare_subuser_id: null,
          webshare_account_id: webshareContext.accountId ?? null,
          webshare_pool_key: webshareContext.poolKey ?? null,
          webshare_status: 'active',
          webshare_error: null,
          webshare_meta: nextWebshareMeta,
          webshare_activated_at: new Date(),
          expires_at: order.expires_at ?? this.calculateOrderExpiry(order),
        },
        trx,
      );
    });

    if (
      String(order.status ?? '').trim().toLowerCase() !== 'active' ||
      String(order.webshare_status ?? '').trim().toLowerCase() !== 'active'
    ) {
      const refreshedOrder = await this.repo.findProxyOrderByIdAndUserId(
        order.id,
        order.user_id,
      );
      if (refreshedOrder) {
        await this.notifyProxyOrderActivated(refreshedOrder, productCode);
        await this.finalizeSupersededOrderAfterActivation(
          refreshedOrder,
          productCode,
        );
        await this.disableWebshareAutoRenewForOrder({
          order: refreshedOrder,
          productCode,
        });
      }
    }

    return true;
  }


  async getProxiesList(userId: string, query: GetProxiesQueryDto) {
    const { page, limit, orderBy, orderDir } = query.paginationOptions;
    const offset = query.offset;
    const loginMethod = query.login_method as
      | 'username_password'
      | 'ip_whitelist'
      | undefined;
    const connectionMethod = query.connection_method as
      | 'direct'
      | 'socks5'
      | 'http'
      | undefined;
    const { order: filteredOrder, proxyType: resolvedProxyType } =
      await this.resolveOrderFilter({
        userId,
        orderId: query.order_id,
        proxyType: query.proxy_type,
      });

    if (offset === 0 && loginMethod !== 'ip_whitelist') {
      const orderStatus = String(filteredOrder?.status ?? '').toLowerCase();
      if (!filteredOrder || orderStatus === 'active') {
        await this.syncWebshareProxies(userId, resolvedProxyType);
      } else if (orderStatus === 'pending') {
        try {
          await this.recoverOrderFromExistingWebshare(filteredOrder);
        } catch (error) {
          this.logger.warn(
            `Recover pending order ${filteredOrder.id} on list failed: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }
    }
    const safeOrderBy =
      [
        'address',
        'port',
        'country_code',
        'city',
        'status',
        'last_checked_at',
        'created_at',
      ].includes(orderBy) || orderBy === 'id'
        ? orderBy === 'id'
          ? 'id'
          : orderBy
        : 'created_at';

    const items: ProxyRow[] = await this.repo.findProxiesByUserId(userId, {
      offset,
      limit,
      search: query.search,
      country_codes: query.country_codes,
      proxy_type: resolvedProxyType,
      order_id: filteredOrder?.id,
      login_method: loginMethod,
      connection_method: connectionMethod,
      orderBy: safeOrderBy,
      orderDir: orderDir ?? 'desc',
    });
    const total: number = await this.repo.countProxiesByUserId(userId, {
      search: query.search,
      country_codes: query.country_codes,
      proxy_type: resolvedProxyType,
      order_id: filteredOrder?.id,
      login_method: loginMethod,
      connection_method: connectionMethod,
    });

    return {
      data: items,
      meta: createPaginationMeta({ total, page, limit }),
    };
  }

  async getProxiesDownload(
    userId: string,
    format: 'json' | 'txt',
    country_codes?: string[],
    proxy_type?: string,
    order_id?: string,
  ) {
    const { order: filteredOrder, proxyType: resolvedProxyType } =
      await this.resolveOrderFilter({
        userId,
        orderId: order_id,
        proxyType: proxy_type,
      });

    const orderStatus = String(filteredOrder?.status ?? '').toLowerCase();
    if (!filteredOrder || orderStatus === 'active') {
      await this.syncWebshareProxies(userId, resolvedProxyType);
    } else if (orderStatus === 'pending') {
      try {
        await this.recoverOrderFromExistingWebshare(filteredOrder);
      } catch (error) {
        this.logger.warn(
          `Recover pending order ${filteredOrder.id} on download failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }
    const items = await this.repo.findAllProxiesForDownload(
      userId,
      country_codes,
      resolvedProxyType,
      filteredOrder?.id,
    );
    if (format === 'txt') {
      const lines = items.map(
        (p) => `${p.address}:${p.port}:${p.username}:${p.password}`,
      );
      return { format: 'txt' as const, content: lines.join('\n') };
    }
    return { format: 'json' as const, data: items };
  }

  async getRotatingProxyStatus(userId: string) {
    const rotatingOrder = await this.repo.findLatestOrderByUserAndProductCode(
      userId,
      'rotating_residential',
      ['active', 'pending'],
    );
    if (!rotatingOrder) {
      return null;
    }

    const planId = this.getOrderPlanId(rotatingOrder);
    if (!planId) {
      return {
        plan_id: null,
        state: null,
        countries: [],
        username: null,
        password: null,
        is_proxy_used: null,
      };
    }

    const webshareContext = this.getWebshareContext({
      order: rotatingOrder,
      productCode: 'rotating_residential',
    });
    const status = await this.proxyMasterService.getWebshareProxyListStatus({
      planId,
      accountId: webshareContext.accountId,
      poolKey: webshareContext.poolKey,
      query: webshareContext.query,
    });
    const countriesRaw = status.countries as Record<string, unknown> | undefined;
    const countries = Object.entries(countriesRaw ?? {})
      .map(([code, availableCount]) => ({
        code: String(code || '')
          .trim()
          .toUpperCase(),
        available_count: Math.max(0, Math.trunc(Number(availableCount || 0))),
      }))
      .filter((item) => /^[A-Z]{2}$/.test(item.code))
      .sort((a, b) => b.available_count - a.available_count);

    return {
      plan_id: planId,
      state: String(status.state ?? ''),
      countries,
      username:
        typeof status.username === 'string' ? String(status.username) : null,
      password:
        typeof status.password === 'string' ? String(status.password) : null,
      is_proxy_used:
        typeof status.is_proxy_used === 'boolean'
          ? status.is_proxy_used
          : null,
    };
  }

  async getCountryFilters(userId: string) {
    const rows = await this.repo.findUserCountryFilters(userId);
    return { country_codes: rows.map((r) => r.country_code) };
  }

  async putCountryFilters(userId: string, country_codes: string[]) {
    await this.repo.replaceUserCountryFilters(userId, country_codes);
    return { country_codes: [...new Set(country_codes)] };
  }

  async checkLiveProxies(userId: string | undefined, dto: CheckLiveProxiesDto) {
    const hasProxyIds = Array.isArray(dto.proxy_ids) && dto.proxy_ids.length > 0;
    const hasCustomProxies =
      Array.isArray(dto.custom_proxies) && dto.custom_proxies.length > 0;

    if (hasProxyIds && hasCustomProxies) {
      throw new BadRequestException(
        'Vui lòng chỉ gửi proxy_ids hoặc custom_proxies trong một lần kiểm tra',
      );
    }

    const proxyType = dto.proxy_type ?? 'rotating_residential';
    const limit = Math.min(
      Math.max(dto.limit ?? this.liveCheckDefaultLimit, 1),
      this.liveCheckMaxLimit,
    );
    const timeout = Math.min(
      Math.max(dto.timeout_ms ?? this.liveCheckTimeoutMs, 2000),
      15000,
    );
    const testUrl = dto.test_url?.trim() || this.liveCheckUrl;

    type LiveCheckTarget = {
      result_id: number;
      persist_id?: number;
      client_id?: string;
      address: string;
      port: number;
      username?: string;
      password?: string;
      proxy_protocol: 'auto' | 'http' | 'socks5';
    };

    let requested = 0;
    let targets: LiveCheckTarget[] = [];

    if (hasCustomProxies) {
      const customProxies = dto.custom_proxies ?? [];
      requested = customProxies.length;
      targets = [];
      customProxies.forEach((item, idx) => {
        const address = item.address?.trim();
        const port = Number(item.port);
        if (!address || !Number.isFinite(port) || port <= 0) {
          return;
        }
        const username = item.username?.trim();
        const password = item.password?.trim();
        targets.push({
          result_id: idx + 1,
          client_id: item.client_id?.trim() || undefined,
          address,
          port,
          username: username || undefined,
          password: password || undefined,
          proxy_protocol: this.normalizeProxyProtocol(item.proxy_protocol),
        });
      });
    } else {
      if (!userId) {
        throw new UnauthorizedException(
          'Bạn cần đăng nhập để kiểm tra proxy từ danh sách đã mua',
        );
      }
      const proxies = hasProxyIds
        ? await this.repo.findProxiesByIds(userId, dto.proxy_ids!, proxyType)
        : await this.repo.findProxiesForCheck(userId, {
            proxy_type: proxyType,
            limit,
          });
      requested = hasProxyIds ? (dto.proxy_ids?.length ?? 0) : proxies.length;
      targets = proxies.map((proxy) => ({
        result_id: proxy.id,
        persist_id: proxy.id,
        address: proxy.address,
        port: proxy.port,
        username: proxy.username,
        password: proxy.password,
        proxy_protocol: 'http',
      }));
    }

    if (!targets.length) {
      return {
        data: [],
        meta: {
          requested,
          checked: 0,
          success: 0,
        },
      };
    }

    const checkedAt = new Date();
    const results = await this.runWithConcurrency(
      targets,
      this.liveCheckConcurrency,
      async (proxy) => {
        const startedAt = Date.now();
        let status = 'dead';
        let error: string | null = null;
        let usedProtocol: 'http' | 'socks5' | null = null;
        let publicIp: string | null = null;
        let countryCode: string | null = null;
        const protocolsToTry: Array<'http' | 'socks5'> =
          proxy.proxy_protocol === 'auto'
            ? ['http', 'socks5']
            : [proxy.proxy_protocol];

        for (const protocol of protocolsToTry) {
          usedProtocol = protocol;
          const result = await this.runSingleProxyCheck({
            protocol,
            testUrl,
            timeout,
            address: proxy.address,
            port: proxy.port,
            username: proxy.username,
            password: proxy.password,
          });
          status = result.status;
          error = result.error;
          publicIp = result.public_ip;
          countryCode = result.country_code;
          if (status === 'active') break;
          const shouldTrySocksFallback =
            proxy.proxy_protocol === 'auto' &&
            protocol === 'http' &&
            !String(error ?? '').startsWith('HTTP ') &&
            this.isLikelyHttpProxyFailure(new Error(error ?? ''));
          if (!shouldTrySocksFallback) break;
        }

        if (proxy.persist_id) {
          await this.repo.updateProxyCheck(proxy.persist_id, {
            status,
            last_checked_at: checkedAt,
          });
        }

        return {
          id: proxy.result_id,
          client_id: proxy.client_id ?? null,
          address: proxy.address,
          port: proxy.port,
          proxy_protocol:
            usedProtocol ??
            (proxy.proxy_protocol === 'auto' ? 'http' : proxy.proxy_protocol),
          status,
          response_time_ms: Date.now() - startedAt,
          checked_at: checkedAt,
          error,
          public_ip: publicIp,
          country_code: countryCode,
        };
      },
    );

    const success = results.filter((r) => r.status === 'active').length;
    return {
      data: results,
      meta: {
        requested,
        checked: results.length,
        success,
      },
    };
  }

  async createOrder(userId: string, dto: CreateProxyOrderDto) {
    const amount = Number(dto.amount_total ?? 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new BadRequestException('Số tiền thanh toán không hợp lệ');
    }
    const idempotencyKey = String(dto.idempotency_key ?? '').trim();
    if (idempotencyKey.length < 16 || idempotencyKey.length > 128) {
      throw new BadRequestException('idempotency_key không hợp lệ');
    }

    const priceInput: CalculateProxyPriceDto = {
      product_id: dto.product_id,
      exclusivity_option_id: dto.exclusivity_option_id,
      exclusivity_value: dto.exclusivity_value,
      quantity_option_id: dto.quantity_option_id,
      quantity_value: dto.quantity_value,
      proxy_countries: this.normalizeProxyCountriesInput(dto.proxy_countries),
      bandwidth_option_id: dto.bandwidth_option_id,
      bandwidth_value: dto.bandwidth_value,
      location_id: dto.location_id,
      additional_feature_id: dto.additional_feature_id,
      billing_cycle: dto.billing_cycle,
      discount_percent: dto.discount_percent,
    };
    const requestFingerprint = this.buildCreateOrderRequestFingerprint({
      userId,
      amount,
      dto: priceInput,
    });
    const existingByIdempotency = await this.repo.findSuccessfulPaymentByIdempotencyKey(
      userId,
      idempotencyKey,
    );
    if (existingByIdempotency) {
      const existingFingerprint = String(
        (
          (existingByIdempotency.transaction.metadata as Record<string, unknown> | null) ??
          {}
        ).request_fingerprint ?? '',
      ).trim();
      if (existingFingerprint && existingFingerprint !== requestFingerprint) {
        throw new BadRequestException(
          'idempotency_key đã được sử dụng cho payload khác',
        );
      }
      return existingByIdempotency.order;
    }

    const priceResult = await this.calculatePrice(userId, priceInput);
    // Validate order config trước khi trừ tiền để tránh đơn bị hoàn vì thiếu dữ liệu retry.
    const orderConfigPreview =
      await this.proxyMasterService.buildWebshareOrderConfig(priceInput);
    const requestedPoolKey = this.proxyMasterService.derivePoolKeyFromQuery(
      orderConfigPreview.query,
    );
    const resolvedCredential = await this.tryReserveCredentialForUserPurchase({
      userId,
      context: {
        poolKey: requestedPoolKey ?? undefined,
        query: orderConfigPreview.query,
        requestedQuantity:
          Number.isFinite(orderConfigPreview.proxyCount) &&
          orderConfigPreview.proxyCount > 0
            ? orderConfigPreview.proxyCount
            : null,
        requestedBandwidthGb:
          Number.isFinite(orderConfigPreview.bandwidth) &&
          orderConfigPreview.bandwidth >= 0
            ? orderConfigPreview.bandwidth
            : null,
        requiresUnlimitedBandwidth:
          Number(orderConfigPreview.bandwidth ?? 0) === 0,
      },
    });
    const usdTotal = this.toNumber((priceResult as { total?: number }).total);
    if (usdTotal <= 0) {
      throw new BadRequestException(
        'Không thể tính giá thanh toán cho cấu hình đã chọn',
      );
    }

    const usdToVndRate = 26000;
    const subtotalVnd = this.ceil(usdTotal * usdToVndRate);
    const vatVnd = this.ceil(subtotalVnd * 0.1);
    const minimumPayableVnd = subtotalVnd + vatVnd;
    if (Math.abs(amount - minimumPayableVnd) > 0) {
      throw new BadRequestException(
        `Số tiền thanh toán không hợp lệ. Cần thanh toán chính xác: ${minimumPayableVnd}`,
      );
    }

    const { order } =
      await this.databaseService.transaction(
      async (trx) => {
        await trx.raw('SELECT pg_advisory_xact_lock(hashtext(?))', [
          `proxy-order:${userId}:${idempotencyKey}`,
        ]);
        const existingInTxn = await this.repo.findSuccessfulPaymentByIdempotencyKey(
          userId,
          idempotencyKey,
          trx,
        );
        if (existingInTxn) {
          const existingFingerprint = String(
            (
              (existingInTxn.transaction.metadata as Record<string, unknown> | null) ??
              {}
            ).request_fingerprint ?? '',
          ).trim();
          if (existingFingerprint && existingFingerprint !== requestFingerprint) {
            throw new BadRequestException(
              'idempotency_key đã được sử dụng cho payload khác',
            );
          }
          return { order: existingInTxn.order };
        }

        let wallet = await this.walletRepository.findByUserId(userId, trx);
        if (!wallet) {
          wallet = await this.walletRepository.createWallet(userId, trx);
        }
        if (wallet.is_locked) {
          throw new BadRequestException(ErrorCode.WALLET_IS_LOCKED);
        }
        if (Number(wallet.balance) < amount) {
          throw new BadRequestException(ErrorCode.WALLET_INSUFFICIENT_BALANCE);
        }

        const requestedProxyCountries = this.normalizeProxyCountriesInput(
          dto.proxy_countries,
        );
        const requestedQuantityValue = Number(dto.quantity_value);
        const requestedBandwidthValue = Number(dto.bandwidth_value);
        const requestedLocationId = Number(dto.location_id);
        const normalizedLocationId =
          Number.isFinite(requestedLocationId) && requestedLocationId > 0
            ? await trx('proxy_locations')
                .where('id', requestedLocationId)
                .first<{ id: number }>('id')
                .then((row) => (row?.id ? requestedLocationId : null))
            : null;
        const queryProxyType = String(orderConfigPreview.query?.proxy_type ?? '')
          .trim()
          .toLowerCase();
        const queryProxySubtype = String(
          orderConfigPreview.query?.proxy_subtype ?? '',
        )
          .trim()
          .toLowerCase();

        const latestSameProductOrder = await trx('proxy_orders as po')
          .join('proxy_products as pp', 'pp.id', 'po.product_id')
          .where('po.user_id', userId)
          .whereIn('po.status', ['active', 'paid', 'pending', 'processing'])
          .where('pp.code', orderConfigPreview.product.code)
          .select('po.*')
          .orderBy('po.created_at', 'desc')
          .first();
        const nextMeta: Record<string, unknown> = { force_reconfigure: true };
        const provisioningAction = latestSameProductOrder
          ? 'update'
          : 'new_purchase';
        nextMeta.provisioning_action = provisioningAction;
        if (latestSameProductOrder?.id) {
          nextMeta.replaced_order_id = String(latestSameProductOrder.id);
        }
        if (requestedProxyCountries) {
          nextMeta.requested_proxy_countries = requestedProxyCountries;
        }
        if (
          Number.isFinite(requestedQuantityValue) &&
          requestedQuantityValue > 0
        ) {
          nextMeta.requested_quantity_value = requestedQuantityValue;
        }
        if (dto.exclusivity_value) {
          nextMeta.requested_exclusivity_value = String(dto.exclusivity_value);
        }
        if (
          Number.isFinite(requestedBandwidthValue) &&
          requestedBandwidthValue >= 0
        ) {
          nextMeta.requested_bandwidth_value = requestedBandwidthValue;
        }
        if (requestedPoolKey) {
          nextMeta.requested_pool_key = requestedPoolKey;
        }
        const existingAccountId = String(
          latestSameProductOrder?.webshare_account_id ?? '',
        ).trim();
        const existingPoolKey = String(
          latestSameProductOrder?.webshare_pool_key ?? '',
        ).trim();
        const mappedAccountId =
          resolvedCredential?.accountId ??
          (existingAccountId.length > 0 ? existingAccountId : null);
        const mappedPoolKey =
          resolvedCredential?.poolKey ??
          requestedPoolKey ??
          (existingPoolKey.length > 0 ? existingPoolKey : null);
        if (mappedAccountId) {
          nextMeta.webshare_account_id = mappedAccountId;
        }
        if (mappedPoolKey) {
          nextMeta.webshare_pool_key = mappedPoolKey;
        }
        if (resolvedCredential?.source) {
          nextMeta.webshare_account_source = resolvedCredential.source;
        }
        if (queryProxyType) {
          nextMeta.requested_proxy_type = queryProxyType;
        }
        if (queryProxySubtype) {
          nextMeta.requested_proxy_subtype = queryProxySubtype;
        }

        // Luồng mới: luôn tạo order mới ở trạng thái pending để xử lý mua/nâng cấp.
        const nextOrderStatus = 'pending';
        const nextWebshareStatus = 'pending';
        const activationAt = null;

        const order = await this.repo.createProxyOrder(
          userId,
          {
            product_id: dto.product_id,
            exclusivity_option_id: dto.exclusivity_option_id ?? null,
            quantity_option_id: dto.quantity_option_id ?? null,
            bandwidth_option_id: dto.bandwidth_option_id ?? null,
            location_id: normalizedLocationId,
            additional_feature_id: dto.additional_feature_id ?? null,
            discount_percent: dto.discount_percent ?? 0,
            amount_total: amount,
            billing_cycle: dto.billing_cycle,
            status: nextOrderStatus,
            webshare_status: nextWebshareStatus,
            webshare_error: null,
            webshare_activated_at: activationAt,
            expires_at: this.calculateOrderExpiry({
              billing_cycle: dto.billing_cycle,
            }),
            webshare_account_id: mappedAccountId,
            webshare_pool_key: mappedPoolKey,
            webshare_meta: nextMeta,
          },
          trx,
        );

        await this.walletRepository.deductBalance(
          trx,
          wallet.id,
          amount,
          false,
        );

        const transactionNumber = generateTransactionNumber();
        const actionType = provisioningAction === 'update' ? 'upgrade' : 'add';
        const productLabelVi =
          orderConfigPreview.product.code === 'proxy_server'
            ? 'Proxy máy chủ'
            : orderConfigPreview.product.code === 'static_residential'
              ? 'Proxy dân cư tĩnh'
              : orderConfigPreview.product.code === 'rotating_residential'
                ? 'Proxy dân cư xoay'
                : 'Proxy';
        const noteProxyCount =
          Number.isFinite(requestedQuantityValue) && requestedQuantityValue > 0
            ? Math.trunc(requestedQuantityValue)
            : Math.max(0, Math.trunc(Number(orderConfigPreview.proxyCount ?? 0)));
        const noteBandwidthGb =
          Number.isFinite(requestedBandwidthValue) && requestedBandwidthValue >= 0
            ? Math.trunc(requestedBandwidthValue)
            : Math.max(0, Math.trunc(Number(orderConfigPreview.bandwidth ?? 0)));
        const noteVi =
          actionType === 'upgrade'
            ? `Nâng cấp gói lên ${noteProxyCount} ${productLabelVi} với ${noteBandwidthGb} GB`
            : `Thêm mới gói ${noteProxyCount} ${productLabelVi} với ${noteBandwidthGb} GB`;
        await trx('wallet_transactions').insert({
          transaction_number: transactionNumber,
          wallet_id: wallet.id,
          user_id: userId,
          type: 'PROXY',
          method: 'wallet',
          amount,
          fee_amount: 0,
          status: 'success',
          reference_code: order.id,
          note: noteVi,
          created_at: new Date(),
          completed_at: new Date(),
        });

        await this.repo.createProxyTransaction(
          {
            proxy_order_id: order.id,
            type: 'payment',
            amount,
            currency: 'VND',
            status: 'success',
            paid_at: new Date(),
            metadata: {
              source: 'wallet',
              wallet_transaction_number: transactionNumber,
              idempotency_key: idempotencyKey,
              request_fingerprint: requestFingerprint,
              action_type: actionType,
              proxy_count: noteProxyCount,
              bandwidth_gb: noteBandwidthGb,
              note_vi: noteVi,
            },
          },
          trx,
        );

        return { order };
      },
    );

    let finalOrder = order;
    let shouldNotifyPendingPurchase = false;

    if (!String(finalOrder.webshare_account_id ?? '').trim()) {
      finalOrder = await this.markOrderPending({
        order: finalOrder,
        message: 'Đang chờ gán email Webshare từ admin.',
        webshareMeta: finalOrder.webshare_meta ?? null,
        code: 'waiting_webshare_account',
      });
      shouldNotifyPendingPurchase = true;
    } else {
      const label = `bhm-order-${finalOrder.id.slice(0, 8)}`;
      try {
        finalOrder = await this.activateProxyOrder({
          userId,
          order: finalOrder,
          priceInput,
          label,
        });
      } catch (error) {
        const detail = this.proxyMasterService.getWebshareErrorMessage(error);
        const message =
          detail ??
          (error instanceof Error ? error.message : 'Không thể kích hoạt proxy');
        if (error instanceof RetryableProxyActivationError) {
          finalOrder = await this.markOrderPending({
            order: finalOrder,
            message,
            planId: error.details.planId ?? undefined,
            webshareMeta: error.details.webshareMeta ?? undefined,
            code: error.details.code,
          });
          shouldNotifyPendingPurchase = true;
        } else if (this.isWaitingForWebshareAccount(message)) {
          finalOrder = await this.markOrderPending({
            order: finalOrder,
            message,
            webshareMeta: finalOrder.webshare_meta ?? null,
            code: 'waiting_webshare_account',
          });
          shouldNotifyPendingPurchase = true;
        } else {
          finalOrder = await this.markOrderPending({
            order: finalOrder,
            message,
            webshareMeta: finalOrder.webshare_meta ?? null,
            code: 'manual_processing_required',
          });
          shouldNotifyPendingPurchase = true;
        }
      }
    }

    if (shouldNotifyPendingPurchase) {
      const latestMeta = (finalOrder.webshare_meta ?? {}) as Record<
        string,
        unknown
      >;
      const purchaseAction = String(
        latestMeta.provisioning_action ?? '',
      ).trim();
      await this.notifyProxyOrderPurchased({
        order: finalOrder,
        productCode: orderConfigPreview.product.code,
        optionName: this.getProxyOptionLabel({
          poolKey: requestedPoolKey ?? null,
          exclusivityValue: dto.exclusivity_value ?? null,
          proxyType: String(orderConfigPreview.query?.proxy_type ?? ''),
          proxySubtype: String(orderConfigPreview.query?.proxy_subtype ?? ''),
        }),
        billingCycle: dto.billing_cycle,
        amountTotal: amount,
        requestedQuantity:
          Number.isFinite(orderConfigPreview.proxyCount) &&
          orderConfigPreview.proxyCount > 0
            ? orderConfigPreview.proxyCount
            : null,
        requestedBandwidthGb:
          Number.isFinite(orderConfigPreview.bandwidth) &&
          orderConfigPreview.bandwidth >= 0
            ? orderConfigPreview.bandwidth
            : null,
        requestedProxyCountries: this.normalizeProxyCountriesInput(
          dto.proxy_countries,
        ),
        mappedWebshareEmail: resolvedCredential?.accountLabel ?? null,
        provisioningAction:
          purchaseAction === 'update' ? 'update' : 'new_purchase',
      });
    }

    return finalOrder;
  }

  async calculatePrice(userId: string, dto: CalculateProxyPriceDto) {
    const configPreview =
      await this.proxyMasterService.buildWebshareOrderConfig(dto);
    const productCode = configPreview.product.code;
    const reserveContext = {
      poolKey: this.proxyMasterService.derivePoolKeyFromQuery(
        configPreview.query,
      ),
      query: configPreview.query,
      requestedQuantity:
        Number.isFinite(configPreview.proxyCount) && configPreview.proxyCount > 0
          ? configPreview.proxyCount
          : null,
      requestedBandwidthGb:
        Number.isFinite(configPreview.bandwidth) && configPreview.bandwidth >= 0
          ? configPreview.bandwidth
          : null,
      requiresUnlimitedBandwidth: Number(configPreview.bandwidth ?? 0) === 0,
    };
    const reservedCredential = await this.tryReserveCredentialForUserPurchase({
      userId,
      context: reserveContext,
    });

    const latestOrderForProduct = await this.repo.findLatestOrderByUserAndProductCode(
      userId,
      productCode,
      ['active', 'pending', 'paid', 'processing'],
    );
    const hasMappedAccountOnProductOrder = Boolean(
      String(latestOrderForProduct?.webshare_account_id ?? '').trim(),
    );
    const latestMappedOrder = hasMappedAccountOnProductOrder
      ? latestOrderForProduct
      : await this.repo.findLatestMappedWebshareOrderByUser(userId);
    const context = this.getWebshareContext({
      order: latestMappedOrder ?? latestOrderForProduct,
      productCode,
      query: configPreview.query,
    });
    const resolvedCredential = await this.proxyMasterService.resolveWebshareCredential({
      accountId: reservedCredential?.accountId ?? context.accountId,
      poolKey: reservedCredential?.poolKey ?? context.poolKey,
      query: configPreview.query,
      requestedQuantity: reserveContext.requestedQuantity,
      requestedBandwidthGb: reserveContext.requestedBandwidthGb,
      requiresUnlimitedBandwidth: reserveContext.requiresUnlimitedBandwidth,
    });
    const pricingBehavior: 'add' | 'replace' = Boolean(
      String(resolvedCredential?.accountId ?? context.accountId ?? '').trim(),
    )
      ? 'replace'
      : 'add';

    return this.proxyMasterService.calculatePrice(dto, {
      accountId: resolvedCredential.accountId ?? context.accountId,
      poolKey: resolvedCredential.poolKey ?? context.poolKey,
      query: configPreview.query,
      pricingBehavior,
      requestedQuantity:
        Number.isFinite(configPreview.proxyCount) && configPreview.proxyCount > 0
          ? configPreview.proxyCount
          : null,
      requestedBandwidthGb:
        Number.isFinite(configPreview.bandwidth) && configPreview.bandwidth >= 0
          ? configPreview.bandwidth
          : null,
      requiresUnlimitedBandwidth: Number(configPreview.bandwidth ?? 0) === 0,
    });
  }

  async getProxyProductActivationStatus(params: {
    userId: string;
    productCode?: string;
    exclusivityValue?: string;
  }) {
    const productCode = String(params.productCode ?? 'proxy_server')
      .trim()
      .toLowerCase();
    const exclusivityValue = String(params.exclusivityValue ?? 'shared')
      .trim()
      .toLowerCase();

    const activeOrders = await this.repo.findActiveOrdersByUserAndProductCode(
      params.userId,
      productCode,
    );
    const latestActiveOrder = activeOrders[0] ?? null;

    // Rule: chỉ kích hoạt khi user có order active local cho đúng loại proxy.
    if (!latestActiveOrder) {
      return {
        product_code: productCode,
        exclusivity_value: exclusivityValue,
        activated: false,
        webshare_plan_id: null,
        badge_label: 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
        cta_label: 'Mua ngay',
        source: 'local_inactive' as const,
        webshare_account_id: null,
      };
    }

    const context = this.getWebshareContext({
      order: latestActiveOrder,
      productCode,
    });
    const mappedAccountId = String(context.accountId ?? '').trim();

    // Rule: phải có mapping tài khoản WS cho order active thì mới xét đã kích hoạt.
    if (!mappedAccountId) {
      return {
        product_code: productCode,
        exclusivity_value: exclusivityValue,
        activated: false,
        webshare_plan_id: null,
        badge_label: 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
        cta_label: 'Mua ngay',
        source: 'no_mapping' as const,
        webshare_account_id: null,
      };
    }

    const localWebshareStatus = String(latestActiveOrder.webshare_status ?? '')
      .trim()
      .toLowerCase();
    const rawPlanId = Number(latestActiveOrder.webshare_plan_id ?? 0);
    const localPlanId = Number.isFinite(rawPlanId) && rawPlanId > 0 ? rawPlanId : null;
    const activated = localWebshareStatus === 'active' && localPlanId !== null;

    return {
      product_code: productCode,
      exclusivity_value: exclusivityValue,
      activated,
      webshare_plan_id: localPlanId,
      badge_label: activated ? 'ĐÃ KÍCH HOẠT' : 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
      cta_label: activated ? 'Update gói' : 'Mua ngay',
      source: activated ? ('local_db_active' as const) : ('local_db_pending' as const),
      webshare_account_id: mappedAccountId,
    };

  }

  async getOrdersList(userId: string, query: GetProxyOrdersQueryDto) {
    const { page, limit, orderBy, orderDir } = query.paginationOptions;
    const offset = query.offset;

    const items: ProxyOrderRow[] = await this.repo.findProxyOrdersByUserId(
      userId,
      {
        offset,
        limit,
        status: query.status,
        orderBy: orderBy && orderBy !== 'id' ? orderBy : 'created_at',
        orderDir: orderDir ?? 'desc',
      },
    );
    const total: number = await this.repo.countProxyOrdersByUserId(
      userId,
      query.status,
    );

    return {
      data: items,
      meta: createPaginationMeta({ total, page, limit }),
    };
  }

  async getOrderSummary(userId: string, orderId: string) {
    const initialOrder = await this.repo.findProxyOrderByIdAndUserId(orderId, userId);
    if (!initialOrder) {
      throw new NotFoundException('Proxy order not found');
    }
    let order = initialOrder;
    const initialStatus = String(order.status ?? '')
      .trim()
      .toLowerCase();
    const isPendingLike = ['pending', 'paid', 'processing', 'pending_payment'].includes(
      initialStatus,
    );
    if (isPendingLike) {
      try {
        const recovered = await this.recoverOrderFromExistingWebshare(order);
        if (recovered) {
          const refreshedOrder = await this.repo.findProxyOrderByIdAndUserId(
            orderId,
            userId,
          );
          if (refreshedOrder) {
            order = refreshedOrder;
          }
        }
      } catch (error) {
        this.logger.warn(
          `Recover pending order ${order.id} on summary failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }

    const proxyCount = await this.repo.countProxiesByUserId(userId, {
      order_id: order.id,
    });

    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const fallbackUsedBytes = Number(
      meta.bandwidth_used_bytes ??
        meta.used_bandwidth_bytes ??
        meta.total_bandwidth_used ??
        0,
    );
    const fallbackUsedGb = Number(
      meta.bandwidth_used_gb ?? meta.used_bandwidth_gb ?? 0,
    );
    const fallbackLimitGb = Number(
      meta.bandwidth_limit_gb ?? meta.requested_bandwidth_value ?? 0,
    );

    let proxyType: string | null = null;
    let proxySubtype: string | null = null;
    let registeredAt: Date | null = order.created_at ? new Date(order.created_at) : null;
    let expiresAt: Date | null = order.expires_at ? new Date(order.expires_at) : null;
    let bandwidthLimitGb: number | null =
      Number.isFinite(fallbackLimitGb) && fallbackLimitGb > 0
        ? fallbackLimitGb
        : null;
    let bandwidthIsUnlimited = false;
    let bandwidthUsedBytes: number | null =
      Number.isFinite(fallbackUsedBytes) && fallbackUsedBytes >= 0
        ? fallbackUsedBytes
        : null;
    let bandwidthUsedGb: number | null =
      Number.isFinite(fallbackUsedGb) && fallbackUsedGb >= 0
        ? fallbackUsedGb
        : null;

    const planId = this.getOrderPlanId(order);
    if (planId) {
      try {
        const productCode = await this.repo.findProxyProductCodeById(
          Number(order.product_id),
        );
        const webshareContext = this.getWebshareContext({
          order,
          productCode,
        });
        const [plan, stats] = await Promise.all([
          this.proxyMasterService.getWebsharePlanById(planId, {
            accountId: webshareContext.accountId,
            poolKey: webshareContext.poolKey,
            query: webshareContext.query,
          }),
          this.proxyMasterService.getWebshareStats(
            { planId },
            {
              accountId: webshareContext.accountId,
              poolKey: webshareContext.poolKey,
              query: webshareContext.query,
            },
          ),
        ]);

        proxyType =
          typeof plan.proxy_type === 'string' ? String(plan.proxy_type) : null;
        proxySubtype =
          typeof plan.proxy_subtype === 'string'
            ? String(plan.proxy_subtype)
            : null;
        const planRegisteredRaw =
          plan.created_at ?? plan.start_date ?? plan.started_at ?? null;
        if (planRegisteredRaw) {
          const parsedRegistered = new Date(String(planRegisteredRaw));
          if (!Number.isNaN(parsedRegistered.getTime())) {
            registeredAt = parsedRegistered;
          }
        }
        const planRenewalDate = this.getPlanRenewalDate(plan);
        if (planRenewalDate) {
          expiresAt = planRenewalDate;
        }

        const limitRaw = Number(plan.bandwidth_limit);
        if (Number.isFinite(limitRaw) && limitRaw >= 0) {
          if (limitRaw === 0) {
            bandwidthIsUnlimited = true;
            bandwidthLimitGb = null;
          } else {
            bandwidthLimitGb = limitRaw;
          }
        }

        const summedBytes = stats.reduce((sum, row) => {
          const bandwidth = Number(row?.bandwidth_total ?? 0);
          if (!Number.isFinite(bandwidth) || bandwidth < 0) return sum;
          return sum + bandwidth;
        }, 0);
        if (Number.isFinite(summedBytes) && summedBytes >= 0) {
          bandwidthUsedBytes = summedBytes;
          bandwidthUsedGb = this.bytesToGb(summedBytes);
        }
      } catch (error) {
        this.logger.warn(
          `Unable to fetch Webshare summary for order ${order.id}: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }
    }

    if (bandwidthUsedGb == null && bandwidthUsedBytes != null) {
      bandwidthUsedGb = this.bytesToGb(bandwidthUsedBytes);
    }
    if (bandwidthUsedGb == null) {
      bandwidthUsedGb = 0;
    }

    return {
      order_id: order.id,
      status: order.status,
      quantity: proxyCount,
      webshare_plan_id: planId,
      webshare_profile: {
        proxy_type: proxyType,
        proxy_subtype: proxySubtype,
      },
      bandwidth: {
        used_bytes: bandwidthUsedBytes,
        used_gb: bandwidthUsedGb,
        limit_gb: bandwidthLimitGb,
        is_unlimited: bandwidthIsUnlimited,
      },
      registered_at:
        registeredAt && !Number.isNaN(registeredAt.getTime())
          ? registeredAt.toISOString()
          : null,
      expires_at:
        expiresAt && !Number.isNaN(expiresAt.getTime())
          ? expiresAt.toISOString()
          : null,
    };
  }

  async getOrderTransactions(orderId: string, userId: string) {
    const order = await this.repo.findProxyOrderByIdAndUserId(orderId, userId);
    if (!order) {
      throw new NotFoundException('Proxy order not found');
    }
    const transactions =
      await this.repo.findTransactionsByProxyOrderId(orderId);
    return { data: transactions };
  }

  async getMyTransactions(userId: string, page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.repo.findTransactionsByUserId(userId, { offset, limit }),
      this.repo.countTransactionsByUserId(userId),
    ]);
    return {
      data: items,
      meta: createPaginationMeta({ total, page, limit }),
    };
  }

  async getManagedSubUsersForAdmin() {
    const items = await this.repo.findManagedWebshareOrders();
    return {
      data: items.map((item) => ({
        ...item,
        sync_status:
          item.order_status === 'active'
            ? 'Đã đồng bộ'
            : item.order_status === 'paid' ||
                item.order_status === 'pending' ||
                item.order_status === 'processing'
              ? 'Đang kết nối'
              : 'Chưa đồng bộ',
      })),
    };
  }

  async syncOrderFromWebshareForAdmin(orderId: string) {
    const order = await this.repo.findProxyOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Proxy order not found');
    }

    const isPendingLike =
      order.status === 'paid' ||
      order.status === 'pending' ||
      order.status === 'processing';

    if (isPendingLike) {
      const priceInput = this.buildPriceInputFromOrder(order);
      const hydratedOrder =
        (await this.ensurePendingOrderCredential(order, priceInput)) ?? order;

      if (!String(hydratedOrder.webshare_account_id ?? '').trim()) {
        await this.markOrderPending({
          order: hydratedOrder,
          message: 'Đang chờ gán email Webshare từ admin.',
          webshareMeta: hydratedOrder.webshare_meta ?? null,
          code: 'waiting_webshare_account',
        });
        return {
          success: false,
          order_id: hydratedOrder.id,
          status: hydratedOrder.status,
          proxy_count: 0,
          message: 'Đơn đang chờ gán tài khoản Webshare',
        };
      }

      const label = `bhm-order-${hydratedOrder.id.slice(0, 8)}`;
      try {
        const activated = await this.activateProxyOrder({
          userId: hydratedOrder.user_id,
          order: hydratedOrder,
          priceInput,
          label,
        });
        const proxyCount = await this.repo.countProxiesByOrderId(activated.id);
        return {
          success: true,
          order_id: activated.id,
          status: activated.status,
          proxy_count: proxyCount,
          message: 'Đồng bộ và kích hoạt đơn thành công',
        };
      } catch (error) {
        const detail = this.proxyMasterService.getWebshareErrorMessage(error);
        const message =
          detail ??
          (error instanceof Error ? error.message : 'Không thể kích hoạt proxy');
        if (error instanceof RetryableProxyActivationError) {
          await this.markOrderPending({
            order: hydratedOrder,
            message,
            planId: error.details.planId ?? undefined,
            webshareMeta: error.details.webshareMeta ?? undefined,
            code: error.details.code,
          });
          return {
            success: false,
            order_id: hydratedOrder.id,
            status: 'pending',
            proxy_count: 0,
            message,
          };
        }
        if (this.isWaitingForWebshareAccount(message)) {
          await this.markOrderPending({
            order: hydratedOrder,
            message,
            webshareMeta: hydratedOrder.webshare_meta ?? null,
            code: 'waiting_webshare_account',
          });
          return {
            success: false,
            order_id: hydratedOrder.id,
            status: 'pending',
            proxy_count: 0,
            message,
          };
        }
        await this.markOrderPending({
          order: hydratedOrder,
          message,
          webshareMeta: hydratedOrder.webshare_meta ?? null,
          code: 'manual_processing_required',
        });
        return {
          success: false,
          order_id: hydratedOrder.id,
          status: 'pending',
          proxy_count: 0,
          message,
        };
      }
    }

    const recovered = await this.recoverOrderFromExistingWebshare(order);
    if (!recovered) {
      throw new BadRequestException(
        'Không tìm thấy dữ liệu proxy từ Webshare cho đơn hàng này',
      );
    }

    const refreshedOrder = await this.repo.findProxyOrderById(order.id);
    const proxyCount = await this.repo.countProxiesByOrderId(order.id);
    return {
      success: true,
      order_id: order.id,
      status: refreshedOrder?.status ?? order.status,
      proxy_count: proxyCount,
      message: 'Đồng bộ lại đơn từ Webshare thành công',
    };
  }

  async revokeManagedSubUserForAdmin(orderId: string) {
    const order = await this.repo.findProxyOrderById(orderId);
    if (!order) {
      throw new NotFoundException('Proxy order not found');
    }

    await this.databaseService.transaction(async (trx) => {
      await this.repo.deleteProxiesByOrderId(order.id, trx);
      await this.repo.updateProxyOrder(
        order.id,
        {
          status: 'expired',
          webshare_status: 'revoked',
          webshare_error: null,
        },
        trx,
      );
    });

    return {
      success: true,
      order_id: order.id,
      message: 'Đã thu hồi đơn và xoá proxy local',
    };
  }

  async renewOrder(userId: string, orderId: string) {
    const order = await this.repo.findProxyOrderByIdAndUserId(orderId, userId);
    if (!order) {
      throw new NotFoundException('Proxy order not found');
    }

    const priceInput = this.buildPriceInputFromOrder(order);
    const pricing = await this.proxyMasterService.calculatePrice(priceInput);
    const usdTotal = Number(pricing?.total ?? 0);
    if (!Number.isFinite(usdTotal) || usdTotal <= 0) {
      throw new BadRequestException('Không thể tính giá gia hạn cho đơn proxy');
    }

    const usdToVndRate = 26000;
    const subtotalVnd = this.ceil(usdTotal * usdToVndRate);
    const vatVnd = this.ceil(subtotalVnd * 0.1);
    const amount = subtotalVnd + vatVnd;

    const result = await this.databaseService.transaction(async (trx) => {
      let wallet = await this.walletRepository.findByUserId(userId, trx);
      if (!wallet) {
        wallet = await this.walletRepository.createWallet(userId, trx);
      }
      if (wallet.is_locked) {
        throw new BadRequestException(ErrorCode.WALLET_IS_LOCKED);
      }
      if (Number(wallet.balance) < amount) {
        throw new BadRequestException(ErrorCode.WALLET_INSUFFICIENT_BALANCE);
      }

      await this.walletRepository.deductBalance(trx, wallet.id, amount, false);

      const transactionNumber = generateTransactionNumber();
      await trx('wallet_transactions').insert({
        transaction_number: transactionNumber,
        wallet_id: wallet.id,
        user_id: userId,
        type: 'PROXY',
        method: 'wallet',
        amount,
        fee_amount: 0,
        status: 'success',
        reference_code: order.id,
        note: 'Gia hạn proxy',
        created_at: new Date(),
        completed_at: new Date(),
      });

      await this.repo.createProxyTransaction(
        {
          proxy_order_id: order.id,
          type: 'renewal',
          amount,
          currency: 'VND',
          status: 'success',
          paid_at: new Date(),
          metadata: {
            source: 'wallet',
            wallet_transaction_number: transactionNumber,
          },
        },
        trx,
      );

      const expiresAt = this.calculateOrderExpiry(order);
      await this.repo.updateProxyOrder(
        order.id,
        {
          status: 'active',
          expires_at: expiresAt,
          webshare_error: null,
        },
        trx,
      );

      return { amount, expiresAt };
    });

    return {
      success: true,
      order_id: order.id,
      amount: result.amount,
      expires_at: result.expiresAt,
      message: 'Gia hạn proxy thành công',
    };
  }

  async changeOrderPassword(
    userId: string,
    orderId: string,
    newPassword: string,
  ) {
    void userId;
    void orderId;
    void newPassword;
    throw new BadRequestException(
      'Chức năng đổi mật khẩu riêng đã tắt ở chế độ tài khoản global.',
    );
  }

  async processPendingOrders(): Promise<void> {
    const cutoff = new Date(Date.now() - this.retryDelayMs);
    const pendingOrders = await this.repo.findPendingProxyOrders({
      limit: this.retryBatchSize,
      olderThan: cutoff,
    });
    for (const order of pendingOrders) {
      // Always try to recover first in case Webshare already completed
      // but local DB is still pending.
      try {
        const recovered = await this.recoverOrderFromExistingWebshare(order);
        if (recovered) {
          continue;
        }
      } catch (error) {
        this.logger.warn(
          `Recover pending order ${order.id} failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }

      if (this.isRetryPaused(order)) {
        continue;
      }
      const retryCount = this.getRetryCount(order);
      if (retryCount >= this.retryMaxAttempts && this.shouldPauseRetry(order)) {
        await this.repo.updateProxyOrder(order.id, {
          status: 'pending',
          webshare_status: 'pending',
          webshare_error:
            'Tạm dừng tự xử lý sau nhiều lần thử. Vui lòng liên hệ hỗ trợ.',
          webshare_meta: {
            ...(order.webshare_meta ?? {}),
            retry: {
              ...(((order.webshare_meta as Record<string, unknown> | null)
                ?.retry as Record<string, unknown>) ?? {}),
              paused: true,
            },
          },
        });
        continue;
      }

      const priceInput = this.buildPriceInputFromOrder(order);
      const hydratedOrder =
        (await this.ensurePendingOrderCredential(order, priceInput)) ?? order;
      if (!String(hydratedOrder.webshare_account_id ?? '').trim()) {
        await this.markOrderPending({
          order: hydratedOrder,
          message: 'Đang chờ gán email Webshare từ admin.',
          webshareMeta: hydratedOrder.webshare_meta ?? null,
          code: 'waiting_webshare_account',
        });
        continue;
      }
      const label = `bhm-order-${order.id.slice(0, 8)}`;
      try {
        await this.activateProxyOrder({
          userId: hydratedOrder.user_id,
          order: hydratedOrder,
          priceInput,
          label,
        });
      } catch (error) {
        const detail = this.proxyMasterService.getWebshareErrorMessage(error);
        const message =
          detail ??
          (error instanceof Error ? error.message : 'Không thể kích hoạt proxy');
        if (error instanceof RetryableProxyActivationError) {
          await this.markOrderPending({
            order: hydratedOrder,
            message,
            planId: error.details.planId ?? undefined,
            webshareMeta: error.details.webshareMeta ?? undefined,
            code: error.details.code,
          });
          continue;
        }
        if (this.isWaitingForWebshareAccount(message)) {
          await this.markOrderPending({
            order: hydratedOrder,
            message,
            webshareMeta: hydratedOrder.webshare_meta ?? null,
            code: 'waiting_webshare_account',
          });
          continue;
        }
        await this.markOrderPending({
          order: hydratedOrder,
          message,
          webshareMeta: hydratedOrder.webshare_meta ?? null,
          code: 'manual_processing_required',
        });
      }
    }
  }

}
