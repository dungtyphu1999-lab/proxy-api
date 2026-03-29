import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, Matches } from 'class-validator';

export function EmailField(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      description: 'User email address',
      example: 'user@example.com',
      required: true,
      type: String,
      maxLength: 100,
      format: 'email',
    }),
    IsEmail(),
    IsNotEmpty(),
    MaxLength(100),
    Matches(/^[^.]*\.?[^.]*\.?[^.]*$/, {
      message: 'Email address can contain maximum two dots',
    }),
  );
}
