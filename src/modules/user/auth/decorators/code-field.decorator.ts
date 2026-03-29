import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export function CodeField(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      description: '6-digit verification code',
      example: '123456',
      minLength: 6,
      maxLength: 6,
    }),
    IsString({ message: 'Verification code must be a string' }),
    Length(6, 6, { message: 'Verification code must be exactly 6 digits' }),
    Matches(/^\d{6}$/, {
      message: 'Verification code must contain only digits',
    }),
  );
}
