import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
  Max,
  Min,
} from 'class-validator';

export class CustomProxyInputDto {
  @ApiPropertyOptional({
    description: 'Client ID để map kết quả theo từng dòng nhập',
    example: 'line-1',
  })
  @IsOptional()
  @IsString()
  client_id?: string;

  @ApiPropertyOptional({
    description: 'Địa chỉ host/IP của proxy',
    example: '1.2.3.4',
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiPropertyOptional({
    description: 'Port của proxy',
    example: 8080,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65535)
  port!: number;

  @ApiPropertyOptional({
    description: 'Username proxy (nếu có)',
    example: 'user123',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'Password proxy (nếu có)',
    example: 'pass123',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    description: 'Giao thức proxy',
    enum: ['auto', 'http', 'socks5'],
    example: 'auto',
  })
  @IsOptional()
  @IsIn(['auto', 'http', 'socks5'])
  proxy_protocol?: 'auto' | 'http' | 'socks5';
}

export class CheckLiveProxiesDto {
  @ApiPropertyOptional({
    description: 'Danh sách ID proxy cần kiểm tra',
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  proxy_ids?: number[];

  @ApiPropertyOptional({
    description: 'Danh sách proxy nhập tay để kiểm tra live',
    type: [CustomProxyInputDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomProxyInputDto)
  custom_proxies?: CustomProxyInputDto[];

  @ApiPropertyOptional({
    description: 'Loại proxy cần kiểm tra',
    enum: ['proxy_server', 'static_residential', 'rotating_residential'],
  })
  @IsOptional()
  @IsIn(['proxy_server', 'static_residential', 'rotating_residential'])
  proxy_type?: 'proxy_server' | 'static_residential' | 'rotating_residential';

  @ApiPropertyOptional({
    description: 'Giới hạn số proxy cần kiểm tra',
    example: 20,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;

  @ApiPropertyOptional({
    description: 'URL kiểm tra',
    example: 'https://api.ipify.org?format=json',
  })
  @IsOptional()
  @IsUrl({ require_tld: true })
  test_url?: string;

  @ApiPropertyOptional({
    description: 'Timeout request (ms)',
    example: 8000,
  })
  @IsOptional()
  @IsInt()
  @Min(2000)
  @Max(15000)
  timeout_ms?: number;
}
