import { ApiProperty } from '@nestjs/swagger';
import { SuccessResponseDto } from '@/shared/dto/response.dto';

export class WalletBalanceDto {
  @ApiProperty({ description: 'Số dư ví', example: 1200000 })
  balance: number;

  @ApiProperty({ description: 'Số dư nạp', example: 500000 })
  deposit_balance: number;

  @ApiProperty({ description: 'Số dư bán', example: 700000 })
  sale_balance: number;

  @ApiProperty({ description: 'Số dư bị khóa', example: 0 })
  locked_balance: number;

  @ApiProperty({ description: 'Đơn vị tiền tệ', example: 'VND' })
  currency: string;

  @ApiProperty({ description: 'Trạng thái khóa ví', example: false })
  is_locked: boolean;
}

export class WalletBalanceResponseDto extends SuccessResponseDto<WalletBalanceDto> {}
