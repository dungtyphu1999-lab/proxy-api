import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PasswordField } from '../decorators/password-field.decorator';
import { EmailField } from '../decorators/email-field.decorator';
// import { PhoneField } from '../decorators/phone-field.decorator';
import { UsernameField } from '../decorators/username-field.decorator';

export class SignUpDto {
  @EmailField()
  email: string;

  @PasswordField()
  password: string;

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    required: false,
    type: String,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  fullname: string;

  @UsernameField()
  username: string;

  // @PhoneField()
  // @IsNotEmpty()
  // phone_number: string;
}
