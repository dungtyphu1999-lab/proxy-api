import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import {
  PaginationInputDto,
  PaginationDto,
} from '@/shared/dto/pagination.dtos';

export class GetMessagesInputDto extends PaginationInputDto {
  @ApiProperty({
    description: 'Conversation ID to get messages from',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  conversation_id: string;
}

export class MessageSenderDto {
  @ApiProperty({
    description: 'Sender ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Sender name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Sender avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar_url?: string;
}

export class MessageDto {
  @ApiProperty({
    description: 'Message ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Message content',
    example: 'Hello, how are you?',
  })
  content: string;

  @ApiProperty({
    description: 'Message type',
    example: 'text',
    enum: ['text', 'image', 'file', 'system'],
  })
  message_type: 'text' | 'image' | 'file' | 'system';

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
    example: true,
  })
  is_read: boolean;

  @ApiProperty({
    description: 'When message was read',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  read_at?: Date;

  @ApiProperty({
    description: 'Whether message is deleted',
    example: false,
  })
  is_deleted: boolean;

  @ApiProperty({
    description: 'When message was deleted',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  deleted_at?: Date;

  @ApiProperty({
    description: 'Message sender information',
    type: MessageSenderDto,
  })
  sender: MessageSenderDto;

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

export class GetMessagesOutputDto extends PaginationDto<MessageDto> {}
