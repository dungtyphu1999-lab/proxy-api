import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Body,
  Param,
  Query,
  Req,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseJwtAuthGuard } from '../auth/decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { ProxyService } from './proxy.service';
import { GetProxiesQueryDto } from './dto/get-proxies-query.dto';
import { PutProxyCountryFiltersDto } from './dto/proxy-country-filters.dto';
import { CreateProxyOrderDto } from './dto/create-proxy-order.dto';
import { GetProxyOrdersQueryDto } from './dto/get-proxy-orders-query.dto';
import { CalculateProxyPriceDto } from '@/modules/guest/proxy-master/dto/calculate-proxy-price.dto';

@ApiTags('[User] Proxy')
@Controller()
@UseJwtAuthGuard()
@ApiBearerAuth()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get('proxies')
  @ApiOperation({ summary: 'Get list of user proxies with search and filters' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated proxy list' })
  async getProxies(
    @Req() req: JwtAuthenticatedRequest,
    @Query() query: GetProxiesQueryDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getProxiesList(userId, query);
  }

  @Get('proxies/download')
  @ApiOperation({ summary: 'Download proxy list as txt or json' })
  @ApiResponse({ status: HttpStatus.OK, description: 'File or JSON' })
  async downloadProxies(
    @Req() req: JwtAuthenticatedRequest,
    @Query('format') format: 'json' | 'txt' = 'json',
    @Query('country_codes') country_codes?: string,
    @Query('proxy_type') proxy_type?: string,
    @Query('order_id') order_id?: string,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    const normalizedProxyType = proxy_type?.trim();
    if (
      normalizedProxyType &&
      !['proxy_server', 'static_residential', 'rotating_residential'].includes(
        normalizedProxyType,
      )
    ) {
      throw new BadRequestException('proxy_type không hợp lệ');
    }
    const codes = country_codes
      ? country_codes
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;
    const result = await this.proxyService.getProxiesDownload(
      userId,
      format,
      codes,
      normalizedProxyType,
      order_id?.trim(),
    );
    if (
      format === 'txt' &&
      typeof (result as { content?: string }).content === 'string'
    ) {
      return (result as { content: string }).content;
    }
    return result;
  }

  @Get('proxy/country-filters')
  @ApiOperation({ summary: 'Get saved country filter codes for proxy list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of country codes' })
  async getCountryFilters(@Req() req: JwtAuthenticatedRequest) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getCountryFilters(userId);
  }

  @Get('proxy/rotating-status')
  @ApiOperation({ summary: 'Get rotating proxy status from Webshare by plan' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Rotating plan status with available countries',
  })
  async getRotatingStatus(@Req() req: JwtAuthenticatedRequest) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getRotatingProxyStatus(userId);
  }

  @Get('proxy/activation')
  @ApiOperation({
    summary:
      'Get proxy product activation status by user Webshare key, fallback global if user not mapped',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Activation status for current user proxy product',
  })
  async getProxyActivationStatus(
    @Req() req: JwtAuthenticatedRequest,
    @Query('productCode') productCode?: string,
    @Query('exclusivityValue') exclusivityValue?: string,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getProxyProductActivationStatus({
      userId,
      productCode,
      exclusivityValue,
    });
  }

  @Put('proxy/country-filters')
  @ApiOperation({ summary: 'Save country filter codes for proxy list' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated country codes' })
  async putCountryFilters(
    @Req() req: JwtAuthenticatedRequest,
    @Body() body: PutProxyCountryFiltersDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.putCountryFilters(userId, body.country_codes);
  }

  @Post('proxy/orders')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a proxy order' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Created order' })
  async createOrder(
    @Req() req: JwtAuthenticatedRequest,
    @Body() body: CreateProxyOrderDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.createOrder(userId, body);
  }

  @Post('proxy/calculate-price')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Calculate proxy price using the mapped Webshare account of current user',
  })
  async calculatePrice(
    @Req() req: JwtAuthenticatedRequest,
    @Body() body: CalculateProxyPriceDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.calculatePrice(userId, body);
  }

  @Get('proxy/orders')
  @ApiOperation({ summary: 'Get list of user proxy orders' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated orders' })
  async getOrders(
    @Req() req: JwtAuthenticatedRequest,
    @Query() query: GetProxyOrdersQueryDto,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getOrdersList(userId, query);
  }

  @Get('proxy/orders/:orderId/summary')
  @ApiOperation({ summary: 'Get summary for a specific proxy order' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Proxy order summary' })
  async getOrderSummary(
    @Req() req: JwtAuthenticatedRequest,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getOrderSummary(userId, orderId);
  }

  @Get('proxy/orders/:orderId/transactions')
  @ApiOperation({ summary: 'Get transactions for a proxy order' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of transactions' })
  async getOrderTransactions(
    @Req() req: JwtAuthenticatedRequest,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.getOrderTransactions(orderId, userId);
  }

  @Post('proxy/orders/:orderId/renew')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renew a proxy order' })
  async renewOrder(
    @Req() req: JwtAuthenticatedRequest,
    @Param('orderId', ParseUUIDPipe) orderId: string,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    return this.proxyService.renewOrder(userId, orderId);
  }

  @Get('proxy/transactions')
  @ApiOperation({ summary: 'Get current user proxy payment/refund history' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated transactions' })
  async getMyTransactions(
    @Req() req: JwtAuthenticatedRequest,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = req?.user?.sub;
    if (!userId) throw new UnauthorizedException('User not authenticated');
    const p = page ? Math.max(1, parseInt(page, 10) || 1) : 1;
    const l = limit
      ? Math.min(100, Math.max(1, parseInt(limit, 10) || 20))
      : 20;
    return this.proxyService.getMyTransactions(userId, p, l);
  }

}
