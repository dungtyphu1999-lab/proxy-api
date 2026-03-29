import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export function UsernameField(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      description: 'User unique username',
      example: 'johndoe',
      required: true,
      type: String,
      maxLength: 30,
      minLength: 8,
    }),
    IsString(),
    IsNotEmpty(),
    MinLength(8),
    MaxLength(30),
  );
}
