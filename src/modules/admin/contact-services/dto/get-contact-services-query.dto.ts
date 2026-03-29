import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { PaginationInputDto } from '@/shared/dto/pagination.dtos';

export enum ContactServiceStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ContactServiceSortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetContactServicesQueryDto extends PaginationInputDto {
  @ApiProperty({
    description: 'Filter by service status',
    enum: ContactServiceStatus,
    example: ContactServiceStatus.ACTIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(ContactServiceStatus, {
    message: 'status must be either active or inactive',
  })
  status?: ContactServiceStatus;

  @ApiPropertyOptional({
    description: 'Field to sort by',
    enum: ContactServiceSortBy,
    example: ContactServiceSortBy.UPDATED_AT,
    default: ContactServiceSortBy.CREATED_AT,
  })
  @IsOptional()
  @IsEnum(ContactServiceSortBy, {
    message: 'sortBy must be one of: id, service_name, created_at, updated_at',
  })
  sortBy?: ContactServiceSortBy = ContactServiceSortBy.CREATED_AT;

  @ApiPropertyOptional({
    description: 'Sort direction',
    enum: SortOrder,
    example: SortOrder.DESC,
    default: SortOrder.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrder, {
    message: 'sortOrder must be either asc or desc',
  })
  sortOrder?: SortOrder = SortOrder.DESC;
}
