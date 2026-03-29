export const WEBSHARE_SETTINGS_KEY = 'webshare_admin_config_v1';

export const WEBSHARE_POOL_KEYS = [
  'proxy_server_shared',
  'proxy_server_private',
  'proxy_server_dedicated',
  'static_residential_shared',
  'static_residential_private',
  'static_residential_dedicated',
  'rotating_residential',
] as const;

export type WebsharePoolKey = (typeof WEBSHARE_POOL_KEYS)[number];

export type WebshareConfigAccount = {
  id: string;
  email: string;
  api_key: string;
  enabled: boolean;
  pools: WebsharePoolKey[];
  notes?: string | null;
};

export type WebshareAdminConfig = {
  updated_at: string;
  accounts: WebshareConfigAccount[];
};

export type WebshareResolvedCredential = {
  apiKey: string;
  accountId: string | null;
  accountLabel: string | null;
  poolKey: WebsharePoolKey | null;
  source: 'admin' | 'env';
};
