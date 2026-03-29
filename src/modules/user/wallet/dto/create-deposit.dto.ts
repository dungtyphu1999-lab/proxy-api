import { IsNumber, IsPositive, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepositDto {
  @ApiProperty({
    description: 'Số tiền nạp vào ví (VND)',
    example: 100000,
    minimum: 1000,
    maximum: 50000000,
  })
  @IsNumber()
  @IsPositive()
  @Min(1000, { message: 'Số tiền tối thiểu là 1,000 đ' })
  @Max(50000000, { message: 'Số tiền tối đa là 50,000,000 đ' })
  amount: number;
}
