import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
  Logger,
} from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { UserService } from '../user/user.service';
import { ShopsRepository } from '../shops/shops.repository';
import {
  GetConversationsInputDto,
  GetConversationsOutputDto,
  ConversationDto,
} from './dto/get-conversations.dto';
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
  MessageType,
} from './dto/create-message.dto';
import {
  SearchChatInputDto,
  SearchChatOutputDto,
  SearchType,
  SearchConversationResultDto,
  SearchMessageResultDto,
  SearchContactResultDto,
} from './dto/search-chat.dto';
import { ConversationType } from './dto/get-conversations.dto';
import { GetUnreadCountOutputDto } from './dto/get-unread-count.dto';
import { ChatGateway } from './chat.gateway';
import {
  SocketEvents,
  ReceiveMessageDto,
  ConversationUpdatedDto,
} from './dto/socket-message.dto';
import { UserTelegramService } from '@/modules/user/telegram/telegram.service';

const WELCOME_MESSAGE_CONTENT = `Chào mừng bạn đến với bachhoammo! Mình là nhân viên hỗ trợ. Nếu bạn cần giúp đỡ gì, cứ nhắn tin cho mình ở đây nhé.

Lưu ý: Nếu người bán hướng dẫn bạn Ra Ngoài bachhoammo để bảo hành, đổi hàng, vv.... Hãy khiếu nại đơn hàng và thông báo cho support để được đảm bảo quyền lợi và xử lý theo hướng hoàn tiền đơn hàng.`;

