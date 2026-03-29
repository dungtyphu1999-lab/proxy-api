import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { NOTIFICATION_CONSTANTS } from '../notification.constants';
import { TargetAudience } from '@/database/entities/notification.entity';

export type NotificationType =
  (typeof NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES];

// Socket authentication payload
export class SocketAuthDto {
  @ApiProperty({
    description: 'JWT token for socket authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

// Get notifications payload (Client → Server)
export class GetNotificationsSocketDto {
  @ApiProperty({
    description: 'Page number',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  page?: number;

  @ApiProperty({
    description: 'Items per page',
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsInt()
  limit?: number;

  @ApiProperty({
    description: 'Filter by notification type',
    enum: Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'all',
    required: false,
  })
  @IsOptional()
  @IsEnum(Object.values(NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type?: NotificationType | 'all';
}

// Mark notification as read payload (Client → Server)
export class MarkNotificationReadSocketDto {
  @ApiProperty({
    description: 'Notification ID to mark as read',
    example: 1,
    required: true,
  })
  @IsInt()
  notification_id: number;
}

// Notification data (Server → Client)
export class NotificationSocketDto {
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
  @IsUrl()
  link_url?: string;

  @ApiProperty({
    description: 'Whether notification is read',
    example: false,
  })
  @IsBoolean()
  is_read: boolean;

  @ApiProperty({
    description: 'Whether notification is global',
    example: false,
  })
  @IsBoolean()
  is_global: boolean;

  @ApiProperty({
    description: 'Target audience for the notification',
    enum: ['admin', 'user', 'all'],
    example: 'admin',
  })
  @IsEnum(['admin', 'user', 'all'])
  target_audience: TargetAudience;

  @ApiProperty({
    description: 'Notification creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  @IsString()
  created_at: string;
}

// Socket event names
export enum SocketEvents {
  AUTH = 'auth',
  GET_NOTIFICATIONS = 'notification:get',
  MARK_READ = 'notification:read',
  MARK_ALL_READ = 'notification:read_all',
  NEW_NOTIFICATION = 'notification:new',
  GLOBAL_NOTIFICATION = 'notification:global',
  UNREAD_COUNT = 'notification:unread_count',
  WALLET_BALANCE_UPDATED = 'wallet:balance_updated',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}
