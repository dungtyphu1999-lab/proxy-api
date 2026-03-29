import { ApiProperty } from '@nestjs/swagger';

export class BankInfoDto {
  @ApiProperty({
    description: 'Mã ngân hàng',
    example: 'VCB',
  })
  bank_code: string;

  @ApiProperty({
    description: 'Số tài khoản ngân hàng',
    example: '1234567890',
  })
  bank_number: string;

  @ApiProperty({
    description: 'Tên chủ tài khoản ngân hàng',
    example: 'NGUYEN VAN A',
  })
  bank_name: string;
}

export class DepositResponseDto {
  @ApiProperty({
    description: 'ID giao dịch',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  transaction_id: string;

  @ApiProperty({
    description: 'Số giao dịch',
    example: '#00000001',
  })
  transaction_number: string;

  @ApiProperty({
    description: 'Số tiền nạp',
    example: 100000,
  })
  amount: number;

  @ApiProperty({
    description: 'Nội dung thanh toán',
    example: 'NH1690941600000ABCDE1234',
  })
  content: string;

  @ApiProperty({
    description: 'URL thanh toán QR',
    example:
      'https://payment.pay2s.vn/quicklink/190200/0000000000?amount=100000&memo=Nezhub&is_mask=0',
  })
  payment_qr_link: string;

  @ApiProperty({
    description: 'Thông tin ngân hàng',
    type: BankInfoDto,
  })
  bank_info: BankInfoDto;

  @ApiProperty({
    description: 'Thời gian tạo giao dịch',
    example: '2025-08-03T12:00:00Z',
  })
  created_at: Date;
}
