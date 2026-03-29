import { Injectable } from '@nestjs/common';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UploadFileOutputDto } from './file-upload.dtos';

@Injectable()
export class FileUploadService {
  async uploadFile(
    file: Express.Multer.File,
    uploadDir: string = 'uploads',
    subDir?: string,
  ): Promise<UploadFileOutputDto> {
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFilename = `image-${uuidv4()}.${fileExtension}`;

    // Create upload directory
    const fullUploadDir = subDir ? join(uploadDir, subDir) : uploadDir;
    await mkdir(fullUploadDir, { recursive: true });

    // Save file
    const filePath = join(fullUploadDir, uniqueFilename);
    await writeFile(filePath, file.buffer);

    return {
      filename: uniqueFilename,
      url: filePath,
      path: filePath,
    };
  }

  async uploadImage(
    file: Express.Multer.File,
    subDir: string = 'images',
  ): Promise<UploadFileOutputDto> {
    return this.uploadFile(file, 'uploads', subDir);
  }

  async uploadImages(
    files: Express.Multer.File[],
    subDir: string = 'images',
  ): Promise<UploadFileOutputDto[]> {
    const results = await Promise.all(
      files.map((file) => this.uploadImage(file, subDir)),
    );
    return results;
  }
}
