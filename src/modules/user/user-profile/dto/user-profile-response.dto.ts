import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDto } from '@/shared/dto/response.dto';

export class UserProfileDto {
  @ApiProperty({
    description: 'User ID',
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  user_id: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    required: false,
  })
  full_name?: string;

  @ApiProperty({
    description: 'Avatar URL',
    example: '/uploads/avatars/user-avatar.jpg',
    required: false,
  })
  avatar_url?: string;

  @ApiProperty({
    description: 'Date of birth',
    format: 'date',
    example: '1990-01-15',
    required: false,
  })
  dob?: Date;

  @ApiProperty({
    description: 'Profile creation timestamp',
    format: 'date-time',
    example: '2024-01-15T10:30:45Z',
  })
  created_at?: Date;

  @ApiProperty({
    description: 'Profile last update timestamp',
    format: 'date-time',
    example: '2024-07-31T14:20:15Z',
  })
  updated_at?: Date;
}

export class UpdateUserProfileResponseDto extends SuccessResponseDto<UserProfileDto> {}
