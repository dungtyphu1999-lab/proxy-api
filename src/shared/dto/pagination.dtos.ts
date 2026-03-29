import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsInt,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExactClass } from '@/shared/utils/constructor';
import { Default, Expose } from '@/shared/validation/transformers';

export class PaginationMetadataDto extends ExactClass<PaginationMetadataDto> {
  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  @Min(0)
  @IsInt()
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  @Min(1)
  @IsInt()
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @Min(1)
  @IsInt()
  pageSize: number;
}

export class PaginationDto<T> {
  @ValidateNested({ each: true })
  @IsArray()
  items: T[];

  @ValidateNested()
  @IsDefined()
  @Type(() => PaginationMetadataDto)
  pagination: PaginationMetadataDto;
}

export class PaginationInputDto {
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(1)
  @IsInt()
  @Default(1)
  @Type(() => Number)
  page: number;

  @Expose({ name: 'pageRow' })
  @Max(100)
  @Min(5)
  @IsInt()
  @Default(10)
  @Type(() => Number)
  take: number;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
