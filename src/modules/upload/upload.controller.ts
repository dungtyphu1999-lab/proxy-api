import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadImageDto, UploadImagesDto } from './upload.dto';
import { UploadFileOutputDto } from '@/modules/file-upload/file-upload.dtos';
import { UseImageUpload } from '@/modules/file-upload/file-upload.decorators';
import { UseJwtAuthGuard } from '../user/auth/decorators/use-jwt-auth-guard.decorator';

@ApiTags('Upload')
@Controller()
@UseJwtAuthGuard()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseImageUpload('file')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  )
  @ApiOperation({ summary: 'Upload a single image' })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    type: UploadFileOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file format, size, or validation failed',
  })
  @ApiBody({ type: UploadImageDto })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileOutputDto> {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    return await this.uploadService.uploadImage(file);
  }

  @Post('images')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB per file
        files: 10,
      },
    }),
  )
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload multiple images' })
  @ApiResponse({
    status: 201,
    description: 'Images uploaded successfully',
    type: [UploadFileOutputDto],
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file format, size, count, or validation failed',
  })
  @ApiBody({ type: UploadImagesDto })
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<UploadFileOutputDto[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No image files provided');
    }

    if (files.length > 10) {
      throw new BadRequestException('Maximum 10 files allowed');
    }

    return await this.uploadService.uploadImages(files);
  }
}
