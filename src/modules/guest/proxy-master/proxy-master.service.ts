import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';
import {
  ProxyMasterRepository,
  CountryRow,
  ProxyProductRow,
  ProxyProductOptionRow,
  ProxyLocationRow,
  ProxyAdditionalFeatureRow,
  PaymentMethodRow,
} from './proxy-master.repository';
import { CalculateProxyPriceDto } from './dto/calculate-proxy-price.dto';
import { WebshareConfigService } from '@/modules/webshare/webshare-config.service';
import {
  WebsharePoolKey,
  WebshareResolvedCredential,
} from '@/modules/webshare/webshare-config.types';

type WebshareRequestContext = {
  accountId?: string | null;
  poolKey?: string | null;
  query?: Record<string, unknown> | null;
  pricingBehavior?: 'add' | 'replace';
  requestedQuantity?: number | null;
  requestedBandwidthGb?: number | null;
  requiresUnlimitedBandwidth?: boolean | null;
};

type WebshareCheckoutOptions = {
  paymentMethod?: number | null;
  recaptchaToken?: string | null;
  autoResolvePaymentMethod?: boolean;
  autoSolveRecaptcha?: boolean;
};

type ProxyActivationStatus = {
  product_code: string;
  exclusivity_value: string;
  activated: boolean;
  webshare_plan_id: number | null;
  badge_label: string;
  cta_label: string;
};

@Injectable()
export class ProxyMasterService {
  constructor(
    private readonly repo: ProxyMasterRepository,
    private readonly webshareConfigService: WebshareConfigService,
  ) {}

  private parseBooleanEnv(value: string | undefined, fallback: boolean): boolean {
    if (value == null) return fallback;
    const normalized = value.trim().toLowerCase();
    if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
    if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
    return fallback;
  }

  private readonly websharePricingUrl =
    'https://proxy.webshare.io/api/v2/subscription/pricing/';
  private readonly webshareCustomizeUrl =
    'https://proxy.webshare.io/api/v2/subscription/customize/';
  private readonly websharePurchaseUrl =
    'https://proxy.webshare.io/api/v2/subscription/checkout/purchase/';
  private readonly webshareSubscriptionUrl =
    'https://proxy.webshare.io/api/v2/subscription/';
  private readonly webshareSubscriptionPlanUrl =
    'https://proxy.webshare.io/api/v2/subscription/plan/';
  private readonly webshareSubscriptionRenewalUrl =
    'https://proxy.webshare.io/api/v2/subscription/renewal/';
  private readonly webshareStatsUrl = 'https://proxy.webshare.io/api/v2/stats/';
  private readonly webshareSubuserUrl =
    'https://proxy.webshare.io/api/v2/subuser/';
  private readonly webshareProxyListUrl =
    'https://proxy.webshare.io/api/v2/proxy/list/';
  private readonly webshareProxyListStatusUrl =
    process.env.WEBSHARE_PROXY_LIST_STATUS_URL ||
    'https://proxy.webshare.io/api/v3/proxy/list/status';
  private readonly websharePaymentMethodUrl =
    'https://proxy.webshare.io/api/v2/payment/method/';
  private readonly websharePaymentTransactionUrl =
    'https://proxy.webshare.io/api/v2/payment/transaction/';
  private readonly websharePaymentMethod = '';
  private readonly webshareAutoPurchase = this.parseBooleanEnv(
    process.env.WEBSHARE_AUTO_PURCHASE,
    true,
  );
  private readonly webshareSubuserMaxThreads = 500;
  private readonly webshareRecaptcha2CaptchaApiKey = String(
    process.env.WEBSHARE_2CAPTCHA_API_KEY ??
      process.env.TWO_CAPTCHA_API_KEY ??
      process.env.CAPTCHA_API_KEY ??
      '',
  ).trim();
  private readonly webshareRecaptchaSiteKey = String(
    process.env.WEBSHARE_RECAPTCHA_SITE_KEY ??
      '6LeHZ6UUAAAAAKat_YS--O2tj_by3gv3r_l03j9d',
  ).trim();
  private readonly webshareRecaptchaPageUrl = String(
    process.env.WEBSHARE_RECAPTCHA_PAGE_URL ??
      'https://proxy.webshare.io/register/',
  ).trim();
  private readonly applyProxyMarkup = this.parseBooleanEnv(
    process.env.PROXY_PRICE_APPLY_MARKUP,
    true,
  );

  private toNumber(value: unknown): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private toFixed2(value: number): number {
    return Number((Number.isFinite(value) ? value : 0).toFixed(2));
  }

