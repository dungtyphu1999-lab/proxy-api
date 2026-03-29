import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Knex } from 'knex';

export interface CountryRow {
  code: string;
  name_vi: string | null;
  name_en: string | null;
  continent: string | null;
  is_popular: boolean;
  sort_order: number;
}

export interface ProxyProductRow {
  id: number;
  code: string;
  name_vi: string | null;
  name_en: string | null;
  is_active: boolean;
}

export interface ProxyProductOptionRow {
  id: number;
  product_id: number;
  option_type: string;
  option_value: string;
  label: string | null;
  description: string | null;
  price_per_month: string | null;
  price_per_unit: string | null;
  extra_data: Record<string, unknown> | null;
  sort_order: number;
  is_active: boolean;
}

export interface ProxyLocationRow {
  id: number;
  location_key: string;
  country_code: string | null;
  name_vi: string | null;
  name_en: string | null;
  available_count: number;
  sort_order: number;
  is_active: boolean;
}

export interface ProxyAdditionalFeatureRow {
  id: number;
  code: string;
  title_vi: string | null;
  title_en: string | null;
  description_vi: string | null;
  description_en: string | null;
  price_per_month: string;
  badge_type: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface PaymentMethodRow {
  id: number;
  code: string;
  name_vi: string | null;
  name_en: string | null;
  is_active: boolean;
  sort_order: number;
}

@Injectable()
export class ProxyMasterRepository {
  constructor(
    @Inject('KnexConnection')
    private readonly knex: Knex,
  ) {}

  async findAllCountries(): Promise<CountryRow[]> {
    return this.knex<CountryRow>('countries')
      .select('*')
      .orderBy('sort_order', 'asc')
      .orderBy('code', 'asc');
  }

  async findAllProxyProducts(): Promise<ProxyProductRow[]> {
    return this.knex<ProxyProductRow>('proxy_products')
      .select('*')
      .where('is_active', true)
      .orderBy('id', 'asc');
  }

  async findOptionsByProductId(
    productId: number,
  ): Promise<ProxyProductOptionRow[]> {
    return this.knex<ProxyProductOptionRow>('proxy_product_options')
      .select('*')
      .where('product_id', productId)
      .where('is_active', true)
      .orderBy('option_type', 'asc')
      .orderByRaw("CASE WHEN option_value = 'custom' THEN 1 ELSE 0 END")
      .orderBy('sort_order', 'asc')
      .orderBy('id', 'asc');
  }

  async findAllProxyProductOptions(): Promise<ProxyProductOptionRow[]> {
    return this.knex<ProxyProductOptionRow>('proxy_product_options')
      .select('*')
      .where('is_active', true)
      .orderBy('product_id', 'asc')
      .orderBy('option_type', 'asc')
      .orderByRaw("CASE WHEN option_value = 'custom' THEN 1 ELSE 0 END")
      .orderBy('sort_order', 'asc')
      .orderBy('id', 'asc');
  }

  async findAllProxyLocations(): Promise<ProxyLocationRow[]> {
    return this.knex<ProxyLocationRow>('proxy_locations')
      .select('*')
      .where('is_active', true)
      .orderBy('sort_order', 'asc')
      .orderBy('id', 'asc');
  }

  async findAllProxyAdditionalFeatures(): Promise<ProxyAdditionalFeatureRow[]> {
    return this.knex<ProxyAdditionalFeatureRow>('proxy_additional_features')
      .select('*')
      .where('is_active', true)
      .orderBy('sort_order', 'asc')
      .orderBy('id', 'asc');
  }

  async findAllPaymentMethods(): Promise<PaymentMethodRow[]> {
    return this.knex<PaymentMethodRow>('payment_methods')
      .select('*')
      .where('is_active', true)
      .orderBy('sort_order', 'asc')
      .orderBy('id', 'asc');
  }

  async findProxyProductByCode(code: string): Promise<ProxyProductRow | null> {
    return this.knex<ProxyProductRow>('proxy_products')
      .where('code', code)
      .where('is_active', true)
      .first() as Promise<ProxyProductRow | null>;
  }

  async findProxyProductById(id: number): Promise<ProxyProductRow | null> {
    return this.knex<ProxyProductRow>('proxy_products')
      .where('id', id)
      .where('is_active', true)
      .first() as Promise<ProxyProductRow | null>;
  }

  /**
   * Lấy additional feature price
   */
  async findAdditionalFeatureById(
    featureId: number,
  ): Promise<ProxyAdditionalFeatureRow | null> {
    return this.knex<ProxyAdditionalFeatureRow>('proxy_additional_features')
      .where('id', featureId)
      .where('is_active', true)
      .first() as Promise<ProxyAdditionalFeatureRow | null>;
  }

  async getProxyPricePercent(): Promise<number> {
    const row = await this.knex<{ value: string | number | null }>('settings')
      .select('value')
      .where('key', 'setting_percent_price_proxy')
      .first();

    const value = Number(row?.value);
    if (!Number.isFinite(value) || value < 0) return 0;
    if (value > 100) return 100;
    return value;
  }
}
