import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetManagedSubUserOrdersQueryDto {
  @ApiPropertyOptional({
    description: 'Trang hiện tại',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Số bản ghi mỗi trang',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageRow?: number;

  @ApiPropertyOptional({
    description: 'Tìm theo mã đơn, account ID hoặc pool',
    example: 'account-123',
  })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo số ngày gần nhất',
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  days?: number;
}
