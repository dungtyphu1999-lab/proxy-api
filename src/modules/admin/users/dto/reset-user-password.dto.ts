// dto/reset-user-password.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ResetUserPasswordDto {
  @ApiProperty({ example: '735d162f-8bfb-4198-9968-d7d46e5eafc0' })
  @IsUUID()
  userId: string;
}
