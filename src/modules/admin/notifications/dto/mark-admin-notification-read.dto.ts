import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class MarkAdminNotificationReadInputDto {
  @ApiProperty({
    description: 'Admin notification ID to mark as read',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  notification_id?: number;
}

export class MarkAdminNotificationReadOutputDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Updated unread count for admin',
    example: 3,
  })
  unread_count: number;

  @ApiProperty({
    description: 'Number of admin notifications marked as read',
    example: 1,
  })
  marked_count: number;
}
