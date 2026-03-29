import { ApiProperty } from '@nestjs/swagger';

export class CheckProfileCompletedResponseDto {
  @ApiProperty({
    description: 'Trạng thái hoàn thành profile của user',
    example: true,
  })
  is_profile_completed: boolean;
}