  private parseOptionNumber(value?: string | null): number | null {
    if (!value) return null;
    const raw = String(value).trim();
    const m = raw.match(/(\d[\d.,]*)/);
    if (!m) return null;
    let num = m[1];
    if (/^\d{1,3}(\.\d{3})+$/.test(num)) num = num.replace(/\./g, '');
    if (/^\d{1,3}(,\d{3})+$/.test(num)) num = num.replace(/,/g, '');
    num = num.replace(/,/g, '');
    const n = Number(num);
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  private normalizeProxyCountriesInput(
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

  private sumProxyCountries(countries: Record<string, number>): number {
    return Object.values(countries).reduce((sum, qty) => sum + Number(qty || 0), 0);
  }

  private mapProxyServerExclusivity(value?: string | null): {
    proxy_type: string;
    proxy_subtype: string;
  } | null {
    const v = (value ?? '').trim().toLowerCase();
    if (v === 'shared') {
      return { proxy_type: 'shared', proxy_subtype: 'default' };
    }
    if (v === 'private' || v === 'semidedicated') {
      return { proxy_type: 'semidedicated', proxy_subtype: 'premium' };
    }
    if (v === 'dedicated') {
      return { proxy_type: 'dedicated', proxy_subtype: 'premium' };
    }
    return null;
  }

  private mapStaticResidentialExclusivity(value?: string | null): {
    proxy_type: string;
    proxy_subtype: string;
  } | null {
    const v = (value ?? '').trim().toLowerCase();
    if (v === 'shared') {
      return { proxy_type: 'shared', proxy_subtype: 'isp' };
    }
    if (v === 'private' || v === 'semidedicated') {
      return { proxy_type: 'semidedicated', proxy_subtype: 'isp' };
    }
    if (v === 'dedicated') {
      return { proxy_type: 'dedicated', proxy_subtype: 'isp' };
    }
    return null;
  }

  derivePoolKeyFromQuery(
    query?: Record<string, unknown> | null,
  ): WebsharePoolKey | null {
    return this.webshareConfigService.derivePoolKeyFromQuery(query);
  }

  private normalizeProductCode(value?: string | null): string {
    return String(value ?? '')
      .trim()
      .toLowerCase();
  }

  private normalizeExclusivityValue(value?: string | null): string {
    const normalized = String(value ?? '')
      .trim()
      .toLowerCase();
    return normalized || 'shared';
  }

  private buildActivationQuery(params: {
    productCode: string;
    exclusivityValue: string;
  }): Record<string, unknown> {
    const productCode = this.normalizeProductCode(params.productCode);
    const exclusivityValue = this.normalizeExclusivityValue(
      params.exclusivityValue,
    );

    if (productCode === 'proxy_server') {
      const mapped = this.mapProxyServerExclusivity(exclusivityValue) ?? {
        proxy_type: 'shared',
        proxy_subtype: 'default',
      };
      return {
        proxy_type: mapped.proxy_type,
        proxy_subtype: mapped.proxy_subtype,
      };
    }

    if (productCode === 'static_residential') {
      const mapped = this.mapStaticResidentialExclusivity(exclusivityValue) ?? {
        proxy_type: 'shared',
        proxy_subtype: 'isp',
      };
      return {
        proxy_type: mapped.proxy_type,
        proxy_subtype: mapped.proxy_subtype,
      };
    }

    if (productCode === 'rotating_residential') {
      return {
        proxy_type: 'shared',
        proxy_subtype: 'residential',
      };
    }

    throw new BadRequestException('productCode không hợp lệ');
  }

  async getProxyProductActivationStatus(params: {
    productCode: string;
    exclusivityValue?: string | null;
    context?: WebshareRequestContext;
  }): Promise<ProxyActivationStatus> {
    const productCode = this.normalizeProductCode(params.productCode);
    const exclusivityValue = this.normalizeExclusivityValue(
      params.exclusivityValue,
    );
    const query = this.buildActivationQuery({
      productCode,
      exclusivityValue,
    });

    const planId = await this.findActivePlanIdByQuery(query, params.context);
    const activated = Number.isFinite(planId) && Number(planId) > 0;

    return {
      product_code: productCode,
      exclusivity_value: exclusivityValue,
      activated,
      webshare_plan_id: activated ? Number(planId) : null,
      badge_label: activated ? 'ĐÃ KÍCH HOẠT' : 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
      cta_label: activated ? 'Update gói' : 'Mua ngay',
    };
  }

  private derivePoolKeyFromProductExclusivity(params: {
    productCode: string;
    exclusivityValue?: string | null;
  }): WebsharePoolKey | null {
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

  async resolveWebshareCredential(
    context: WebshareRequestContext = {},
  ): Promise<WebshareResolvedCredential> {
    return this.webshareConfigService.resolveCredential(context);
  }

  async reserveWebshareCredentialForUserPurchase(params: {
    userId: string;
    context?: WebshareRequestContext;
  }): Promise<WebshareResolvedCredential> {
    return this.webshareConfigService.reserveCredentialForUser({
      userId: params.userId,
      accountId: params.context?.accountId,
      poolKey: params.context?.poolKey,
      query: params.context?.query,
      requestedQuantity: params.context?.requestedQuantity ?? null,
      requestedBandwidthGb: params.context?.requestedBandwidthGb ?? null,
      requiresUnlimitedBandwidth:
        params.context?.requiresUnlimitedBandwidth ?? null,
    });
  }

  private async getWebshareHeaders(params?: {
    context?: WebshareRequestContext;
  }): Promise<{ headers: Record<string, string>; credential: WebshareResolvedCredential }> {
    const credential = await this.resolveWebshareCredential(params?.context);
    if (!credential.apiKey) {
      throw new BadRequestException(
        'Thiếu Webshare API key. Vui lòng cấu hình trong Admin.',
      );
    }
    const headers: Record<string, string> = {
      Authorization: `Token ${credential.apiKey}`,
    };
    return { headers, credential };
  }

  private async buildRealtimePriceResponse(params: {
    dto: CalculateProxyPriceDto;
    additionalFeature: { row: ProxyAdditionalFeatureRow | null; price: number };
    query: Record<string, unknown>;
    context?: WebshareRequestContext;
  }) {
    const { dto, additionalFeature, query, context } = params;
    const { headers } = await this.getWebshareHeaders({ context });
    const requestPricing = async (queryPayload: Record<string, unknown>) =>
      axios.get(this.websharePricingUrl, {
        params: { query: JSON.stringify(queryPayload) },
        headers,
        timeout: 30000,
      });

    let res;
    try {
      res = await requestPricing(query);
    } catch (error) {
      const shouldRetryWithAddBehavior =
        String(query.behavior ?? '').toLowerCase() === 'replace' &&
        this.extractWebshareErrorCodes(error).includes('cannot_replace_plan');

      if (shouldRetryWithAddBehavior) {
        const fallbackQuery = { ...query, behavior: 'add' };
        try {
          res = await requestPricing(fallbackQuery);
        } catch (fallbackError) {
          const detail = this.formatWebshareError(fallbackError);
          if (detail) {
            throw new BadRequestException(`Webshare pricing failed: ${detail}`);
          }
          throw fallbackError;
        }
      } else {
        const detail = this.formatWebshareError(error);
        if (detail) {
          throw new BadRequestException(`Webshare pricing failed: ${detail}`);
        }
        throw error;
      }
    }

    const remote = res.data as Record<string, unknown>;
    const billingCycleMultiplier = dto.billing_cycle === 'yearly' ? 12 : 1;
    const remotePrice = this.toNumber(remote?.price);
    const remotePaidToday = this.toNumber(remote?.paid_today);
    const remotePaidInCredits = (() => {
      const explicit = this.toNumber(remote?.paid_in_credits);
      if (explicit > 0) return explicit;
      return Math.max(0, this.toFixed2(remotePrice - remotePaidToday));
    })();
    const remoteOriginal =
      this.toNumber(remote?.non_discounted_price) || remotePrice;
    const remoteDiscountPercent = this.toFixed2(
      this.toNumber(remote?.discount_percentage),
    );
    const additionalFeaturePricePerMonth = this.toFixed2(
      additionalFeature.price,
    );
    const proxyMarkupPercent = this.applyProxyMarkup
      ? this.toFixed2(await this.repo.getProxyPricePercent())
      : 0;
    const markupFactor = this.applyProxyMarkup ? 1 + proxyMarkupPercent / 100 : 1;

    // Use Webshare values as source of truth, then apply admin proxy markup (%).
    const subtotalWithBilling = this.toFixed2(remoteOriginal * markupFactor);
    const total = this.toFixed2(
      (remotePaidToday || remotePrice) * markupFactor,
    );
    const subtotalPerMonth = this.toFixed2(
      subtotalWithBilling / billingCycleMultiplier,
    );
    const discountAmount = this.toFixed2(subtotalWithBilling - total);

    return {
      base_price_per_month: this.toFixed2(
        (remoteOriginal / billingCycleMultiplier) * markupFactor,
      ),
      base_price_type: 'realtime',
      additional_feature_price_per_month: additionalFeaturePricePerMonth,
      additional_feature: additionalFeature.row
        ? {
            id: additionalFeature.row.id,
            code: additionalFeature.row.code,
            title_vi: additionalFeature.row.title_vi,
            title_en: additionalFeature.row.title_en,
          }
        : null,
      subtotal_per_month: subtotalPerMonth,
      billing_cycle: dto.billing_cycle,
      billing_cycle_multiplier: billingCycleMultiplier,
      subtotal_with_billing: subtotalWithBilling,
      discount_percent: remoteDiscountPercent,
      discount_amount: discountAmount,
      total,
      paid_today: this.toFixed2(remotePaidToday || remotePrice),
      paid_in_credits: this.toFixed2(remotePaidInCredits),
      webshare_price: this.toFixed2(remotePrice),
      webshare_non_discounted_price: this.toFixed2(remoteOriginal),
      applied_markup_percent: proxyMarkupPercent,
      currency: 'USD',
      source: 'webshare_realtime',
    };
  }

  async getCountries(): Promise<CountryRow[]> {
    return this.repo.findAllCountries();
  }

  async getProxyProducts(): Promise<ProxyProductRow[]> {
    return this.repo.findAllProxyProducts();
  }

  async getProxyProductOptions(
    productId?: number,
  ): Promise<ProxyProductOptionRow[]> {
    if (productId != null) {
      return this.repo.findOptionsByProductId(productId);
    }
    return this.repo.findAllProxyProductOptions();
  }

  async getProxyProductByCode(code: string): Promise<ProxyProductRow | null> {
    return this.repo.findProxyProductByCode(code);
  }

  async getProxyProductById(id: number): Promise<ProxyProductRow | null> {
    return this.repo.findProxyProductById(id);
  }

  async getProxyLocations(): Promise<ProxyLocationRow[]> {
    return this.repo.findAllProxyLocations();
  }

  async getProxyCountryOptions(
    productId: number,
    exclusivityValue?: string,
  ): Promise<
    Array<{
      code: string;
      name_vi: string | null;
      name_en: string | null;
      available_count: number;
      is_pool: boolean;
    }>
  > {
    const product = await this.repo.findProxyProductById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    let proxyType = '';
    let proxySubtype = '';

    if (product.code === 'proxy_server') {
      const mapped = this.mapProxyServerExclusivity(exclusivityValue);
      if (!mapped) {
        throw new BadRequestException(
          'Missing or invalid exclusivity for proxy_server',
        );
      }
      proxyType = mapped.proxy_type;
      proxySubtype = mapped.proxy_subtype;
    } else if (product.code === 'static_residential') {
      const mapped = this.mapStaticResidentialExclusivity(exclusivityValue);
      if (!mapped) {
        throw new BadRequestException(
          'Missing or invalid exclusivity for static_residential',
        );
      }
      proxyType = mapped.proxy_type;
      proxySubtype = mapped.proxy_subtype;
    } else if (product.code === 'rotating_residential') {
      return [];
    } else {
      throw new BadRequestException(
        `Unsupported product code for country options: ${product.code}`,
      );
    }

    const query = {
      proxy_type: proxyType,
      proxy_subtype: proxySubtype,
      proxy_countries: { ZZ: 1 },
      required_site_checks: [],
    };
    const poolKey = this.derivePoolKeyFromProductExclusivity({
      productCode: product.code,
      exclusivityValue,
    });
    const { headers } = await this.getWebshareHeaders({
      context: {
        query,
        poolKey,
      },
    });

    let res;
    try {
      res = await axios.get(this.webshareCustomizeUrl, {
        params: { query: JSON.stringify(query) },
        headers,
        timeout: 30000,
      });
    } catch (error) {
      const detail = this.formatWebshareError(error);
      if (detail) {
        throw new BadRequestException(`Webshare customize failed: ${detail}`);
      }
      throw error;
    }

    const customizePayload = res.data as Record<string, unknown>;
    const availableCountriesRaw = customizePayload?.available_countries;
    const availableCountries =
      availableCountriesRaw &&
      typeof availableCountriesRaw === 'object' &&
      !Array.isArray(availableCountriesRaw)
        ? (availableCountriesRaw as Record<string, unknown>)
        : {};

    const countryRows = await this.repo.findAllCountries();
    const countryMap = new Map(
      countryRows.map((c) => [String(c.code).toUpperCase(), c]),
    );

    const codes = Object.keys(availableCountries)
      .map((c) => c.toUpperCase())
      .filter((c) => c !== 'ZZ')
      .sort((a, b) => a.localeCompare(b));

    return [
      {
        code: 'ZZ',
        name_vi: 'Pool',
        name_en: 'Pool',
        available_count: 0,
        is_pool: true,
      },
      ...codes.map((code) => {
        const row = countryMap.get(code);
        return {
          code,
          name_vi: row?.name_vi ?? null,
          name_en: row?.name_en ?? null,
          available_count: this.toNumber(availableCountries[code]),
          is_pool: false,
        };
      }),
    ];
  }

  async getProxyAdditionalFeatures(): Promise<ProxyAdditionalFeatureRow[]> {
    return this.repo.findAllProxyAdditionalFeatures();
  }

  async getPaymentMethods(): Promise<PaymentMethodRow[]> {
    return this.repo.findAllPaymentMethods();
  }

  private async findAdditionalFeature(
    additionalFeatureId?: number,
  ): Promise<{ row: ProxyAdditionalFeatureRow | null; price: number }> {
    const id = additionalFeatureId ? Number(additionalFeatureId) : null;
    if (!id) return { row: null, price: 0 };

    const row = await this.repo.findAdditionalFeatureById(id);
    if (!row) {
      throw new NotFoundException(`Additional feature with ID ${id} not found`);
    }

    return { row, price: this.toNumber(row.price_per_month) };
  }

  /**
   * Tính giá proxy. Ưu tiên realtime Webshare cho các sản phẩm proxy chính.
   */
  async calculatePrice(
    dto: CalculateProxyPriceDto,
    requestContext?: WebshareRequestContext,
  ) {
    const productId = Number(dto.product_id);

    if (isNaN(productId) || productId < 1) {
      throw new BadRequestException(`Invalid product_id: ${dto.product_id}`);
    }

    const product = await this.repo.findProxyProductById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const exclusivityOptionId = dto.exclusivity_option_id
      ? Number(dto.exclusivity_option_id)
      : null;
    const quantityOptionId = dto.quantity_option_id
      ? Number(dto.quantity_option_id)
      : null;
    const bandwidthOptionId = dto.bandwidth_option_id
      ? Number(dto.bandwidth_option_id)
      : null;

    if (
      exclusivityOptionId !== null &&
      (isNaN(exclusivityOptionId) || exclusivityOptionId < 1)
    ) {
      throw new BadRequestException(
        `Invalid exclusivity_option_id: ${dto.exclusivity_option_id}`,
      );
    }
    if (
      quantityOptionId !== null &&
      (isNaN(quantityOptionId) || quantityOptionId < 1)
    ) {
      throw new BadRequestException(
        `Invalid quantity_option_id: ${dto.quantity_option_id}`,
      );
    }
    if (
      bandwidthOptionId !== null &&
      (isNaN(bandwidthOptionId) || bandwidthOptionId < 1)
    ) {
      throw new BadRequestException(
        `Invalid bandwidth_option_id: ${dto.bandwidth_option_id}`,
      );
    }

    const additionalFeature = await this.findAdditionalFeature(
      dto.additional_feature_id,
    );

    if (
      ['proxy_server', 'static_residential', 'rotating_residential'].includes(
        product.code,
      )
    ) {
      const options = await this.repo.findOptionsByProductId(productId);
      const exclusivityOption =
        exclusivityOptionId != null
          ? options.find((o) => Number(o.id) === Number(exclusivityOptionId))
          : null;
      const quantityOption =
        quantityOptionId != null
          ? options.find((o) => Number(o.id) === Number(quantityOptionId))
          : null;
      const bandwidthOption =
        bandwidthOptionId != null
          ? options.find((o) => Number(o.id) === Number(bandwidthOptionId))
          : null;

      let proxyType = '';
      let proxySubtype = '';
      let behavior = 'replace';
      let proxyCountries: Record<string, number> | Record<string, never> = {
        ZZ: 1,
      };
      let proxyReplacementsTotal = 10;

      if (product.code === 'proxy_server') {
        const mapped = this.mapProxyServerExclusivity(
          dto.exclusivity_value || exclusivityOption?.option_value,
        );
        if (!mapped) {
          throw new BadRequestException(
            'Missing or invalid exclusivity for proxy_server',
          );
        }
        proxyType = mapped.proxy_type;
        proxySubtype = mapped.proxy_subtype;
        behavior = requestContext?.pricingBehavior ?? 'add';
      } else if (product.code === 'static_residential') {
        const mapped = this.mapStaticResidentialExclusivity(
          dto.exclusivity_value || exclusivityOption?.option_value,
        );
        if (!mapped) {
          throw new BadRequestException(
            'Missing or invalid exclusivity for static_residential',
          );
        }
        proxyType = mapped.proxy_type;
        proxySubtype = mapped.proxy_subtype;
        behavior = requestContext?.pricingBehavior ?? 'add';
      } else {
        proxyType = 'shared';
        proxySubtype = 'residential';
        behavior = requestContext?.pricingBehavior ?? 'add';
        proxyCountries = {};
        proxyReplacementsTotal = 0;
      }

      let proxyCount =
        dto.quantity_value && dto.quantity_value > 0
          ? Number(dto.quantity_value)
          : this.parseOptionNumber(quantityOption?.option_value);
      const requestedProxyCountries = this.normalizeProxyCountriesInput(
        dto.proxy_countries,
      );
      const bandwidth =
        dto.bandwidth_value === 0
          ? 0
          : dto.bandwidth_value && dto.bandwidth_value > 0
            ? Number(dto.bandwidth_value)
            : this.parseOptionNumber(bandwidthOption?.option_value);

      if (product.code !== 'rotating_residential') {
        if (requestedProxyCountries) {
          const distributedCount = this.sumProxyCountries(requestedProxyCountries);
          if (
            proxyCount != null &&
            Number.isFinite(proxyCount) &&
            proxyCount > 0 &&
            distributedCount !== proxyCount
          ) {
            throw new BadRequestException(
              `proxy_countries total (${distributedCount}) must equal selected quantity (${proxyCount})`,
            );
          }
          proxyCountries = requestedProxyCountries;
          proxyCount = distributedCount;
        } else {
          if (!proxyCount) {
            throw new BadRequestException(
              'Missing proxy count for realtime pricing',
            );
          }
          proxyCountries = { ZZ: proxyCount };
        }
      }
      if (bandwidth == null || !Number.isFinite(bandwidth) || bandwidth < 0) {
        throw new BadRequestException('Missing bandwidth for realtime pricing');
      }

      const query = {
        proxy_type: proxyType,
        proxy_subtype: proxySubtype,
        proxy_countries: proxyCountries,
        bandwidth_limit: bandwidth,
        on_demand_refreshes_total: 0,
        automatic_refresh_frequency: 0,
        proxy_replacements_total: proxyReplacementsTotal,
        subusers_total: 3,
        term: dto.billing_cycle,
        is_unlimited_ip_authorizations: false,
        is_high_concurrency: false,
        is_high_priority_network: false,
        required_site_checks: [],
        with_tax: false,
        behavior,
      };

      return this.buildRealtimePriceResponse({
        dto,
        additionalFeature,
        query,
        context: {
          ...(requestContext ?? {}),
          query,
          poolKey:
            requestContext?.poolKey ?? this.derivePoolKeyFromQuery(query),
        },
      });
    }

    throw new BadRequestException(
      `Unsupported proxy product for realtime pricing: ${product.code}`,
    );
  }

  private formatWebshareError(error: unknown): string | null {
    if (!axios.isAxiosError(error)) return null;
    const status = error.response?.status;
    const data = error.response?.data as
      | Record<string, unknown>
      | Array<unknown>
      | string
      | undefined;
    let detail = '';
    if (!data) {
      detail = error.message;
    } else if (typeof data === 'string') {
      detail = data;
    } else if (Array.isArray(data)) {
      try {
        detail = JSON.stringify(data);
      } catch {
        detail = String(data);
      }
    } else if (typeof data.detail === 'string') {
      detail = data.detail;
    } else if (typeof data.message === 'string') {
      detail = data.message;
    } else if (Array.isArray(data.non_field_errors)) {
      detail = data.non_field_errors
        .map((item) =>
          typeof item === 'string' ? item : JSON.stringify(item),
        )
        .join(', ');
    } else {
      const entry = Object.entries(data).find(
        ([, value]) => Array.isArray(value) && value.length > 0,
      );
      if (entry) {
        const [key, value] = entry;
        detail = `${key}: ${(value as unknown[])
          .map((item) =>
            typeof item === 'string' ? item : JSON.stringify(item),
          )
          .join(', ')}`;
      } else {
        try {
          detail = JSON.stringify(data);
        } catch {
          detail = error.message;
        }
      }
    }
    const trimmed = detail.trim();
    if (!trimmed) return status ? `HTTP ${status}` : null;
    return status ? `HTTP ${status}: ${trimmed}` : trimmed;
  }

  private extractWebshareErrorCodes(error: unknown): string[] {
    if (!axios.isAxiosError(error)) return [];
    const data = error.response?.data as
      | Record<string, unknown>
      | Array<unknown>
      | string
      | undefined;
    const codes: string[] = [];
    const pushCode = (value: unknown) => {
      if (typeof value === 'string' && value.trim()) {
        codes.push(value.trim());
      }
    };
    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (typeof item === 'string') {
          pushCode(item);
          return;
        }
        if (item && typeof item === 'object') {
          pushCode((item as { code?: unknown }).code);
        }
      });
      return codes;
    }
    if (data && typeof data === 'object') {
      pushCode((data as { code?: unknown }).code);
      const errors = (data as { non_field_errors?: unknown }).non_field_errors;
      if (Array.isArray(errors)) {
        errors.forEach((item) => {
          if (typeof item === 'string') {
            pushCode(item);
            return;
          }
          if (item && typeof item === 'object') {
            pushCode((item as { code?: unknown }).code);
          }
        });
      }
    }
    return codes;
  }

