import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsBoolean, Min } from 'class-validator';

/**
 * Comprehensive pagination metadata DTO for API responses
 */
export class PaginationMetaDto {
  @ApiProperty({
    description: 'Total number of items across all pages',
    example: 100,
    minimum: 0,
  })
  @IsInt({ message: 'Total must be an integer' })
  @Min(0, { message: 'Total cannot be negative' })
  total: number;

  @ApiProperty({
    description: 'Current page number (1-based)',
    example: 1,
    minimum: 1,
  })
  @IsInt({ message: 'Page must be an integer' })
  @Min(1, { message: 'Page must be greater than 0' })
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
  })
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1, { message: 'Limit must be greater than 0' })
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
    minimum: 0,
  })
  @IsInt({ message: 'Total pages must be an integer' })
  @Min(0, { message: 'Total pages cannot be negative' })
  totalPages: number;

  @ApiProperty({
    description: 'Whether there is a previous page',
    example: false,
  })
  @IsBoolean({ message: 'Has previous page must be a boolean' })
  hasPreviousPage: boolean;

  @ApiProperty({
    description: 'Whether there is a next page',
    example: true,
  })
  @IsBoolean({ message: 'Has next page must be a boolean' })
  hasNextPage: boolean;

  @ApiPropertyOptional({
    description: 'Previous page number (null if on first page)',
    example: null,
    nullable: true,
  })
  previousPage: number | null;

  @ApiPropertyOptional({
    description: 'Next page number (null if on last page)',
    example: 2,
    nullable: true,
  })
  nextPage: number | null;
}

/**
 * Standard paginated response DTO
 * @template T - Type of the data items being paginated
 */
export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: 'Array of data items for the current page',
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: 'Comprehensive pagination metadata',
    type: PaginationMetaDto,
  })
  @Type(() => PaginationMetaDto)
  meta: PaginationMetaDto;
}
