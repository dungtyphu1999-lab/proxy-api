import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum SearchType {
  CONVERSATIONS = 'conversations',
  MESSAGES = 'messages',
  CONTACTS = 'contacts',
  ALL = 'all',
}

export class SearchChatInputDto {
  @ApiProperty({
    description: 'Search query string',
    example: 'hello world',
  })
  @IsString()
  @IsNotEmpty()
  query: string;

  @ApiProperty({
    description: 'Type of search to perform',
    example: 'all',
    enum: SearchType,
    default: SearchType.ALL,
  })
  @IsOptional()
  @IsEnum(SearchType)
  type?: SearchType;

  @ApiProperty({
    description: 'Conversation ID to search within (for message search)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  conversation_id?: string;
}

export class SearchConversationResultDto {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Chat with John Doe',
  })
  title?: string;

  @ApiProperty({
    description: 'Last message content',
    example: 'Hello, how are you?',
  })
  last_message?: string;

  @ApiProperty({
    description: 'Conversation type',
    example: 'user_to_user',
  })
  type: string;

  @ApiProperty({
    description: 'Participant information',
    type: 'object',
    properties: {
      id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      name: { type: 'string', example: 'John Doe' },
      avatar_url: { type: 'string', example: 'https://example.com/avatar.jpg' },
    },
  })
  participant: {
    id: string;
    name: string;
    avatar_url?: string;
  };

  @ApiProperty({
    description: 'Search relevance score',
    example: 0.85,
  })
  relevance_score: number;

  @ApiProperty({
    description: 'Last message timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  last_message_at?: Date;
}

export class SearchMessageResultDto {
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
  })
  message_type: string;

  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversation_id: string;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Chat with John Doe',
  })
  conversation_title?: string;

  @ApiProperty({
    description: 'Sender information',
    type: 'object',
    properties: {
      id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
      name: { type: 'string', example: 'John Doe' },
      avatar_url: { type: 'string', example: 'https://example.com/avatar.jpg' },
    },
  })
  sender: {
    id: string;
    name: string;
    avatar_url?: string;
  };

  @ApiProperty({
    description: 'Search relevance score',
    example: 0.85,
  })
  relevance_score: number;

  @ApiProperty({
    description: 'Message creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  created_at: Date;
}

export class SearchContactResultDto {
  @ApiProperty({
    description: 'Contact user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Contact full name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Contact avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar_url?: string;

  @ApiProperty({
    description: 'Contact phone number',
    example: '+84901234567',
    required: false,
  })
  phone_number?: string;

  @ApiProperty({
    description: 'Conversation ID with this contact',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  conversation_id: string;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Chat with John Doe',
  })
  conversation_title?: string;

  @ApiProperty({
    description: 'Last message in conversation',
    example: 'Hello, how are you?',
    required: false,
  })
  last_message?: string;

  @ApiProperty({
    description: 'Last message timestamp',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  last_message_at?: Date;

  @ApiProperty({
    description: 'Search relevance score',
    example: 0.85,
  })
  relevance_score: number;
}

export class SearchChatOutputDto {
  @ApiProperty({
    description: 'Search results for conversations',
    type: [SearchConversationResultDto],
  })
  conversations: SearchConversationResultDto[];

  @ApiProperty({
    description: 'Search results for messages',
    type: [SearchMessageResultDto],
  })
  messages: SearchMessageResultDto[];

  @ApiProperty({
    description: 'Search results for contacts',
    type: [SearchContactResultDto],
  })
  contacts: SearchContactResultDto[];

  @ApiProperty({
    description: 'Total number of results found',
    example: 50,
  })
  total: number;
}