  private getWebshareErrorStatus(error: unknown): number | null {
    if (!axios.isAxiosError(error)) return null;
    return error.response?.status ?? null;
  }

  private async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private getPlanIdFromResponse(data: Record<string, unknown>): number | null {
    const planId = Number(
      (data?.plan as number | string | undefined) ??
        (data?.plan_id as number | string | undefined) ??
        (data?.id as number | string | undefined),
    );
    return Number.isFinite(planId) && planId > 0 ? Math.trunc(planId) : null;
  }

  async getDefaultPaymentMethodId(
    context?: WebshareRequestContext,
  ): Promise<number | null> {
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.get(this.websharePaymentMethodUrl, {
      headers,
      timeout: 30000,
      params: {
        page_size: 100,
      },
    });
    const rows = Array.isArray(res.data?.results)
      ? (res.data.results as Array<Record<string, unknown>>)
      : [];
    const firstId = Number(rows[0]?.id ?? 0);
    return Number.isFinite(firstId) && firstId > 0 ? Math.trunc(firstId) : null;
  }

  async solveWebshareRecaptchaToken(): Promise<string | null> {
    if (!this.webshareRecaptcha2CaptchaApiKey) {
      return null;
    }

    const submit = await axios.post(
      'https://2captcha.com/in.php',
      {
        key: this.webshareRecaptcha2CaptchaApiKey,
        method: 'userrecaptcha',
        googlekey: this.webshareRecaptchaSiteKey,
        pageurl: this.webshareRecaptchaPageUrl,
        invisible: 1,
        json: 1,
      },
      {
        timeout: 30000,
      },
    );
    if (Number(submit.data?.status) !== 1) {
      throw new BadRequestException(
        `Không thể gửi tác vụ reCAPTCHA tới 2Captcha: ${JSON.stringify(
          submit.data ?? {},
        )}`,
      );
    }

    const captchaId = String(submit.data?.request ?? '').trim();
    if (!captchaId) {
      throw new BadRequestException('2Captcha không trả về captcha task id');
    }

    await this.sleep(12000);

    for (let i = 0; i < 30; i += 1) {
      const poll = await axios.get('https://2captcha.com/res.php', {
        timeout: 30000,
        params: {
          key: this.webshareRecaptcha2CaptchaApiKey,
          action: 'get',
          id: captchaId,
          json: 1,
        },
      });
      if (
        Number(poll.data?.status) === 1 &&
        typeof poll.data?.request === 'string' &&
        poll.data.request.trim()
      ) {
        return poll.data.request.trim();
      }
      if (String(poll.data?.request ?? '') !== 'CAPCHA_NOT_READY') {
        throw new BadRequestException(
          `Giải reCAPTCHA thất bại: ${JSON.stringify(poll.data ?? {})}`,
        );
      }
      await this.sleep(5000);
    }

    throw new BadRequestException(
      'Hết thời gian chờ 2Captcha trả kết quả reCAPTCHA',
    );
  }

