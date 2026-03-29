import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Custom validator for Vietnamese phone numbers
@ValidatorConstraint({ name: 'isVietnamesePhoneNumber', async: false })
export class IsVietnamesePhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(phoneNumber: string): boolean {
    if (!phoneNumber) return true; // Let @IsOptional handle this

    // Vietnamese phone number regex: +84 or 0 followed by 9-10 digits
    const vietnamesePhoneRegex = /^(\+84|0)(3|5|7|8|9)[0-9]{8}$/;
    return vietnamesePhoneRegex.test(phoneNumber.replace(/\s+/g, ''));
  }

  defaultMessage(): string {
    return 'Phone number must be a valid Vietnamese phone number';
  }
}

export const IsVietnamesePhoneNumber = (
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsVietnamesePhoneNumberConstraint,
    });
  };
};

// Custom validator for slugs
@ValidatorConstraint({ name: 'isSlug', async: false })
export class IsSlugConstraint implements ValidatorConstraintInterface {
  validate(slug: string): boolean {
    if (!slug) return true; // Let @IsOptional handle this

    // Slug regex: lowercase letters, numbers, hyphens, no consecutive hyphens
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  }

  defaultMessage(): string {
    return 'Slug must contain only lowercase letters, numbers, and hyphens';
  }
}

export const IsSlug = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSlugConstraint,
    });
  };
};

// Custom validator for password
@ValidatorConstraint({ name: 'isValidPassword', async: false })
export class IsValidPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string): boolean {
    if (!password) return true; // Let @IsOptional handle this

    // Password regex: 8-20 chars, letters + numbers + common special chars, no spaces
    const passwordRegex = /^[A-Za-z\d@$!%*?&._\-+=(){}[\]:;"'<>,./?]{8,20}$/;
    return passwordRegex.test(password);
  }

  defaultMessage(): string {
    return 'Password must be 8-20 characters long, can contain letters, numbers, and special characters (@$!%*?&._-+=(){}[]:;"\'<>,./?), no spaces allowed';
  }
}

export const IsValidPassword = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: string): boolean {
    if (!dateString) return true;

    const inputDate = new Date(dateString);
    const now = new Date();

    // Reset time to start of day for comparison
    now.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate >= now;
  }

  defaultMessage(): string {
    return 'Date must be today or in the future';
  }
}

export const IsFutureDate = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
};

interface DateRangeObject {
  start_date?: string;
  end_date?: string;
}

@ValidatorConstraint({ name: 'isValidDateRange', async: false })
export class IsValidDateRangeConstraint
  implements ValidatorConstraintInterface
{
  validate(endDate: string, args: ValidationArguments): boolean {
    if (!endDate) return true; // Let @IsOptional handle this

    const dateObject = args.object as DateRangeObject;
    const startDate = dateObject.start_date;

    if (!startDate) return true; // If no start_date, we can't validate range

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Reset time to start of day for accurate date comparison
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    return end >= start; // Changed from start < end to end >= start
  }

  defaultMessage(): string {
    return 'End date must be equal to or after start date';
  }
}

export const IsValidDateRange = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateRangeConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'isNotEmptyString', async: false })
export class IsNotEmptyStringConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string): boolean {
    if (!text) return false; // Null or undefined is not valid

    // Check if string contains at least one non-whitespace character
    return text.trim().length > 0;
  }

  defaultMessage(): string {
    return 'Field cannot be empty or contain only whitespace characters';
  }
}

export const IsNotEmptyString = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotEmptyStringConstraint,
    });
  };
};

// Custom validator for minimum length after trimming whitespace
@ValidatorConstraint({ name: 'isTrimmedMinLength', async: false })
export class IsTrimmedMinLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments): boolean {
    if (!text) return false;

    const minLength = args.constraints[0] as number;
    return text.trim().length >= minLength;
  }

  defaultMessage(args: ValidationArguments): string {
    const minLength = args.constraints[0] as number;
    return `Field must be at least ${minLength} characters long (excluding leading/trailing spaces)`;
  }
}

export const IsTrimmedMinLength = (
  minLength: number,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minLength],
      validator: IsTrimmedMinLengthConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'isNotEmptyNumber', async: false })
export class IsNotEmptyNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    if (typeof value === 'number' && Number.isNaN(value)) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return true;
  }

  defaultMessage(): string {
    return 'Field cannot be empty or contain only whitespace characters';
  }
}

export const IsNotEmptyNumber = (validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotEmptyNumberConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'isHttpUrl', async: false })
export class IsHttpUrlConstraint implements ValidatorConstraintInterface {
  validate(url: string): boolean {
    if (!url) return true;

    // HTTP/HTTPS URL regex: must start with http:// or https://
    const httpUrlRegex = /^https?:\/\/.+/;
    return httpUrlRegex.test(url);
  }

  defaultMessage(): string {
    return 'URL must start with http:// or https://';
  }
}

export const IsHttpUrl = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHttpUrlConstraint,
    });
  };
};
