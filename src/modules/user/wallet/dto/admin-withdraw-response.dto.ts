import { ApiProperty } from '@nestjs/swagger';

export class AdminWithdrawResponseDto {
  @ApiProperty({
    description: 'ID của giao dịch rút tiền',
    example: 'uuid-string',
  })
  transaction_id: string;

  @ApiProperty({
    description: 'Mã giao dịch',
    example: 'WD20241201123456',
  })
  transaction_number: string;

  @ApiProperty({
    description: 'ID người dùng',
    example: 'user-uuid',
  })
  user_id: string;

  @ApiProperty({
    description: 'Thông tin người dùng',
    example: {
      id: 'user-uuid',
      username: 'john_doe',
      email: 'john@example.com',
    },
  })
  user: {
    id: string;
    username: string;
    email: string;
  };

  @ApiProperty({
    description: 'Số tiền rút',
    example: 50000,
  })
  amount: number;

  @ApiProperty({
    description: 'Thông tin ngân hàng',
    example: {
      bank_name: 'Vietcombank',
      account_number: '1234567890',
      account_name: 'Nguyễn Văn A',
    },
  })
  bank_info: {
    bank_name: string;
    account_number: string;
    account_name: string;
  };

  @ApiProperty({
    description: 'Trạng thái giao dịch',
    example: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Ghi chú',
    example: 'Rút tiền về tài khoản chính',
    required: false,
  })
  note?: string;

  @ApiProperty({
    description: 'Bằng chứng bill chuyển khoản',
    required: false,
  })
  transfer_proof_path?: string;

  @ApiProperty({
    description: 'Thời gian tạo giao dịch',
    example: '2024-12-01T12:34:56.000Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Thời gian hoàn thành giao dịch',
    example: '2024-12-01T13:00:00.000Z',
    required: false,
  })
  completed_at?: Date;
}
