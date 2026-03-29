import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
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
    example: {
      id: 'uuid',
      email: 'user@example.com',
      username: 'user123',
      is_verified: true,
    },
  })
  user: object;

  @ApiProperty({
    description: 'User roles',
    example: ['user'],
    type: [String],
  })
  roles: string[];
}
