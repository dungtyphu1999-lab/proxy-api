import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppValidationErrors } from './app-validation-error.dto';
export class BaseResponseDto {
  @ApiProperty({ description: 'HTTP status code', example: 200 })
  @IsNumber()
  @IsNotEmpty()
  status_code: number;

  @ApiProperty({ description: 'Response message', example: 'Success' })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Timestamp of the response',
    example: new Date().toISOString(),
    required: false,
  })
  @IsOptional()
  @IsString()
  timestamp?: string;

  @ApiProperty({
    description: 'Request path',
    example: '/api/v1/resource',
    required: false,
  })
  @IsOptional()
  @IsString()
  path?: string;
}

export class SuccessResponseDto<T> extends BaseResponseDto {
  @ApiProperty({ description: 'Indicates success', example: true })
  @IsBoolean()
  @IsNotEmpty()
  success: true;

  @ApiProperty({ description: 'Response data' })
  data: T;
}

export class ErrorResponseDto extends BaseResponseDto {
  @ApiProperty({ description: 'Indicates failure', example: false })
  @IsBoolean()
  @IsNotEmpty()
  success: false;

  @ApiProperty({ description: 'Error code', required: false })
  @IsOptional()
  @IsString()
  error_code?: string;

  @ApiProperty({
    description: 'Validation errors',
    required: false,
    type: 'array',
  })
  @IsOptional()
  @IsArray()
  errors?: AppValidationErrors;
}
