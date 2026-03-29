import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsIn,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WebhookTransactionDto {
  @ApiProperty({
    description: 'ID giao dịch',
    example: '1788052',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Cổng thanh toán',
    example: 'ACB',
  })
  @IsString()
  gateway: string;

  @ApiProperty({
    description: 'Ngày giao dịch',
    example: '2025-04-01 00:02:18',
  })
  @IsDateString()
  transactionDate: string;

  @ApiProperty({
    description: 'Số giao dịch',
    example: '10418',
  })
  @IsString()
  transactionNumber: string;

  @ApiProperty({
    description: 'Số tài khoản',
    example: '12805521',
  })
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description: 'Nội dung giao dịch',
    example: 'SHOPVPS12537 GD 789604-040125 00:05:38',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Loại giao dịch',
    example: 'IN',
    enum: ['IN', 'OUT'],
  })
  @IsIn(['IN', 'OUT'])
  transferType: 'IN' | 'OUT';

  @ApiProperty({
    description: 'Số tiền chuyển',
    example: 50000,
  })
  @IsNumber()
  transferAmount: number;

  @ApiProperty({
    description: 'Checksum để verify',
    example: '7e2b3bbc03d1083017e3d2a96d3b8e01',
  })
  @IsString()
  checksum: string;
}

export class WebhookDepositDto {
  @ApiProperty({
    description: 'Danh sách giao dịch',
    type: [WebhookTransactionDto],
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WebhookTransactionDto)
  transactions: WebhookTransactionDto[];
}
