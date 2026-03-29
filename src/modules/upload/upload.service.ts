import { Injectable } from '@nestjs/common';
import { FileUploadService } from '@/modules/file-upload/file-upload.service';
import { UploadFileOutputDto } from '@/modules/file-upload/file-upload.dtos';
import { AppConfigService } from '@/config/app-config.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly fileUploadService: FileUploadService,
    private appConfig: AppConfigService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    subDir: string = 'images',
  ): Promise<UploadFileOutputDto> {
    const result = await this.fileUploadService.uploadImage(file, subDir);

    // Convert file path to URL format for frontend consumption
    return {
      ...result,
      url: `${this.appConfig.app.publicUrl}/uploads/${result.url.replace(/\\/g, '/').replace('uploads/', '')}`,
    };
  }

  async uploadImages(
    files: Express.Multer.File[],
    subDir: string = 'images',
  ): Promise<UploadFileOutputDto[]> {
    const results = await this.fileUploadService.uploadImages(files, subDir);

    // Convert file paths to URL format for frontend consumption
    return results.map((result) => ({
      ...result,
      url: `${this.appConfig.app.publicUrl}/uploads/${result.url.replace(/\\/g, '/').replace('uploads/', '')}`,
    }));
  }
}
