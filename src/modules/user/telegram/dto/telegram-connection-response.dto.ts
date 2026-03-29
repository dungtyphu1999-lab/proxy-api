import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDto } from '@/shared/dto/response.dto';

export class TelegramConnectionDataDto {
  @ApiProperty({
    description: 'Connection status',
    example: true,
  })
  is_connected: boolean;

  @ApiProperty({
    description: 'Telegram user ID',
    example: '6240587559',
    required: false,
  })
  telegram_user_id?: string;

  @ApiProperty({
    description: 'Telegram username',
    example: 'devsp2023',
    required: false,
  })
  telegram_username?: string | null;

  @ApiProperty({
    description: 'Connection timestamp',
    example: '2026-02-26T18:04:16.408Z',
    required: false,
  })
  connected_at?: Date;
}

export class TelegramConnectionResponseDto extends SuccessResponseDto<TelegramConnectionDataDto> {}
