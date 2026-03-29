import { ApiProperty } from '@nestjs/swagger';

export class UploadFileInputDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to upload',
  })
  file: Express.Multer.File;
}

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