  getWebshareErrorMessage(error: unknown): string | null {
    return this.formatWebshareError(error);
  }

  isRecentSamePlanError(error: unknown): boolean {
    return this.extractWebshareErrorCodes(error).includes('recent_same_plan');
  }

  isPlanSameProxyTypeExistsError(error: unknown): boolean {
    const codes = this.extractWebshareErrorCodes(error);
    return (
      codes.includes('plan_same_proxy_type_exists') ||
      codes.includes('cannot_replace_plan')
    );
  }

  isRetryableWebshareError(error: unknown): boolean {
    const status = this.getWebshareErrorStatus(error);
    if (status != null && (status >= 500 || status === 429)) return true;
    return this.isRecentSamePlanError(error);
  }

  isSubuserLimitError(error: unknown): boolean {
    if (!axios.isAxiosError(error)) return false;
    const data = error.response?.data as Record<string, unknown> | undefined;
    const errors = Array.isArray(data?.non_field_errors)
      ? data?.non_field_errors
      : [];
    return errors.some(
      (item) =>
        item &&
        typeof item === 'object' &&
        (item as { code?: string }).code === 'subuser_limit_reached',
    );
  }

  isPlanAccessDeniedError(error: unknown): boolean {
    if (!axios.isAxiosError(error)) return false;
    const status = error.response?.status;
    if (status !== 403) return false;
    const message = this.formatWebshareError(error) ?? '';
    return message.toLowerCase().includes('target plan');
  }

