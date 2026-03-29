import { Injectable, Inject } from '@nestjs/common';
import { Knex } from 'knex';

type ProxyLoginMethod = 'username_password' | 'ip_whitelist';
type ProxyConnectionMethod = 'direct' | 'socks5' | 'http';

export interface ProxyRow {
  id: number;
  user_id: string;
  proxy_order_id: string | null;
  address: string;
  port: number;
  username: string;
  password: string;
  country_code: string;
  city: string | null;
  status: string;
  last_checked_at: Date | null;
  proxy_type: string;
  country_name?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserProxyCountryFilterRow {
  id: number;
  user_id: string;
  country_code: string;
  created_at: Date;
}

export interface ProxyOrderRow {
  id: string;
  user_id: string;
  product_id: number;
  exclusivity_option_id: number | null;
  quantity_option_id: number | null;
  bandwidth_option_id: number | null;
  location_id: number | null;
  additional_feature_id: number | null;
  discount_percent: string;
  amount_total: string;
  billing_cycle: string;
  status: string;
  webshare_plan_id?: number | null;
  webshare_subuser_id?: number | null;
  webshare_status?: string | null;
  webshare_error?: string | null;
  webshare_meta?: Record<string, unknown> | null;
  webshare_activated_at?: Date | null;
  expires_at?: Date | null;
  webshare_account_id?: string | null;
  webshare_pool_key?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProxyTransactionRow {
  id: string;
  proxy_order_id: string;
  type: string;
  amount: string;
  currency: string;
  payment_method_id: number | null;
  external_id: string | null;
  status: string;
  paid_at: Date | null;
  metadata: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProxyPaymentIdempotencyMatch {
  order: ProxyOrderRow;
  transaction: ProxyTransactionRow;
}

export interface ManagedWebshareOrderRow {
  order_id: string;
  user_id: string;
  user_username: string | null;
  user_email: string | null;
  product_code: string;
  amount_total: number;
  order_status: string;
  webshare_subuser_id: number | null;
  webshare_account_id: string | null;
  webshare_pool_key: string | null;
  expires_at: Date | null;
  created_at: Date;
  proxy_count: number;
}

@Injectable()
export class ProxyRepository {
  constructor(
    @Inject('KnexConnection')
    private readonly knex: Knex,
  ) {}

  private applyMethodFilters<TRecord extends {}, TResult>(
    qb: Knex.QueryBuilder<TRecord, TResult>,
    options: {
      login_method?: ProxyLoginMethod;
      connection_method?: ProxyConnectionMethod;
      tableAlias?: string;
    },
  ): Knex.QueryBuilder<TRecord, TResult> {
    const col = (name: string) =>
      options.tableAlias ? `${options.tableAlias}.${name}` : name;

    if (options.login_method === 'username_password') {
      qb.whereNotNull(col('username'))
        .whereNot(col('username'), '')
        .whereNotNull(col('password'))
        .whereNot(col('password'), '');
    } else if (options.login_method === 'ip_whitelist') {
      // Hệ thống hiện chỉ lưu proxy dạng user/pass; chưa hỗ trợ bộ dữ liệu IP whitelist.
      qb.whereRaw('1 = 0');
    }

    if (options.connection_method === 'socks5') {
      // SOCKS5 hiện chỉ bật cho luồng rotating residential.
      qb.where(col('proxy_type'), 'rotating_residential');
    }

    return qb;
  }

  async findProxiesByUserId(
    userId: string,
    options: {
      offset: number;
      limit: number;
      search?: string;
      country_codes?: string[];
      proxy_type?: string;
      order_id?: string;
      login_method?: ProxyLoginMethod;
      connection_method?: ProxyConnectionMethod;
      orderBy: string;
      orderDir: 'asc' | 'desc';
    },
  ): Promise<ProxyRow[]> {
    const orderColumn = [
      'id',
      'address',
      'port',
      'country_code',
      'city',
      'status',
      'last_checked_at',
      'created_at',
    ].includes(options.orderBy)
      ? `p.${options.orderBy}`
      : 'p.created_at';

    let qb = this.knex<ProxyRow>('proxies as p')
      .leftJoin('countries as c', 'c.code', 'p.country_code')
      .where('p.user_id', userId)
      .select(
        'p.id',
        'p.user_id',
        'p.proxy_order_id',
        'p.address',
        'p.port',
        'p.username',
        'p.password',
        'p.country_code',
        'p.city',
        'p.status',
        'p.last_checked_at',
        'p.proxy_type',
        'p.created_at',
        'p.updated_at',
      )
      .select(
        this.knex.raw(
          'COALESCE(c.name_vi, c.name_en, p.country_code) as country_name',
        ),
      )
      .orderBy(orderColumn, options.orderDir)
      .offset(options.offset)
      .limit(options.limit);

    if (options.search?.trim()) {
      const term = `%${options.search.trim()}%`;
      qb = qb.where((b) => {
        b.whereILike('p.address', term)
          .orWhereILike('p.country_code', term)
          .orWhereILike('c.name_vi', term)
          .orWhereILike('c.name_en', term);
      });
    }
    if (options.country_codes?.length) {
      qb = qb.whereIn('p.country_code', options.country_codes);
    }
    if (options.proxy_type) {
      qb = qb.where('p.proxy_type', options.proxy_type);
    }
    if (options.order_id) {
      qb = qb.where('p.proxy_order_id', options.order_id);
    }
    qb = this.applyMethodFilters(qb, {
      login_method: options.login_method,
      connection_method: options.connection_method,
      tableAlias: 'p',
    });
    return qb;
  }

  async countProxiesByUserId(
    userId: string,
    options: {
      search?: string;
      country_codes?: string[];
      proxy_type?: string;
      order_id?: string;
      login_method?: ProxyLoginMethod;
      connection_method?: ProxyConnectionMethod;
    },
  ): Promise<number> {
    let qb = this.knex<ProxyRow>('proxies as p')
      .leftJoin('countries as c', 'c.code', 'p.country_code')
      .where('p.user_id', userId);

    if (options.search?.trim()) {
      const term = `%${options.search.trim()}%`;
      qb = qb.where((b) => {
        b.whereILike('p.address', term)
          .orWhereILike('p.country_code', term)
          .orWhereILike('c.name_vi', term)
          .orWhereILike('c.name_en', term);
      });
    }
    if (options.country_codes?.length) {
      qb = qb.whereIn('p.country_code', options.country_codes);
    }
    if (options.proxy_type) {
      qb = qb.where('p.proxy_type', options.proxy_type);
    }
    if (options.order_id) {
      qb = qb.where('p.proxy_order_id', options.order_id);
    }
    qb = this.applyMethodFilters(qb, {
      login_method: options.login_method,
      connection_method: options.connection_method,
      tableAlias: 'p',
    });
    const row = await qb.count('p.id as c').first();
    const countRow = row as unknown as { c?: string | number } | undefined;
    return Number(countRow?.c ?? 0);
  }

  async findAllProxiesForDownload(
    userId: string,
    country_codes?: string[],
    proxy_type?: string,
    order_id?: string,
  ): Promise<ProxyRow[]> {
    let qb = this.knex<ProxyRow>('proxies').where('user_id', userId);
    if (country_codes?.length) {
      qb = qb.whereIn('country_code', country_codes);
    }
    if (proxy_type) {
      qb = qb.where('proxy_type', proxy_type);
    }
    if (order_id) {
      qb = qb.where('proxy_order_id', order_id);
    }
    return qb.orderBy('created_at', 'desc');
  }

  async findUserCountryFilters(
    userId: string,
  ): Promise<UserProxyCountryFilterRow[]> {
    return this.knex<UserProxyCountryFilterRow>('user_proxy_country_filters')
      .where('user_id', userId)
      .orderBy('country_code', 'asc');
  }

  async replaceUserCountryFilters(
    userId: string,
    countryCodes: string[],
  ): Promise<void> {
    await this.knex.transaction(async (trx) => {
      await trx('user_proxy_country_filters').where('user_id', userId).del();
      if (countryCodes.length > 0) {
        const unique = [...new Set(countryCodes)];
        await trx('user_proxy_country_filters').insert(
          unique.map((country_code) => ({
            user_id: userId,
            country_code,
          })),
        );
      }
    });
  }

  async createProxyOrder(
    userId: string,
    data: {
      product_id: number;
      exclusivity_option_id?: number | null;
      quantity_option_id?: number | null;
      bandwidth_option_id?: number | null;
      location_id?: number | null;
      additional_feature_id?: number | null;
      discount_percent: number;
      amount_total: number;
      billing_cycle: string;
      status?: string;
      webshare_plan_id?: number | null;
      webshare_subuser_id?: number | null;
      webshare_status?: string | null;
      webshare_error?: string | null;
      webshare_meta?: Record<string, unknown> | null;
      webshare_activated_at?: Date | null;
      expires_at?: Date | null;
      webshare_account_id?: string | null;
      webshare_pool_key?: string | null;
    },
    trx?: Knex.Transaction,
  ): Promise<ProxyOrderRow> {
    const qb = trx
      ? trx<ProxyOrderRow>('proxy_orders')
      : this.knex<ProxyOrderRow>('proxy_orders');
    const [row] = await qb
      .insert({
        user_id: userId,
        product_id: data.product_id,
        exclusivity_option_id: data.exclusivity_option_id ?? null,
        quantity_option_id: data.quantity_option_id ?? null,
        bandwidth_option_id: data.bandwidth_option_id ?? null,
        location_id: data.location_id ?? null,
        additional_feature_id: data.additional_feature_id ?? null,
        discount_percent: String(data.discount_percent ?? 0),
        amount_total: String(data.amount_total),
        billing_cycle: data.billing_cycle,
        status: data.status ?? 'draft',
        webshare_plan_id: data.webshare_plan_id ?? null,
        webshare_subuser_id: data.webshare_subuser_id ?? null,
        webshare_status: data.webshare_status ?? null,
        webshare_error: data.webshare_error ?? null,
        webshare_meta: data.webshare_meta ?? null,
        webshare_activated_at: data.webshare_activated_at ?? null,
        expires_at: data.expires_at ?? null,
        webshare_account_id: data.webshare_account_id ?? null,
        webshare_pool_key: data.webshare_pool_key ?? null,
      })
      .returning('*');
    return row;
  }

  async updateProxyOrder(
    orderId: string,
    data: Partial<ProxyOrderRow>,
    trx?: Knex.Transaction,
  ): Promise<ProxyOrderRow> {
    const qb = trx
      ? trx<ProxyOrderRow>('proxy_orders')
      : this.knex<ProxyOrderRow>('proxy_orders');
    const [row] = await qb
      .where('id', orderId)
      .update({ ...data, updated_at: new Date() })
      .returning('*');
    return row;
  }

  async upsertUserProxies(
    userId: string,
    proxies: Array<{
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
    }>,
    trx?: Knex.Transaction,
  ): Promise<void> {
    if (!proxies.length) return;
    const qb = trx ? trx<ProxyRow>('proxies') : this.knex<ProxyRow>('proxies');
    const rows = proxies.map((proxy) => ({
      user_id: userId,
      proxy_order_id: proxy.proxy_order_id ?? null,
      address: proxy.address,
      port: proxy.port,
      username: proxy.username,
      password: proxy.password,
      country_code: proxy.country_code,
      city: proxy.city ?? null,
      status: proxy.status ?? 'active',
      proxy_type: proxy.proxy_type ?? 'unknown',
      last_checked_at: proxy.last_checked_at ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await qb
      .insert(rows)
      .onConflict([
        'user_id',
        'proxy_type',
        'proxy_order_id',
        'address',
        'port',
        'username',
      ])
      .merge({
        proxy_order_id: this.knex.raw('excluded.proxy_order_id'),
        username: this.knex.raw('excluded.username'),
        password: this.knex.raw('excluded.password'),
        country_code: this.knex.raw('excluded.country_code'),
        city: this.knex.raw('excluded.city'),
        status: this.knex.raw('excluded.status'),
        proxy_type: this.knex.raw('excluded.proxy_type'),
        last_checked_at: this.knex.raw('excluded.last_checked_at'),
        updated_at: new Date(),
      });
  }

  async findProxiesByIds(
    userId: string,
    ids: number[],
    proxyType?: string,
  ): Promise<ProxyRow[]> {
    if (!ids.length) return [];
    let qb = this.knex<ProxyRow>('proxies')
      .where('user_id', userId)
      .whereIn('id', ids);
    if (proxyType) {
      qb = qb.where('proxy_type', proxyType);
    }
    return qb;
  }

  async findProxiesForCheck(
    userId: string,
    options: {
      proxy_type?: string;
      limit: number;
    },
  ): Promise<ProxyRow[]> {
    let qb = this.knex<ProxyRow>('proxies').where('user_id', userId);
    if (options.proxy_type) {
      qb = qb.where('proxy_type', options.proxy_type);
    }
    return qb.orderBy('updated_at', 'desc').limit(options.limit);
  }

  async updateProxyCheck(
    id: number,
    data: {
      status: string;
      last_checked_at: Date;
    },
  ): Promise<void> {
    await this.knex('proxies')
      .where('id', id)
      .update({
        status: data.status,
        last_checked_at: data.last_checked_at,
        updated_at: new Date(),
      });
  }

  async deleteProxiesByUserAndType(
    userId: string,
    proxyType: string,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const qb = trx ? trx('proxies') : this.knex('proxies');
    await qb.where('user_id', userId).where('proxy_type', proxyType).del();
  }

  async deleteProxiesByOrderId(
    orderId: string,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const qb = trx ? trx('proxies') : this.knex('proxies');
    await qb.where('proxy_order_id', orderId).del();
  }

  async deleteLegacyProxiesWithoutOrderByUserAndType(
    userId: string,
    proxyType: string,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const qb = trx ? trx('proxies') : this.knex('proxies');
    await qb
      .where('user_id', userId)
      .where('proxy_type', proxyType)
      .whereNull('proxy_order_id')
      .del();
  }

  async createProxyTransaction(
    data: {
      proxy_order_id: string;
      type: string;
      amount: number;
      currency?: string;
      payment_method_id?: number | null;
      external_id?: string | null;
      status: string;
      paid_at?: Date | null;
      metadata?: Record<string, unknown> | null;
    },
    trx?: Knex.Transaction,
  ): Promise<ProxyTransactionRow> {
    const qb = trx
      ? trx<ProxyTransactionRow>('proxy_transactions')
      : this.knex<ProxyTransactionRow>('proxy_transactions');
    const [row] = await qb
      .insert({
        proxy_order_id: data.proxy_order_id,
        type: data.type,
        amount: String(data.amount),
        currency: data.currency ?? 'VND',
        payment_method_id: data.payment_method_id ?? null,
        external_id: data.external_id ?? null,
        status: data.status,
        paid_at: data.paid_at ?? null,
        metadata: data.metadata ?? null,
      })
      .returning('*');
    return row;
  }

  async findProxyOrdersByUserId(
    userId: string,
    options: {
      offset: number;
      limit: number;
      status?: string;
      orderBy: string;
      orderDir: 'asc' | 'desc';
    },
  ): Promise<ProxyOrderRow[]> {
    let qb = this.knex<ProxyOrderRow>('proxy_orders')
      .where('user_id', userId)
      .orderBy(options.orderBy, options.orderDir)
      .offset(options.offset)
      .limit(options.limit);
    if (options.status) {
      qb = qb.where('status', options.status);
    }
    return qb;
  }

  async countProxyOrdersByUserId(
    userId: string,
    status?: string,
  ): Promise<number> {
    let qb = this.knex('proxy_orders')
      .where('user_id', userId)
      .count('* as c')
      .first();
    if (status) {
      qb = qb.where('status', status);
    }
    const row = await qb;
    const countRow = row as unknown as { c?: string | number } | undefined;
    return Number(countRow?.c ?? 0);
  }

  async findProxyOrderByIdAndUserId(
    orderId: string,
    userId: string,
  ): Promise<ProxyOrderRow | null> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .where('id', orderId)
      .where('user_id', userId)
      .first() as Promise<ProxyOrderRow | null>;
  }

  async findProxyOrderById(orderId: string): Promise<ProxyOrderRow | null> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .where('id', orderId)
      .first() as Promise<ProxyOrderRow | null>;
  }

  async findActiveOrdersByUserAndProductCode(
    userId: string,
    productCode: string,
  ): Promise<ProxyOrderRow[]> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
      .where('proxy_orders.user_id', userId)
      .where('proxy_orders.status', 'active')
      .where('proxy_products.code', productCode)
      .select('proxy_orders.*')
      .orderBy('proxy_orders.created_at', 'desc');
  }

  async findLatestOrderByUserAndProductCode(
    userId: string,
    productCode: string,
    statuses: string[] = ['active', 'pending'],
  ): Promise<ProxyOrderRow | null> {
    return (this.knex<ProxyOrderRow>('proxy_orders')
      .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
      .where('proxy_orders.user_id', userId)
      .whereIn('proxy_orders.status', statuses)
      .where('proxy_products.code', productCode)
      .select('proxy_orders.*')
      .orderBy('proxy_orders.created_at', 'desc')
      .first() as Promise<ProxyOrderRow | null>);
  }

  async findLatestMappedWebshareOrderByUser(
    userId: string,
  ): Promise<ProxyOrderRow | null> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .where('user_id', userId)
      .whereNotNull('webshare_account_id')
      .orderBy('created_at', 'desc')
      .first() as Promise<ProxyOrderRow | null>;
  }

  async findOrdersByUserAndProductCode(
    userId: string,
    productCode: string,
    statuses: string[],
  ): Promise<ProxyOrderRow[]> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
      .where('proxy_orders.user_id', userId)
      .whereIn('proxy_orders.status', statuses)
      .where('proxy_products.code', productCode)
      .select('proxy_orders.*')
      .orderBy('proxy_orders.created_at', 'asc');
  }

