import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
}

export class CreateMessageInputDto {
  @ApiProperty({
    description: 'Conversation ID to send message to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  conversation_id: string;

  @ApiProperty({
    description:
      'Message content (optional if file_url is provided for image messages)',
    example: 'Hello, how are you?',
    required: false,
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'Message type',
    example: 'text',
    enum: MessageType,
    default: MessageType.TEXT,
  })
  @IsOptional()
  @IsEnum(MessageType)
  message_type?: MessageType;

  @ApiProperty({
    description: 'File URL (for file/image messages)',
    example: 'https://example.com/file.pdf',
    required: false,
  })
  @IsOptional()
  // @IsUrl()
  @IsString()
  file_url?: string;

  @ApiProperty({
    description: 'File name (for file/image messages)',
    example: 'document.pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  file_name?: string;

  @ApiProperty({
    description: 'File size in bytes (for file/image messages)',
    example: 1024,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  file_size?: number;

  @ApiProperty({
    description: 'File type (for file/image messages)',
    example: 'application/pdf',
    required: false,
  })
  @IsOptional()
  @IsString()
  file_type?: string;
}

export class CreateMessageOutputDto {
  @ApiProperty({
    description: 'Message ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversation_id: string;

  @ApiProperty({
    description: 'Sender ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  sender_id: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello, how are you?',
  })
  content: string;

  @ApiProperty({
    description: 'Message type',
    example: 'text',
    enum: MessageType,
  })
  message_type: MessageType;

  @ApiProperty({
    description: 'File URL (for file/image messages)',
    example: 'https://example.com/file.pdf',
    required: false,
  })
  file_url?: string;

  @ApiProperty({
    description: 'File name (for file/image messages)',
    example: 'document.pdf',
    required: false,
  })
  file_name?: string;

  @ApiProperty({
    description: 'File size in bytes (for file/image messages)',
    example: 1024,
    required: false,
  })
  file_size?: number;

  @ApiProperty({
    description: 'File type (for file/image messages)',
    example: 'application/pdf',
    required: false,
  })
  file_type?: string;

  @ApiProperty({
    description: 'Whether message is read',
    example: false,
  })
  is_read: boolean;

  @ApiProperty({
    description: 'Whether message is deleted',
    example: false,
  })
  is_deleted: boolean;

  @ApiProperty({
    description: 'Message creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Message last update timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  updated_at: Date;
}
