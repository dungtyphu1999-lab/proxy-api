import { ApiProperty } from '@nestjs/swagger';

export class BankInfoDto {
  @ApiProperty({
    description: 'Tên ngân hàng',
    example: 'Vietcombank',
  })
  bank_name: string;

  @ApiProperty({
    description: 'Số tài khoản',
    example: '1234567890',
  })
  account_number: string;

  @ApiProperty({
    description: 'Tên chủ tài khoản',
    example: 'Nguyễn Văn A',
  })
  account_name: string;

  @ApiProperty({
    description: 'Ghi chú ngân hàng',
    example: 'Tài khoản chính',
    required: false,
  })
  note?: string;
}

export class TransactionHistoryDto {
  @ApiProperty({
    description: 'ID của giao dịch',
    example: 'uuid-string',
  })
  id: string;

  @ApiProperty({
    description: 'Mã giao dịch',
    example: 'WD20241201123456',
  })
  transaction_number: string;

  @ApiProperty({
    description:
      'Mã giao dịch hiển thị (ví dụ SMM sẽ dùng provider order id hoặc mã đơn SMM)',
    example: '78915888',
    required: false,
  })
  display_transaction_number?: string;

  @ApiProperty({
    description: 'Loại giao dịch',
    example: 'deposit',
    enum: [
      'deposit',
      'withdraw',
      'transfer',
      'refund',
      'payment',
      'order_release',
      'order',
      'PROXY',
    ],
  })
  type?: string;

  @ApiProperty({
    description: 'Số tiền',
    example: 50000,
  })
  amount: number;

  @ApiProperty({
    description: 'Trạng thái giao dịch',
    example: 'success',
    enum: ['pending', 'success', 'failed', 'cancelled'],
  })
  status?: string;

  @ApiProperty({
    description: 'Phương thức thanh toán',
    example: 'pay2s',
    required: false,
  })
  method?: string;

  @ApiProperty({
    description: 'Thông tin ngân hàng',
    type: BankInfoDto,
    required: false,
  })
  bank_info?: BankInfoDto;

  @ApiProperty({
    description: 'Ghi chú',
    example: 'Rút tiền về tài khoản chính',
    required: false,
  })
  note?: string;

  @ApiProperty({
    description: 'Thời gian tạo giao dịch',
    example: '2024-12-01T12:34:56.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Thời gian bắt đầu',
    example: '2024-12-01T12:34:56.000Z',
  })
  start_date?: Date;

  @ApiProperty({
    description: 'Thời gian kết thúc',
    example: '2024-12-01T12:34:56.000Z',
  })
  end_date?: Date;

  @ApiProperty({
    description: 'Thời gian hoàn thành giao dịch',
    example: '2024-12-01T13:00:00.000Z',
    required: false,
  })
  completed_at?: Date;
}
