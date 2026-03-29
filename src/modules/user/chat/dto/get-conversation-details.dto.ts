import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { ConversationDto } from './get-conversations.dto';

export class GetConversationDetailsInputDto {
  @ApiProperty({
    description: 'Conversation ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsUUID()
  conversation_id: string;
}

export class GetConversationDetailsOutputDto {
  @ApiProperty({
    description: 'Conversation details',
    type: ConversationDto,
  })
  conversation: ConversationDto;
}
