import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDto } from '@/shared/dto/response.dto';

export class TelegramConnectTokenDto {
  @ApiProperty({ description: 'Telegram link token', example: 'uuid-string' })
  token: string;

  @ApiProperty({
    description: 'Token expiration time',
    example: '2026-02-27T10:30:00.000Z',
  })
  expires_at: Date;
}

export class TelegramConnectTokenResponseDto extends SuccessResponseDto<TelegramConnectTokenDto> {}
