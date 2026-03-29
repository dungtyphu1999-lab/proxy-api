import {
  IsOptional,
  IsInt,
  IsString,
  IsEnum,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PAGINATION_CONSTANTS, OrderDirection } from '../pagination.constants';

/**
 * Base pagination query DTO with validation and transformation
 */
export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Page number (1-based)',
    example: 1,
    minimum: 1,
    default: PAGINATION_CONSTANTS.DEFAULT_PAGE,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be greater than 0' })
  @Transform(({ value }) =>
    Math.max(1, parseInt(String(value)) || PAGINATION_CONSTANTS.DEFAULT_PAGE),
  )
  page?: number = PAGINATION_CONSTANTS.DEFAULT_PAGE;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 10,
    minimum: PAGINATION_CONSTANTS.MIN_LIMIT,
    maximum: PAGINATION_CONSTANTS.MAX_LIMIT,
    default: PAGINATION_CONSTANTS.DEFAULT_LIMIT,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Limit must be an integer' })
  @Min(PAGINATION_CONSTANTS.MIN_LIMIT, {
    message: `Limit must be at least ${PAGINATION_CONSTANTS.MIN_LIMIT}`,
  })
  @Max(PAGINATION_CONSTANTS.MAX_LIMIT, {
    message: `Limit cannot exceed ${PAGINATION_CONSTANTS.MAX_LIMIT}`,
  })
  @Transform(({ value }) =>
    Math.min(
      PAGINATION_CONSTANTS.MAX_LIMIT,
      Math.max(
        PAGINATION_CONSTANTS.MIN_LIMIT,
        parseInt(String(value)) || PAGINATION_CONSTANTS.DEFAULT_LIMIT,
      ),
    ),
  )
  limit?: number = PAGINATION_CONSTANTS.DEFAULT_LIMIT;

  @ApiPropertyOptional({
    description: 'Search term for filtering results',
    example: 'search text',
    maxLength: PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH,
  })
  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  @MaxLength(PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH, {
    message: `Search term cannot exceed ${PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH} characters`,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : undefined,
  )
  search?: string;

  @ApiPropertyOptional({
    description: 'Field to order results by',
    example: PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
    default: PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
  })
  @IsOptional()
  @IsString({ message: 'OrderBy must be a string' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : String(value),
  )
  orderBy?: string = PAGINATION_CONSTANTS.DEFAULT_ORDER_BY;

  @ApiPropertyOptional({
    description: 'Order direction',
    enum: ['asc', 'desc'],
    example: PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
    default: PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'], {
    message: 'Order direction must be either "asc" or "desc"',
  })
  orderDir?: OrderDirection = PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR;

  /**
   * Calculate the offset for database queries
   */
  get offset(): number {
    return (
      ((this.page || PAGINATION_CONSTANTS.DEFAULT_PAGE) - 1) *
      (this.limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT)
    );
  }

  /**
   * Get normalized pagination options
   */
  get paginationOptions(): {
    page: number;
    limit: number;
    search?: string;
    orderBy: string;
    orderDir: OrderDirection;
  } {
    return {
      page: this.page || PAGINATION_CONSTANTS.DEFAULT_PAGE,
      limit: this.limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT,
      search: this.search?.trim() || undefined,
      orderBy: this.orderBy?.trim() || PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
      orderDir: this.orderDir || PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
    };
  }
}

/**
 * Extended pagination query DTO with search fields support
 */
export class ExtendedPaginationQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Comma-separated list of fields to search in',
    example: 'name,email,description',
  })
  @IsOptional()
  @IsString({ message: 'Search fields must be a string' })
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value
          .split(',')
          .map((field) => field.trim())
          .filter((field) => field.length > 0)
      : [],
  )
  searchFields?: string[];

  /**
   * Get search fields as array
   */
  get searchFieldsArray(): string[] {
    if (Array.isArray(this.searchFields)) {
      return this.searchFields;
    }
    return [];
  }
}
