import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetUnreadCountOutputDto {
  @ApiProperty({
    description: 'Total number of unread messages across all conversations',
    example: 15,
  })
  @IsNumber()
  total_unread_count: number;
}
