import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Knex } from 'knex';
import axios from 'axios';
import { ProxyMasterService } from '@/modules/guest/proxy-master/proxy-master.service';
import { ProxyService } from '@/modules/user/proxy/proxy.service';
import { WebshareConfigService } from '@/modules/webshare/webshare-config.service';
import {
  WEBSHARE_POOL_KEYS,
  WebsharePoolKey,
} from '@/modules/webshare/webshare-config.types';
import { UpdateWebshareConfigDto } from './dto/update-webshare-config.dto';
import { TestWebshareConnectionDto } from './dto/test-webshare-connection.dto';
import { GetManagedSubUserOrdersQueryDto } from './dto/get-managed-sub-user-orders-query.dto';

type DashboardOrderRow = {
  id: string;
  status: string;
  product_code: string;
  webshare_plan_id: number | null;
  webshare_meta: Record<string, unknown> | null;
};

type PoolUsage = {
  allocated_proxy_count: number;
  allocated_bandwidth_gb: number;
  has_unlimited_bandwidth_order: boolean;
};

type DashboardPoolRow = {
  pool_key: WebsharePoolKey;
  pool_label: string;
  account_id: string;
  account_label: string;
  account_enabled: boolean;
  purchased_proxy_count: number;
  allocated_proxy_count: number;
  available_proxy_count: number;
  purchased_bandwidth_gb: number | null;
  allocated_bandwidth_gb: number | null;
  available_bandwidth_gb: number | null;
  has_unlimited_bandwidth_plan: boolean;
  has_unlimited_bandwidth_order: boolean;
  active_plan_count: number;
  active_plan_ids: number[];
  used_bandwidth_gb: number | null;
  registered_at: string | null;
  expires_at: string | null;
  health_status: 'healthy' | 'low' | 'over_allocated';
  error: string | null;
  auto_renew_enabled: boolean | null;
  auto_renew_checked_at: string | null;
  auto_renew_error: string | null;
};

@Injectable()
export class WebshareAdminService {
  private readonly logger = new Logger(WebshareAdminService.name);
  private readonly dashboardLowThresholdRatio = 0.15;

  constructor(
    @Inject('KnexConnection')
    private readonly knex: Knex,
    private readonly webshareConfigService: WebshareConfigService,
    private readonly proxyMasterService: ProxyMasterService,
    private readonly proxyService: ProxyService,
  ) {}

  private readonly poolLabels: Record<WebsharePoolKey, string> = {
    proxy_server_shared: 'Proxy máy chủ - Shared',
    proxy_server_private: 'Proxy máy chủ - Private',
    proxy_server_dedicated: 'Proxy máy chủ - Dedicated',
    static_residential_shared: 'Proxy dân cư tĩnh - Shared ISP',
    static_residential_private: 'Proxy dân cư tĩnh - Private ISP',
    static_residential_dedicated: 'Proxy dân cư tĩnh - Dedicated ISP',
    rotating_residential: 'Proxy dân cư xoay',
  };

  private normalizeProxyCountries(
    value: unknown,
  ): Record<string, number> | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return null;
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

