import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserProfileDto {
  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  full_name?: string;

  @ApiPropertyOptional({ example: 'nguyenvana' })
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9_]+$/, {
    message: 'Username chỉ được chứa chữ thường, số và dấu gạch dưới (_)',
  })
  @MinLength(8)
  @MaxLength(30)
  username?: string;

  @ApiPropertyOptional({ example: '0909123456' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Số điện thoại phải gồm đúng 10 chữ số',
  })
  phone_number?: string;
}
