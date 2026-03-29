import { ValidationError } from 'class-validator';
import {
  AppValidationError,
  AppValidationErrors,
} from '../dto/app-validation-error.dto';

export function flattenValidationErrors(
  errors: ValidationError[],
  parentPath = '',
): AppValidationErrors {
  const result: AppValidationError[] = new Array<AppValidationError>();

  for (const error of errors) {
    const propertyPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      result.push({
        property: error.property,
        property_path: propertyPath,
        value: error.value as unknown,
        constraints: error.constraints,
      });
    }

    if (error.children?.length) {
      result.push(...flattenValidationErrors(error.children, propertyPath));
    }
  }

  return new AppValidationErrors(result);
}
