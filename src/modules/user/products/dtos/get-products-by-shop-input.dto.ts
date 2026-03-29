import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { ProductListItemDto } from './get-products.dto';
import {
  PaginationInputDto,
  PaginationMetadataDto,
} from '@/shared/dto/pagination.dtos';

export class GetProductsByShopInputDto extends PaginationInputDto {
  @ApiPropertyOptional({ description: 'Category ID to filter' })
  @IsOptional()
  @IsUUID()
  category_id?: string;

  @ApiPropertyOptional({ description: 'Shop ID to filter' })
  @IsOptional()
  @IsUUID()
  shop_id: string;

}

