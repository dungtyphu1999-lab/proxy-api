import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangeProxyOrderPasswordDto {
  @ApiProperty({
    example: 'newsecurepass123',
    description: 'Mật khẩu mới cho tài khoản proxy',
  })
  @IsString()
  @MinLength(6)
  new_password!: string;
}
