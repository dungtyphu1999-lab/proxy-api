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

export class SendUserNotificationInputDto {
  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'system',
  })
  @IsEnum(Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'Thông báo hệ thống',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Hệ thống sẽ bảo trì từ 2h-4h sáng ngày mai',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Link URL for navigation',
    example: '/announcements/maintenance',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  link_url?: string;

  @ApiProperty({
    description:
      'List of user IDs to send notification to. If empty, send to all verified and unblocked users',
    example: ['user-uuid-1', 'user-uuid-2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  user_ids?: string[];
}

export class SendUserNotificationOutputDto {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'system',
  })
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Notification title',
    example: 'Thông báo hệ thống',
  })
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'Hệ thống sẽ bảo trì từ 2h-4h sáng ngày mai',
  })
  message: string;

  @ApiProperty({
    description: 'Link URL for navigation',
    example: '/announcements/maintenance',
    required: false,
  })
  link_url?: string;

  @ApiProperty({
    description: 'Target audience (always user for user notifications)',
    example: 'user',
  })
  target_audience: string;

  @ApiProperty({
    description: 'Number of users notified',
    example: 150,
  })
  users_notified: number;

  @ApiProperty({
    description: 'Notification creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;
}
