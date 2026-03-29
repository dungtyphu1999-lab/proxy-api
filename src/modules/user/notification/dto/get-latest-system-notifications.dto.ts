import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetLatestSystemNotificationsInputDto {
  @ApiProperty({
    description: 'Number of latest system notifications to retrieve',
    example: 3,
    minimum: 1,
    maximum: 50,
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}

export class SystemNotificationItemDto {
  @ApiProperty({
    description: 'Notification ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Notification type',
    example: 'system_announcement',
  })
  type: string;

  @ApiProperty({
    description: 'Notification title',
    example: 'System Maintenance Notice',
  })
  title: string;

  @ApiProperty({
    description: 'Notification message',
    example: 'The system will be under maintenance from 2 AM to 4 AM.',
  })
  message: string;

  @ApiProperty({
    description: 'Link URL (optional)',
    example: 'https://example.com/maintenance',
    required: false,
  })
  link_url?: string;

  @ApiProperty({
    description: 'URL-friendly identifier for the notification',
    example: 'system-maintenance-notice',
    required: false,
  })
  slug?: string;

  @ApiProperty({
    description: 'URL to the notification thumbnail image',
    example: 'https://example.com/images/maintenance-thumb.jpg',
    required: false,
  })
  thumbnail_url?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  created_at: string;
}

export class GetLatestSystemNotificationsOutputDto {
  @ApiProperty({
    description: 'List of latest system notifications',
    type: [SystemNotificationItemDto],
  })
  notifications: SystemNotificationItemDto[];

  @ApiProperty({
    description: 'Total number of notifications returned',
    example: 3,
  })
  total: number;

  @ApiProperty({
    description: 'Requested limit',
    example: 3,
  })
  limit: number;
}
