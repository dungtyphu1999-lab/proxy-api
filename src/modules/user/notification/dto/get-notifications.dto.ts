import { Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  IsDefined,
  IsString,
  IsDate,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  PaginationInputDto,
  PaginationMetadataDto,
} from '@/shared/dto/pagination.dtos';
import { NOTIFICATION_CONSTANTS } from '../notification.constants';
import { TargetAudience } from '@/database/entities/notification.entity';

export type NotificationType =
  (typeof NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES];

export class GetNotificationsInputDto extends PaginationInputDto {
  @ApiProperty({
    description: 'Filter by notification type',
    enum: Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'order',
    required: false,
  })
  @IsOptional()
  @IsEnum(Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  @Type(() => String)
  type?: NotificationType;

  @ApiProperty({
    description: 'Filter by read status',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_read?: boolean;

  @ApiProperty({
    description: 'Filter by global notifications only',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_global?: boolean;

  @ApiProperty({
    description: 'Filter by target audience',
    enum: ['admin', 'user', 'all'],
    example: 'admin',
    required: false,
  })
  @IsOptional()
  @IsEnum(['admin', 'user', 'all'])
  target_audience?: TargetAudience;

  @ApiProperty({
    description: 'Search notifications by title or message',
    example: 'Hello',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  search?: string;
}

export class NotificationDto {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'order',
  })
  @IsEnum(Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type: NotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'Đơn hàng mới',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Bạn có đơn hàng mới #12345',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Link URL for navigation',
    example: '/orders/12345',
    required: false,
  })
  @IsOptional()
  @IsString()
  link_url?: string;

  @ApiProperty({
    description: 'Whether notification is global',
    example: false,
  })
  @IsBoolean()
  is_global: boolean;

  @ApiProperty({
    description: 'Target audience for the notification',
    enum: ['admin', 'user'],
    example: 'admin',
  })
  @IsEnum(['admin', 'user'])
  target_audience: TargetAudience;

  @ApiProperty({
    description: 'Whether notification is read',
    example: false,
  })
  @IsBoolean()
  is_read?: boolean;

  @ApiProperty({
    description: 'When notification was read',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  read_at?: Date;

  @ApiProperty({
    description: 'Notification creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  created_at: Date;
}

export class GetNotificationsOutputDto {
  @ApiProperty({
    description: 'List of notifications',
    type: [NotificationDto],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => NotificationDto)
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
