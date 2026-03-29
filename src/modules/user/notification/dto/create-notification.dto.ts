import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
  IsUUID,
} from 'class-validator';
import { TargetAudience } from '@/database/entities/notification.entity';
import { NOTIFICATION_CONSTANTS } from '../notification.constants';

export type NotificationType =
  (typeof NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES];

export class CreateNotificationInputDto {
  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'system',
  })
  @IsEnum(Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type: NotificationType;

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
    description: 'Link URL for navigation (can be relative path or full URL)',
    example: '/announcements/maintenance',
    required: false,
  })
  @IsOptional()
  @IsString()
  link_url?: string;

  @ApiProperty({
    description: 'Whether notification is global (sent to all users)',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  is_global?: boolean;

  @ApiProperty({
    description: 'Target audience for the notification',
    enum: ['admin', 'user', 'all'],
    example: 'admin',
    default: 'user',
  })
  @IsOptional()
  @IsEnum(['admin', 'user', 'all'])
  target_audience?: TargetAudience;

  @ApiProperty({
    description: 'List of user IDs to send notification to (if not global)',
    example: ['user-uuid-1', 'user-uuid-2'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  user_ids?: string[];
}

export class CreateNotificationOutputDto {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Target audience for the notification',
    enum: ['admin', 'user', 'all'],
    example: 'admin',
  })
  target_audience: TargetAudience;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'system',
  })
  type: NotificationType;

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
    example: '/announcements/maintenance',
    required: false,
  })
  link_url?: string;

  @ApiProperty({
    description: 'Whether notification is global',
    example: true,
  })
  is_global: boolean;

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
