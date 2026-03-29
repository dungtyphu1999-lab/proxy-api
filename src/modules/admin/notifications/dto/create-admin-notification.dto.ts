import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
  IsArray,
  IsUUID,
} from 'class-validator';
import {
  ADMIN_NOTIFICATION_CONSTANTS,
  AdminNotificationType,
} from '../admin-notification.constants';

export class CreateAdminNotificationInputDto {
  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'blog',
  })
  @IsEnum(Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'Bảo trì hệ thống',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Hệ thống sẽ bảo trì từ 2h-4h sáng',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Link URL for navigation',
    example: '/admin/announcements/maintenance',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  link_url?: string;

  @ApiProperty({
    description: 'List of admin user IDs to send notification to',
    example: ['admin-uuid-1', 'admin-uuid-2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  admin_user_ids?: string[];

  @ApiProperty({
    description: 'Type of related entity (blog, product, order, etc.)',
    example: 'blog',
    required: false,
  })
  @IsOptional()
  @IsString()
  related_entity_type?: string;

  @ApiProperty({
    description: 'ID of the related entity',
    example: 'blog-uuid-123',
    required: false,
  })
  @IsOptional()
  @IsString()
  related_entity_id?: string;
}

export class CreateAdminNotificationOutputDto {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'blog',
  })
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'Bảo trì hệ thống',
  })
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Hệ thống sẽ bảo trì từ 2h-4h sáng',
  })
  message: string;

  @ApiProperty({
    description: 'Link URL for navigation',
    example: '/admin/announcements/maintenance',
    required: false,
  })
  link_url?: string;

  @ApiProperty({
    description: 'Target audience (always admin)',
    example: 'admin',
  })
  target_audience: string;

  @ApiProperty({
    description: 'Number of admin users notified',
    example: 5,
  })
  admin_users_notified: number;

  @ApiProperty({
    description: 'Notification creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;
}
