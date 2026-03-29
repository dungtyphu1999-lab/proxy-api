import {
  Controller,
  Get,
  Query,
  Request,
  Post,
  Body,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import {
  GetConversationsInputDto,
  GetConversationsOutputDto,
} from './dto/get-conversations.dto';
import {
  GetConversationDetailsInputDto,
  GetConversationDetailsOutputDto,
} from './dto/get-conversation-details.dto';
import {
  CreateConversationInputDto,
  CreateConversationOutputDto,
} from './dto/create-conversation.dto';
import {
  GetMessagesInputDto,
  GetMessagesOutputDto,
} from './dto/get-messages.dto';
import {
  CreateMessageInputDto,
  CreateMessageOutputDto,
} from './dto/create-message.dto';
import { SearchChatInputDto, SearchChatOutputDto } from './dto/search-chat.dto';
import { GetUnreadCountOutputDto } from './dto/get-unread-count.dto';
import { UseJwtAuthGuard } from '../auth/decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { UploadService } from '@/modules/upload/upload.service';
import { UploadFileOutputDto } from '@/modules/file-upload/file-upload.dtos';
import { UseImageUpload } from '@/modules/file-upload/file-upload.decorators';
import { UploadImageInputDto } from '@/modules/file-upload/file-upload.dtos';

@ApiTags('[User] Chat')
@Controller()
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly uploadService: UploadService,
  ) {}

  @Get('conversations/list')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Get user conversations',
    description: 'Get paginated list of user conversations with filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversations retrieved successfully',
    type: GetConversationsOutputDto,
  })
  async getConversations(
    @Query() query: GetConversationsInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<GetConversationsOutputDto> {
    return this.chatService.getConversations(req.user.sub, query);
  }

  @Post('conversations')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Create or find existing conversation',
    description:
      'Create a new conversation if it does not exist, otherwise return existing conversation',
  })
  @ApiBody({
    type: CreateConversationInputDto,
    description: 'Conversation creation data',
  })
  @ApiResponse({
    status: 201,
    description: 'Conversation created or found successfully',
    type: CreateConversationOutputDto,
  })
  async createConversation(
    @Body() createDto: CreateConversationInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<CreateConversationOutputDto> {
    return this.chatService.createConversation(req.user.sub, createDto);
  }

  @Get('messages')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Get messages in a conversation',
    description: 'Get paginated list of messages in a specific conversation',
  })
  @ApiResponse({
    status: 200,
    description: 'Messages retrieved successfully',
    type: GetMessagesOutputDto,
  })
  async getMessages(
    @Query() query: GetMessagesInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<GetMessagesOutputDto> {
    return this.chatService.getMessages(req.user.sub, query);
  }

  @Post('messages')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Send a new message',
    description: 'Send a new message to a conversation',
  })
  @ApiBody({
    type: CreateMessageInputDto,
    description: 'Message creation data',
  })
  @ApiResponse({
    status: 201,
    description: 'Message sent successfully',
    type: CreateMessageOutputDto,
  })
  async createMessage(
    @Body() createDto: CreateMessageInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<CreateMessageOutputDto> {
    return this.chatService.createMessage(req.user.sub, createDto);
  }

  @Get('search')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Search conversations, messages and contacts',
    description:
      'Search conversations, messages and contacts using PostgreSQL trigram similarity. Use type parameter to specify search scope: conversations, messages, contacts, or all.',
  })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
    type: SearchChatOutputDto,
  })
  async searchChat(
    @Query() query: SearchChatInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<SearchChatOutputDto> {
    return this.chatService.searchChat(req.user.sub, query);
  }

  @Get('unread-count')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Get total unread count',
    description:
      'Get total number of unread messages across all conversations for the logged-in user',
  })
  @ApiResponse({
    status: 200,
    description: 'Total unread count retrieved successfully',
    type: GetUnreadCountOutputDto,
  })
  async getTotalUnreadCount(
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<GetUnreadCountOutputDto> {
    return this.chatService.getTotalUnreadCount(req.user.sub);
  }

  @Post('welcome')
  @UseJwtAuthGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send admin welcome message if needed',
  })
  async sendWelcomeMessage(@Request() req: JwtAuthenticatedRequest) {
    await this.chatService.sendWelcomeMessageIfNeeded(req.user.sub);
    return { success: true };
  }

  @Get('conversations/details')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Get conversation details',
    description: 'Get detailed information of a specific conversation',
  })
  @ApiResponse({
    status: 200,
    description: 'Conversation details retrieved successfully',
    type: GetConversationDetailsOutputDto,
  })
  async getConversationDetails(
    @Query() query: GetConversationDetailsInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<GetConversationDetailsOutputDto> {
    const conversation = await this.chatService.getConversationDetails(
      req.user.sub,
      query.conversation_id,
    );

    return {
      conversation,
    };
  }

  @Post('upload-image')
  @UseJwtAuthGuard()
  @UseImageUpload('file')
  @ApiOperation({
    summary: 'Upload image for chat',
    description:
      'Upload an image file for chat messages. Returns file URL and metadata that can be used when sending messages.',
  })
  @ApiBody({ type: UploadImageInputDto })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    type: UploadFileOutputDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file format, size, or validation failed',
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadFileOutputDto & { size: number; mimetype: string }> {
    if (!file) {
      throw new BadRequestException('No image file provided');
    }

    const result = await this.uploadService.uploadImage(file, 'chat-images');

    return {
      ...result,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