  async findOrdersByProductCode(
    productCode: string,
    statuses: string[],
  ): Promise<ProxyOrderRow[]> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
      .whereIn('proxy_orders.status', statuses)
      .where('proxy_products.code', productCode)
      .select('proxy_orders.*')
      .orderBy('proxy_orders.created_at', 'asc');
  }

  async countProxiesByOrderId(orderId: string): Promise<number> {
    const row = await this.knex('proxies')
      .where('proxy_order_id', orderId)
      .count('* as c')
      .first();
    return Number((row as { c?: string | number } | undefined)?.c ?? 0);
  }

  async updateProxyPasswordsByOrderId(
    orderId: string,
    password: string,
    trx?: Knex.Transaction,
  ): Promise<number> {
    const db = trx ?? this.knex;
    return db('proxies')
      .where('proxy_order_id', orderId)
      .update({ password, updated_at: db.fn.now() });
  }

  async findLatestWebsharePlanIdByUserAndProduct(
    userId: string,
    productId: number,
  ): Promise<number | null> {
    const row = await this.knex('proxy_orders')
      .select('webshare_plan_id', 'webshare_meta')
      .where({ user_id: userId, product_id: productId })
      .where('status', 'active')
      .orderBy('created_at', 'desc')
      .first();
    let planId = row?.webshare_plan_id;
    if (planId == null && row?.webshare_meta) {
      const meta = row.webshare_meta as Record<string, unknown>;
      planId =
        meta.plan_id ??
        meta.plan ??
        (meta.plan as { id?: unknown } | undefined)?.id ??
        null;
    }
    if (planId == null) return null;
    const parsed = Number(planId as unknown);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }

