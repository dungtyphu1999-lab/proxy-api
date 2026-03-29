import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import {
  WEBSHARE_POOL_KEYS,
  WEBSHARE_SETTINGS_KEY,
  WebshareAdminConfig,
  WebshareConfigAccount,
  WebsharePoolKey,
  WebshareResolvedCredential,
} from './webshare-config.types';

type ResolveWebshareCredentialInput = {
  accountId?: string | null;
  poolKey?: string | null;
  query?: Record<string, unknown> | null;
  requestedQuantity?: number | null;
  requestedBandwidthGb?: number | null;
  requiresUnlimitedBandwidth?: boolean | null;
};

type ReserveWebshareCredentialForUserInput = ResolveWebshareCredentialInput & {
  userId: string;
};

type ProxyPoolRow = {
  id: string;
  account_id: string;
  account_label: string;
  api_key: string;
  pool_key: string | null;
  enabled: boolean;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
};

export type WebsharePoolDefinition = {
  id: string;
  account_id: string;
  account_label: string;
  api_key: string;
  pool_key: WebsharePoolKey | null;
  enabled: boolean;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
};

@Injectable()
export class WebshareConfigService {
  constructor(
    @Inject('KnexConnection')
    private readonly knex: Knex,
  ) {}

  private isPoolKey(value: unknown): value is WebsharePoolKey {
    return (
      typeof value === 'string' &&
      (WEBSHARE_POOL_KEYS as readonly string[]).includes(value)
    );
  }

