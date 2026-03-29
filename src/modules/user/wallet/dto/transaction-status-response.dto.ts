import { ApiProperty } from '@nestjs/swagger';

export class TransactionStatusResponseDto {
  @ApiProperty({
    description: 'ID giao dịch',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  transaction_id: string;

  @ApiProperty({
    description: 'Trạng thái giao dịch',
    example: 'pending',
    enum: ['pending', 'success', 'failed'],
  })
  status: string;
}