  async findTransactionsByProxyOrderId(
    orderId: string,
  ): Promise<ProxyTransactionRow[]> {
    return this.knex<ProxyTransactionRow>('proxy_transactions')
      .where('proxy_order_id', orderId)
      .orderBy('created_at', 'desc');
  }

  async findPendingProxyOrders(options: {
    limit: number;
    olderThan?: Date;
  }): Promise<ProxyOrderRow[]> {
    let qb = this.knex<ProxyOrderRow>('proxy_orders').where(
      'status',
      'pending',
    );
    if (options.olderThan) {
      qb = qb.andWhere('updated_at', '<=', options.olderThan);
    }
    return qb.orderBy('updated_at', 'asc').limit(options.limit);
  }

  async findExpiredActiveProxyOrders(options: {
    limit: number;
    before?: Date;
  }): Promise<ProxyOrderRow[]> {
    let qb = this.knex<ProxyOrderRow>('proxy_orders')
      .where('status', 'active')
      .whereNotNull('expires_at');
    if (options.before) {
      qb = qb.andWhere('expires_at', '<=', options.before);
    }
    return qb.orderBy('expires_at', 'asc').limit(options.limit);
  }

  async findActiveWebshareOrders(options: {
    limit: number;
  }): Promise<ProxyOrderRow[]> {
    return this.knex<ProxyOrderRow>('proxy_orders')
      .whereIn('status', ['active', 'pending'])
      .whereNotNull('webshare_subuser_id')
      .orderBy('updated_at', 'desc')
      .limit(options.limit);
  }