  private sanitizeAccountId(value: unknown): string {
    const base = String(value ?? '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return base || `acc-${Date.now()}`;
  }

  private normalizeAccount(
    account: Partial<WebshareConfigAccount>,
    index: number,
  ): WebshareConfigAccount {
    const email = String(account?.email ?? '').trim();
    const pools = Array.isArray(account?.pools)
      ? account.pools.filter((pool): pool is WebsharePoolKey =>
          this.isPoolKey(pool),
        )
      : [];
    return {
      id: this.sanitizeAccountId(account?.id ?? `${email || 'account'}-${index + 1}`),
      email,
      api_key: String(account?.api_key ?? '').trim(),
      enabled: account?.enabled !== false,
      pools: Array.from(new Set(pools)),
      notes:
        account?.notes == null ? null : String(account.notes).trim() || null,
    };
  }

  private normalizeConfig(input: unknown): WebshareAdminConfig {
    const raw = input && typeof input === 'object' ? input : {};
    const rawAccounts = Array.isArray((raw as { accounts?: unknown }).accounts)
      ? ((raw as { accounts: unknown[] }).accounts ?? [])
      : [];

    const accounts = rawAccounts
      .map((item, index) =>
        this.normalizeAccount(
          item && typeof item === 'object'
            ? (item as Partial<WebshareConfigAccount>)
            : {},
          index,
        ),
      )
      .filter((item) => item.email);

    const uniqueIds = new Set<string>();
    const deduped = accounts.map((account, index) => {
      let id = account.id;
      while (uniqueIds.has(id)) {
        id = `${account.id}-${index + 1}`;
      }
      uniqueIds.add(id);
      return {
        ...account,
        id,
      };
    });

    return {
      updated_at: new Date().toISOString(),
      accounts: deduped,
    };
  }

  private async readRawConfigValue(): Promise<string | null> {
    const row = await this.knex('settings')
      .select('value')
      .where('key', WEBSHARE_SETTINGS_KEY)
      .first();
    if (!row?.value) return null;
    return String(row.value);
  }

  private buildDefaultConfig(): WebshareAdminConfig {
    return {
      updated_at: new Date().toISOString(),
      accounts: [],
    };
  }

  private async hasProxyPoolRows(): Promise<boolean> {
    const row = await this.knex('proxy_pools').count('* as c').first();
    return Number((row as { c?: string | number } | undefined)?.c ?? 0) > 0;
  }

  private async migrateLegacySettingsIfNeeded(): Promise<void> {
    const hasRows = await this.hasProxyPoolRows();
    if (hasRows) return;

    const rawValue = await this.readRawConfigValue();
    if (!rawValue) return;

    let normalized: WebshareAdminConfig;
    try {
      normalized = this.normalizeConfig(JSON.parse(rawValue));
    } catch {
      return;
    }

    if (!normalized.accounts.length) return;

    const rows = normalized.accounts.flatMap((account) => {
      const poolKeys = account.pools.length ? account.pools : [null];
      return poolKeys.map((poolKey) => ({
        account_id: account.id,
        account_label: account.email,
        api_key: account.api_key,
        pool_key: poolKey,
        enabled: account.enabled,
        notes: account.notes ?? null,
      }));
    });

    await this.knex('proxy_pools').insert(rows);
  }

  private async getPoolRows(): Promise<ProxyPoolRow[]> {
    await this.migrateLegacySettingsIfNeeded();
    return this.knex<ProxyPoolRow>('proxy_pools')
      .select('*')
      .orderBy([{ column: 'created_at', order: 'asc' }, { column: 'account_label', order: 'asc' }]);
  }

  private buildConfigFromRows(rows: ProxyPoolRow[]): WebshareAdminConfig {
    if (!rows.length) {
      return this.buildDefaultConfig();
    }

    const grouped = new Map<string, WebshareConfigAccount>();
    for (const row of rows) {
      const existing = grouped.get(row.account_id);
      if (!existing) {
        grouped.set(row.account_id, {
          id: row.account_id,
          email: row.account_label,
          api_key: row.api_key,
          enabled: row.enabled !== false,
          pools: this.isPoolKey(row.pool_key) ? [row.pool_key] : [],
          notes: row.notes ?? null,
        });
        continue;
      }

      existing.email = row.account_label || existing.email;
      existing.api_key = row.api_key || existing.api_key;
      existing.enabled = row.enabled !== false;
      existing.notes = row.notes ?? existing.notes ?? null;
      if (this.isPoolKey(row.pool_key) && !existing.pools.includes(row.pool_key)) {
        existing.pools.push(row.pool_key);
      }
    }

    return {
      updated_at: new Date().toISOString(),
      accounts: Array.from(grouped.values()),
    };
  }

  derivePoolKeyFromQuery(
    query?: Record<string, unknown> | null,
  ): WebsharePoolKey | null {
    const proxyType = String(query?.proxy_type ?? '')
      .trim()
      .toLowerCase();
    const proxySubtype = String(query?.proxy_subtype ?? '')
      .trim()
      .toLowerCase();
    if (proxyType === 'shared' && proxySubtype === 'default') {
      return 'proxy_server_shared';
    }
    if (proxyType === 'semidedicated' && proxySubtype === 'premium') {
      return 'proxy_server_private';
    }
    if (proxyType === 'dedicated' && proxySubtype === 'premium') {
      return 'proxy_server_dedicated';
    }
    if (proxyType === 'shared' && proxySubtype === 'isp') {
      return 'static_residential_shared';
    }
    if (proxyType === 'semidedicated' && proxySubtype === 'isp') {
      return 'static_residential_private';
    }
    if (proxyType === 'dedicated' && proxySubtype === 'isp') {
      return 'static_residential_dedicated';
    }
    if (proxyType === 'shared' && proxySubtype === 'residential') {
      return 'rotating_residential';
    }
    return null;
  }

  async getConfig(): Promise<WebshareAdminConfig> {
    const rows = await this.getPoolRows();
    return this.buildConfigFromRows(rows);
  }

  async getPoolDefinitions(): Promise<WebsharePoolDefinition[]> {
    const rows = await this.getPoolRows();
    return rows.map((row) => ({
      ...row,
      pool_key: this.isPoolKey(row.pool_key) ? row.pool_key : null,
    }));
  }

  async updateConfig(input: unknown): Promise<WebshareAdminConfig> {
    const normalized = this.normalizeConfig(input);

    await this.knex.transaction(async (trx) => {
      await trx('proxy_pools').del();
      const rows = normalized.accounts.flatMap((account) => {
        const poolKeys = account.pools.length ? account.pools : [null];
        return poolKeys.map((poolKey) => ({
          account_id: account.id,
          account_label: account.email,
          api_key: account.api_key,
          pool_key: poolKey,
          enabled: account.enabled,
          notes: account.notes ?? null,
        }));
      });

      if (rows.length > 0) {
        await trx('proxy_pools').insert(rows);
      }
    });
    return this.getConfig();
  }

  async resolveCredential(
    input: ResolveWebshareCredentialInput = {},
  ): Promise<WebshareResolvedCredential> {
    const config = await this.getConfig();
    const accountId = String(input.accountId ?? '').trim();
    const rawPoolKey = String(input.poolKey ?? '').trim();
    const poolKey = this.isPoolKey(rawPoolKey)
      ? rawPoolKey
      : this.derivePoolKeyFromQuery(input.query ?? null);

    let matched: WebshareConfigAccount | null = null;

    if (accountId) {
      matched =
        config.accounts.find(
          (item) =>
            item.id === accountId &&
            item.enabled &&
            Boolean(item.api_key?.trim()),
        ) ?? null;
      if (!matched) {
        throw new BadRequestException(
          `Tài khoản Webshare đã gán (${accountId}) không khả dụng trong cấu hình Admin.`,
        );
      }
    }

    if (matched) {
      return {
        apiKey: matched.api_key,
        accountId: matched.id,
        accountLabel: matched.email,
        poolKey,
        source: 'admin',
      };
    }

    const globalApiKey = String(process.env.WEBSHARE_API_KEY ?? '').trim();
    if (globalApiKey) {
      return {
        apiKey: globalApiKey,
        accountId: null,
        accountLabel: null,
        poolKey,
        source: 'env',
      };
    }

    throw new BadRequestException(
      'Thiếu Webshare API key. Vui lòng cấu hình trong Admin hoặc WEBSHARE_API_KEY.',
    );
  }

  async reserveCredentialForUser(
    input: ReserveWebshareCredentialForUserInput,
  ): Promise<WebshareResolvedCredential> {
    const config = await this.getConfig();
    const userId = String(input.userId ?? '').trim();
    if (!userId) {
      throw new BadRequestException('Thiếu userId để gán tài khoản Webshare.');
    }

    const rawPoolKey = String(input.poolKey ?? '').trim();
    const poolKey = this.isPoolKey(rawPoolKey)
      ? rawPoolKey
      : this.derivePoolKeyFromQuery(input.query ?? null);

    const enabledAccounts = config.accounts.filter(
      (item) => item.enabled && Boolean(item.api_key?.trim()),
    );

    if (!enabledAccounts.length) {
      throw new BadRequestException(
        'Không có tài khoản Webshare khả dụng trong Admin.',
      );
    }

    const latestUserOrder = await this.knex('proxy_orders')
      .select('webshare_account_id')
      .where('user_id', userId)
      .whereNotNull('webshare_account_id')
      .orderBy('created_at', 'desc')
      .first();

    const latestUserAccountId = String(
      latestUserOrder?.webshare_account_id ?? '',
    ).trim();
    if (latestUserAccountId) {
      const existingAccount =
        enabledAccounts.find((item) => item.id === latestUserAccountId) ?? null;
      if (existingAccount) {
        return {
          apiKey: existingAccount.api_key,
          accountId: existingAccount.id,
          accountLabel: existingAccount.email,
          poolKey,
          source: 'admin',
        };
      }
    }

    const reservedRows = await this.knex('proxy_orders')
      .distinct('webshare_account_id')
      .whereNotNull('webshare_account_id');
    const reservedAccountIds = new Set(
      reservedRows
        .map((row: Record<string, unknown>) =>
          String(row.webshare_account_id ?? '').trim(),
        )
        .filter(Boolean),
    );

    const availableAccount =
      enabledAccounts.find((item) => !reservedAccountIds.has(item.id)) ?? null;

    if (!availableAccount) {
      throw new BadRequestException(
        'Không còn tài khoản Webshare trống để gán cho người dùng.',
      );
    }

    return {
      apiKey: availableAccount.api_key,
      accountId: availableAccount.id,
      accountLabel: availableAccount.email,
      poolKey,
      source: 'admin',
    };
  }

  maskApiKey(value: string): string {
    const key = String(value ?? '').trim();
    if (!key) return '';
    if (key.length <= 8) return '*'.repeat(key.length);
    return `${key.slice(0, 4)}${'*'.repeat(Math.max(4, key.length - 8))}${key.slice(-4)}`;
  }
}
