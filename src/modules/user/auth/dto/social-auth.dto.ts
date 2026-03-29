import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GoogleAuthDto {
  @ApiProperty({
    description: 'ID token from Google (JWT format)',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...',
  })
  @IsString()
  @IsNotEmpty()
  idToken: string;

  @ApiPropertyOptional({
    description: 'Authorization code from Google (optional)',
    example: '4/0AX4XfWi...',
  })
  @IsString()
  @IsOptional()
  code?: string;
}

export class FacebookAuthDto {
  @ApiProperty({
    description: 'Access token from Facebook',
    example: 'EAAG...',
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @ApiPropertyOptional({
    description: 'Authorization code from Facebook (optional)',
    example: '4/0AX4XfWi...',
  })
  @IsString()
  @IsOptional()
  code?: string;
}

export class SocialUserInfo {
  @ApiProperty({
    description: 'User ID from provider',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  provider_id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'User name',
    example: 'Nguyễn Văn A',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://lh3.googleusercontent.com/a/...',
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({
    description: 'Login provider',
    example: 'google',
    enum: ['google', 'facebook'],
  })
  @IsString()
  @IsNotEmpty()
  provider: string; // 'google' | 'facebook'
}

export class SocialAuthResponse {
  @ApiProperty({
    description: 'JWT access token for authenticated user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token: string;

  @ApiProperty({
    description: 'Refresh token for getting new access tokens',
    example: 'refresh_token_string',
  })
  refresh_token: string;

  @ApiProperty({
    description: 'User information',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'User ID in the system',
        example: '550e8400-e29b-41d4-a716-446655440000',
      },
      email: {
        type: 'string',
        description: 'User email',
        example: 'user@example.com',
      },
      username: {
        type: 'string',
        description: 'User username',
        example: 'user123',
      },
      full_name: {
        type: 'string',
        description: 'User full name',
        example: 'Nguyễn Văn A',
      },
      phone_number: {
        type: 'string',
        description: 'User phone number',
        example: '0909090909',
      },
      is_verified: {
        type: 'boolean',
        description: 'Email verification status',
        example: true,
      },
      is_profile_completed: {
        type: 'boolean',
        description: 'Profile completion status (especially for social login)',
        example: true,
      },
    },
  })
  user: {
    id: string;
    email: string;
    username: string;
    full_name?: string;
    is_verified: boolean;
    is_profile_completed: boolean;
  };

  @ApiProperty({
    description: 'User roles',
    example: ['user'],
    type: [String],
  })
  roles: string[];

  @ApiProperty({
    description: 'Shop information if user has a shop',
    required: false,
  })
  shop?: object;
}