const buildSellerGreetingContent = (shopName?: string) =>
  `Xin chào! Mình là ${shopName ? shopName : 'cửa hàng'}. Cảm ơn bạn đã quan tâm sản phẩm. Bạn cần mình hỗ trợ thông tin gì thêm không?`;

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userService: UserService,
    private readonly shopsRepository: ShopsRepository,
    @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway,
    private readonly userTelegramService: UserTelegramService,
  ) {}

  async getConversations(
    userId: string,
    params: GetConversationsInputDto,
  ): Promise<GetConversationsOutputDto> {
    const { items, total } =
      await this.chatRepository.findConversationsByUserId(userId, params);

    const { page = 1, take: pageSize = 10 } = params;

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
      },
    };
  }

  async createConversation(
    userId: string,
    createDto: CreateConversationInputDto,
  ): Promise<CreateConversationOutputDto> {
    // Prevent creating conversation with self
    if (userId === createDto.participant_id) {
      throw new BadRequestException('Cannot create conversation with yourself');
    }

    // Validate participant based on conversation type
    let normalizedParticipantUserId = createDto.participant_id;
    let normalizedTitle = createDto.title;
    let normalizedShopId: string | undefined;
    let shopNameForGreeting: string | undefined;
    switch (createDto.type) {
      case ConversationType.USER_TO_USER:
      case ConversationType.USER_TO_ADMIN:
      case ConversationType.ADMIN_TO_USER: {
        // Check if participant exists in users table
        const user = await this.userService.findById(createDto.participant_id);
        if (!user) {
          throw new BadRequestException(
            `User with ID ${createDto.participant_id} does not exist`,
          );
        }
        break;
      }

      case ConversationType.USER_TO_SHOP: {
        // Check if participant exists in shops table
        const shop = await this.shopsRepository.findById(
          createDto.participant_id,
        );
        if (!shop) {
          throw new BadRequestException(
            `Shop with ID ${createDto.participant_id} does not exist`,
          );
        }
        normalizedParticipantUserId = shop.owner_id;
        normalizedTitle = normalizedTitle || shop.name;
        normalizedShopId = shop.id;
        shopNameForGreeting = shop.name;
        break;
      }

      default:
        throw new BadRequestException(
          `Invalid conversation type: ${createDto.type as string}`,
        );
    }

    const { conversation, is_new } =
      await this.chatRepository.findOrCreateConversation(
        userId,
        normalizedParticipantUserId,
        createDto.type,
        normalizedTitle,
        normalizedShopId,
      );

    if (is_new && createDto.type === ConversationType.USER_TO_SHOP) {
      this.sendSellerGreetingMessage(
        conversation.id,
        normalizedParticipantUserId,
        userId,
        shopNameForGreeting,
      ).catch((error) => {
        this.logger.warn(
          `Failed to send seller greeting message: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      });
    }

    return conversation;
  }

  async getMessages(
    userId: string,
    params: GetMessagesInputDto,
  ): Promise<GetMessagesOutputDto> {
    // Verify user has access to this conversation
    const conversation = await this.chatRepository.findConversationById(
      params.conversation_id,
    );

    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    // Check if user is a participant in this conversation
    if (
      conversation.initiator_id !== userId &&
      conversation.participant_id !== userId
    ) {
      throw new BadRequestException('Access denied to this conversation');
    }

    // Mark conversation as read when user views messages
    try {
      await this.chatRepository.markConversationAsRead(
        params.conversation_id,
        userId,
      );
    } catch (error) {
      // Log error but don't fail the request if mark read fails
      console.error(
        `Failed to mark conversation as read: ${(error as Error).message}`,
      );
    }

    const { items, total } =
      await this.chatRepository.findMessagesByConversationId(
        params.conversation_id,
        params,
      );

    return {
      items,
      pagination: {
        page: params.page,
        pageSize: params.take,
        total,
      },
    };
  }

  async createMessage(
    userId: string,
    createDto: CreateMessageInputDto,
  ): Promise<CreateMessageOutputDto> {
    // Verify user has access to this conversation
    const conversation = await this.chatRepository.findConversationById(
      createDto.conversation_id,
    );

    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    // Check if user is a participant in this conversation
    if (
      conversation.initiator_id !== userId &&
      conversation.participant_id !== userId
    ) {
      throw new BadRequestException('Access denied to this conversation');
    }

    if (!createDto.content && !createDto.file_url) {
      throw new BadRequestException(
        'Either content or file_url must be provided',
      );
    }

    const messageType =
      createDto.message_type ||
      (createDto.file_url ? MessageType.IMAGE : MessageType.TEXT);

    const messageData: CreateMessageInputDto = {
      ...createDto,
      message_type: messageType,
    };

    const messageDataWithContent: CreateMessageInputDto = {
      ...messageData,
      content: messageData.content || '',
    };

    const newMessage = await this.chatRepository.createMessage(
      userId,
      messageDataWithContent,
    );

    const lastMessagePreview =
      !createDto.content && createDto.file_url
        ? createDto.file_name || '[Image]'
        : createDto.content || '';

    await this.chatRepository.updateConversationLastMessage(
      createDto.conversation_id,
      lastMessagePreview,
      userId,
    );

    this.notifyTelegramNewMessage(
      conversation.initiator_id === userId
        ? conversation.participant_id
        : conversation.initiator_id,
      userId,
      lastMessagePreview,
    ).catch((error) => {
      this.logger.warn(
        `Failed to send Telegram chat notification: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    });

    return newMessage;
  }

  async searchChat(
    userId: string,
    params: SearchChatInputDto,
  ): Promise<SearchChatOutputDto> {
    const { query, type = SearchType.ALL, conversation_id } = params;
    const limit = 50;

    let conversations: SearchConversationResultDto[] = [];
    let messages: SearchMessageResultDto[] = [];
    let contacts: SearchContactResultDto[] = [];

    // Search conversations
    if (type === SearchType.ALL || type === SearchType.CONVERSATIONS) {
      conversations = await this.chatRepository.searchConversations(
        userId,
        query,
        limit,
      );
    }

    // Search messages
    if (type === SearchType.ALL || type === SearchType.MESSAGES) {
      messages = await this.chatRepository.searchMessages(
        userId,
        query,
        conversation_id,
        limit,
      );
    }

    // Search contacts
    if (type === SearchType.ALL || type === SearchType.CONTACTS) {
      contacts = await this.chatRepository.searchContacts(userId, query, limit);
    }

    const total = conversations.length + messages.length + contacts.length;

    return {
      conversations,
      messages,
      contacts,
      total,
    };
  }

  async getTotalUnreadCount(userId: string): Promise<GetUnreadCountOutputDto> {
    const totalUnreadCount =
      await this.chatRepository.getTotalUnreadCount(userId);

    return {
      total_unread_count: totalUnreadCount,
    };
  }

  async getConversationDetails(
    userId: string,
    conversationId: string,
  ): Promise<ConversationDto> {
    const conversation = await this.chatRepository.findConversationDetailsById(
      conversationId,
      userId,
    );

    if (!conversation) {
      throw new BadRequestException('Conversation not found');
    }

    return conversation;
  }

  /**
   * Send welcome message from admin to user if not already sent
   * This method is called after user login to send initial welcome message
   */
  async sendWelcomeMessageIfNeeded(userId: string): Promise<void> {
    try {
      // Get user to check if welcome message was already sent
      const user = await this.userService.findById(userId);
      if (!user) {
        console.error(`User with ID ${userId} not found`);
        return;
      }

      // Skip if user already received welcome message
      if (user.has_received_welcome_message) {
        return;
      }

      // Check if user has admin role - if yes, don't send welcome message
      const hasAdminRole = await this.userService.hasAdminRole(userId);
      if (hasAdminRole) {
        return;
      }

      // Find admin user
      const adminUser = await this.userService.findAdminUser();
      if (!adminUser) {
        console.error('No admin user found in the system');
        return;
      }

      const adminUserId = adminUser.id;

      // Find or create conversation with type ADMIN_TO_USER
      // Admin is initiator, user is participant
      const { conversation } =
        await this.chatRepository.findOrCreateConversation(
          adminUserId,
          userId,
          ConversationType.ADMIN_TO_USER,
          'Hỗ trợ khách hàng',
        );

      // Create welcome message from admin to user
      const message = await this.chatRepository.createMessage(adminUserId, {
        conversation_id: conversation.id,
        content: WELCOME_MESSAGE_CONTENT,
        message_type: MessageType.TEXT,
      });

      // Update conversation last message
      await this.chatRepository.updateConversationLastMessage(
        conversation.id,
        WELCOME_MESSAGE_CONTENT.substring(0, 100), // Preview first 100 chars
        adminUserId,
      );

      // Get updated conversation with unread count
      const updatedConversation =
        await this.chatRepository.findConversationById(conversation.id);

      // Prepare message for WebSocket broadcasting
      const receiveMessageDto: ReceiveMessageDto = {
        id: message.id,
        conversation_id: message.conversation_id,
        sender_id: message.sender_id,
        content: message.content,
        message_type: message.message_type,
        file_url: message.file_url,
        file_name: message.file_name,
        file_size: message.file_size,
        file_type: message.file_type,
        created_at: message.created_at,
      };

      // Prepare conversation update for WebSocket broadcasting
      const conversationUpdate: ConversationUpdatedDto = {
        conversation_id: conversation.id,
        last_message: WELCOME_MESSAGE_CONTENT.substring(0, 100),
        unread_count: updatedConversation?.unread_count || 1,
        last_message_at: message.created_at,
      };

      // Emit WebSocket notifications to conversation room (if user has joined)
      this.chatGateway.emitToConversation(
        conversation.id,
        receiveMessageDto,
        conversationUpdate,
      );

      // Also emit directly to user if they are online (in case they haven't joined the room yet)
      if (this.chatGateway.isUserOnline(userId)) {
        this.chatGateway.sendToUser(
          userId,
          SocketEvents.RECEIVE_MESSAGE,
          receiveMessageDto,
        );
        this.chatGateway.sendToUser(
          userId,
          SocketEvents.CONVERSATION_UPDATED,
          conversationUpdate,
        );
      }

      // Send unread message count notification to user
      this.chatGateway.sendToUser(userId, 'unread_message_count', {
        conversation_id: conversation.id,
        unread_count: conversationUpdate.unread_count,
        message_preview: WELCOME_MESSAGE_CONTENT.substring(0, 50),
        sender_id: adminUserId,
      });

      // Mark user as having received welcome message
      await this.userService.updateUser(userId, {
        has_received_welcome_message: true,
      });
    } catch (error) {
      // Log error but don't fail the login process
      console.error(
        'Failed to send welcome message:',
        (error as Error).message,
        (error as Error).stack,
      );
    }
  }

  private async notifyTelegramNewMessage(
    recipientId: string,
    senderId: string,
    preview: string,
  ): Promise<void> {
    if (!recipientId || recipientId === senderId) {
      return;
    }

    const sender = await this.userService.findById(senderId);
    const senderName = sender?.username || sender?.email || 'Một người dùng';

    const messagePreview = this.truncateText(preview || '[Tin nhắn mới]', 180);
    const safeSenderName = this.userTelegramService.escapeHtml(senderName);
    const safePreview = this.userTelegramService.escapeHtml(messagePreview);

    const button = this.userTelegramService.buildInlineButton('Xem và trả lời');

    const lines = [
      '📩 <b>Tin nhắn mới</b>',
      '----------------------',
      `👤 <b>Từ:</b> ${safeSenderName}`,
      `💬 <b>Nội dung:</b> ${safePreview}`,
    ];

    if (!button) {
      lines.push('👉 Mở bachhoammo để xem và trả lời.');
    }

    const text = lines.join('\n');

    await this.userTelegramService.notifyUser(
      recipientId,
      'new_message',
      text,
      {
        parse_mode: 'HTML',
        disable_preview: true,
        reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
      },
    );
  }

  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 3)}...`;
  }

  private async sendSellerGreetingMessage(
    conversationId: string,
    sellerUserId: string,
    buyerUserId: string,
    shopName?: string,
  ) {
    const greetingContent = buildSellerGreetingContent(shopName);

    const message = await this.chatRepository.createMessage(sellerUserId, {
      conversation_id: conversationId,
      content: greetingContent,
      message_type: MessageType.TEXT,
    });

    await this.chatRepository.updateConversationLastMessage(
      conversationId,
      greetingContent.substring(0, 100),
      sellerUserId,
    );

    const updatedConversation =
      await this.chatRepository.findConversationById(conversationId);

    const receiveMessageDto: ReceiveMessageDto = {
      id: message.id,
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      content: message.content,
      message_type: message.message_type,
      file_url: message.file_url,
      file_name: message.file_name,
      file_size: message.file_size,
      file_type: message.file_type,
      created_at: message.created_at,
    };

    const conversationUpdate: ConversationUpdatedDto = {
      conversation_id: conversationId,
      last_message: greetingContent.substring(0, 100),
      unread_count: updatedConversation?.unread_count || 1,
      last_message_at: message.created_at,
    };

    this.chatGateway.emitToConversation(
      conversationId,
      receiveMessageDto,
      conversationUpdate,
    );

    if (this.chatGateway.isUserOnline(buyerUserId)) {
      this.chatGateway.sendToUser(
        buyerUserId,
        SocketEvents.RECEIVE_MESSAGE,
        receiveMessageDto,
      );
      this.chatGateway.sendToUser(
        buyerUserId,
        SocketEvents.CONVERSATION_UPDATED,
        conversationUpdate,
      );
    }

    this.chatGateway.sendToUser(buyerUserId, 'unread_message_count', {
      conversation_id: conversationId,
      unread_count: conversationUpdate.unread_count,
      message_preview: greetingContent.substring(0, 50),
      sender_id: sellerUserId,
    });
  }
}
