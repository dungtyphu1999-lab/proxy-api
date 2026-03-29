import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class MarkNotificationReadInputDto {
  @ApiProperty({
    description: 'Notification ID to mark as read',
    example: 1,
    required: true,
  })
  @IsInt()
  notification_id: number;
}

export class MarkNotificationReadOutputDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Updated unread count',
    example: 3,
  })
  unread_count: number;

  @ApiProperty({
    description: 'Number of notifications marked as read',
    example: 1,
  })
  marked_count: number;
}
