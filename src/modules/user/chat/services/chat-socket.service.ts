import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { ChatService } from '../chat.service';
import { ChatRepository } from '../chat.repository';
import { UserService } from '@/modules/user/user/user.service';
import { UserTelegramService } from '@/modules/user/telegram/telegram.service';
import {
  SendMessageDto,
  ReceiveMessageDto,
  MarkConversationReadDto,
  ConversationUpdatedDto,
  MessageType,
} from '../dto/socket-message.dto';

@Injectable()
export class ChatSocketService {
  private readonly logger = new Logger(ChatSocketService.name);

  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
    private readonly chatRepository: ChatRepository,
    private readonly userService: UserService,
    private readonly userTelegramService: UserTelegramService,
  ) {}

  /**
   * Send a message via socket and broadcast to conversation participants
   */
  async sendMessage(
    userId: string,
    sendMessageDto: SendMessageDto,
  ): Promise<{
    message: ReceiveMessageDto;
    conversationUpdate: ConversationUpdatedDto;
    participants: string[];
  }> {
    try {
      // Verify user has access to this conversation
      const conversation = await this.chatRepository.findConversationById(
        sendMessageDto.conversation_id,
      );

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      // Check if user is a participant in this conversation
      if (
        conversation.initiator_id !== userId &&
        conversation.participant_id !== userId
      ) {
        throw new Error('Access denied to this conversation');
      }

      if (!sendMessageDto.content && !sendMessageDto.file_url) {
        throw new Error('Either content or file_url must be provided');
      }

      const messageType =
        sendMessageDto.message_type ||
        (sendMessageDto.file_url ? MessageType.IMAGE : MessageType.TEXT);

      const message = await this.chatRepository.createMessage(userId, {
        conversation_id: sendMessageDto.conversation_id,
        content: sendMessageDto.content || '',
        message_type: messageType,
        file_url: sendMessageDto.file_url,
        file_name: sendMessageDto.file_name,
        file_size: sendMessageDto.file_size,
        file_type: sendMessageDto.file_type,
      });

      const lastMessagePreview: string =
        !sendMessageDto.content && sendMessageDto.file_url
          ? sendMessageDto.file_name || '[Image]'
          : sendMessageDto.content || '';

      await this.chatRepository.updateConversationLastMessage(
        sendMessageDto.conversation_id,
        lastMessagePreview,
        userId,
      );

      const recipientId =
        conversation.initiator_id === userId
          ? conversation.participant_id
          : conversation.initiator_id;

      this.notifyTelegramNewMessage(
        recipientId,
        userId,
        lastMessagePreview,
      ).catch((error) => {
        this.logger.warn(
          `Failed to send Telegram chat notification: ${
            error instanceof Error ? error.message : String(error)
          }`,
        );
      });

      // Prepare message for broadcasting
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

      // Get updated conversation with correct unread count
      const updatedConversation =
        await this.chatRepository.findConversationById(
          sendMessageDto.conversation_id,
        );

      // Prepare conversation update for broadcasting
      const conversationUpdate: ConversationUpdatedDto = {
        conversation_id: conversation.id,
        last_message: message.content,
        unread_count: updatedConversation?.unread_count || 0,
        last_message_at: message.created_at,
      };

      return {
        message: receiveMessageDto,
        conversationUpdate,
        participants: [conversation.initiator_id, conversation.participant_id],
      };
    } catch (error) {
      this.logger.error(
        `Failed to send message: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  /**
   * Mark conversation as read (mark all messages in conversation as read)
   */
  async markConversationAsRead(
    userId: string,
    markReadDto: MarkConversationReadDto,
  ): Promise<void> {
    try {
      // Verify user has access to this conversation
      const conversation = await this.chatRepository.findConversationById(
        markReadDto.conversation_id,
      );

      if (!conversation) {
        throw new Error('Conversation not found');
      }

      if (
        conversation.initiator_id !== userId &&
        conversation.participant_id !== userId
      ) {
        throw new Error('Access denied to this conversation');
      }

      // Mark all messages in conversation as read and reset unread count
      await this.chatRepository.markConversationAsRead(
        markReadDto.conversation_id,
        userId,
      );

      this.logger.log(
        `Conversation ${markReadDto.conversation_id} marked as read by user ${userId}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to mark conversation as read: ${(error as Error).message}`,
        (error as Error).stack,
      );
      throw error;
    }
  }

  /**
   * Get conversation participants for broadcasting
   */
  async getConversationParticipants(conversationId: string): Promise<string[]> {
    const conversation =
      await this.chatRepository.findConversationById(conversationId);

    if (!conversation) {
      return [];
    }

    return [conversation.initiator_id, conversation.participant_id];
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

  /**
   * Validate user access to conversation
   */
  async validateConversationAccess(
    userId: string,
    conversationId: string,
  ): Promise<boolean> {
    const conversation =
      await this.chatRepository.findConversationById(conversationId);

    if (!conversation) {
      return false;
    }

    return (
      conversation.initiator_id === userId ||
      conversation.participant_id === userId
    );
  }

  /**
   * Handle user joining a conversation
   */
  async joinConversation(
    userId: string,
    conversationId: string,
  ): Promise<void> {
    const hasAccess = await this.validateConversationAccess(
      userId,
      conversationId,
    );

    if (!hasAccess) {
      throw new Error('Access denied to this conversation');
    }

    this.logger.log(`User ${userId} joined conversation ${conversationId}`);
  }

  /**
   * Handle user leaving a conversation
   */
  leaveConversation(userId: string, conversationId: string): void {
    this.logger.log(`User ${userId} left conversation ${conversationId}`);
  }

  /**
   * Handle typing indicators
   */
  async handleTypingStart(
    userId: string,
    conversationId: string,
  ): Promise<void> {
    const hasAccess = await this.validateConversationAccess(
      userId,
      conversationId,
    );

    if (!hasAccess) {
      throw new Error('Access denied to this conversation');
    }

    this.logger.log(
      `User ${userId} started typing in conversation ${conversationId}`,
    );
  }

  /**
   * Handle typing stop indicators
   */
  handleTypingStop(userId: string, conversationId: string): void {
    this.logger.log(
      `User ${userId} stopped typing in conversation ${conversationId}`,
    );
  }

  /**
   * Get unread messages for user when connecting
   */
  async getUnreadMessagesForUser(userId: string): Promise<
    Array<{
      conversation_id: string;
      unread_count: number;
      message_preview: string;
      sender_id: string;
    }>
  > {
    return this.chatRepository.getUnreadMessagesForUser(userId);
  }
}