  isRecaptchaRequiredError(error: unknown): boolean {
    if (!axios.isAxiosError(error)) return false;
    const message = (this.formatWebshareError(error) ?? '').toLowerCase();
    if (!message) return false;
    return message.includes('recaptcha') && message.includes('required');
  }

  private getQueryProxyProfile(query: Record<string, unknown>): {
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

  private planMatchesQueryProfile(
    plan: Record<string, unknown>,
    query: Record<string, unknown>,
  ): boolean {
    const profile = this.getQueryProxyProfile(query);
    if (!profile.proxyType || !profile.proxySubtype) return false;
    const planType = String(plan.proxy_type ?? '')
      .trim()
      .toLowerCase();
    const planSubtype = String(plan.proxy_subtype ?? '')
      .trim()
      .toLowerCase();
    return (
      planType === profile.proxyType && planSubtype === profile.proxySubtype
    );
  }

  async listWebsharePlans(
    context?: WebshareRequestContext,
  ): Promise<Array<Record<string, unknown>>> {
    const { headers } = await this.getWebshareHeaders({ context });
    const results: Array<Record<string, unknown>> = [];
    let page = 1;
    const pageSize = 100;
    while (true) {
      const res = await axios.get(this.webshareSubscriptionPlanUrl, {
        headers,
        params: {
          page,
          page_size: pageSize,
        },
        timeout: 30000,
      });
      const pageResults = Array.isArray(res.data?.results)
        ? (res.data.results as Array<Record<string, unknown>>)
        : [];
      results.push(...pageResults);
      if (!res.data?.next || pageResults.length === 0) break;
      page += 1;
    }
    return results;
  }

  async isPlanCompatibleWithQuery(
    planId: number,
    query: Record<string, unknown>,
    context?: WebshareRequestContext,
  ): Promise<boolean> {
    if (!Number.isFinite(planId) || planId <= 0) return false;
    const plans = await this.listWebsharePlans(context ?? { query });
    const plan = plans.find((item) => Number(item.id ?? 0) === planId);
    if (!plan) return false;
    const status = String(plan.status ?? '')
      .trim()
      .toLowerCase();
    if (status && status !== 'active') return false;
    return this.planMatchesQueryProfile(plan, query);
  }

  async findActivePlanIdByQuery(
    query: Record<string, unknown>,
    context?: WebshareRequestContext,
  ): Promise<number | null> {
    const plans = await this.listWebsharePlans(context ?? { query });
    const matched = plans
      .filter((plan) => {
        const status = String(plan.status ?? '')
          .trim()
          .toLowerCase();
        if (status !== 'active') return false;
        return this.planMatchesQueryProfile(plan, query);
      })
      .sort((a, b) => {
        const aTime = Date.parse(String(a.updated_at ?? a.created_at ?? 0)) || 0;
        const bTime = Date.parse(String(b.updated_at ?? b.created_at ?? 0)) || 0;
        return bTime - aTime;
      });
    if (!matched.length) return null;
    const planId = Number(matched[0].id ?? 0);
    return Number.isFinite(planId) && planId > 0 ? planId : null;
  }

  async getCurrentSubscriptionPlanId(
    context?: WebshareRequestContext,
  ): Promise<number | null> {
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.get(this.webshareSubscriptionUrl, {
      headers,
      timeout: 30000,
    });
    const data = res.data as Record<string, unknown>;
    const planId =
      Number(
        (data?.plan as number | string | undefined) ??
          (data?.plan_id as number | string | undefined) ??
          (data?.id as number | string | undefined),
      ) || null;
    return planId;
  }

  async getWebshareSubscription(
    context?: WebshareRequestContext,
  ): Promise<Record<string, unknown>> {
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.get(this.webshareSubscriptionUrl, {
      headers,
      timeout: 30000,
    });
    return (res.data ?? {}) as Record<string, unknown>;
  }

  getSubscriptionAutoRenewEnabled(
    subscription: Record<string, unknown> | null | undefined,
  ): boolean | null {
    if (!subscription || typeof subscription !== 'object') {
      return null;
    }
    const candidates = [
      subscription.renewals_enabled,
      subscription.auto_renew,
      subscription.auto_renew_enabled,
      subscription.renew,
      subscription.renewal_enabled,
    ];
    for (const value of candidates) {
      if (typeof value === 'boolean') {
        return value;
      }
      if (typeof value === 'number') {
        if (value === 1) return true;
        if (value === 0) return false;
      }
      if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (['true', '1', 'yes', 'on', 'enabled'].includes(normalized)) {
          return true;
        }
        if (['false', '0', 'no', 'off', 'disabled'].includes(normalized)) {
          return false;
        }
      }
    }
    return null;
  }

