import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsString,
  Matches,
  Max,
  MaxLength,
} from 'class-validator';
import {
  IMAGE_MIMETYPE_PATTERN,
  MAX_IMAGE_SIZE,
} from './file-upload.constants';

export interface StoredFile
  extends Omit<Express.Multer.File, 'stream' | 'buffer'> {
  $ref?: () => Express.Multer.File;
}

export class FileUploadDto implements StoredFile {
  @IsString()
  @Type(() => String)
  fieldname: string;

  @MaxLength(255)
  @IsString()
  @Type(() => String)
  originalname: string;

  @IsString()
  @Type(() => String)
  encoding: string;

  @IsString()
  @Type(() => String)
  mimetype: string;

  @IsString()
  @Type(() => String)
  destination: string;

  @IsString()
  @Type(() => String)
  filename: string;

  @IsString()
  @Type(() => String)
  path: string;

  @IsInt()
  @Type(() => Number)
  size: number;

  @IsDefined()
  $ref: any;
}

export class ImageFileUploadDto extends FileUploadDto {
  @Matches(IMAGE_MIMETYPE_PATTERN)
  declare mimetype: string;
}

export class ImageFileUploadNormalSizeDto extends ImageFileUploadDto {
  @Max(MAX_IMAGE_SIZE)
  declare size: number;
}

// Input DTOs
export class UploadFileInputDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: Express.Multer.File;
}

export class UploadImageInputDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description:
      'Image file to upload (max 2MB). Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP',
  })
  file: Express.Multer.File;
}

export class UploadImagesInputDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Image files to upload (max 5 files, 2MB each)',
  })
  files: Express.Multer.File[];
}

// Output DTOs
export class UploadFileOutputDto {
  @ApiProperty({
    description: 'Generated filename',
    example: 'my-file-123e4567-e89b-12d3-a456-426614174000.jpg',
  })
  filename: string;

  @ApiProperty({
    description: 'File URL',
    example: 'uploads/images/my-file-123e4567-e89b-12d3-a456-426614174000.jpg',
  })
  url: string;

  @ApiProperty({
    description: 'File path',
    example: 'uploads/images/my-file-123e4567-e89b-12d3-a456-426614174000.jpg',
  })
  path: string;
}
