import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ConversationType } from './get-conversations.dto';

export class CreateConversationInputDto {
  @ApiProperty({
    description: 'Participant ID (user, shop, or admin to chat with)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  participant_id: string;

  @ApiProperty({
    description: 'Conversation type',
    enum: ConversationType,
    example: ConversationType.USER_TO_USER,
  })
  @IsEnum(ConversationType)
  @Type(() => String)
  type: ConversationType;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Chat with John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
}

export class CreateConversationOutputDto {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Participant ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  participant_id: string;

  @ApiProperty({
    description: 'Conversation type',
    enum: ConversationType,
    example: ConversationType.USER_TO_USER,
  })
  @IsEnum(ConversationType)
  type: ConversationType;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Chat with John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Whether conversation was newly created',
    example: true,
  })
  is_new: boolean;
}
