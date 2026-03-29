import { ApiProperty } from '@nestjs/swagger';

export class GetNotificationBySlugInputDto {
  @ApiProperty({
    description: 'Notification slug',
    example: 'system-maintenance-notice',
  })
  slug: string;
}

export class GetNotificationBySlugQueryDto {
  @ApiProperty({
    description: 'Flag to indicate if request is for SEO purposes',
    required: false,
    type: String,
    example: 'false',
  })
  for_seo?: string;
}

export class GetNotificationBySlugOutputDto {
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
    description: 'Whether notification is global',
    example: true,
  })
  is_global: boolean;

  @ApiProperty({
    description: 'Target audience',
    example: 'user',
  })
  target_audience: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  created_at: string;
}
