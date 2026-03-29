import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidPassword } from '@/shared/validation/validators';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'currentPassword123',
  })
  @IsNotEmpty()
  @IsString()
  current_password: string;

  @ApiProperty({
    description:
      'New password (8-20 characters, can contain uppercase, lowercase, numbers and special characters, no spaces)',
    example: 'MyPassword123!',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @IsValidPassword()
  new_password: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'MyPassword123!',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
