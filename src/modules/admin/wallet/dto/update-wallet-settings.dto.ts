import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class UpdateWalletSettingsDto {
  @ApiProperty({
    description: 'Số ngày tạm giữ tiền',
    example: 7,
    minimum: 0,
    maximum: 365,
  })
  @IsInt()
  @Min(0)
  @Max(365)
  money_holding_days: number;
}
