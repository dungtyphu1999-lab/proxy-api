import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import {
  ADMIN_NOTIFICATION_CONSTANTS,
  AdminNotificationType,
} from '../admin-notification.constants';

export class EditNotificationInputDto {
  @ApiProperty({
    description: 'Notification title',
    example: 'Updated System Maintenance',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'The system maintenance has been rescheduled to tomorrow.',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'blog',
  })
  @IsEnum(Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Link URL for the notification',
    example: '/admin/announcements/maintenance',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  link_url?: string;
}

export class EditNotificationOutputDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'New notification ID',
    example: 123,
  })
  new_notification_id: number;

  @ApiProperty({
    description: 'Old notification ID that was soft deleted',
    example: 122,
  })
  old_notification_id: number;

  @ApiProperty({
    description: 'Notification title',
    example: 'Updated System Maintenance',
  })
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'The system maintenance has been rescheduled to tomorrow.',
  })
  message: string;

  @ApiProperty({
    description: 'Notification type',
    enum: Object.values(ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
    example: 'blog',
  })
  type: AdminNotificationType;

  @ApiProperty({
    description: 'Created at timestamp',
    example: '2024-01-15T10:30:00Z',
  })
  created_at: string;
}
