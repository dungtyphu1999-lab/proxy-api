import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsIn,
  IsOptional,
  Min,
  Max,
  IsInt,
  IsObject,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CalculateProxyPriceDto {
  @ApiProperty({
    description: 'Proxy product ID',
    example: 1,
  })
  @Transform(({ value }: { value: unknown }): unknown => {
    if (value === null || value === undefined) return value;
    const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
    return isNaN(num) ? value : num;
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  product_id: number;

  @ApiPropertyOptional({
    description: 'Exclusivity option ID (shared/private/dedicated)',
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }): unknown => {
    if (value === null || value === undefined) return value;
    const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
    return isNaN(num) ? value : num;
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  exclusivity_option_id?: number;

  @ApiPropertyOptional({
    description: 'Quantity option ID (number of IPs)',
    example: 5,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }): unknown => {
    if (value === null || value === undefined) return value;
    const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
    return isNaN(num) ? value : num;
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  quantity_option_id?: number;

  @ApiPropertyOptional({
    description: 'Bandwidth option ID',
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }): unknown => {
    if (value === null || value === undefined) return value;
    const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
    return isNaN(num) ? value : num;
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  bandwidth_option_id?: number;

  @ApiPropertyOptional({
    description:
      'Location ID (currently not affecting price, reserved for future)',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  location_id?: number;

  @ApiPropertyOptional({
    description: 'Additional feature ID',
    example: 1,
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }): unknown => {
    if (value === null || value === undefined) return value;
    const num = typeof value === 'string' ? parseInt(value, 10) : Number(value);
    return isNaN(num) ? value : num;
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  additional_feature_id?: number;

  @ApiProperty({
    description: 'Billing cycle',
    enum: ['monthly', 'yearly'],
    example: 'monthly',
  })
  @IsString()
  @IsIn(['monthly', 'yearly'])
  billing_cycle: 'monthly' | 'yearly';

  @ApiPropertyOptional({
    description: 'Discount percent (0-100)',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  discount_percent?: number;

  @ApiPropertyOptional({
    description:
      'Proxy exclusivity raw value for realtime pricing (shared/private/dedicated)',
    example: 'shared',
  })
  @IsOptional()
  @IsString()
  exclusivity_value?: string;

  @ApiPropertyOptional({
    description: 'Proxy quantity raw value for realtime pricing',
    example: 500,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity_value?: number;

  @ApiPropertyOptional({
    description:
      'Phân bổ số lượng IP theo quốc gia, dạng map mã quốc gia -> số lượng. Ví dụ: {"US": 50, "GB": 50}',
    example: { US: 50, GB: 50 },
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

  @ApiPropertyOptional({
    description: 'Bandwidth raw value in GB for realtime pricing',
    example: 250,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bandwidth_value?: number;
}
