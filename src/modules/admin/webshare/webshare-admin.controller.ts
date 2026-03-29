import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseAdminJwtAuthGuard } from '@/modules/admin/auth/decorators/use-admin-jwt-auth-guard.decorator';
import { WebshareAdminService } from './webshare-admin.service';
import { UpdateWebshareConfigDto } from './dto/update-webshare-config.dto';
import { TestWebshareConnectionDto } from './dto/test-webshare-connection.dto';
import { GetManagedSubUserOrdersQueryDto } from './dto/get-managed-sub-user-orders-query.dto';

@ApiTags('[Admin] Webshare')
@Controller()
export class WebshareAdminController {
  constructor(private readonly webshareAdminService: WebshareAdminService) {}

  @Get('config')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Get Webshare config managed from admin',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Webshare config' })
  async getConfig() {
    return this.webshareAdminService.getConfig();
  }

  @Put('config')
  @UseAdminJwtAuthGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Webshare config',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Updated config' })
  async updateConfig(@Body() body: UpdateWebshareConfigDto) {
    return this.webshareAdminService.updateConfig(body);
  }

  @Get('dashboard')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Get Webshare pools health dashboard',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Dashboard rows' })
  async getDashboard() {
    return this.webshareAdminService.getDashboard();
  }

  @Post('test-connection')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Test Webshare API key connection',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Connection status' })
  async testConnection(@Body() body: TestWebshareConnectionDto) {
    return this.webshareAdminService.testConnection(body);
  }

  @Get('sub-users')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'List managed Webshare proxy orders grouped by user',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Managed users/orders' })
  async getManagedSubUsers() {
    return this.webshareAdminService.getManagedSubUsers();
  }

  @Get('sub-users/users/:userId/orders')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'List managed proxy orders for one user in Webshare admin',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Managed proxy orders by user' })
  async getManagedSubUserOrdersByUser(
    @Param('userId') userId: string,
    @Query() query: GetManagedSubUserOrdersQueryDto,
  ) {
    return this.webshareAdminService.getManagedSubUserOrdersByUser(userId, query);
  }

  @Post('sub-users/:orderId/refresh')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Refresh one managed proxy order from Webshare',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Refreshed proxy order' })
  async refreshManagedSubUser(@Param('orderId') orderId: string) {
    return this.webshareAdminService.refreshManagedSubUser(orderId);
  }

  @Post('sub-users/:orderId/revoke')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Revoke one managed proxy order',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Revoked proxy order' })
  async revokeManagedSubUser(@Param('orderId') orderId: string) {
    return this.webshareAdminService.revokeManagedSubUser(orderId);
  }
}
