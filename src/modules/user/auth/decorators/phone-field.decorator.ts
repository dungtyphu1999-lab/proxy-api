import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength } from 'class-validator';

export function PhoneField(): PropertyDecorator {
  return applyDecorators(
    ApiProperty({
      description: 'User phone number',
      example: '+1234567890',
      required: true,
      type: String,
      maxLength: 20,
    }),
    Matches(/^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/, {
      message: 'Invalid phone number format',
    }),
    MaxLength(20),
  );
}
