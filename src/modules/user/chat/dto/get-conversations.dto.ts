import { Type } from 'class-transformer';
import {
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  IsDefined,
  IsString,
  IsDate,
  IsBoolean,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  PaginationInputDto,
  PaginationMetadataDto,
} from '@/shared/dto/pagination.dtos';

export enum ConversationType {
  USER_TO_USER = 'user_to_user',
  USER_TO_SHOP = 'user_to_shop',
  USER_TO_ADMIN = 'user_to_admin',
  ADMIN_TO_USER = 'admin_to_user',
}

export enum ConversationStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  BLOCKED = 'blocked',
}

export class GetConversationsInputDto extends PaginationInputDto {
  @ApiProperty({
    description: 'Filter by conversation type',
    enum: ConversationType,
    example: 'user_to_user',
    required: false,
  })
  @IsOptional()
  @IsEnum(ConversationType)
  @Type(() => String)
  type?: ConversationType;

  @ApiProperty({
    description: 'Filter by conversation status',
    enum: ConversationStatus,
    example: 'active',
    required: false,
  })
  @IsOptional()
  @IsEnum(ConversationStatus)
  @Type(() => String)
  status?: ConversationStatus;

  @ApiProperty({
    description: 'Filter by pinned conversations only',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  is_pinned?: boolean;

  @ApiProperty({
    description: 'Search conversations by title or last message',
    example: 'Hello',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  search?: string;

  @ApiProperty({
    description: 'Exclude conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  exclude_conversation_id?: string;
}

export class ConversationParticipantDto {
  @ApiProperty({
    description: 'Participant ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Participant name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Participant avatar URL',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiProperty({
    description: 'Participant online status',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_online?: boolean;

  @ApiProperty({
    description: 'Participant last online timestamp',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  last_online_at?: Date;
}

export class ConversationDto {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Chat with John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Last message content',
    example: 'Hello, how are you?',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_message?: string;

  @ApiProperty({
    description: 'Last message timestamp',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  last_message_at?: Date;

  @ApiProperty({
    description: 'Last message type',
    example: 'text',
    enum: ['text', 'image', 'file', 'system'],
    required: false,
  })
  @IsOptional()
  @IsString()
  last_message_type?: 'text' | 'image' | 'file' | 'system';

  @ApiProperty({
    description: 'Last sender ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  last_sender_id?: string;

  @ApiProperty({
    description: 'Conversation type',
    enum: ConversationType,
    example: 'user_to_user',
  })
  @IsEnum(ConversationType)
  type: ConversationType;

  @ApiProperty({
    description: 'Conversation status',
    enum: ConversationStatus,
    example: 'active',
  })
  @IsEnum(ConversationStatus)
  status: ConversationStatus;

  @ApiProperty({
    description: 'Whether conversation is pinned',
    example: false,
  })
  @IsBoolean()
  is_pinned: boolean;

  @ApiProperty({
    description: 'Whether conversation is muted',
    example: false,
  })
  @IsBoolean()
  is_muted: boolean;

  @ApiProperty({
    description: 'Muted until timestamp',
    example: '2024-01-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  muted_until?: Date;

  @ApiProperty({
    description: 'Whether notifications are enabled',
    example: true,
  })
  @IsBoolean()
  notifications_enabled: boolean;

  @ApiProperty({
    description: 'Number of unread messages',
    example: 5,
  })
  @IsInt()
  unread_count: number;

  @ApiProperty({
    description: 'Conversation creation timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @ApiProperty({
    description: 'Conversation update timestamp',
    example: '2024-01-01T12:00:00Z',
  })
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  @ApiProperty({
    description: 'Initiator of the conversation',
    type: ConversationParticipantDto,
  })
  @ValidateNested()
  @IsDefined()
  @Type(() => ConversationParticipantDto)
  initiator: ConversationParticipantDto;

  @ApiProperty({
    description: 'Other participant in the conversation',
    type: ConversationParticipantDto,
  })
  @ValidateNested()
  @IsDefined()
  @Type(() => ConversationParticipantDto)
  participant: ConversationParticipantDto;
}

export class GetConversationsOutputDto {
  @ApiProperty({
    description: 'List of conversations',
    type: [ConversationDto],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ConversationDto)
  items: ConversationDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: PaginationMetadataDto,
  })
  @ValidateNested()
  @IsDefined()
  @Type(() => PaginationMetadataDto)
  pagination: PaginationMetadataDto;
}
