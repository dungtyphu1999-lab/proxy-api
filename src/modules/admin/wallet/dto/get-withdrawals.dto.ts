import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ExtendedPaginationQueryDto } from '@/shared/pagination/dto/pagination-query.dto';
import {
  WALLET_TRANSACTION_TYPES,
  WalletTransactionType,
} from '@/database/entities/wallet-transaction.entity';

export class GetWithdrawalsDto extends ExtendedPaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by transaction status (array)',
    enum: ['pending', 'success', 'failed', 'canceled'],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }): ('pending' | 'success' | 'failed' | 'canceled')[] => {
    if (!value) return [];
    if (Array.isArray(value))
      return value as ('pending' | 'success' | 'failed' | 'canceled')[];
    return [String(value) as 'pending' | 'success' | 'failed' | 'canceled'];
  })
  @IsEnum(['pending', 'success', 'failed', 'canceled'], { each: true })
  status?: ('pending' | 'success' | 'failed' | 'canceled')[];

  @ApiPropertyOptional({
    description: 'Filter by transaction type (array)',
    enum: WALLET_TRANSACTION_TYPES,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }): WalletTransactionType[] => {
    if (!value) return [];
    if (Array.isArray(value))
      return value.map(String) as WalletTransactionType[];
    return String(value).split(',') as WalletTransactionType[];
  })
  @IsEnum(WALLET_TRANSACTION_TYPES, { each: true })
  typeTransaction?: WalletTransactionType[];

  @ApiPropertyOptional({
    description: 'Filter by author ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  authorId?: string;
}
