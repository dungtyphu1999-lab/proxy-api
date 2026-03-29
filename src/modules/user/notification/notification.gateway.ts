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
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@/config/app-config.service';
import { UserService } from '../user/user.service';
import {
  GetNotificationsSocketDto,
  MarkNotificationReadSocketDto,
  NotificationSocketDto,
  SocketEvents,
} from './dto/socket-notification.dto';
import { LINK_URL_TEMPLATES } from '@/shared/constants/notification-templates';

const { BLOG_POSTS, SHOPS, PRODUCTS, WITHDRAWAL_REQUESTS, SUPPORT_EMAIL } =
  LINK_URL_TEMPLATES as {
    BLOG_POSTS: string;
    SHOPS: string;
    PRODUCTS: string;
    WITHDRAWAL_REQUESTS: string;
    SUPPORT_EMAIL: string;
  };

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

type AuthErrorCode = 'TOKEN_MISSING' | 'TOKEN_EXPIRED' | 'TOKEN_INVALID';

@WebSocketGateway({
  namespace: '/notification',
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private readonly server: Server;

  private readonly logger = new Logger(NotificationGateway.name);
  private readonly connectedUsers = new Map<string, string>();
  private readonly userTimeouts = new Map<string, NodeJS.Timeout>();
  private readonly TIMEOUT_DURATION = 300000; // 5 minutes

  constructor(
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) {}

  afterInit(): void {
    this.logger.log('Notification Gateway initialized');
  }

  async handleConnection(client: AuthenticatedSocket): Promise<void> {
    try {
      const user = await this.authenticateUser(client);
      if (!user) {
        client.disconnect();
        return;
      }

      client.data = { user };
      const userId = user.id;
      this.connectedUsers.set(userId, client.id);

      await client.join(`user:${userId}`);

      const currentUser = await this.userService.findById(userId);
      const wasOffline = currentUser && !currentUser.is_online;

      await this.userService.updateLastOnlineAtAndSetOnline(userId);

      if (wasOffline || !currentUser) {
        this.server.emit('user_online', {
          user_id: userId,
          email: user.email,
          username: user.username,
          status: 'online',
          last_seen: new Date().toISOString(),
          timestamp: new Date().toISOString(),
        });
      }

      this.initTimeout(userId);
    } catch (error) {
      this.logger.error('Connection error:', error);
      client.disconnect();
    }
  }

  async handleDisconnect(client: AuthenticatedSocket): Promise<void> {
    const userId = client.data?.user?.id;
    if (!userId) {
      return;
    }

    await this.userService.setOnlineStatus(userId, false);
    await this.userService.updateLastOnlineAt(userId);

    // Emit user_offline event to all other users
    this.server.emit('user_offline', {
      user_id: userId,
      email: client.data.user.email,
      username: client.data.user.username,
      status: 'offline',
      last_seen: new Date().toISOString(),
      timestamp: new Date().toISOString(),
    });

    this.clearTimeout(userId);

    this.connectedUsers.delete(userId);
  }

  @SubscribeMessage(SocketEvents.AUTH)
  handleAuth(
    @MessageBody() authDto: { token: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ): AuthResponse {
    try {
      const userId = client.data.user.id;
      return { success: true, userId };
    } catch (error) {
      this.logger.error('Auth error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.GET_NOTIFICATIONS)
  async handleGetNotifications(
    @MessageBody() getNotificationsDto: GetNotificationsSocketDto,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<
    SimpleSuccessResponse & {
      notifications?: NotificationSocketDto[];
      unread_count?: number;
    }
  > {
    try {
      const userId = client.data.user.id;
      const { page = 1, limit = 20, type = 'all' } = getNotificationsDto;

      // Convert socket DTO to service DTO
      const serviceParams = {
        page,
        take: limit,
        skip: (page - 1) * limit,
        type: type === 'all' ? undefined : type,
      };

      const result = await this.notificationService.getNotifications(
        userId,
        serviceParams,
      );

      // Convert to socket DTO format
      const notifications: NotificationSocketDto[] = result.items.map(
        (item) => ({
          id: item.id,
          type: item.type,
          title: item.title,
          message: item.message,
          link_url: item.link_url,
          is_read: item.is_read ?? false,
          is_global: item.is_global,
          target_audience: item.target_audience,
          created_at: item.created_at.toISOString(),
        }),
      );

      return {
        success: true,
        notifications,
        unread_count: result.unread_count,
      };
    } catch (error) {
      this.logger.error('Get notifications error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.MARK_READ)
  async handleMarkRead(
    @MessageBody() markReadDto: MarkNotificationReadSocketDto,
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse & { unread_count?: number }> {
    try {
      const userId = client.data.user.id;
      const result = await this.notificationService.markNotificationAsRead(
        userId,
        { notification_id: markReadDto.notification_id },
      );

      return {
        success: true,
        unread_count: result.unread_count,
      };
    } catch (error) {
      this.logger.error('Mark read error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  @SubscribeMessage(SocketEvents.MARK_ALL_READ)
  async handleMarkAllRead(
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<SimpleSuccessResponse & { unread_count?: number }> {
    try {
      const userId = client.data.user.id;
      const result =
        await this.notificationService.markAllNotificationsAsRead(userId);

      return {
        success: true,
        unread_count: result.unread_count,
      };
    } catch (error) {
      this.logger.error('Mark all read error:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Handle join room request
   */
  @SubscribeMessage('join')
  async handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<void> {
    try {
      const { room } = data;
      if (!room) {
        client.emit('join_error', { error: 'Room name is required' });
        return;
      }

      const userId = client.data.user.id;
      const socketUserId = userId;

      // Verify user has permission to join this room
      // If room is user:userId format, extract userId from room
      const roomUserId = room.startsWith('user:')
        ? room.replace('user:', '')
        : room;
      if (roomUserId !== socketUserId) {
        client.emit('join_error', { error: 'Unauthorized to join this room' });
        return;
      }

      // Join the specified room
      await client.join(room);

      // Update database: set online status and last_seen
      await this.userService.updateLastOnlineAtAndSetOnline(userId);

      // Get current user to check status
      const currentUser = await this.userService.findById(userId);
      const wasOffline = currentUser && !currentUser.is_online;

      // Emit user_online event if user was offline
      if (wasOffline) {
        this.server.emit('user_online', {
          user_id: userId,
          email: client.data.user.email,
          username: client.data.user.username,
          status: 'online',
          last_seen: new Date().toISOString(),
          timestamp: new Date().toISOString(),
        });
      }

      // Initialize timeout counter
      this.initTimeout(userId);

      // Emit confirmation back to client
      client.emit('joined', room);
    } catch (error) {
      this.logger.error('Join room error:', error);
      client.emit('join_error', { error: (error as Error).message });
    }
  }

  /**
   * Handle ping event from client to keep connection alive
   */
  @SubscribeMessage('ping')
  async handlePing(
    @ConnectedSocket() client: AuthenticatedSocket,
  ): Promise<void> {
    try {
      const userId = client.data.user.id;

      await this.userService.updateLastOnlineAt(userId);

      const currentUser = await this.userService.findById(userId);
      const wasOffline = currentUser && !currentUser.is_online;

      if (wasOffline) {
        await this.userService.setOnlineStatus(userId, true);
        this.server.emit('user_online', {
          user_id: userId,
          email: client.data.user.email,
          username: client.data.user.username,
          status: 'online',
          last_seen: new Date().toISOString(),
          timestamp: new Date().toISOString(),
        });
      }

      this.resetTimeout(userId);
    } catch (error) {
      this.logger.error('Ping error:', error);
    }
  }

  private async authenticateUser(
    client: AuthenticatedSocket,
  ): Promise<AuthenticatedSocket['data']['user'] | null> {
    try {
      const token = this.extractTokenFromSocket(client);
      if (!token || typeof token !== 'string' || token.trim() === '') {
        // Don't spam logs for anonymous visitors; this is expected.
        client.emit('auth_error', {
          code: 'TOKEN_MISSING' satisfies AuthErrorCode,
        });
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
      const err = error as { name?: string; message?: string } | undefined;
      const name = err?.name || 'UnknownError';
      const message = err?.message || 'Unknown error';

      // Token errors happen often (expired token, invalid token). Avoid noisy stack traces.
      if (name === 'TokenExpiredError') {
        client.emit('auth_error', {
          code: 'TOKEN_EXPIRED' satisfies AuthErrorCode,
        });
        this.logger.debug(`Authentication token expired: ${message}`);
        return null;
      }

      if (name === 'JsonWebTokenError' || name === 'NotBeforeError') {
        client.emit('auth_error', {
          code: 'TOKEN_INVALID' satisfies AuthErrorCode,
        });
        this.logger.debug(`Authentication token invalid: ${message}`);
        return null;
      }

      // Unexpected error - keep warn.
      this.logger.warn(`Authentication error: ${name}: ${message}`);
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

  /**
   * Initialize timeout for a user
   * If user doesn't send ping within TIMEOUT_DURATION, they will be marked as offline
   */
  private initTimeout(userId: string): void {
    // Clear existing timeout if any
    if (this.userTimeouts.has(userId)) {
      clearTimeout(this.userTimeouts.get(userId));
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      void this.handleUserTimeout(userId)
        .then(() => {
          this.userTimeouts.delete(userId);
        })
        .catch((error) => {
          this.logger.error(
            `Error in timeout handler for user ${userId}:`,
            error,
          );
          this.userTimeouts.delete(userId);
        });
    }, this.TIMEOUT_DURATION);

    this.userTimeouts.set(userId, timeout);
  }

  /**
   * Reset timeout when receiving ping
   */
  private resetTimeout(userId: string): void {
    this.initTimeout(userId);
  }

  /**
   * Clear timeout for a user
   */
  private clearTimeout(userId: string): void {
    if (this.userTimeouts.has(userId)) {
      clearTimeout(this.userTimeouts.get(userId));
      this.userTimeouts.delete(userId);
    }
  }

  /**
   * Handle user timeout - user hasn't sent ping in TIMEOUT_DURATION
   */
  private async handleUserTimeout(userId: string): Promise<void> {
    try {
      if (!this.connectedUsers.has(userId)) {
        return;
      }

      // Get user info before updating
      const user = await this.userService.findById(userId);
      if (!user) {
        return;
      }

      // Update database: set offline status and last_seen
      await this.userService.setOnlineStatus(userId, false);
      await this.userService.updateLastOnlineAt(userId);

      // Emit user_offline event
      this.server.emit('user_offline', {
        user_id: userId,
        email: user.email,
        username: user.username,
        status: 'offline',
        last_seen: new Date().toISOString(),
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(`Error handling timeout for user ${userId}:`, error);
    }
  }

  // Public methods for broadcasting notifications
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
    } else {
      this.logger.warn(
        `User ${userId} is not online, cannot send event ${event}`,
      );
    }
  }

  public broadcastToAll(event: string, data: unknown): void {
    this.server.emit(event, data);
  }

  public broadcastToUsers(
    userIds: string[],
    event: string,
    data: unknown,
  ): void {
    userIds.forEach((userId) => {
      this.sendToUser(userId, event, data);
    });
  }

  public emitWalletBalanceUpdated(data: {
    user_id: string;
    wallet_id: string;
    transaction_id: string;
    reference_code: string;
    amount: number;
    balance: number;
    deposit_balance: number;
    sale_balance: number;
    locked_balance: number;
    status: 'success';
    timestamp: string;
  }): void {
    this.sendToUser(data.user_id, SocketEvents.WALLET_BALANCE_UPDATED, {
      user_id: data.user_id,
      wallet_id: data.wallet_id,
      transaction_id: data.transaction_id,
      reference_code: data.reference_code,
      amount: data.amount,
      balance: data.balance,
      deposit_balance: data.deposit_balance,
      sale_balance: data.sale_balance,
      locked_balance: data.locked_balance,
      status: data.status,
      timestamp: data.timestamp,
    });
  }

  // Method to send new notification to specific users
  public async sendNewNotification(
    notification: NotificationSocketDto,
    userIds: string[],
  ): Promise<void> {
    if (userIds.length === 0) return;

    // Send to specific users
    this.broadcastToUsers(userIds, SocketEvents.NEW_NOTIFICATION, notification);

    // Update unread count for each user
    for (const userId of userIds) {
      if (this.isUserOnline(userId)) {
        const unreadCount =
          await this.notificationService.getUnreadCount(userId);
        this.sendToUser(userId, SocketEvents.UNREAD_COUNT, {
          unread_count: unreadCount.unread_count,
        });
      }
    }
  }

  // Method to send global notification to all online users
  public async sendGlobalNotification(
    notification: NotificationSocketDto,
  ): Promise<void> {
    // Broadcast to all connected users
    this.broadcastToAll(SocketEvents.GLOBAL_NOTIFICATION, notification);

    // Update unread count for all online users
    const onlineUserIds = Array.from(this.connectedUsers.keys());
    for (const userId of onlineUserIds) {
      const unreadCount = await this.notificationService.getUnreadCount(userId);
      this.sendToUser(userId, SocketEvents.UNREAD_COUNT, {
        unread_count: unreadCount.unread_count,
      });
    }
  }

  /**
   * Emit blog created notification to admin
   */
  emitBlogCreated(data: {
    blog_id: string;
    title: string;
    author_id: string;
    author_username: string;
    created_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('blog:created', {
      type: 'blog',
      title: data.notification_title,
      message: data.notification_message,
      link_url: BLOG_POSTS,
      notification_id: data.notification_id,
      data: {
        blog_id: data.blog_id,
        author_id: data.author_id,
        author_username: data.author_username,
        created_at: data.created_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit blog updated notification to admin
   */
  emitBlogUpdated(data: {
    blog_id: string;
    title: string;
    author_id: string;
    author_username: string;
    updated_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('blog:updated', {
      type: 'blog_updated',
      title: data.notification_title,
      message: data.notification_message,
      link_url: BLOG_POSTS,
      notification_id: data.notification_id,
      data: {
        blog_id: data.blog_id,
        title: data.title,
        author_id: data.author_id,
        author_username: data.author_username,
        updated_at: data.updated_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit blog status changed notification to user
   */
  emitBlogStatusChanged(data: {
    blog_id: string;
    title: string;
    author_id: string;
    old_status: string;
    new_status: string;
    approval_notes?: string;
    approved_by: string;
    approved_at: Date;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.author_id).emit('blog:status_changed', {
      type: 'blog_status_changed',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        blog_id: data.blog_id,
        title: data.title,
        old_status: data.old_status,
        new_status: data.new_status,
        approval_notes: data.approval_notes,
        approved_by: data.approved_by,
        approved_at: data.approved_at.toISOString(),
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit shop request created notification to admin
   */
  emitShopRequestCreated(data: {
    shop_request_id: string;
    user_id: string;
    bank_code?: string;
    bank_name?: string;
    bank_account_name?: string;
    created_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('shop_request:created', {
      type: 'shop',
      title: data.notification_title,
      message: data.notification_message,
      link_url: SHOPS,
      notification_id: data.notification_id,
      data: {
        shop_request_id: data.shop_request_id,
        user_id: data.user_id,
        bank_code: data.bank_code,
        bank_name: data.bank_name,
        bank_account_name: data.bank_account_name,
        created_at: data.created_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit shop request status changed notification to user
   */
  emitShopRequestStatusChanged(data: {
    shop_request_id: string;
    user_id: string;
    old_status: string;
    new_status: string;
    note?: string;
    admin_user_id: string;
    updated_at: string;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.user_id).emit('shop_request:status_changed', {
      type: 'shop',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        shop_request_id: data.shop_request_id,
        old_status: data.old_status,
        new_status: data.new_status,
        note: data.note,
        admin_user_id: data.admin_user_id,
        updated_at: data.updated_at,
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit withdraw request created notification to admin
   */
  emitWithdrawRequestCreated(data: {
    transaction_id: string;
    transaction_number: string;
    user_id: string;
    amount: number;
    bank_info: {
      bank_name: string;
      account_number: string;
      account_name: string;
    };
    created_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('withdraw_request:created', {
      type: 'wallet',
      title: data.notification_title,
      message: data.notification_message,
      link_url: WITHDRAWAL_REQUESTS,
      notification_id: data.notification_id,
      data: {
        transaction_id: data.transaction_id,
        transaction_number: data.transaction_number,
        user_id: data.user_id,
        amount: data.amount,
        bank_info: data.bank_info,
        created_at: data.created_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit withdraw status changed notification to user
   */
  emitWithdrawStatusChanged(data: {
    transaction_id: string;
    transaction_number: string;
    user_id: string;
    old_status: string;
    new_status: string;
    amount: number;
    bank_info?: {
      bank_name: string;
      account_number: string;
      account_name: string;
    };
    note?: string;
    admin_user_id: string;
    updated_at: string;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.user_id).emit('withdraw:status_changed', {
      type: 'wallet',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        transaction_id: data.transaction_id,
        transaction_number: data.transaction_number,
        old_status: data.old_status,
        new_status: data.new_status,
        amount: data.amount,
        bank_info: data.bank_info,
        note: data.note,
        admin_user_id: data.admin_user_id,
        updated_at: data.updated_at,
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit product created notification to admin
   */
  emitProductCreated(data: {
    product_id: string;
    name: string;
    shop_id: string;
    user_id: string;
    created_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('product:created', {
      type: 'product',
      title: data.notification_title,
      message: data.notification_message,
      link_url: PRODUCTS,
      notification_id: data.notification_id,
      data: {
        product_id: data.product_id,
        name: data.name,
        shop_id: data.shop_id,
        user_id: data.user_id,
        created_at: data.created_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit product updated notification to admin
   */
  emitProductUpdated(data: {
    product_id: string;
    name: string;
    shop_id: string;
    user_id: string;
    updated_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('product:updated', {
      type: 'product',
      title: data.notification_title,
      message: data.notification_message,
      link_url: PRODUCTS,
      notification_id: data.notification_id,
      data: {
        product_id: data.product_id,
        name: data.name,
        shop_id: data.shop_id,
        user_id: data.user_id,
        updated_at: data.updated_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit product status changed notification to user
   */
  emitProductStatusChanged(data: {
    product_id: string;
    shop_id: string;
    user_id: string;
    old_status: string;
    new_status: string;
    reason?: string;
    admin_user_id: string;
    updated_at: string;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.user_id).emit('product:status_changed', {
      type: 'product',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        product_id: data.product_id,
        shop_id: data.shop_id,
        old_status: data.old_status,
        new_status: data.new_status,
        reason: data.reason,
        admin_user_id: data.admin_user_id,
        updated_at: data.updated_at,
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit support contact created notification to admin
   */
  emitSupportContactCreated(data: {
    support_contact_id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    user_id?: string;
    created_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to admin namespace
    this.server.to('admin').emit('support_contact:created', {
      type: 'support',
      title: data.notification_title,
      message: data.notification_message,
      link_url: SUPPORT_EMAIL,
      notification_id: data.notification_id,
      data: {
        support_contact_id: data.support_contact_id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        user_id: data.user_id,
        created_at: data.created_at,
        hash: data.hash,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit blog liked notification to blog author
   */
  emitBlogLiked(data: {
    blog_id: string;
    title: string;
    author_id: string;
    user_id: string;
    like_count: number;
    updated_at: string;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.author_id).emit('blog:liked', {
      type: 'blog',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        blog_id: data.blog_id,
        title: data.title,
        user_id: data.user_id,
        is_liked: true,
        like_count: data.like_count,
        updated_at: data.updated_at,
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit blog comment added notification to blog author
   */
  emitBlogCommentAdded(data: {
    blog_id: string;
    title: string;
    author_id: string;
    comment_id: string;
    comment_author_id: string;
    comment_author_username: string;
    comment_content: string;
    is_reply: boolean;
    parent_comment_id?: string;
    created_at: string;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.author_id).emit('blog:comment_added', {
      type: 'blog',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        blog_id: data.blog_id,
        title: data.title,
        comment_id: data.comment_id,
        comment_author_id: data.comment_author_id,
        comment_author_username: data.comment_author_username,
        comment_content: data.comment_content,
        is_reply: data.is_reply,
        parent_comment_id: data.parent_comment_id,
        created_at: data.created_at,
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }

  /**
   * Emit blog comment reply added notification to parent comment author
   */
  emitBlogCommentReplyAdded(data: {
    blog_id: string;
    title: string;
    parent_comment_id: string;
    parent_comment_author_id: string;
    reply_id: string;
    reply_author_id: string;
    reply_author_username: string;
    reply_content: string;
    created_at: string;
    hash: string;
    link_url: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
  }): void {
    // Emit to specific user namespace
    this.server
      .to(data.parent_comment_author_id)
      .emit('blog:comment_reply_added', {
        type: 'blog',
        title: data.notification_title,
        message: data.notification_message,
        notification_id: data.notification_id,
        data: {
          blog_id: data.blog_id,
          title: data.title,
          parent_comment_id: data.parent_comment_id,
          reply_id: data.reply_id,
          reply_author_id: data.reply_author_id,
          reply_author_username: data.reply_author_username,
          reply_content: data.reply_content,
          created_at: data.created_at,
          hash: data.hash,
          link_url: data.link_url,
        },
        timestamp: data.notification_created_at,
      });
  }

  /**
   * Emit product review created notification to shop owner
   */
  emitProductReviewCreated(data: {
    product_id: string;
    product_name: string;
    shop_id: string;
    shop_owner_id: string;
    review_id: string;
    reviewer_id: string;
    rating: number;
    review_content: string;
    created_at: string;
    hash: string;
    notification_title: string;
    notification_message: string;
    notification_id: number;
    notification_created_at: string;
    link_url: string;
  }): void {
    // Emit to specific user namespace
    this.server.to(data.shop_owner_id).emit('product:review_created', {
      type: 'product',
      title: data.notification_title,
      message: data.notification_message,
      notification_id: data.notification_id,
      data: {
        product_id: data.product_id,
        product_name: data.product_name,
        shop_id: data.shop_id,
        review_id: data.review_id,
        reviewer_id: data.reviewer_id,
        rating: data.rating,
        review_content: data.review_content,
        created_at: data.created_at,
        hash: data.hash,
        link_url: data.link_url,
      },
      timestamp: data.notification_created_at,
    });
  }
}
