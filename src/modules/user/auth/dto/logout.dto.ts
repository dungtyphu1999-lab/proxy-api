import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    description: 'Refresh token to revoke',
    example: 'uuid-refresh-token',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