    return Object.keys(normalized).length > 0 ? normalized : null;
  }

  private toProxyCountryList(countries: Record<string, number>): Array<{
    country_code: string;
    quantity: number;
  }> {
    return Object.entries(countries)
      .map(([country_code, quantity]) => ({
        country_code,
        quantity: Math.max(1, Math.trunc(Number(quantity) || 0)),
      }))
      .filter((item) => item.quantity > 0)
      .sort((a, b) => {
        if (a.country_code === 'ZZ') return -1;
        if (b.country_code === 'ZZ') return 1;
        if (b.quantity !== a.quantity) return b.quantity - a.quantity;
        return a.country_code.localeCompare(b.country_code);
      });
  }

  private getProxyLowThreshold(total: number) {
    return Math.max(
      5,
      Math.ceil(Math.max(0, total) * this.dashboardLowThresholdRatio),
    );
  }

  private getBandwidthLowThreshold(total: number | null) {
    if (total == null || total <= 0) {
      return null;
    }
    return Math.max(1, Math.ceil(total * this.dashboardLowThresholdRatio));
  }

  private bytesToGb(value: number) {
    return Number((value / 1024 / 1024 / 1024).toFixed(3));
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

  private computeDashboardHealth(params: {
    poolKey: WebsharePoolKey;
    purchasedProxyCount: number;
    availableProxyCount: number;
    purchasedBandwidthGb: number | null;
    availableBandwidthGb: number | null;
    hasUnlimitedBandwidthPlan: boolean;
  }): 'healthy' | 'low' | 'over_allocated' {
    const {
      poolKey,
      purchasedProxyCount,
      availableProxyCount,
      purchasedBandwidthGb,
      availableBandwidthGb,
      hasUnlimitedBandwidthPlan,
    } = params;

    if (poolKey !== 'rotating_residential' && availableProxyCount < 0) {
      return 'over_allocated';
    }

    if (
      !hasUnlimitedBandwidthPlan &&
      availableBandwidthGb != null &&
      availableBandwidthGb < 0
    ) {
      return 'over_allocated';
    }

    const proxyIsLow =
      poolKey !== 'rotating_residential' &&
      purchasedProxyCount > 0 &&
      availableProxyCount <= this.getProxyLowThreshold(purchasedProxyCount);

    const bandwidthThreshold = this.getBandwidthLowThreshold(purchasedBandwidthGb);
    const bandwidthIsLow =
      !hasUnlimitedBandwidthPlan &&
      bandwidthThreshold != null &&
      availableBandwidthGb != null &&
      availableBandwidthGb <= bandwidthThreshold;

    if (proxyIsLow || bandwidthIsLow) {
      return 'low';
    }

    return 'healthy';
  }

  private derivePoolKeyForOrder(order: DashboardOrderRow): WebsharePoolKey | null {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const explicitPool = String(
      meta.webshare_pool_key ?? meta.requested_pool_key ?? '',
    ).trim();
    if (
      explicitPool &&
      (WEBSHARE_POOL_KEYS as readonly string[]).includes(explicitPool)
    ) {
      return explicitPool as WebsharePoolKey;
    }

    const requestedProxyType = String(meta.requested_proxy_type ?? '')
      .trim()
      .toLowerCase();
    const requestedProxySubtype = String(meta.requested_proxy_subtype ?? '')
      .trim()
      .toLowerCase();
    if (requestedProxyType && requestedProxySubtype) {
      const byQuery = this.webshareConfigService.derivePoolKeyFromQuery({
        proxy_type: requestedProxyType,
        proxy_subtype: requestedProxySubtype,
      });
      if (byQuery) return byQuery;
    }

    const productCode = String(order.product_code ?? '')
      .trim()
      .toLowerCase();
    const exclusivity = String(meta.requested_exclusivity_value ?? '')
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

  private parseRequestedQuantity(
    order: DashboardOrderRow,
    proxyCountMap: Map<string, number>,
  ): number {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const requested = Number(meta.requested_quantity_value ?? 0);
    if (Number.isFinite(requested) && requested > 0) {
      return Math.trunc(requested);
    }
    const fallbackCount = Number(proxyCountMap.get(order.id) ?? 0);
    if (Number.isFinite(fallbackCount) && fallbackCount > 0) {
      return Math.trunc(fallbackCount);
    }
    if (String(order.product_code ?? '').trim().toLowerCase() === 'rotating_residential') {
      return 1;
    }
    return 0;
  }

  private parseRequestedBandwidth(order: DashboardOrderRow): {
    bandwidthGb: number;
    unlimited: boolean;
  } {
    const meta = (order.webshare_meta ?? {}) as Record<string, unknown>;
    const value = Number(meta.requested_bandwidth_value ?? 0);
    if (!Number.isFinite(value)) {
      return { bandwidthGb: 0, unlimited: false };
    }
    if (value === 0) {
      return { bandwidthGb: 0, unlimited: true };
    }
    return { bandwidthGb: Math.max(0, Math.trunc(value)), unlimited: false };
  }

  private planToPoolKey(plan: Record<string, unknown>): WebsharePoolKey | null {
    return this.webshareConfigService.derivePoolKeyFromQuery({
      proxy_type: String(plan.proxy_type ?? ''),
      proxy_subtype: String(plan.proxy_subtype ?? ''),
    });
  }

  private parsePlanBandwidth(plan: Record<string, unknown>): {
    bandwidthGb: number;
    unlimited: boolean;
  } {
    const value = Number(plan.bandwidth_limit ?? 0);
    if (!Number.isFinite(value)) return { bandwidthGb: 0, unlimited: false };
    if (value === 0) return { bandwidthGb: 0, unlimited: true };
    return { bandwidthGb: Math.max(0, Math.trunc(value)), unlimited: false };
  }

  private mapManagedSubUserSyncStatus(orderStatus: string) {
    if (orderStatus === 'active') {
      return 'Đã đồng bộ';
    }
    if (orderStatus === 'pending' || orderStatus === 'processing') {
      return 'Đang chờ đồng bộ';
    }
    if (orderStatus === 'expired') {
      return 'Đã thu hồi';
    }
    return 'Chưa đồng bộ';
  }

  private applyManagedSubUserDateFilter(
    qb: Knex.QueryBuilder,
    days?: number,
  ) {
    if (days == null || !Number.isFinite(days)) {
      return;
    }

    if (days === 0) {
      qb.andWhere(
        'po.created_at',
        '>=',
        this.knex.raw(`DATE_TRUNC('day', NOW())`),
      );
      return;
    }

    if (days > 0) {
      qb.andWhere(
        'po.created_at',
        '>=',
        this.knex.raw(`NOW() - (? * INTERVAL '1 day')`, [days]),
      );
    }
  }

  async getConfig() {
    const config = await this.webshareConfigService.getConfig();
    return {
      updated_at: config.updated_at,
      pools: WEBSHARE_POOL_KEYS.map((key) => ({
        key,
        label: this.poolLabels[key],
      })),
      accounts: config.accounts.map((account) => ({
        ...account,
        api_key_masked: this.webshareConfigService.maskApiKey(account.api_key),
      })),
    };
  }

  async updateConfig(dto: UpdateWebshareConfigDto) {
    const config = await this.webshareConfigService.updateConfig({
      accounts: dto.accounts,
    });
    return {
      updated_at: config.updated_at,
      pools: WEBSHARE_POOL_KEYS.map((key) => ({
        key,
        label: this.poolLabels[key],
      })),
      accounts: config.accounts.map((account) => ({
        ...account,
        api_key_masked: this.webshareConfigService.maskApiKey(account.api_key),
      })),
    };
  }

  async testConnection(dto: TestWebshareConnectionDto) {
    const apiKey = String(dto.api_key ?? '').trim();
    if (!apiKey) {
      throw new Error('Thiếu API key để kiểm tra kết nối.');
    }

    try {
      const response = await axios.get(
        'https://proxy.webshare.io/api/v2/subscription/plan/',
        {
          headers: {
            Authorization: `Token ${apiKey}`,
          },
          timeout: 15000,
        },
      );

      const planCount = Array.isArray(response.data?.results)
        ? response.data.results.length
        : 0;

      try {
        await this.proxyService.processPendingOrders();
      } catch (error) {
        this.logger.warn(
          `Process pending proxy orders after manual sync failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      }

      return {
        connected: true,
        plan_count: planCount,
        message: 'Kết nối Webshare thành công. Hệ thống đã chạy xử lý đơn chờ.',
      };
    } catch (error) {
      const detail = this.proxyMasterService.getWebshareErrorMessage(error);
      return {
        connected: false,
        plan_count: 0,
        message:
          detail ||
          (error instanceof Error
            ? error.message
            : 'Không thể kết nối Webshare'),
      };
    }
  }

  async getManagedSubUsers() {
    return this.proxyService.getManagedSubUsersForAdmin();
  }

  async getManagedSubUserOrdersByUser(
    userId: string,
    query: GetManagedSubUserOrdersQueryDto,
  ) {
    const config = await this.webshareConfigService.getConfig();
    const accountEmailById = new Map<string, string>(
      (config.accounts ?? [])
        .filter((item) => Boolean(item?.id && item?.email))
        .map((item) => [String(item.id), String(item.email)]),
    );

    const page = Math.max(1, Math.trunc(Number(query.page ?? 1) || 1));
    const pageRow = Math.min(
      100,
      Math.max(1, Math.trunc(Number(query.pageRow ?? 10) || 10)),
    );
    const offset = (page - 1) * pageRow;
    const keyword = String(query.keyword ?? '').trim();
    const rawDays =
      query.days == null ? null : String(query.days).trim();
    const days =
      rawDays == null || rawDays === ''
        ? null
        : Number(rawDays);

    // DB-first: lịch sử màn admin lấy từ bảng proxy_orders/proxy_transactions.
    // Không gọi payment transaction từ Webshare ở đây.

    const proxyCountSubquery = this.knex('proxies')
      .select('proxy_order_id')
      .count<{ proxy_count: string | number }>('id as proxy_count')
      .groupBy('proxy_order_id')
      .as('pxc');

    const paymentEventsBase = this.knex('proxy_transactions as pt')
      .join('proxy_orders as po', 'po.id', 'pt.proxy_order_id')
      .leftJoin('users as u', 'u.id', 'po.user_id')
      .leftJoin('proxy_products as pp', 'pp.id', 'po.product_id')
      .leftJoin(proxyCountSubquery, 'pxc.proxy_order_id', 'po.id')
      .where('po.user_id', userId)
      .where('pt.status', 'success')
      .where('pt.type', 'payment')
      .modify((qb) => {
        if (!keyword) return;
        const term = `%${keyword}%`;
        qb.andWhere((builder) => {
          builder
            .whereILike('po.id', term)
            .orWhereILike('po.webshare_account_id', term)
            .orWhereILike('po.webshare_pool_key', term)
            .orWhereILike('u.email', term)
            .orWhereRaw(`CAST(po.webshare_subuser_id AS TEXT) ILIKE ?`, [term])
            .orWhereRaw(`CAST(pt.metadata AS TEXT) ILIKE ?`, [term])
            .orWhereILike('pp.name_vi', term)
            .orWhereILike('pp.name_en', term)
            .orWhereILike('pp.code', term);
        });
      })
      .modify((qb) => {
        if (days == null || !Number.isFinite(days)) return;
        if (days === 0) {
          qb.andWhere(
            'pt.created_at',
            '>=',
            this.knex.raw(`DATE_TRUNC('day', NOW())`),
          );
          return;
        }
        if (days > 0) {
          qb.andWhere(
            'pt.created_at',
            '>=',
            this.knex.raw(`NOW() - (? * INTERVAL '1 day')`, [days]),
          );
        }
      })
      .select(
        'pt.id as transaction_id',
        'pt.created_at as transaction_created_at',
        'pt.amount as transaction_amount',
        'pt.metadata as transaction_metadata',
        'po.id as order_id',
        'po.created_at as order_created_at',
        'po.webshare_activated_at as webshare_activated_at',
        'po.user_id',
        'u.email as user_email',
        'pp.code as product_code',
        this.knex.raw(
          `COALESCE(pp.name_vi, pp.name_en, pp.code) as product_name`,
        ),
        'po.status as order_status',
        'po.webshare_subuser_id',
        'po.webshare_account_id',
        'po.webshare_pool_key',
        'po.expires_at',
        'po.webshare_meta',
        this.knex.raw(`COALESCE(pxc.proxy_count, 0) as proxy_count`),
        this.knex.raw(
          `ROW_NUMBER() OVER (PARTITION BY po.id ORDER BY pt.created_at ASC, pt.id ASC) as order_payment_index`,
        ),
      );
    const eventsSubquery = paymentEventsBase.clone().as('events');
    const ordersFromEventsSubquery = this.knex
      .from(eventsSubquery)
      .groupBy('order_id')
      .select([
        'order_id',
        this.knex.raw(`MAX(order_status) as order_status`),
        this.knex.raw(`MAX(expires_at) as expires_at`),
        this.knex.raw(`MAX(webshare_subuser_id)::BIGINT as webshare_subuser_id`),
        this.knex.raw(`MAX(webshare_activated_at) as registered_at`),
        this.knex.raw(`MAX(proxy_count)::INTEGER as proxy_count`),
      ])
      .as('orders');

    const [items, eventStats, orderStats, totalRow] = await Promise.all([
      paymentEventsBase
        .clone()
        .orderBy('pt.created_at', 'desc')
        .offset(offset)
        .limit(pageRow),
      this.knex
        .from(eventsSubquery)
        .select([
          this.knex.raw(`COUNT(DISTINCT events.order_id)::INTEGER as total_orders`),
          this.knex.raw(
            `COUNT(*)::INTEGER as total_events`,
          ),
          this.knex.raw(
            `COUNT(
              CASE
                WHEN COALESCE(events.transaction_metadata->>'action_type', '') = 'upgrade'
                  OR (
                    COALESCE(events.transaction_metadata->>'action_type', '') = ''
                    AND events.order_payment_index > 1
                  )
                THEN 1
              END
            )::INTEGER as total_upgrades`,
          ),
          this.knex.raw(
            `COALESCE(SUM(CAST(events.transaction_amount AS DECIMAL)), 0)::BIGINT as total_amount`,
          ),
          this.knex.raw(`MAX(events.transaction_created_at) as latest_order_at`),
          this.knex.raw(`MAX(events.user_email) as user_email`),
        ])
        .first(),
      this.knex
        .from(ordersFromEventsSubquery)
        .select([
          this.knex.raw(
            `COALESCE(SUM(CAST(orders.proxy_count AS INTEGER)), 0)::INTEGER as total_proxy_count`,
          ),
          this.knex.raw(
            `COUNT(CASE WHEN orders.order_status = 'active' THEN 1 END)::INTEGER as synced_orders`,
          ),
          this.knex.raw(
            `COUNT(CASE WHEN orders.order_status IN ('pending', 'processing') THEN 1 END)::INTEGER as pending_orders`,
          ),
          this.knex.raw(
            `COUNT(CASE WHEN orders.order_status = 'expired' THEN 1 END)::INTEGER as revoked_orders`,
          ),
          this.knex.raw(
            `COUNT(CASE WHEN orders.order_status NOT IN ('active', 'pending', 'processing', 'expired') THEN 1 END)::INTEGER as unsynced_orders`,
          ),
          this.knex.raw(
            `MIN(CASE
              WHEN orders.expires_at IS NOT NULL
               AND orders.order_status IN ('active', 'pending', 'processing')
              THEN orders.expires_at
            END) as nearest_expiry_at`,
          ),
          this.knex.raw(
            `MAX(CASE
              WHEN orders.order_status IN ('active', 'pending', 'processing')
              THEN orders.webshare_subuser_id
            END)::BIGINT as current_subuser_id`,
          ),
          this.knex.raw(
            `MAX(CASE
              WHEN orders.order_status IN ('active', 'pending', 'processing')
              THEN orders.registered_at
            END) as current_registered_at`,
          ),
          this.knex.raw(
            `MAX(CASE
              WHEN orders.order_status IN ('active', 'pending', 'processing')
              THEN orders.expires_at
            END) as current_expires_at`,
          ),
        ])
        .first(),
      this.knex.from(eventsSubquery).count<{ c?: string | number }>('* as c').first(),
    ]);

    const orderItems = Array.isArray(items)
      ? (items as Array<Record<string, unknown>>)
      : [];
    const eventSummary = (eventStats as Record<string, unknown>) ?? {};
    const orderSummary = (orderStats as Record<string, unknown>) ?? {};

    return {
      user: {
        user_id: userId,
        user_email:
          eventSummary?.user_email == null
            ? null
            : String(eventSummary.user_email),
        total_orders: Number(eventSummary.total_orders ?? 0),
        total_events: Number(eventSummary.total_events ?? 0),
        total_upgrades: Number(eventSummary.total_upgrades ?? 0),
        total_amount: Number(eventSummary.total_amount ?? 0),
        total_proxy_count: Number(orderSummary.total_proxy_count ?? 0),
        synced_orders: Number(orderSummary.synced_orders ?? 0),
        pending_orders: Number(orderSummary.pending_orders ?? 0),
        revoked_orders: Number(orderSummary.revoked_orders ?? 0),
        unsynced_orders: Number(orderSummary.unsynced_orders ?? 0),
        latest_order_at: eventSummary.latest_order_at ?? null,
        nearest_expiry_at: orderSummary.nearest_expiry_at ?? null,
        webshare_subuser_id:
          orderSummary.current_subuser_id == null
            ? null
            : Number(orderSummary.current_subuser_id),
        webshare_registered_at: orderSummary.current_registered_at ?? null,
        webshare_expires_at: orderSummary.current_expires_at ?? null,
        webshare_account_email:
          orderItems
            .map((item) => String(item.webshare_account_id ?? ''))
            .map((accountId) => accountEmailById.get(accountId) ?? null)
            .find((email) => Boolean(email)) ?? null,
      },
      items: orderItems.map((item) => {
        const txMeta =
          item.transaction_metadata && typeof item.transaction_metadata === 'object'
            ? (item.transaction_metadata as Record<string, unknown>)
            : {};
        const meta =
          item.webshare_meta && typeof item.webshare_meta === 'object'
            ? (item.webshare_meta as Record<string, unknown>)
            : {};
        const txProxyCount = Number(txMeta.proxy_count ?? 0);
        const txBandwidth = Number(txMeta.bandwidth_gb ?? 0);
        const bandwidthRaw =
          txBandwidth > 0
            ? txBandwidth
            : (meta.synced_bandwidth_gb ??
              meta.target_bandwidth_gb ??
              meta.requested_bandwidth_value);
        const parsedBandwidth = Number(bandwidthRaw ?? 0);
        const bandwidthGb = Number.isFinite(parsedBandwidth) && parsedBandwidth > 0
          ? parsedBandwidth
          : 0;
        const actionTypeRaw = String(txMeta.action_type ?? '')
          .trim()
          .toLowerCase();
        const actionType =
          actionTypeRaw === 'upgrade'
            ? 'upgrade'
            : actionTypeRaw === 'add'
              ? 'add'
              : Number(item.order_payment_index ?? 0) > 1
                ? 'upgrade'
                : 'add';
        const proxyCount =
          Number.isFinite(txProxyCount) && txProxyCount > 0
            ? Math.trunc(txProxyCount)
            : Number(item.proxy_count ?? 0);
        const noteFromTx = String(
          txMeta.note_vi ?? txMeta.note ?? '',
        ).trim();
        const note =
          noteFromTx ||
          (proxyCount > 0 && bandwidthGb > 0
            ? actionType === 'upgrade'
              ? `Nâng cấp gói lên ${proxyCount} Proxy máy chủ với ${bandwidthGb} GB`
              : `Thêm mới gói ${proxyCount} Proxy máy chủ với ${bandwidthGb} GB`
            : null);

        return {
        transaction_id: String(item.transaction_id ?? ''),
        order_id: String(item.order_id ?? ''),
        user_id: String(item.user_id),
        user_email: item.user_email == null ? null : String(item.user_email),
        product_code: String(item.product_code ?? ''),
        product_name: String(item.product_name ?? item.product_code ?? ''),
        order_status: String(item.order_status ?? ''),
        webshare_subuser_id:
          item.webshare_subuser_id == null
            ? null
            : Number(item.webshare_subuser_id),
        webshare_account_id:
          item.webshare_account_id == null
            ? null
            : String(item.webshare_account_id),
        webshare_account_email:
          item.webshare_account_id == null
            ? null
            : (accountEmailById.get(String(item.webshare_account_id)) ?? null),
        webshare_pool_key:
          item.webshare_pool_key == null
            ? null
            : String(item.webshare_pool_key),
        expires_at: item.expires_at ?? null,
        registered_at: item.webshare_activated_at ?? item.order_created_at ?? null,
        order_created_at: item.order_created_at ?? null,
        created_at: item.transaction_created_at,
        amount_total: Number(item.transaction_amount ?? 0),
        amount_currency: 'VND',
        proxy_count: proxyCount,
        bandwidth_gb: bandwidthGb,
        payment_events_count: 1,
        action_type: actionType,
        note,
        sync_status: this.mapManagedSubUserSyncStatus(String(item.order_status ?? '')),
        };
      }),
      pagination: {
        page,
        pageRow,
        total: Number(totalRow?.c ?? 0),
      },
    };
  }

  async refreshManagedSubUser(orderId: string) {
    return this.proxyService.syncOrderFromWebshareForAdmin(orderId);
  }

  async revokeManagedSubUser(orderId: string) {
    return this.proxyService.revokeManagedSubUserForAdmin(orderId);
  }
  async getDashboard() {
    const config = await this.webshareConfigService.getConfig();
    const activeStatuses = ['active', 'pending', 'processing', 'paid'];
    const orders = (await this.knex('proxy_orders as o')
      .join('proxy_products as p', 'p.id', 'o.product_id')
      .whereIn('o.status', activeStatuses)
      .select(
        'o.id',
        'o.status',
        'o.webshare_plan_id',
        'o.webshare_meta',
        'p.code as product_code',
      )) as DashboardOrderRow[];

    const orderIds = orders.map((item) => item.id);
    const proxyCountRows =
      orderIds.length > 0
        ? await this.knex('proxies')
            .select('proxy_order_id')
            .count('* as total')
            .whereIn('proxy_order_id', orderIds)
            .groupBy('proxy_order_id')
        : [];
    const proxyCountMap = new Map<string, number>(
      proxyCountRows.map((row: Record<string, unknown>) => [
        String(row.proxy_order_id ?? ''),
        Number(row.total ?? 0),
      ]),
    );

    const usageByPool = new Map<WebsharePoolKey, PoolUsage>();
    for (const order of orders) {
      const poolKey = this.derivePoolKeyForOrder(order);
      if (!poolKey) continue;
      const quantity = this.parseRequestedQuantity(order, proxyCountMap);
      const bandwidth = this.parseRequestedBandwidth(order);
      const current = usageByPool.get(poolKey) ?? {
        allocated_proxy_count: 0,
        allocated_bandwidth_gb: 0,
        has_unlimited_bandwidth_order: false,
      };
      current.allocated_proxy_count += quantity;
      current.allocated_bandwidth_gb += bandwidth.bandwidthGb;
      current.has_unlimited_bandwidth_order =
        current.has_unlimited_bandwidth_order || bandwidth.unlimited;
      usageByPool.set(poolKey, current);
    }

    const rows: DashboardPoolRow[] = [];
    for (const account of config.accounts) {
      let autoRenewEnabled: boolean | null = null;
      let autoRenewError: string | null = null;
      const autoRenewCheckedAt = new Date().toISOString();
      try {
        const subscription = await this.proxyMasterService.getWebshareSubscription({
          accountId: account.id,
        });
        autoRenewEnabled =
          this.proxyMasterService.getSubscriptionAutoRenewEnabled(
            subscription,
          );
      } catch (error) {
        autoRenewError =
          this.proxyMasterService.getWebshareErrorMessage(error) ??
          (error instanceof Error ? error.message : 'Không thể đọc renewal');
      }

      for (const poolKey of account.pools) {
        const usage = usageByPool.get(poolKey) ?? {
          allocated_proxy_count: 0,
          allocated_bandwidth_gb: 0,
          has_unlimited_bandwidth_order: false,
        };

        let plans: Array<Record<string, unknown>> = [];
        let accountError: string | null = null;
        try {
          plans = await this.proxyMasterService.listWebsharePlans({
            accountId: account.id,
            poolKey,
          });
        } catch (error) {
          accountError =
            error instanceof Error ? error.message : 'Không thể lấy plan';
        }

        const activePlans = plans.filter((plan) => {
          const status = String(plan.status ?? '')
            .trim()
            .toLowerCase();
          return status === 'active' && this.planToPoolKey(plan) === poolKey;
        });

        const purchasedProxyCount = activePlans.reduce(
          (sum, plan) => sum + Math.max(0, Math.trunc(Number(plan.proxy_count ?? 0))),
          0,
        );
        const bandwidthPieces = activePlans.map((plan) =>
          this.parsePlanBandwidth(plan),
        );
        const hasUnlimitedPlan = bandwidthPieces.some((item) => item.unlimited);
        const purchasedBandwidthGb = hasUnlimitedPlan
          ? null
          : bandwidthPieces.reduce((sum, item) => sum + item.bandwidthGb, 0);

        const planStats = await Promise.all(
          activePlans.map(async (plan) => {
            const planId = Number(plan.id ?? 0);
            if (!Number.isFinite(planId) || planId <= 0) return [];
            try {
              return await this.proxyMasterService.getWebshareStats(
                { planId },
                {
                  accountId: account.id,
                  poolKey,
                },
              );
            } catch (error) {
              this.logger.warn(
                `Unable to fetch Webshare stats for account ${account.id} / ${poolKey} / plan ${planId}: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              );
              return [];
            }
          }),
        );

        const usedBandwidthBytes = planStats.flat().reduce((sum, stat) => {
          const bandwidth = Number(stat?.bandwidth_total ?? 0);
          if (!Number.isFinite(bandwidth) || bandwidth < 0) return sum;
          return sum + bandwidth;
        }, 0);
        const usedBandwidthGb = hasUnlimitedPlan
          ? null
          : this.bytesToGb(usedBandwidthBytes);

        const registeredDates = activePlans
          .map((plan) => {
            const value = plan.created_at ?? plan.start_date ?? null;
            if (!value) return null;
            const date = new Date(String(value));
            return Number.isNaN(date.getTime()) ? null : date;
          })
          .filter((value): value is Date => value != null)
          .sort((a, b) => a.getTime() - b.getTime());

        const expiryDates = activePlans
          .map((plan) => this.getPlanRenewalDate(plan))
          .filter((value): value is Date => value != null)
          .sort((a, b) => b.getTime() - a.getTime());

        const availableProxyCount =
          purchasedProxyCount - usage.allocated_proxy_count;
        const allocatedBandwidthGb = usage.has_unlimited_bandwidth_order
          ? null
          : usage.allocated_bandwidth_gb;
        const availableBandwidthGb =
          hasUnlimitedPlan || purchasedBandwidthGb == null || usedBandwidthGb == null
            ? null
            : purchasedBandwidthGb - usedBandwidthGb;
        const healthStatus = this.computeDashboardHealth({
          poolKey,
          purchasedProxyCount,
          availableProxyCount,
          purchasedBandwidthGb,
          availableBandwidthGb,
          hasUnlimitedBandwidthPlan: hasUnlimitedPlan,
        });

        rows.push({
          pool_key: poolKey,
          pool_label: this.poolLabels[poolKey],
          account_id: account.id,
          account_label: account.email,
          account_enabled: account.enabled,
          purchased_proxy_count: purchasedProxyCount,
          allocated_proxy_count: usage.allocated_proxy_count,
          available_proxy_count: availableProxyCount,
          purchased_bandwidth_gb: purchasedBandwidthGb,
          allocated_bandwidth_gb: allocatedBandwidthGb,
          available_bandwidth_gb: availableBandwidthGb,
          has_unlimited_bandwidth_plan: hasUnlimitedPlan,
          has_unlimited_bandwidth_order: usage.has_unlimited_bandwidth_order,
          active_plan_count: activePlans.length,
          active_plan_ids: activePlans
            .map((item) => Number(item.id ?? 0))
            .filter((id) => Number.isFinite(id) && id > 0),
          used_bandwidth_gb: usedBandwidthGb,
          registered_at: registeredDates[0]?.toISOString() ?? null,
          expires_at: expiryDates[0]?.toISOString() ?? null,
          health_status: healthStatus,
          error: accountError,
          auto_renew_enabled: autoRenewEnabled,
          auto_renew_checked_at: autoRenewCheckedAt,
          auto_renew_error: autoRenewError,
        });
      }
    }

    return {
      updated_at: new Date().toISOString(),
      rows,
    };
  }
}
