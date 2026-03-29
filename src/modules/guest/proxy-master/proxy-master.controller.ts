import { Controller, Get, Post, Body, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProxyMasterService } from './proxy-master.service';
import { CalculateProxyPriceDto } from './dto/calculate-proxy-price.dto';

@ApiTags('[Public] Proxy Master Data')
@Controller()
export class ProxyMasterController {
  constructor(private readonly proxyMasterService: ProxyMasterService) {}

  @Get('countries')
  @ApiOperation({
    summary: 'Get all countries (for proxy filters and locations)',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of countries' })
  async getCountries() {
    return this.proxyMasterService.getCountries();
  }

  @Get('proxy-products')
  @ApiOperation({ summary: 'Get all proxy product types (static/rotating)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of proxy products' })
  async getProxyProducts() {
    return this.proxyMasterService.getProxyProducts();
  }

  @Get('proxy-product-options')
  @ApiOperation({
    summary:
      'Get proxy product options (exclusivity, quantity, bandwidth). Optional productId filter.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of options' })
  async getProxyProductOptions(@Query('productId') productId?: string) {
    const id =
      productId != null && productId !== ''
        ? parseInt(productId, 10)
        : undefined;
    if (id != null && (isNaN(id) || id < 1)) {
      return this.proxyMasterService.getProxyProductOptions(undefined);
    }
    return this.proxyMasterService.getProxyProductOptions(id);
  }

  @Get('proxy-locations')
  @ApiOperation({ summary: 'Get proxy locations (countries / random)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of locations' })
  async getProxyLocations() {
    return this.proxyMasterService.getProxyLocations();
  }

  @Get('proxy-country-options')
  @ApiOperation({
    summary:
      'Get available countries from Webshare customize API by product + exclusivity',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List available countries for selected proxy product',
  })
  async getProxyCountryOptions(
    @Query('productId') productId?: string,
    @Query('exclusivityValue') exclusivityValue?: string,
  ) {
    const id =
      productId != null && productId !== ''
        ? parseInt(productId, 10)
        : undefined;
    if (id == null || Number.isNaN(id) || id < 1) {
      return [];
    }
    return this.proxyMasterService.getProxyCountryOptions(id, exclusivityValue);
  }

  @Get('proxy-additional-features')
  @ApiOperation({ summary: 'Get additional features (high concurrency, etc.)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of features' })
  async getProxyAdditionalFeatures() {
    return this.proxyMasterService.getProxyAdditionalFeatures();
  }

  @Get('proxy-product-activation')
  @ApiOperation({
    summary: 'Get product activation status using global Webshare credential',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Activation status for proxy product',
  })
  async getProxyProductActivation(
    @Query('productCode') productCode?: string,
    @Query('exclusivityValue') exclusivityValue?: string,
  ) {
    return this.proxyMasterService.getProxyProductActivationStatus({
      productCode: productCode ?? 'proxy_server',
      exclusivityValue,
    });
  }

  @Get('payment-methods')
  @ApiOperation({ summary: 'Get payment methods for proxy purchase' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of payment methods',
  })
  async getPaymentMethods() {
    return this.proxyMasterService.getPaymentMethods();
  }

  @Post('calculate-price')
  @ApiOperation({
    summary: 'Calculate proxy price based on selected options',
    description: `
      Tính giá proxy dựa trên các options được chọn.
      
      **Input:**
      - product_id (required): ID của sản phẩm proxy
      - exclusivity_option_id (optional): ID của option exclusivity (shared/private/dedicated)
      - quantity_option_id (optional): ID của option số lượng IP
      - bandwidth_option_id (optional): ID của option bandwidth
      - location_id (optional): ID của location (hiện tại chưa ảnh hưởng giá)
      - additional_feature_id (optional): ID của tính năng bổ sung
      - billing_cycle (required): 'monthly' hoặc 'yearly'
      - discount_percent (optional): Phần trăm giảm giá (0-100)
      
      **Output:**
      - base_price: Giá cơ bản realtime (USD)
      - base_price_type: Loại giá ('fixed' | 'per_unit' | 'per_month')
      - additional_feature_price: Giá tính năng bổ sung (USD)
      - subtotal: Tổng giá trước billing cycle
      - billing_cycle: Chu kỳ thanh toán
      - billing_cycle_multiplier: Hệ số nhân (yearly = 12)
      - subtotal_with_billing: Tổng giá sau khi nhân billing cycle
      - discount_percent: Phần trăm giảm giá
      - discount_amount: Số tiền giảm (USD)
      - total: Tổng giá cuối cùng (USD)
      - currency: 'USD'
      - breakdown: Chi tiết từng phần
    `,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Calculated price with breakdown',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input parameters',
  })
  async calculatePrice(@Body() dto: CalculateProxyPriceDto) {
    return this.proxyMasterService.calculatePrice(dto);
  }
}
