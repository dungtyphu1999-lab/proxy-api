import { ValidationError } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AppValidationError
  implements Pick<ValidationError, 'property' | 'value' | 'constraints'>
{
  @ApiProperty({
    description: 'Validation error property',
    example: 'email',
  })
  property: ValidationError['property'];

  @ApiProperty({
    description: 'Path to the property that caused the validation error',
    example: 'user.email',
  })
  property_path: string;

  @ApiProperty({
    description: 'Value that caused the validation error',
    example: 'invalid-email',
  })
  value: ValidationError['value'];

  @ApiProperty({
    description: 'Validation constraints if any',
    type: Object,
    required: false,
  })
  @IsOptional()
  constraints?: ValidationError['constraints'];
}

export class AppValidationErrors extends Array<AppValidationError> {
  constructor(errors: AppValidationError[]) {
    super(...errors);
  }
}