  async disableWebshareSubscriptionRenewal(
    context?: WebshareRequestContext,
  ): Promise<Record<string, unknown>> {
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.delete(this.webshareSubscriptionRenewalUrl, {
      headers,
      timeout: 30000,
    });
    return (res.data ?? {}) as Record<string, unknown>;
  }

  async getWebsharePlanById(
    planId: number,
    context?: WebshareRequestContext,
  ): Promise<Record<string, unknown>> {
    const normalizedPlanId = Number(planId);
    if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
      throw new BadRequestException('Invalid plan_id');
    }
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.get(
      `${this.webshareSubscriptionPlanUrl}${Math.trunc(normalizedPlanId)}/`,
      {
        headers,
        timeout: 30000,
      },
    );
    return res.data as Record<string, unknown>;
  }

  async updateWebsharePlan(
    planId: number,
    payload: Record<string, unknown>,
    context?: WebshareRequestContext,
  ): Promise<Record<string, unknown>> {
    const normalizedPlanId = Number(planId);
    if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
      throw new BadRequestException('Invalid plan_id');
    }
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.patch(
      `${this.webshareSubscriptionPlanUrl}${Math.trunc(normalizedPlanId)}/`,
      payload,
      {
        headers,
        timeout: 30000,
      },
    );
    return res.data as Record<string, unknown>;
  }

  async upgradeWebsharePlan(
    planId: number,
    payload: Record<string, unknown>,
    context?: WebshareRequestContext,
    options?: WebshareCheckoutOptions,
  ): Promise<{
    paymentRequired: boolean;
    planId: number | null;
    raw: Record<string, unknown>;
  }> {
    const normalizedPlanId = Number(planId);
    if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
      throw new BadRequestException('Invalid plan_id');
    }
    const { headers } = await this.getWebshareHeaders({ context });
    const finalPayload: Record<string, unknown> = { ...payload };
    let paymentMethod =
      options?.paymentMethod != null
        ? Number(options.paymentMethod)
        : Number(this.websharePaymentMethod);
    if (
      (options?.autoResolvePaymentMethod ?? true) &&
      (!Number.isFinite(paymentMethod) || paymentMethod <= 0)
    ) {
      paymentMethod = Number(await this.getDefaultPaymentMethodId(context));
    }
    finalPayload.payment_method =
      Number.isFinite(paymentMethod) && paymentMethod > 0
        ? Math.trunc(paymentMethod)
        : null;
    if (options?.recaptchaToken) {
      finalPayload.recaptcha = options.recaptchaToken;
    }

    let res;
    try {
      res = await axios.post(
        `${this.webshareSubscriptionPlanUrl}${Math.trunc(
          normalizedPlanId,
        )}/upgrade/`,
        finalPayload,
        {
          headers,
          timeout: 120000,
        },
      );
    } catch (error) {
      if (
        options?.autoSolveRecaptcha &&
        this.isRecaptchaRequiredError(error) &&
        !finalPayload.recaptcha
      ) {
        const token = await this.solveWebshareRecaptchaToken();
        if (token) {
          finalPayload.recaptcha = token;
          res = await axios.post(
            `${this.webshareSubscriptionPlanUrl}${Math.trunc(
              normalizedPlanId,
            )}/upgrade/`,
            finalPayload,
            {
              headers,
              timeout: 120000,
            },
          );
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }

    if (!res) {
      throw new BadRequestException('Không thể gọi upgrade plan Webshare');
    }
    const data = (res.data ?? {}) as Record<string, unknown>;
    const paymentRequired = Boolean(data?.payment_required);
    const nextPlanId = this.getPlanIdFromResponse(data) ?? normalizedPlanId;

    return {
      paymentRequired,
      planId: nextPlanId,
      raw: data,
    };
  }

  async getWebshareStats(params?: {
    planId?: number | null;
    from?: string | null;
    to?: string | null;
  }, context?: WebshareRequestContext): Promise<Array<Record<string, unknown>>> {
    const query: Record<string, unknown> = {};
    const planId = Number(params?.planId ?? 0);
    if (Number.isFinite(planId) && planId > 0) {
      query.plan_id = Math.trunc(planId);
    }
    const from = String(params?.from ?? '').trim();
    if (from) {
      query.from = from;
    }
    const to = String(params?.to ?? '').trim();
    if (to) {
      query.to = to;
    }

    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.get(this.webshareStatsUrl, {
      headers,
      params: query,
      timeout: 30000,
    });

    if (!Array.isArray(res.data)) {
      return [];
    }
    return res.data as Array<Record<string, unknown>>;
  }

  async listWebsharePaymentTransactions(params?: {
    pageSize?: number;
    maxPages?: number;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }): Promise<Array<Record<string, unknown>>> {
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params?.accountId,
        poolKey: params?.poolKey,
        query: params?.query,
      },
    });

    const pageSizeRaw = Number(params?.pageSize ?? 100);
    const pageSize =
      Number.isFinite(pageSizeRaw) && pageSizeRaw > 0
        ? Math.min(250, Math.trunc(pageSizeRaw))
        : 100;
    const maxPagesRaw = Number(params?.maxPages ?? 10);
    const maxPages =
      Number.isFinite(maxPagesRaw) && maxPagesRaw > 0
        ? Math.trunc(maxPagesRaw)
        : 10;

    const results: Array<Record<string, unknown>> = [];
    let page = 1;
    while (page <= maxPages) {
      const res = await axios.get(this.websharePaymentTransactionUrl, {
        params: {
          page,
          page_size: pageSize,
        },
        headers,
        timeout: 30000,
      });
      const data = (res.data ?? {}) as Record<string, unknown>;
      const pageResults = Array.isArray(data.results)
        ? (data.results as Array<Record<string, unknown>>)
        : [];
      results.push(...pageResults);
      if (!data.next || pageResults.length === 0) {
        break;
      }
      page += 1;
    }
    return results;
  }

  async buildWebshareOrderConfig(dto: CalculateProxyPriceDto) {
    const productId = Number(dto.product_id);
    if (!Number.isFinite(productId) || productId < 1) {
      throw new BadRequestException(`Invalid product_id: ${dto.product_id}`);
    }
    const product = await this.repo.findProxyProductById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const options = await this.repo.findOptionsByProductId(productId);
    const exclusivityOption =
      dto.exclusivity_option_id != null
        ? options.find(
            (o) => Number(o.id) === Number(dto.exclusivity_option_id),
          )
        : null;
    const quantityOption =
      dto.quantity_option_id != null
        ? options.find((o) => Number(o.id) === Number(dto.quantity_option_id))
        : null;
    const bandwidthOption =
      dto.bandwidth_option_id != null
        ? options.find((o) => Number(o.id) === Number(dto.bandwidth_option_id))
        : null;

    let proxyType = '';
    let proxySubtype = '';
    let behavior = 'replace';
    let proxyCountries: Record<string, number> | Record<string, never> = {
      ZZ: 1,
    };
    let proxyReplacementsTotal = 10;

    if (product.code === 'proxy_server') {
      const mapped = this.mapProxyServerExclusivity(
        dto.exclusivity_value || exclusivityOption?.option_value,
      );
      if (!mapped) {
        throw new BadRequestException(
          'Missing or invalid exclusivity for proxy_server',
        );
      }
      proxyType = mapped.proxy_type;
      proxySubtype = mapped.proxy_subtype;
      behavior = 'add';
    } else if (product.code === 'static_residential') {
      const mapped = this.mapStaticResidentialExclusivity(
        dto.exclusivity_value || exclusivityOption?.option_value,
      );
      if (!mapped) {
        throw new BadRequestException(
          'Missing or invalid exclusivity for static_residential',
        );
      }
      proxyType = mapped.proxy_type;
      proxySubtype = mapped.proxy_subtype;
      behavior = 'add';
    } else if (product.code === 'rotating_residential') {
      proxyType = 'shared';
      proxySubtype = 'residential';
      behavior = 'add';
      proxyCountries = {};
      proxyReplacementsTotal = 0;
    } else {
      throw new BadRequestException(
        `Unsupported proxy product for realtime pricing: ${product.code}`,
      );
    }

    let proxyCount =
      dto.quantity_value && dto.quantity_value > 0
        ? Number(dto.quantity_value)
        : this.parseOptionNumber(quantityOption?.option_value);
    const requestedProxyCountries = this.normalizeProxyCountriesInput(
      dto.proxy_countries,
    );
    const bandwidth =
      dto.bandwidth_value === 0
        ? 0
        : dto.bandwidth_value && dto.bandwidth_value > 0
          ? Number(dto.bandwidth_value)
          : this.parseOptionNumber(bandwidthOption?.option_value);

    if (product.code !== 'rotating_residential') {
      if (requestedProxyCountries) {
        const distributedCount = this.sumProxyCountries(requestedProxyCountries);
        if (
          proxyCount != null &&
          Number.isFinite(proxyCount) &&
          proxyCount > 0 &&
          distributedCount !== proxyCount
        ) {
          throw new BadRequestException(
            `proxy_countries total (${distributedCount}) must equal selected quantity (${proxyCount})`,
          );
        }
        proxyCountries = requestedProxyCountries;
        proxyCount = distributedCount;
      } else {
        if (!proxyCount) {
          throw new BadRequestException(
            'Missing proxy count for realtime pricing',
          );
        }
        proxyCountries = { ZZ: proxyCount };
      }
    }
    if (bandwidth == null || !Number.isFinite(bandwidth) || bandwidth < 0) {
      throw new BadRequestException('Missing bandwidth for realtime pricing');
    }

    const query = {
      proxy_type: proxyType,
      proxy_subtype: proxySubtype,
      proxy_countries: proxyCountries,
      bandwidth_limit: bandwidth,
      on_demand_refreshes_total: 0,
      automatic_refresh_frequency: 0,
      proxy_replacements_total: proxyReplacementsTotal,
      subusers_total: 3,
      term: dto.billing_cycle,
      is_unlimited_ip_authorizations: false,
      is_high_concurrency: false,
      is_high_priority_network: false,
      required_site_checks: [],
      with_tax: false,
      behavior,
    };

    const mode: 'direct' | 'backbone' =
      product.code === 'rotating_residential' ? 'backbone' : 'direct';

    return {
      product,
      options,
      query,
      proxyCount: proxyCount ?? 0,
      bandwidth,
      mode,
      poolKey: this.derivePoolKeyFromQuery(query),
    };
  }

  async purchaseWebsharePlan(
    query: Record<string, unknown>,
    context?: WebshareRequestContext,
    options?: WebshareCheckoutOptions,
  ) {
    if (!this.webshareAutoPurchase) {
      return { planId: null, paymentRequired: false, raw: null };
    }
    const payload: Record<string, unknown> = { ...query };
    let paymentMethod =
      options?.paymentMethod != null
        ? Number(options.paymentMethod)
        : Number(this.websharePaymentMethod);
    if (
      (options?.autoResolvePaymentMethod ?? true) &&
      (!Number.isFinite(paymentMethod) || paymentMethod <= 0)
    ) {
      paymentMethod = Number(await this.getDefaultPaymentMethodId(context));
    }
    payload.payment_method =
      Number.isFinite(paymentMethod) && paymentMethod > 0
        ? Math.trunc(paymentMethod)
        : null;
    if (options?.recaptchaToken) {
      payload.recaptcha = options.recaptchaToken;
    }
    const { headers, credential } = await this.getWebshareHeaders({
      context: {
        ...(context ?? {}),
        query,
      },
    });

    let res;
    try {
      res = await axios.post(this.websharePurchaseUrl, payload, {
        headers,
        timeout: 120000,
      });
    } catch (error) {
      if (
        options?.autoSolveRecaptcha &&
        this.isRecaptchaRequiredError(error) &&
        !payload.recaptcha
      ) {
        const token = await this.solveWebshareRecaptchaToken();
        if (token) {
          payload.recaptcha = token;
          res = await axios.post(this.websharePurchaseUrl, payload, {
            headers,
            timeout: 120000,
          });
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
    if (!res) {
      throw new BadRequestException('Không thể gọi purchase plan Webshare');
    }
    const data = res.data as Record<string, unknown>;
    const paymentRequired = Boolean(data?.payment_required);
    const planId = this.getPlanIdFromResponse(data);
    return {
      planId,
      paymentRequired,
      raw: data,
      account: {
        id: credential.accountId,
        label: credential.accountLabel,
        pool_key: credential.poolKey,
        source: credential.source,
      },
    };
  }

  async cancelWebsharePlan(
    planId: number,
    context?: WebshareRequestContext,
  ): Promise<Record<string, unknown>> {
    const normalizedPlanId = Number(planId);
    if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
      throw new BadRequestException('Invalid plan_id');
    }
    const { headers } = await this.getWebshareHeaders({ context });
    const res = await axios.post(
      `${this.webshareSubscriptionPlanUrl}${Math.trunc(normalizedPlanId)}/cancel/`,
      {},
      {
        headers,
        timeout: 30000,
      },
    );
    return (res.data ?? {}) as Record<string, unknown>;
  }

  async createWebshareSubUser(params: {
    label: string;
    planId?: number | null;
    proxyLimit?: number | null;
    bandwidthLimit?: number | null;
    proxyCountries?: Record<string, number> | null;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }) {
    const payload: Record<string, unknown> = {
      label: params.label,
      max_thread_count:
        Number.isFinite(this.webshareSubuserMaxThreads) &&
        this.webshareSubuserMaxThreads > 0
          ? this.webshareSubuserMaxThreads
          : 500,
    };
    if (params.proxyLimit != null && params.proxyLimit >= 0) {
      payload.proxy_limit = params.proxyLimit;
    }
    if (params.bandwidthLimit != null && params.bandwidthLimit >= 0) {
      payload.bandwidth_limit = params.bandwidthLimit;
    }
    if (params.proxyCountries) {
      payload.proxy_countries = params.proxyCountries;
    }

    const url = params.planId
      ? `${this.webshareSubuserUrl}?plan_id=${params.planId}`
      : this.webshareSubuserUrl;
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params.accountId,
        poolKey: params.poolKey,
        query: params.query,
      },
    });
    const res = await axios.post(url, payload, {
      headers,
      timeout: 30000,
    });
    return res.data as Record<string, unknown>;
  }

  async deleteWebshareSubUser(params: {
    subuserId: number;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }): Promise<void> {
    const subuserId = Number(params.subuserId ?? 0);
    if (!Number.isFinite(subuserId) || subuserId <= 0) {
      return;
    }
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params.accountId,
        poolKey: params.poolKey,
        query: params.query,
      },
    });
    await axios.delete(`${this.webshareSubuserUrl}${subuserId}/`, {
      headers,
      timeout: 30000,
    });
  }

  async listWebshareSubUsers(params?: {
    page?: number;
    pageSize?: number;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Record<string, unknown>[];
  }> {
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params?.accountId,
        poolKey: params?.poolKey,
        query: params?.query,
      },
    });
    const res = await axios.get(this.webshareSubuserUrl, {
      params: {
        page: params?.page ?? 1,
        page_size: params?.pageSize ?? 100,
      },
      headers,
      timeout: 30000,
    });
    const data = res.data as Record<string, unknown>;
    return {
      count: this.toNumber(data?.count),
      next: typeof data?.next === 'string' ? data.next : null,
      previous: typeof data?.previous === 'string' ? data.previous : null,
      results: Array.isArray(data?.results)
        ? (data.results as Record<string, unknown>[])
        : [],
    };
  }

  async getWebshareSubUser(params: {
    subuserId: number;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }): Promise<Record<string, unknown>> {
    const subuserId = Number(params.subuserId ?? 0);
    if (!Number.isFinite(subuserId) || subuserId <= 0) {
      throw new BadRequestException('Invalid Webshare account identifier');
    }
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params.accountId,
        poolKey: params.poolKey,
        query: params.query,
      },
    });
    const res = await axios.get(`${this.webshareSubuserUrl}${subuserId}/`, {
      headers,
      timeout: 30000,
    });
    return (res.data ?? {}) as Record<string, unknown>;
  }

  async updateWebshareSubUser(params: {
    subuserId: number;
    payload: Record<string, unknown>;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }) {
    const subuserId = Number(params.subuserId ?? 0);
    if (!Number.isFinite(subuserId) || subuserId <= 0) {
      throw new BadRequestException('Invalid Webshare account identifier');
    }
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params.accountId,
        poolKey: params.poolKey,
        query: params.query,
      },
    });
    const res = await axios.patch(
      `${this.webshareSubuserUrl}${subuserId}/`,
      params.payload,
      {
        headers,
        timeout: 30000,
      },
    );
    return res.data as Record<string, unknown>;
  }

  async listWebshareProxies(params: {
    mode: 'direct' | 'backbone';
    subuserId?: number;
    planId?: number | null;
    pageSize?: number;
    maxPages?: number;
    maxResults?: number;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }) {
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params.accountId,
        poolKey: params.poolKey,
        query: params.query,
      },
    });
    const pageSizeRaw = Number(params.pageSize ?? 250);
    const pageSize =
      Number.isFinite(pageSizeRaw) && pageSizeRaw > 0
        ? Math.min(250, Math.trunc(pageSizeRaw))
        : 250;
    const maxPagesRaw = Number(params.maxPages ?? 0);
    const maxPages =
      Number.isFinite(maxPagesRaw) && maxPagesRaw > 0
        ? Math.trunc(maxPagesRaw)
        : null;
    const maxResultsRaw = Number(params.maxResults ?? 0);
    const maxResults =
      Number.isFinite(maxResultsRaw) && maxResultsRaw > 0
        ? Math.trunc(maxResultsRaw)
        : null;
    let page = 1;
    let results: Array<Record<string, unknown>> = [];
    while (true) {
      const searchParams = new URLSearchParams();
      searchParams.set('mode', params.mode);
      searchParams.set('page', String(page));
      searchParams.set('page_size', String(pageSize));
      if (params.planId) {
        searchParams.set('plan_id', String(params.planId));
      }
      const url = `${this.webshareProxyListUrl}?${searchParams.toString()}`;
      const res = await axios.get(url, {
        headers,
        timeout: 30000,
      });
      const data = res.data as Record<string, unknown>;
      const pageResults = Array.isArray(data?.results)
        ? (data.results as Array<Record<string, unknown>>)
        : [];
      results = results.concat(pageResults);
      if (maxResults && results.length >= maxResults) {
        results = results.slice(0, maxResults);
        break;
      }
      if (!data?.next || pageResults.length === 0) break;
      if (maxPages && page >= maxPages) break;
      page += 1;
    }
    return results;
  }

  async getWebshareProxyListStatus(params: {
    planId: number;
    accountId?: string | null;
    poolKey?: WebsharePoolKey | null;
    query?: Record<string, unknown> | null;
  }) {
    const planId = Number(params.planId || 0);
    if (!Number.isFinite(planId) || planId <= 0) {
      throw new BadRequestException('Invalid plan_id');
    }
    const { headers } = await this.getWebshareHeaders({
      context: {
        accountId: params.accountId,
        poolKey: params.poolKey,
        query: params.query,
      },
    });

    const res = await axios.get(this.webshareProxyListStatusUrl, {
      params: { plan_id: planId },
      headers,
      timeout: 30000,
    });
    return res.data as Record<string, unknown>;
  }
}