  async findManagedWebshareOrders(options?: {
    limit?: number;
  }): Promise<ManagedWebshareOrderRow[]> {
    const rows = await this.knex('proxy_orders as po')
      .leftJoin('users as u', 'u.id', 'po.user_id')
      .leftJoin('proxy_products as pp', 'pp.id', 'po.product_id')
      .leftJoin('proxies as px', 'px.proxy_order_id', 'po.id')
      .whereNotNull('po.webshare_account_id')
      .groupBy('po.id', 'u.username', 'u.email', 'pp.code')
      .select(
        'po.id as order_id',
        'po.user_id',
        'u.username as user_username',
        'u.email as user_email',
        'pp.code as product_code',
        'po.amount_total',
        'po.status as order_status',
        'po.webshare_subuser_id',
        'po.webshare_account_id',
        'po.webshare_pool_key',
        'po.expires_at',
        'po.created_at',
      )
      .count<{ proxy_count: string | number }>('px.id as proxy_count')
      .orderBy('po.created_at', 'desc')
      .modify((qb) => {
        if (options?.limit) {
          qb.limit(options.limit);
        }
      });

    return rows.map((row) => ({
      order_id: String(row.order_id),
      user_id: String(row.user_id),
      user_username:
        row.user_username == null ? null : String(row.user_username),
      user_email:
        row.user_email == null ? null : String(row.user_email),
      product_code: String(row.product_code ?? ''),
      amount_total: Number(row.amount_total ?? 0),
      order_status: String(row.order_status ?? ''),
      webshare_subuser_id:
        row.webshare_subuser_id == null
          ? null
          : Number(row.webshare_subuser_id),
      webshare_account_id:
        row.webshare_account_id == null
          ? null
          : String(row.webshare_account_id),
      webshare_pool_key:
        row.webshare_pool_key == null
          ? null
          : String(row.webshare_pool_key),
      expires_at: row.expires_at ?? null,
      created_at: row.created_at,
      proxy_count: Number(row.proxy_count ?? 0),
    }));
  }

