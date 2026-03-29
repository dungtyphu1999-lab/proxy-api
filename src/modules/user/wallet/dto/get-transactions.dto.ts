import { ExtendedPaginationQueryDto } from '@/shared/pagination/dto/pagination-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsIn,
  IsOptional,
  IsDateString,
  IsNumberString,
} from 'class-validator';

export class GetTransactionsDto extends ExtendedPaginationQueryDto {
  @ApiPropertyOptional({
    description:
      'Client-side helper key for date-range refresh (ignored by backend)',
    required: false,
    example: '1',
  })
  @IsOptional()
  @IsNumberString()
  _dateRangeKey?: string;

  @ApiPropertyOptional({
    description: 'Filter by transaction type',
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
    required: false,
  })
  @IsOptional()
  @IsIn([
    'deposit',
    'withdraw',
    'transfer',
    'refund',
    'payment',
    'order_release',
    'order',
    'PROXY',
  ])
  type?:
    | 'deposit'
    | 'withdraw'
    | 'transfer'
    | 'refund'
    | 'payment'
    | 'order_release'
    | 'order'
    | 'PROXY';

  @ApiPropertyOptional({
    description: 'Filter by transaction status',
    enum: ['pending', 'success', 'failed', 'cancelled'],
    required: false,
  })
  @IsOptional()
  @IsIn(['pending', 'success', 'failed', 'cancelled'])
  status?: 'pending' | 'success' | 'failed' | 'cancelled';

  @ApiPropertyOptional({
    description: 'Start date for filtering transactions (ISO 8601 format)',
    example: '2024-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({
    description: 'End date for filtering transactions (ISO 8601 format)',
    example: '2024-12-31T23:59:59.999Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;
}
