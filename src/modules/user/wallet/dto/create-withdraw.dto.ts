import {
  IsNumber,
  IsPositive,
  Min,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithdrawDto {
  @ApiProperty({
    description: 'Số tiền rút từ ví (VND)',
    example: 50000,
    minimum: 50000,
  })
  @IsNumber()
  @IsPositive()
  @Min(50000, { message: 'Số tiền rút tối thiểu là 50,000 VND' })
  amount: number;

  @ApiProperty({
    description: 'ID của shop_request chứa thông tin ngân hàng để rút tiền',
    example: 'a5d7b6e1-3b2c-4f5d-9a8b-1234567890ab',
  })
  @IsString()
  @IsNotEmpty({ message: 'shop_request_id không được để trống' })
  shop_request_id: string;
}
