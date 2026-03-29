import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  is_verified: boolean;

  @ApiProperty()
  is_locked: boolean;

  @ApiProperty()
  created_at: string;

  @ApiProperty({ required: false })
  phone_number?: string;

  @ApiProperty({ required: false })
  locked_at?: string | null;

  @ApiProperty({ required: false })
  wallet_balance?: string | number;

  @ApiProperty({ required: false })
  wallet_currency?: string;
}
