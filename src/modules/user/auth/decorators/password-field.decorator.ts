import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export function PasswordField(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      description: 'User password',
      example: 'password123',
      minLength: 6,
      maxLength: 50,
    }),
    IsString(),
    MinLength(6),
    MaxLength(50),
  );
}
