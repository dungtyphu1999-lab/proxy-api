import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  Max,
  IsUUID,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import {
  PaginationInputDto,
  PaginationDto,
} from '@/shared/dto/pagination.dtos';

export enum ProductSortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  NAME = 'name',
  PRICE = 'price',
  RATING = 'rating_avg',
  TOTAL_SALES = 'total_sales',
  POPULARITY = 'popularity',
}

export enum ProductSortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum BinaryFlag {
  FALSE = 0,
  TRUE = 1,
}

export class GetProductsInputDto extends PaginationInputDto {
  @ApiPropertyOptional({
    description: 'Search keyword for products',
    example: 'app mobile',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Search by product name only',
    example: 'mobile app',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by category slug (exact match)',
    example: 'mobile-app-development',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    description: 'Product category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  category_id?: string;

  @ApiPropertyOptional({
    description: 'Product subcategory IDs (comma-separated for multiple)',
    example:
      '123e4567-e89b-12d3-a456-426614174001,123e4567-e89b-12d3-a456-426614174002',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((id: string) => id.trim());
    }
    return value as string[];
  })
  @IsArray()
  @IsUUID('4', { each: true })
  subcategory_id?: string[];

  @ApiPropertyOptional({
    description: 'Minimum price',
    example: 100000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_price?: number;

  @ApiPropertyOptional({
    description: 'Maximum price',
    example: 1000000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max_price?: number;

  @ApiPropertyOptional({
    description: 'Minimum rating (0-5)',
    example: 4.0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  min_rating?: number;

  @ApiPropertyOptional({
    description: 'Minimum sales count',
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min_sales?: number;

  @ApiPropertyOptional({
    description: 'Maximum sales count',
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max_sales?: number;

  @ApiPropertyOptional({
    description: 'Filter free products only (0: false, 1: true)',
    enum: BinaryFlag,
    example: BinaryFlag.TRUE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BinaryFlag)
  is_free?: BinaryFlag;

  @ApiPropertyOptional({
    description:
      'Filter products from top-rated sellers only (0: false, 1: true)',
    enum: BinaryFlag,
    example: BinaryFlag.TRUE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BinaryFlag)
  top_rated_seller?: BinaryFlag;

  @ApiPropertyOptional({
    description: 'Sort by field',
    enum: ProductSortBy,
    example: ProductSortBy.POPULARITY,
  })
  @IsOptional()
  @IsEnum(ProductSortBy)
  sort_by?: ProductSortBy = ProductSortBy.POPULARITY;

  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: ProductSortDirection,
    example: ProductSortDirection.DESC,
  })
  @IsOptional()
  @IsEnum(ProductSortDirection)
  sort_direction?: ProductSortDirection = ProductSortDirection.DESC;
}

export class ProductShopDto {
  @ApiPropertyOptional({
    description: 'Shop ID',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Shop name',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Shop slug',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'Shop avatar URL',
  })
  avatar_url: string;

  @ApiPropertyOptional({
    description: 'Whether the shop owner is verified',
  })
  verified: boolean;
}

export class ProductListItemDto {
  @ApiPropertyOptional({
    description: 'Product ID',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Product name',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Product slug',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'Product description',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'Product price',
  })
  price: number;

  @ApiPropertyOptional({
    description: 'Discount percentage (0-100)',
  })
  discount_percent: number;

  @ApiPropertyOptional({
    description: 'Whether the product is free',
  })
  is_free: boolean;

  @ApiPropertyOptional({
    description: 'Average rating',
  })
  rating_avg: number;

  @ApiPropertyOptional({
    description: 'Total sales count',
  })
  total_sales: number;

  @ApiPropertyOptional({
    description: 'Total review count',
  })
  total_review: number;

  @ApiPropertyOptional({
    description: 'Total likes count',
  })
  total_like: number;

  @ApiPropertyOptional({
    description: 'Total views count',
  })
  total_view: number;

  @ApiPropertyOptional({
    description: 'Product thumbnail image',
  })
  thumbnail: string;

  @ApiPropertyOptional({
    description: 'Category name',
  })
  category_name: string;

  @ApiPropertyOptional({
    description: 'Category slug',
  })
  category_slug: string;

  @ApiPropertyOptional({
    description: 'Subcategory name',
  })
  subcategory_name: string;

  @ApiPropertyOptional({
    description: 'Subcategory slug',
  })
  subcategory_slug: string;

  @ApiPropertyOptional({
    description: 'Whether the product is sponsored',
  })
  is_sponsored: boolean;

  @ApiPropertyOptional({
    description: 'Shop information',
    type: ProductShopDto,
  })
  shop: ProductShopDto;

  @ApiPropertyOptional({
    description: 'Creation timestamp',
  })
  created_at: Date;

  @ApiPropertyOptional({
    description: 'Last update timestamp',
  })
  updated_at: Date;

  price_min_max?: string;
  total_quantity?: number;
}

export class GetProductsOutputDto extends PaginationDto<ProductListItemDto> {}
