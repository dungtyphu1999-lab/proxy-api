import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Logger, Inject, forwardRef } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatSocketService } from './services/chat-socket.service';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@/config/app-config.service';
import {
  SendMessageDto,
  MarkConversationReadDto,
  SocketEvents,
} from './dto/socket-message.dto';

interface AuthenticatedSocket extends Socket {
  data: {
    user: {
      id: string;
      email: string;
      username: string;
    };
  };
}

interface AuthPayload {
  sub: string;
  email: string;
  username: string;
}

interface AuthResponse {
  success: boolean;
  userId?: string;
  error?: string;
}

interface SimpleSuccessResponse {
  success: boolean;
  error?: string;
}

interface ConversationPayload {
  conversation_id: string;
}

interface OnlineUser {
  user_id: string;
  username: string;
  email: string;
  status: 'online' | 'offline';
  last_seen?: Date;
}

@WebSocketGateway({
  namespace: '/chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private readonly connectedUsers = new Map<string, string>();
  private readonly onlineUsers = new Map<string, OnlineUser>();

  constructor(
    @Inject(forwardRef(() => ChatSocketService))
    private readonly chatSocketService: ChatSocketService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  afterInit(): void {
    this.logger.log('Chat Gateway initialized');
    this.logger.log(`Chat Gateway namespace: /chat`);
  }

  async handleConnection(client: AuthenticatedSocket): Promise<void> {
    this.logger.log(`New socket connection attempt: ${client.id}`);
    try {
      const user = await this.authenticateUser(client);
      if (!user) {
        client.disconnect();
        return;
      }

      client.data = { user };
      const userId = user.id;
      this.connectedUsers.set(userId, client.id);

      // Add user to online users list
      const onlineUser: OnlineUser = {
        user_id: userId,
        username: user.username,
        email: user.email,
        status: 'online',
        last_seen: new Date(),
      };
      this.onlineUsers.set(userId, onlineUser);

      const conversations = this.getUserConversations(userId);
      await Promise.all(
        conversations.map((conversationId) =>
          client.join(`conversation:${conversationId}`),
        ),
      );

      // Emit user online status to all connected users
      this.broadcastUserStatusChange(onlineUser, 'user_online');

      // Send unread message count for each conversation to the connected user
      await this.sendUnreadMessagesToUser(userId, client);

      this.logger.log(`User ${userId} connected with socket ${client.id}`);
    } catch (error) {
      this.logger.error(`Connection error for socket ${client.id}:`, error);
      this.logger.error('Error stack:', (error as Error).stack);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket): void {
    const userId = client.data?.user?.id;
    if (userId) {
      this.connectedUsers.delete(userId);

      // Update user status to offline
      const offlineUser: OnlineUser = {
        user_id: userId,
        username: client.data.user.username,
        email: client.data.user.email,
        status: 'offline',
        last_seen: new Date(),
      };
      this.onlineUsers.set(userId, offlineUser);

      // Emit user offline status to all connected users
      this.broadcastUserStatusChange(offlineUser, 'user_offline');

      this.logger.log(`User ${userId} disconnected (socket ${client.id})`);
    } else {
      this.logger.warn(`Socket ${client.id} disconnected without user data`);
    }
  }

  @SubscribeMessage(SocketEvents.AUTH)
  handleAuth(
    @MessageBody() authDto: { token: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ): AuthResponse {
    try {
      const userId = client.data.user.id;
      this.logger.debug(`User ${userId} authenticated via auth event`);
      return { success: true, userId };
    } catch (error) {
      this.logger.debug('Auth error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.SEND_MESSAGE)
  async handleSendMessage(
    @MessageBody() sendMessageDto: SendMessageDto,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse & { message?: unknown }> {
    try {
      const userId = client.data.user.id;
      const result = await this.chatSocketService.sendMessage(
        userId,
        sendMessageDto,
      );

      const roomName = `conversation:${sendMessageDto.conversation_id}`;
      client.to(roomName).emit(SocketEvents.RECEIVE_MESSAGE, result.message);
      this.server
        .to(roomName)
        .emit(SocketEvents.CONVERSATION_UPDATED, result.conversationUpdate);

      // Send unread message count notification to other participants
      const participants = result.participants;
      const otherParticipants = participants.filter((id) => id !== userId);

      otherParticipants.forEach((participantId) => {
        this.sendToUser(participantId, 'unread_message_count', {
          conversation_id: sendMessageDto.conversation_id,
          unread_count: result.conversationUpdate.unread_count,
          message_preview: sendMessageDto.content,
          sender_id: userId,
        });
      });

      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      this.logger.debug('Send message error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.MARK_CONVERSATION_READ)
  async handleMarkConversationRead(
    @MessageBody() markReadDto: MarkConversationReadDto,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse> {
    try {
      const userId = client.data.user.id;
      await this.chatSocketService.markConversationAsRead(userId, markReadDto);

      const roomName = `conversation:${markReadDto.conversation_id}`;
      client.to(roomName).emit(SocketEvents.MARK_CONVERSATION_READ, {
        conversation_id: markReadDto.conversation_id,
        read_by: userId,
        unread_count: 0,
      });

      return { success: true };
    } catch (error) {
      this.logger.debug('Mark conversation read error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.JOIN_CONVERSATION)
  async handleJoinConversation(
    @MessageBody() data: ConversationPayload,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse> {
    try {
      const userId = client.data.user.id;
      await this.chatSocketService.joinConversation(
        userId,
        data.conversation_id,
      );
      await client.join(`conversation:${data.conversation_id}`);

      // Send online users list to the newly connected user
      const onlineUsersList = Array.from(this.onlineUsers.values());
      client.emit('online_users_list', {
        users: onlineUsersList,
        timestamp: new Date(),
      });

      return { success: true };
    } catch (error) {
      this.logger.debug('Join conversation error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.LEAVE_CONVERSATION)
  async handleLeaveConversation(
    @MessageBody() data: ConversationPayload,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse> {
    try {
      const userId = client.data.user.id;
      this.chatSocketService.leaveConversation(userId, data.conversation_id);
      await client.leave(`conversation:${data.conversation_id}`);
      return { success: true };
    } catch (error) {
      this.logger.debug('Leave conversation error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.TYPING_START)
  async handleTypingStart(
    @MessageBody() data: ConversationPayload,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse> {
    try {
      const userId = client.data.user.id;
      await this.chatSocketService.handleTypingStart(
        userId,
        data.conversation_id,
      );
      const roomName = `conversation:${data.conversation_id}`;
      client.to(roomName).emit('typing:start', {
        user_id: userId,
        conversation_id: data.conversation_id,
      });
      return { success: true };
    } catch (error) {
      this.logger.debug('Typing start error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.TYPING_STOP)
  handleTypingStop(
    @MessageBody() data: ConversationPayload,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): SimpleSuccessResponse {
    try {
      const userId = client.data.user.id;
      this.chatSocketService.handleTypingStop(userId, data.conversation_id);
      const roomName = `conversation:${data.conversation_id}`;
      client.to(roomName).emit('typing:stop', {
        user_id: userId,
        conversation_id: data.conversation_id,
      });
      return { success: true };
    } catch (error) {
      this.logger.debug('Typing stop error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  private async authenticateUser(
    client: AuthenticatedSocket,
  ): Promise<AuthenticatedSocket['data']['user'] | null> {
    try {
      const token = this.extractTokenFromSocket(client);
      if (!token || typeof token !== 'string' || token.trim() === '') {
        this.logger.warn(`No token found for socket ${client.id}`);
        return null;
      }

      const payload = await this.jwtService.verifyAsync<AuthPayload>(token, {
        secret: this.appConfigService.jwt.secret,
      });

      return {
        id: payload.sub,
        email: payload.email,
        username: payload.username,
      };
    } catch (error) {
      this.logger.warn(
        `Authentication error for socket ${client.id}:`,
        (error as Error).message,
      );
      return null;
    }
  }

  private extractTokenFromSocket(
    client: AuthenticatedSocket,
  ): string | undefined {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (client.handshake.auth?.token) return client.handshake.auth.token || '';

    const authHeader = client.handshake.headers?.authorization;
    if (authHeader?.startsWith('Bearer ')) return authHeader.substring(7);

    if (client.handshake.query?.token)
      return client.handshake.query.token as string;

    return undefined;
  }

  private getUserConversations(userId: string): string[] {
    try {
      // Bạn có thể replace phần này nếu cần query DB
      this.logger.debug('Getting user conversations for user:', userId);
      return [];
    } catch (error) {
      this.logger.debug('Error getting user conversations:', error);
      return [];
    }
  }

  private broadcastUserStatusChange(user: OnlineUser, event: string): void {
    const payload = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      status: user.status,
      last_seen: user.last_seen ? user.last_seen.toISOString() : null,
      timestamp: new Date().toISOString(),
    };
    this.logger.log(
      `Broadcasting ${event} event for user ${user.user_id}:`,
      payload,
    );
    this.server.emit(event, payload);
  }

  public getUserSocketId(userId: string): string | undefined {
    return this.connectedUsers.get(userId);
  }

  public isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }

  public sendToUser(userId: string, event: string, data: unknown): void {
    const socketId = this.getUserSocketId(userId);
    if (socketId) {
      this.server.to(socketId).emit(event, data);
    }
  }

  public broadcastToAll(event: string, data: unknown): void {
    this.server.emit(event, data);
  }

  /**
   * Emit message and conversation update to conversation room
   * Used for sending welcome messages and other system messages
   */
  public emitToConversation(
    conversationId: string,
    message: unknown,
    conversationUpdate: unknown,
  ): void {
    const roomName = `conversation:${conversationId}`;
    this.server.to(roomName).emit(SocketEvents.RECEIVE_MESSAGE, message);
    this.server
      .to(roomName)
      .emit(SocketEvents.CONVERSATION_UPDATED, conversationUpdate);
  }

  /**
   * Send unread message count for each conversation to the connected user
   */
  private async sendUnreadMessagesToUser(
    userId: string,
    client: AuthenticatedSocket,
  ): Promise<void> {
    try {
      const unreadMessages =
        await this.chatSocketService.getUnreadMessagesForUser(userId);

      // Send unread_message_count event for each conversation
      unreadMessages.forEach((unreadMessage) => {
        client.emit('unread_message_count', unreadMessage);
      });

      this.logger.debug(
        `Sent ${unreadMessages.length} unread notifications to user ${userId}`,
      );
    } catch (error) {
      this.logger.debug(
        `Failed to send unread messages to user ${userId}: ${(error as Error).message}`,
      );
    }
  }
}
