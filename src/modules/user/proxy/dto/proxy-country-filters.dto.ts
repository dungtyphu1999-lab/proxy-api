import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';

export class PutProxyCountryFiltersDto {
  @ApiProperty({
    description: 'List of country codes (ISO 3166-1 alpha-2)',
    example: ['US', 'GB', 'FR'],
    type: [String],
    maxItems: 50,
  })
  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  @MaxLength(2, { each: true })
  @ArrayMaxSize(50)
  country_codes: string[];
}
