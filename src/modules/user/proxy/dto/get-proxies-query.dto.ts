import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsArray,
  IsIn,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationQueryDto } from '@/shared/pagination/dto/pagination-query.dto';

export class GetProxiesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by specific proxy order id',
    example: '257e5d4f-c0da-45b8-8e63-3061244b74e6',
  })
  @IsOptional()
  @IsUUID('4')
  order_id?: string;

  @ApiPropertyOptional({
    description: 'Search by proxy address or country name',
    example: '142.111',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  declare search?: string;

  @ApiPropertyOptional({
    description: 'Filter by country codes (comma-separated)',
    example: 'US,GB',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }): string[] =>
    typeof value === 'string'
      ? value
          .split(',')
          .map((s: string) => s.trim())
          .filter(Boolean)
      : (value as string[]),
  )
  country_codes?: string[];

  @ApiPropertyOptional({
    description: 'Filter by login method',
    enum: ['username_password', 'ip_whitelist'],
  })
  @IsOptional()
  @IsIn(['username_password', 'ip_whitelist'])
  login_method?: string;

  @ApiPropertyOptional({
    description: 'Filter by connection method',
    enum: ['direct', 'socks5', 'http'],
  })
  @IsOptional()
  @IsIn(['direct', 'socks5', 'http'])
  connection_method?: string;

  @ApiPropertyOptional({
    description: 'Filter by proxy type',
    enum: ['proxy_server', 'static_residential', 'rotating_residential'],
  })
  @IsOptional()
  @IsIn(['proxy_server', 'static_residential', 'rotating_residential'])
  proxy_type?: string;
}
