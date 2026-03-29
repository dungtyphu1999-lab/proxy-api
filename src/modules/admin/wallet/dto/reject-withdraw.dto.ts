import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RejectWithdrawDto {
  @ApiProperty({
    description: 'Lý do từ chối rút tiền',
    example: 'Thông tin ngân hàng không chính xác',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
