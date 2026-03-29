import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { ProductListItemDto } from './get-products.dto';
import {
  PaginationInputDto,
  PaginationMetadataDto,
} from '@/shared/dto/pagination.dtos';

export class GetWeeklyBestProductsInputDto extends PaginationInputDto {
  @ApiPropertyOptional({ description: 'Category ID to filter' })
  @IsOptional()
  @IsUUID()
  category?: string;
}

export class GetWeeklyBestProductsOutputDto {
  @ApiProperty({ type: [ProductListItemDto] })
  items!: ProductListItemDto[];

  @ApiProperty({ description: 'Pagination metadata' })
  pagination!: PaginationMetadataDto;
}
