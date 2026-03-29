import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiConsumes } from '@nestjs/swagger';

import { AddFileUploadToRequestBodyInterceptor } from './add-file-upload-to-request-body.interceptor';

const MultipartFormData = ApiConsumes('multipart/form-data');

export const UseImageUpload = (fieldName: string = 'file') => {
  const multerOptions: MulterOptions = {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
      // Check file type
      if (!file.mimetype.startsWith('image/')) {
        return cb(
          new BadRequestException(
            'Only image files are allowed. Supported formats: JPG, JPEG, PNG, GIF, WebP, BMP',
          ),
          false,
        );
      }

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

      if (!allowedExtensions.includes(fileExtension)) {
        return cb(
          new BadRequestException(
            `Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`,
          ),
          false,
        );
      }

      cb(null, true);
    },
  };

  return applyDecorators(
    MultipartFormData,
    UseInterceptors(
      FileInterceptor(fieldName, multerOptions),
      AddFileUploadToRequestBodyInterceptor,
    ),
  );
};
