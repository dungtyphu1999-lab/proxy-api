import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
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

// Socket authentication payload
export class SocketAuthDto {
  @ApiProperty({
    description: 'JWT token for socket authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}

// Send message payload (Client → Server)
export class SendMessageDto {
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
  // @IsUrl({ require_tld: false })
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

// Receive message payload (Server → Client)
export class ReceiveMessageDto {
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
    description: 'Message creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;
}

// Mark conversation as read payload (Client → Server)
export class MarkConversationReadDto {
  @ApiProperty({
    description: 'Conversation ID to mark all messages as read',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  conversation_id: string;
}

// Conversation update payload (Server → Client)
export class ConversationUpdatedDto {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversation_id: string;

  @ApiProperty({
    description: 'Last message content',
    example: 'Hello, how are you?',
  })
  last_message: string;

  @ApiProperty({
    description: 'Number of unread messages',
    example: 5,
  })
  unread_count: number;

  @ApiProperty({
    description: 'Last message timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  last_message_at: Date;
}

// Socket event names
export enum SocketEvents {
  AUTH = 'auth',
  SEND_MESSAGE = 'message:send',
  RECEIVE_MESSAGE = 'message:receive',
  MARK_CONVERSATION_READ = 'conversation:read',
  CONVERSATION_UPDATED = 'conversation:updated',
  JOIN_CONVERSATION = 'conversation:join',
  LEAVE_CONVERSATION = 'conversation:leave',
  TYPING_START = 'typing:start',
  TYPING_STOP = 'typing:stop',
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}
