import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';
import { PaginationQueryDto } from '@/shared/pagination/dto/pagination-query.dto';

export class GetProxyOrdersQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by order status',
    enum: [
      'draft',
      'pending_payment',
      'pending',
      'paid',
      'active',
      'cancelled',
      'refunded',
    ],
  })
  @IsOptional()
  @IsIn([
    'draft',
    'pending_payment',
    'pending',
    'paid',
    'active',
    'cancelled',
    'refunded',
  ])
  status?: string;
}
