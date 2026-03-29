import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { NotificationDto } from './get-notifications.dto';
import { PaginationMetadataDto } from '@/shared/dto/pagination.dtos';

export class GetSystemNotificationsInputDto {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageRow?: number = 10;
}

export class GetSystemNotificationsOutputDto {
  @ApiProperty({
    description: 'List of system notifications',
    type: [NotificationDto],
  })
  items: NotificationDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetadataDto,
  })
  @ValidateNested()
  @IsDefined()
  @Type(() => PaginationMetadataDto)
  pagination: PaginationMetadataDto;

  @ApiProperty({
    description: 'Total unread count',
    example: 5,
  })
  @IsInt()
  unread_count: number;
}
