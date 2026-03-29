import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class WebshareAccountConfigDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsEmail()
  email: string;

  @IsString()
  api_key: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsArray()
  @IsString({ each: true })
  pools: string[];

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateWebshareConfigDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WebshareAccountConfigDto)
  accounts: WebshareAccountConfigDto[];
}