  async findTransactionsByUserId(
    userId: string,
    options: { offset: number; limit: number },
  ): Promise<ProxyTransactionRow[]> {
    return this.knex<ProxyTransactionRow>('proxy_transactions')
      .join(
        'proxy_orders',
        'proxy_orders.id',
        'proxy_transactions.proxy_order_id',
      )
      .where('proxy_orders.user_id', userId)
      .select('proxy_transactions.*')
      .orderBy('proxy_transactions.created_at', 'desc')
      .offset(options.offset)
      .limit(options.limit);
  }

  async countTransactionsByUserId(userId: string): Promise<number> {
    const row = await this.knex('proxy_transactions')
      .join(
        'proxy_orders',
        'proxy_orders.id',
        'proxy_transactions.proxy_order_id',
      )
      .where('proxy_orders.user_id', userId)
      .count('* as c')
      .first();
    return Number((row as { c: string | number })?.c ?? 0);
  }

  async findSuccessfulPaymentByIdempotencyKey(
    userId: string,
    idempotencyKey: string,
    trx?: Knex.Transaction,
  ): Promise<ProxyPaymentIdempotencyMatch | null> {
    const db = trx ?? this.knex;
    const row = await db('proxy_transactions as pt')
      .join('proxy_orders as po', 'po.id', 'pt.proxy_order_id')
      .where('po.user_id', userId)
      .where('pt.type', 'payment')
      .where('pt.status', 'success')
      .whereRaw(`COALESCE(pt.metadata->>'idempotency_key', '') = ?`, [
        idempotencyKey,
      ])
      .select(
        'pt.id as pt_id',
        'pt.proxy_order_id as pt_proxy_order_id',
        'pt.type as pt_type',
        'pt.amount as pt_amount',
        'pt.currency as pt_currency',
        'pt.payment_method_id as pt_payment_method_id',
        'pt.external_id as pt_external_id',
        'pt.status as pt_status',
        'pt.paid_at as pt_paid_at',
        'pt.metadata as pt_metadata',
        'pt.created_at as pt_created_at',
        'pt.updated_at as pt_updated_at',
        'po.id as po_id',
        'po.user_id as po_user_id',
        'po.product_id as po_product_id',
        'po.exclusivity_option_id as po_exclusivity_option_id',
        'po.quantity_option_id as po_quantity_option_id',
        'po.bandwidth_option_id as po_bandwidth_option_id',
        'po.location_id as po_location_id',
        'po.additional_feature_id as po_additional_feature_id',
        'po.discount_percent as po_discount_percent',
        'po.amount_total as po_amount_total',
        'po.billing_cycle as po_billing_cycle',
        'po.status as po_status',
        'po.webshare_plan_id as po_webshare_plan_id',
        'po.webshare_subuser_id as po_webshare_subuser_id',
        'po.webshare_status as po_webshare_status',
        'po.webshare_error as po_webshare_error',
        'po.webshare_meta as po_webshare_meta',
        'po.webshare_activated_at as po_webshare_activated_at',
        'po.expires_at as po_expires_at',
        'po.webshare_account_id as po_webshare_account_id',
        'po.webshare_pool_key as po_webshare_pool_key',
        'po.created_at as po_created_at',
        'po.updated_at as po_updated_at',
      )
      .orderBy('pt.created_at', 'desc')
      .first();
    if (!row) return null;

    const transaction: ProxyTransactionRow = {
      id: String(row.pt_id),
      proxy_order_id: String(row.pt_proxy_order_id),
      type: String(row.pt_type),
      amount: String(row.pt_amount),
      currency: String(row.pt_currency),
      payment_method_id:
        row.pt_payment_method_id == null ? null : Number(row.pt_payment_method_id),
      external_id:
        row.pt_external_id == null ? null : String(row.pt_external_id),
      status: String(row.pt_status),
      paid_at: row.pt_paid_at ?? null,
      metadata:
        row.pt_metadata && typeof row.pt_metadata === 'object'
          ? (row.pt_metadata as Record<string, unknown>)
          : null,
      created_at: new Date(row.pt_created_at),
      updated_at: new Date(row.pt_updated_at),
    };

    const order: ProxyOrderRow = {
      id: String(row.po_id),
      user_id: String(row.po_user_id),
      product_id: Number(row.po_product_id),
      exclusivity_option_id:
        row.po_exclusivity_option_id == null
          ? null
          : Number(row.po_exclusivity_option_id),
      quantity_option_id:
        row.po_quantity_option_id == null ? null : Number(row.po_quantity_option_id),
      bandwidth_option_id:
        row.po_bandwidth_option_id == null
          ? null
          : Number(row.po_bandwidth_option_id),
      location_id: row.po_location_id == null ? null : Number(row.po_location_id),
      additional_feature_id:
        row.po_additional_feature_id == null
          ? null
          : Number(row.po_additional_feature_id),
      discount_percent: String(row.po_discount_percent ?? '0'),
      amount_total: String(row.po_amount_total ?? '0'),
      billing_cycle: String(row.po_billing_cycle ?? 'monthly'),
      status: String(row.po_status),
      webshare_plan_id:
        row.po_webshare_plan_id == null ? null : Number(row.po_webshare_plan_id),
      webshare_subuser_id:
        row.po_webshare_subuser_id == null
          ? null
          : Number(row.po_webshare_subuser_id),
      webshare_status:
        row.po_webshare_status == null ? null : String(row.po_webshare_status),
      webshare_error:
        row.po_webshare_error == null ? null : String(row.po_webshare_error),
      webshare_meta:
        row.po_webshare_meta && typeof row.po_webshare_meta === 'object'
          ? (row.po_webshare_meta as Record<string, unknown>)
          : null,
      webshare_activated_at: row.po_webshare_activated_at ?? null,
      expires_at: row.po_expires_at ?? null,
      webshare_account_id:
        row.po_webshare_account_id == null
          ? null
          : String(row.po_webshare_account_id),
      webshare_pool_key:
        row.po_webshare_pool_key == null ? null : String(row.po_webshare_pool_key),
      created_at: new Date(row.po_created_at),
      updated_at: new Date(row.po_updated_at),
    };

    return { order, transaction };
  }

  async findProxyProductCodeById(productId: number): Promise<string | null> {
    const row = await this.knex('proxy_products')
      .select('code')
      .where('id', productId)
      .first();
    const code = String(row?.code ?? '')
      .trim()
      .toLowerCase();
    return code || null;
  }
}
