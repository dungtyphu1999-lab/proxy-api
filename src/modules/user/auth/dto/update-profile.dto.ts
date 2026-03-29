import { IsString, IsNotEmpty, MaxLength, IsOptional, ValidateIf, IsPhoneNumber} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UsernameField } from '../decorators/username-field.decorator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Nguyễn Văn A',
    required: true,
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  full_name: string;

  @UsernameField()
  username: string;

  @ApiPropertyOptional({
    description: 'Phone number of the user',
    example: '0901234567',
  })
  @IsOptional()
  @ValidateIf((_object, value) => value !== null && value !== undefined && value !== '')
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone_number?: string;
}
