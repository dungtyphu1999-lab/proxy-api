import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidImageFile', async: false })
export class IsValidImageFileConstraint
  implements ValidatorConstraintInterface
{
  validate(file: Express.Multer.File): boolean {
    if (!file) return false;

    // Check if file has required properties
    if (!file.mimetype || !file.originalname || !file.size) return false;

    // Check MIME type
    if (!file.mimetype.startsWith('image/')) return false;

    // Check file extension
    const allowedExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.bmp',
    ];
    const fileExtension = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) return false;

    // Check file size (5MB max)
    if (file.size <= 0 || file.size > 5 * 1024 * 1024) return false;

    // Check filename length
    if (file.originalname.length === 0 || file.originalname.length > 255)
      return false;

    return true;
  }

  defaultMessage(args: ValidationArguments): string {
    const file = args.value as Express.Multer.File;

    if (!file) return 'File is required';
    if (!file.mimetype || !file.mimetype.startsWith('image/')) {
      return 'File must be a valid image (image/*)';
    }
    if (!file.originalname || file.originalname.length === 0) {
      return 'File must have a valid filename';
    }
    if (file.originalname.length > 255) {
      return 'Filename cannot exceed 255 characters';
    }
    if (!file.size || file.size <= 0) {
      return 'File must have valid size';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'File size cannot exceed 5MB';
    }

    const allowedExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp',
      '.bmp',
    ];
    const fileExtension = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) {
      return `Invalid file extension. Allowed: ${allowedExtensions.join(', ')}`;
    }

    return 'Invalid file';
  }
}

@ValidatorConstraint({ name: 'areValidImageFiles', async: false })
export class AreValidImageFilesConstraint
  implements ValidatorConstraintInterface
{
  validate(files: Express.Multer.File[]): boolean {
    if (!Array.isArray(files) || files.length === 0) return false;
    if (files.length > 5) return false;

    const validator = new IsValidImageFileConstraint();
    return files.every((file) => validator.validate(file));
  }

  defaultMessage(args: ValidationArguments): string {
    const files = args.value as Express.Multer.File[];

    if (!Array.isArray(files)) return 'Files must be an array';
    if (files.length === 0) return 'At least one file is required';
    if (files.length > 5) return 'Maximum 5 files allowed';

    // Find the first invalid file and return specific error
    const validator = new IsValidImageFileConstraint();
    const invalidIndex = files.findIndex((file) => !validator.validate(file));

    if (invalidIndex >= 0) {
      const validationArgs = {
        value: files[invalidIndex],
      } as ValidationArguments;
      return `File ${invalidIndex + 1}: ${validator.defaultMessage(validationArgs)}`;
    }

    return 'Invalid files';
  }
}

export class UploadImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description:
      'Image file to upload (max 5MB). Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP',
    required: true,
  })
  @IsDefined({ message: 'Image file is required' })
  @IsNotEmpty({ message: 'Image file cannot be empty' })
  @Validate(IsValidImageFileConstraint)
  file: Express.Multer.File;
}

export class UploadImagesDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Image files to upload (1-5 files, 5MB each)',
    required: true,
  })
  @IsDefined({ message: 'Image files are required' })
  @IsArray({ message: 'Files must be an array' })
  @ArrayMinSize(1, { message: 'At least one file is required' })
  @ArrayMaxSize(5, { message: 'Maximum 5 files allowed' })
  @Validate(AreValidImageFilesConstraint)
  files: Express.Multer.File[];
}
