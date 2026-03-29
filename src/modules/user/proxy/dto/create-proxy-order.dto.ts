import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsIn,
  IsOptional,
  Min,
  Max,
  IsObject,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateProxyOrderDto {
  @ApiProperty({
    description:
      'Idempotency key để chống trừ tiền lặp khi request bị retry/replay',
    example: 'a15d3c4f-9ce6-4a91-a5c5-1fd5f5036f8f',
  })
  @IsString()
  @MinLength(16)
  @MaxLength(128)
  idempotency_key: string;

  @ApiProperty({ description: 'Proxy product ID', example: 1 })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  product_id: number;

  @ApiPropertyOptional({
    description: 'Exclusivity option ID (static residential only)',
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  exclusivity_option_id?: number;

  @ApiPropertyOptional({
    description:
      'Proxy exclusivity raw value for realtime config (shared/private/dedicated)',
  })
  @IsOptional()
  @IsString()
  exclusivity_value?: string;

  @ApiPropertyOptional({ description: 'Quantity (IP count) option ID' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity_option_id?: number;

  @ApiPropertyOptional({ description: 'Custom quantity (IP count)' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quantity_value?: number;

  @ApiPropertyOptional({
    description:
      'Phân bổ số lượng IP theo quốc gia, dạng map mã quốc gia -> số lượng. Ví dụ: {"US": 50, "GB": 50}',
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }): unknown => {
    if (value === null || value === undefined) return value;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  })
  @IsObject()
  proxy_countries?: Record<string, number>;

  @ApiPropertyOptional({ description: 'Bandwidth option ID' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  bandwidth_option_id?: number;

  @ApiPropertyOptional({
    description: 'Custom bandwidth in GB (0 = unlimited)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  bandwidth_value?: number;

  @ApiPropertyOptional({ description: 'Location ID' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  location_id?: number;

  @ApiPropertyOptional({ description: 'Additional feature ID' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  additional_feature_id?: number;

  @ApiPropertyOptional({ description: 'Discount percent (0-100)', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  discount_percent?: number;

  @ApiProperty({ description: 'Total amount', example: 270 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount_total: number;

  @ApiProperty({ description: 'Billing cycle', enum: ['monthly', 'yearly'] })
  @IsString()
  @IsIn(['monthly', 'yearly'])
  billing_cycle: 'monthly' | 'yearly';
}
