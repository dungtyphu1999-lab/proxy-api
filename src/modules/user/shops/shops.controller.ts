import {
  Controller,
  Request,
  Get,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ShopsService } from './shops.service';
import { UseJwtAuthGuard } from '../auth/decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { GetProductsByShopInputDto } from '../products/dtos/get-products-by-shop-input.dto';
import { GetWeeklyBestProductsOutputDto } from '../products/dtos/get-weekly-best-products.dto';

@ApiTags('[User] Shops')
@Controller()
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get('my-shop')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Get current user shops',
    description: 'Get all shops owned by the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User shops retrieved successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - authentication required',
  })
  async getUserShop(@Request() req: JwtAuthenticatedRequest) {
    const userId = req.user.sub;
    return await this.shopsService.findShopDetailOfUser(userId);
  }
}
