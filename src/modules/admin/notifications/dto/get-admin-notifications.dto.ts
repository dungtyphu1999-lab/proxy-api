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
import { PaginationMetadataDto } from '@/shared/dto/pagination.dtos';
import {
  ADMIN_NOTIFICATION_CONSTANTS,
  AdminNotificationType,
} from '../admin-notification.constants';
import { TargetAudience } from '@/database/entities/notification.entity';

export class GetAdminNotificationsInputDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  pageRow?: number;
  @ApiProperty({
    description: 'Filter by notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'blog',
    required: false,
  })
  @IsOptional()
  @IsEnum(Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  @Type(() => String)
  type?: AdminNotificationType;

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
  @IsEnum(['admin', 'user'])
  target_audience?: TargetAudience;

  @ApiProperty({
    description: 'Sort order by created_at',
    example: 'desc',
    enum: ['asc', 'desc'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  @Type(() => String)
  sortOrder?: 'asc' | 'desc';
}

export class AdminNotificationDto {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'blog',
  })
  @IsEnum(Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'Bài viết mới',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'John Doe đã tạo bài viết: Hello World',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Link URL for navigation',
    example: '/admin/blogs/123',
    required: false,
  })
  @IsOptional()
  @IsString()
  link_url?: string;

  @ApiProperty({
    description: 'URL-friendly identifier for the notification',
    example: 'new-blog-post-notification',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'URL to the notification thumbnail image',
    example: 'https://example.com/images/notification-thumb.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  thumbnail_url?: string;

  @ApiProperty({
    description: 'Whether notification is global',
    example: false,
  })
  @IsBoolean()
  is_global: boolean;

  @ApiProperty({
    description: 'Target audience (always admin for admin notifications)',
    example: 'admin',
  })
  @IsString()
  target_audience: string;

  @ApiProperty({
    description: 'Whether notification is read',
    example: false,
  })
  @IsBoolean()
  is_read: boolean;

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

export class GetAdminNotificationsOutputDto {
  @ApiProperty({
    description: 'List of admin notifications',
    type: [AdminNotificationDto],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => AdminNotificationDto)
  items: AdminNotificationDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetadataDto,
  })
  @ValidateNested()
  @IsDefined()
  @Type(() => PaginationMetadataDto)
  pagination: PaginationMetadataDto;

  @ApiProperty({
    description: 'Total unread count for admin',
    example: 5,
  })
  @IsInt()
  unread_count: number;
}
