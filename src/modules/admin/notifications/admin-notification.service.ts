import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { AdminNotificationRepository } from './admin-notification.repository';
import { NotificationGateway } from '@/modules/user/notification/notification.gateway';
import { AdminUsersService } from '@/modules/admin/users/admin-users.service';
import {
  GetAdminNotificationsInputDto,
  GetAdminNotificationsOutputDto,
} from './dto/get-admin-notifications.dto';
import {
  CreateAdminNotificationInputDto,
  CreateAdminNotificationOutputDto,
} from './dto/create-admin-notification.dto';
import {
  MarkAdminNotificationReadInputDto,
  MarkAdminNotificationReadOutputDto,
} from './dto/mark-admin-notification-read.dto';
import {
  SendUserNotificationInputDto,
  SendUserNotificationOutputDto,
} from './dto/send-user-notification.dto';
import {
  EditNotificationInputDto,
  EditNotificationOutputDto,
} from './dto/edit-notification.dto';
import { AdminNotificationType } from './admin-notification.constants';
import { MAX_CONTENT_LENGTH } from '@/shared/constants/blog.constants';
import { stripHtml } from '@/shared/utils';
import { UserTelegramService } from '@/modules/user/telegram/telegram.service';
import { ConfigService } from '@nestjs/config';

type AdminTelegramTopicGroup =
  | 'blog'
  | 'product'
  | 'shop'
  | 'withdraw'
  | 'proxy';
type AdminTelegramTopicConfig = Record<AdminTelegramTopicGroup, number>;
type AdminTelegramCategoryMeta = {
  key: AdminTelegramTopicGroup;
  label: string;
  icon: string;
  hashtag: string;
};

@Injectable()
export class AdminNotificationService {
  private readonly logger = new Logger(AdminNotificationService.name);
  private readonly adminTelegramTopicMap: Partial<AdminTelegramTopicConfig>;
  private readonly adminTelegramChatId: string | null;

  constructor(
    private readonly adminNotificationRepository: AdminNotificationRepository,
    private readonly notificationGateway: NotificationGateway,
    private readonly adminUsersService: AdminUsersService,
    private readonly userTelegramService: UserTelegramService,
    private readonly configService: ConfigService,
  ) {
    this.adminTelegramTopicMap = this.parseAdminTelegramTopicMap(
      this.configService.get<string>('TELEGRAM_ADMIN_TOPIC_MAP'),
    );
    this.adminTelegramChatId = this.parseAdminTelegramChatId(
      this.configService.get<string>('TELEGRAM_ADMIN_CHAT_ID'),
    );
  }

  private async getUserName(userId: string): Promise<string> {
    try {
      const user = await this.adminUsersService.findUserById(userId);
      return user?.username || user?.full_name || userId;
    } catch (error) {
      this.logger.warn(
        `Failed to get user name for ID ${userId}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return userId;
    }
  }

  async getNotifications(
    params: GetAdminNotificationsInputDto,
    userId: string,
  ): Promise<GetAdminNotificationsOutputDto> {
    const { items, total } =
      await this.adminNotificationRepository.findAllAdminNotifications(
        params,
        userId,
      );

    const { page = 1, pageRow: pageSize = 20 } = params;

    // Get total unread count for all admin notifications
    const unreadCount =
      await this.adminNotificationRepository.getAdminUnreadCount(userId);

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
      },
      unread_count: unreadCount,
    };
  }

  async createNotification(
    createDto: CreateAdminNotificationInputDto,
    createdBy: string | null,
  ): Promise<CreateAdminNotificationOutputDto> {
    // Create the notification
    const notification =
      await this.adminNotificationRepository.createAdminNotification(
        createDto,
        createdBy,
      );

    let adminUsersNotified = 0;
    let adminUserNotifications: Array<{ user_id: string }> = [];

    if (createDto.admin_user_ids && createDto.admin_user_ids.length > 0) {
      // Create user notifications for specific admin users
      const userNotifications =
        await this.adminNotificationRepository.createAdminUserNotifications(
          notification.id,
          createDto.admin_user_ids,
        );
      adminUsersNotified = userNotifications.length;
      adminUserNotifications = userNotifications;
    } else {
      // Create user notifications for all admin users
      const userNotifications =
        await this.adminNotificationRepository.createAllAdminUserNotifications(
          notification.id,
        );
      adminUsersNotified = userNotifications.length;
      adminUserNotifications = userNotifications;
    }

    try {
      const adminUserIds = adminUserNotifications.map((row) => row.user_id);
      const category = this.resolveAdminTelegramCategory(
        notification.type as AdminNotificationType,
        notification.related_entity_type,
      );
      const button = this.userTelegramService.buildInlineButton(
        'Mở trang quản trị',
        notification.link_url || undefined,
      );
      const message = this.buildAdminQueueTelegramMessage({
        title: notification.title,
        message: notification.message,
        category,
        includeAction: !button,
      });
      const telegramOptions = {
        parse_mode: 'HTML' as const,
        disable_preview: true,
        reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
        message_thread_id: category
          ? this.adminTelegramTopicMap[category.key]
          : undefined,
      };

      if (this.adminTelegramChatId) {
        await this.userTelegramService.notifyChat(
          this.adminTelegramChatId,
          message,
          telegramOptions,
        );
      } else if (adminUserIds.length > 0) {
        await this.userTelegramService.notifyUsers(
          adminUserIds,
          'admin_notification',
          message,
          telegramOptions,
        );
      }
    } catch (error) {
      this.logger.warn(
        `Failed to send Telegram notifications to admins: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    return {
      id: notification.id,
      type: notification.type as CreateAdminNotificationOutputDto['type'],
      title: notification.title,
      message: notification.message,
      link_url: notification.link_url,
      target_audience: notification.target_audience,
      admin_users_notified: adminUsersNotified,
      created_at: notification.created_at,
    };
  }

  async markNotificationAsRead(
    userId: string,
    markReadDto: MarkAdminNotificationReadInputDto,
  ): Promise<MarkAdminNotificationReadOutputDto> {
    const markedCount =
      await this.adminNotificationRepository.markAdminNotificationAsRead(
        userId,
        markReadDto.notification_id,
      );

    // Log admin notification read action for tracking
    if (markedCount > 0) {
      const userName = await this.getUserName(userId);
      this.logger.log(
        `Admin ${userName} marked notification ${markReadDto.notification_id} as read`,
      );
    }

    // Get updated unread count
    const unreadCount =
      await this.adminNotificationRepository.getAdminUnreadCount(userId);

    return {
      success: true,
      unread_count: unreadCount,
      marked_count: markedCount,
    };
  }

  async markAllNotificationsAsRead(
    userId: string,
  ): Promise<MarkAdminNotificationReadOutputDto> {
    const markedCount =
      await this.adminNotificationRepository.markAdminNotificationAsRead(
        userId,
      );

    // Log admin mark all notifications as read action for tracking
    if (markedCount > 0) {
      const userName = await this.getUserName(userId);
      this.logger.log(
        `Admin (${userName}) marked ${markedCount} notifications as read`,
      );
    }

    // Get updated unread count
    const unreadCount =
      await this.adminNotificationRepository.getAdminUnreadCount(userId);

    return {
      success: true,
      unread_count: unreadCount,
      marked_count: markedCount,
    };
  }

  async markNotificationsAsReadByRelatedEntity(
    userId: string,
    relatedEntityType: string,
    relatedEntityId: string,
  ): Promise<number> {
    return await this.adminNotificationRepository.markNotificationsAsReadByRelatedEntity(
      userId,
      relatedEntityType,
      relatedEntityId,
    );
  }

  async deleteNotification(
    userId: string,
    notificationId: number,
  ): Promise<{ success: boolean }> {
    // Soft delete the notification by setting deleted_at and deleted_by
    const deleted =
      await this.adminNotificationRepository.deleteAdminNotification(
        userId,
        notificationId,
      );

    if (!deleted) {
      throw new BadRequestException('Notification not found or access denied');
    }

    // Log admin notification deletion for tracking
    const userName = await this.getUserName(userId);
    this.logger.log(`Admin ${userName} deleted notification ${notificationId}`);

    return { success: true };
  }

  async getUnreadCount(userId: string): Promise<{ unread_count: number }> {
    const unreadCount =
      await this.adminNotificationRepository.getAdminUnreadCount(userId);

    return { unread_count: unreadCount };
  }

  async sendUserNotification(
    sendDto: SendUserNotificationInputDto,
    createdBy: string | null,
  ): Promise<SendUserNotificationOutputDto> {
    // Validate content length without HTML tags
    const plainContent = (stripHtml as (content: string) => string)(
      sendDto.message,
    );
    if (plainContent.length > MAX_CONTENT_LENGTH) {
      throw new BadRequestException(
        `Content cannot exceed ${MAX_CONTENT_LENGTH} characters (excluding HTML tags)`,
      );
    }
    // Create the notification
    const notification =
      await this.adminNotificationRepository.createUserNotification(
        sendDto,
        createdBy,
      );

    let usersNotified = 0;
    let targetUserIds: string[] = [];
    let userNotificationRows: Array<{ user_id: string }> = [];

    if (sendDto.user_ids && sendDto.user_ids.length > 0) {
      // Create user notifications for specific users
      const userNotifications =
        await this.adminNotificationRepository.createUserNotifications(
          notification.id,
          sendDto.user_ids,
        );
      usersNotified = userNotifications.length;
      targetUserIds = sendDto.user_ids;
      userNotificationRows = userNotifications;
    } else {
      // Create user notifications for all verified and unblocked users
      const userNotifications =
        await this.adminNotificationRepository.createAllVerifiedUserNotifications(
          notification.id,
        );
      usersNotified = userNotifications.length;
      // For global notifications, we'll broadcast to all users
      targetUserIds = [];
      userNotificationRows = userNotifications;
    }

    // Emit real-time notification to users
    try {
      if (targetUserIds.length > 0) {
        // Send to specific users
        this.notificationGateway.broadcastToUsers(
          targetUserIds,
          'admin_notification',
          {
            type: notification.type,
            title: notification.title,
            message: notification.message,
            notification_id: notification.id,
            data: {
              link_url: notification.link_url,
              created_at: notification.created_at.toISOString(),
            },
            timestamp: new Date().toISOString(),
          },
        );
      } else {
        this.notificationGateway.broadcastToAll('admin_notification', {
          type: notification.type,
          title: notification.title,
          message: notification.message,
          notification_id: notification.id,
          data: {
            link_url: notification.link_url,
            created_at: notification.created_at.toISOString(),
          },
          timestamp: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to emit user notification:', error);
      // Don't fail the operation if emit fails
    }

    try {
      const button = this.userTelegramService.buildInlineButton(
        'Xem thông báo',
        notification.link_url || undefined,
      );
      const telegramText = this.buildAdminTelegramMessage(
        notification.title,
        notification.message,
        !button,
      );
      const telegramTargets =
        targetUserIds.length > 0
          ? targetUserIds
          : userNotificationRows.map((row) => row.user_id);

      await this.userTelegramService.notifyUsers(
        telegramTargets,
        'admin_notification',
        telegramText,
        {
          parse_mode: 'HTML',
          disable_preview: true,
          reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
        },
      );
    } catch (error) {
      this.logger.warn(
        `Failed to send Telegram admin notifications: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    return {
      id: notification.id,
      type: notification.type as SendUserNotificationOutputDto['type'],
      title: notification.title,
      message: notification.message,
      link_url: notification.link_url,
      target_audience: notification.target_audience,
      users_notified: usersNotified,
      created_at: notification.created_at,
    };
  }

  async editNotification(
    notificationId: number,
    editDto: EditNotificationInputDto,
    userId: string,
  ): Promise<EditNotificationOutputDto> {
    // Step 1: Create new global notification using createUserNotification
    const createDto: CreateAdminNotificationInputDto = {
      type: editDto.type,
      title: editDto.title,
      message: editDto.message,
      link_url: editDto.link_url,
      related_entity_type: 'notification',
      related_entity_id: notificationId.toString(),
    };

    const newNotification =
      await this.adminNotificationRepository.createUserNotification(
        createDto,
        userId,
      );

    // Step 2: Soft delete the old notification
    const oldNotificationDeleted =
      await this.adminNotificationRepository.deleteAdminNotification(
        userId,
        notificationId,
      );

    if (!oldNotificationDeleted) {
      throw new BadRequestException(
        'Old notification not found or access denied',
      );
    }

    // Step 3: Create user notifications for all verified users (like sendUserNotification does)
    const userNotifications =
      await this.adminNotificationRepository.createAllVerifiedUserNotifications(
        newNotification.id,
      );

    // Step 4: Emit event to all users (global notification)
    try {
      this.notificationGateway.broadcastToAll('admin_notification', {
        type: newNotification.type,
        title: newNotification.title,
        message: newNotification.message,
        notification_id: newNotification.id,
        data: {
          link_url: newNotification.link_url,
          created_at: newNotification.created_at.toISOString(),
          is_edit: true,
          original_notification_id: notificationId,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error('Failed to emit edited notification:', error);
      // Don't fail the operation if emit fails
    }

    try {
      const button = this.userTelegramService.buildInlineButton(
        'Xem thông báo',
        newNotification.link_url || undefined,
      );
      const telegramText = this.buildAdminTelegramMessage(
        newNotification.title,
        newNotification.message,
        !button,
      );
      await this.userTelegramService.notifyUsers(
        userNotifications.map((row) => row.user_id),
        'admin_notification',
        telegramText,
        {
          parse_mode: 'HTML',
          disable_preview: true,
          reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
        },
      );
    } catch (error) {
      this.logger.warn(
        `Failed to send Telegram admin notifications: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }

    // Log admin notification edit action for tracking
    const userName = await this.getUserName(userId);
    this.logger.log(
      `Admin ${userName} edited notification ${notificationId} -> ${newNotification.id}`,
    );

    return {
      success: true,
      new_notification_id: newNotification.id,
      old_notification_id: notificationId,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type as AdminNotificationType,
      created_at: newNotification.created_at.toISOString(),
    };
  }

  async sendProxyOrderPurchasedAlert(params: {
    orderId: string;
    userId: string;
    userName?: string | null;
    userEmail?: string | null;
    mappedWebshareEmail?: string | null;
    productName: string;
    optionName?: string | null;
    billingCycle: string;
    amountTotalVnd: number;
    quantity?: number | null;
    bandwidthGb?: number | null;
    proxyCountries?: Record<string, number> | null;
    provisioningAction?: 'new_purchase' | 'update';
  }): Promise<void> {
    const proxyCountriesLine = this.formatProxyCountriesForTelegram(
      params.proxyCountries,
    );
    const isUpdate = params.provisioningAction === 'update';
    await this.sendProxyOrderTopicMessage({
      title: isUpdate ? 'Cập nhật gói' : 'Đơn proxy mới',
      hashtag: '#don_proxy_moi',
      lines: [
        `<b>Mã đơn:</b> <code>${this.userTelegramService.escapeHtml(
          params.orderId,
        )}</code>`,
        params.userEmail
          ? `<b>Email user:</b> <code>${this.userTelegramService.escapeHtml(
              params.userEmail,
            )}</code>`
          : null,
        `<b>Người mua:</b> ${this.userTelegramService.escapeHtml(
          params.userName || params.userEmail || params.userId,
        )}`,
        `<b>Tài khoản Webshare:</b> <code>${this.userTelegramService.escapeHtml(
          params.mappedWebshareEmail || 'Chưa gán',
        )}</code>`,
        `<b>Loại xử lý:</b> ${this.userTelegramService.escapeHtml(
          isUpdate ? 'Cập nhật gói' : 'Mua mới',
        )}`,
        null,
        `<b>Tên gói:</b> ${this.userTelegramService.escapeHtml(
          params.productName,
        )}`,
        params.optionName
          ? `<b>Option:</b> ${this.userTelegramService.escapeHtml(
              params.optionName,
            )}`
          : null,
        params.quantity != null && params.quantity > 0
          ? `<b>Số lượng:</b> ${this.userTelegramService.escapeHtml(
              String(params.quantity),
            )}`
          : null,
        params.bandwidthGb != null && params.bandwidthGb >= 0
          ? `<b>Băng thông:</b> ${this.userTelegramService.escapeHtml(
              params.bandwidthGb === 0
                ? 'Không giới hạn'
                : `${params.bandwidthGb} GB`,
            )}`
          : null,
        `<b>Quốc gia:</b> ${this.userTelegramService.escapeHtml(
          proxyCountriesLine,
        )}`,
        `<b>Giá:</b> ${this.userTelegramService.escapeHtml(
          this.formatCurrencyVnd(params.amountTotalVnd),
        )}`,
        `<b>Chu kỳ:</b> ${this.userTelegramService.escapeHtml(
          this.formatBillingCycle(params.billingCycle),
        )}`,
        null,
        'Đơn đã ghi nhận thành công và đang chờ xử lý.',
      ],
    });
  }

  private formatProxyCountriesForTelegram(
    countries?: Record<string, number> | null,
  ): string {
    if (!countries || typeof countries !== 'object') {
      return 'Ngẫu nhiên (Pool)';
    }

    const entries = Object.entries(countries)
      .map(([rawCode, rawQty]) => ({
        code: String(rawCode ?? '')
          .trim()
          .toUpperCase(),
        qty: Math.trunc(Number(rawQty)),
      }))
      .filter(
        (item) => /^[A-Z]{2}$/.test(item.code) && Number.isFinite(item.qty) && item.qty > 0,
      )
      .sort((a, b) => {
        if (a.code === 'ZZ') return -1;
        if (b.code === 'ZZ') return 1;
        if (b.qty !== a.qty) return b.qty - a.qty;
        return a.code.localeCompare(b.code);
      });

    if (!entries.length) {
      return 'Ngẫu nhiên (Pool)';
    }

    return entries
      .map((item) =>
        item.code === 'ZZ' ? `Ngẫu nhiên: ${item.qty}` : `${item.code}: ${item.qty}`,
      )
      .join(' | ');
  }

  async sendProxyOrderActivatedAlert(params: {
    orderId: string;
    userId: string;
    userName?: string | null;
    userEmail?: string | null;
    mappedWebshareEmail?: string | null;
    productName: string;
    expiresAt?: Date | string | null;
  }): Promise<void> {
    await this.sendProxyOrderTopicMessage({
      icon: '✅',
      title: 'Đơn proxy đã xử lý xong',
      hashtag: '#don_proxy_hoan_tat',
      lines: [
        `<b>Mã đơn:</b> <code>${this.userTelegramService.escapeHtml(
          params.orderId,
        )}</code>`,
        params.userEmail
          ? `<b>Email user:</b> <code>${this.userTelegramService.escapeHtml(
              params.userEmail,
            )}</code>`
          : null,
        `<b>Dịch vụ:</b> ${this.userTelegramService.escapeHtml(
          params.productName,
        )}`,
      ],
    });
  }

  private buildAdminTelegramMessage(
    title: string,
    message: string,
    includeAction: boolean,
  ): string {
    const plainMessage = (stripHtml as (content: string) => string)(
      message,
    ).trim();
    const preview =
      plainMessage.length > 300
        ? `${plainMessage.slice(0, 297)}...`
        : plainMessage;

    const lines = [
      '🔔 <b>Thông báo từ Admin</b>',
      '----------------------',
      `🏷️ <b>Tiêu đề:</b> ${this.userTelegramService.escapeHtml(title)}`,
      `📝 <b>Nội dung:</b> ${this.userTelegramService.escapeHtml(
        preview || 'Bạn có một thông báo mới từ Admin.',
      )}`,
    ];

    if (includeAction) {
      lines.push('👉 Mở bachhoammo để xem chi tiết.');
    }

    return lines.join('\n');
  }

  private parseAdminTelegramTopicMap(
    raw?: string,
  ): Partial<AdminTelegramTopicConfig> {
    if (!raw) {
      return {};
    }

    try {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const map: Partial<AdminTelegramTopicConfig> = {};

      const blog = this.normalizeThreadId(parsed.blog);
      const product = this.normalizeThreadId(parsed.product);
      const shop = this.normalizeThreadId(parsed.shop);
      const withdraw =
        this.normalizeThreadId(parsed.withdraw) ??
        this.normalizeThreadId(parsed.wallet);
      const proxy = this.normalizeThreadId(parsed.proxy);

      if (blog != null) map.blog = blog;
      if (product != null) map.product = product;
      if (shop != null) map.shop = shop;
      if (withdraw != null) map.withdraw = withdraw;
      if (proxy != null) map.proxy = proxy;

      return map;
    } catch (error) {
      this.logger.warn(
        `Invalid TELEGRAM_ADMIN_TOPIC_MAP config: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      return {};
    }
  }

  private normalizeThreadId(value: unknown): number | null {
    if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
      return value;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed) {
        return null;
      }

      const parsed = Number(trimmed);
      if (Number.isInteger(parsed) && parsed > 0) {
        return parsed;
      }
    }

    return null;
  }

  private parseAdminTelegramChatId(raw?: string): string | null {
    if (!raw) {
      return null;
    }

    const trimmed = raw.trim();
    if (!trimmed) {
      return null;
    }

    if (!/^-?\d+$/.test(trimmed)) {
      this.logger.warn(`Invalid TELEGRAM_ADMIN_CHAT_ID config: ${trimmed}`);
      return null;
    }

    return trimmed;
  }

  private resolveAdminTelegramCategory(
    notificationType: AdminNotificationType,
    relatedEntityType?: string,
  ): AdminTelegramCategoryMeta | null {
    const type = String(notificationType || '').toLowerCase();
    const related = String(relatedEntityType || '').toLowerCase();

    if (type === 'blog' || related === 'blog') {
      return {
        key: 'blog',
        label: 'Bài viết',
        icon: '📝',
        hashtag: '#bai_viet',
      };
    }

    if (type === 'product' || related === 'product') {
      return {
        key: 'product',
        label: 'Sản phẩm',
        icon: '📦',
        hashtag: '#san_pham',
      };
    }

    if (type === 'shop' || related === 'shop') {
      return {
        key: 'shop',
        label: 'Cửa hàng',
        icon: '🏬',
        hashtag: '#cua_hang',
      };
    }

    if (
      type === 'wallet' ||
      related === 'wallet' ||
      related === 'withdraw' ||
      related === 'withdrawal'
    ) {
      return {
        key: 'withdraw',
        label: 'Rút tiền',
        icon: '💸',
        hashtag: '#rut_tien',
      };
    }

    return null;
  }

  private buildAdminQueueTelegramMessage(params: {
    title: string;
    message: string;
    category: AdminTelegramCategoryMeta | null;
    includeAction: boolean;
  }): string {
    const plainMessage = (stripHtml as (content: string) => string)(
      params.message,
    ).trim();
    const preview =
      plainMessage.length > 300
        ? `${plainMessage.slice(0, 297)}...`
        : plainMessage;
    const category = params.category;
    const timestamp = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });

    const lines = [
      `<b>Thông báo quản trị</b>`,
      `<b>Danh mục:</b> ${this.userTelegramService.escapeHtml(
        category?.label || 'Khác',
      )}`,
      `<b>Tiêu đề:</b> ${this.userTelegramService.escapeHtml(params.title)}`,
      `<b>Nội dung:</b> ${this.userTelegramService.escapeHtml(
        preview || 'Có thông báo mới cần kiểm tra.',
      )}`,
      `<b>Thời gian:</b> ${this.userTelegramService.escapeHtml(timestamp)}`,
      category?.hashtag || '#thong_bao_admin',
    ];

    if (params.includeAction) {
      lines.push('Xem chi tiết trong trang quản trị.');
    }

    return lines.join('\n');
  }

  private async sendProxyOrderTopicMessage(params: {
    icon?: string;
    title: string;
    hashtag: string;
    lines: Array<string | null>;
  }): Promise<void> {
    if (!this.adminTelegramChatId || !this.adminTelegramTopicMap.proxy) {
      return;
    }

    const body = [
      `${params.icon ?? '🧾'} <b>${this.userTelegramService.escapeHtml(
        params.title,
      )}</b>`,
      ...params.lines.filter(Boolean),
      params.hashtag,
    ].join('\n');

    try {
      await this.userTelegramService.notifyChat(
        this.adminTelegramChatId,
        body,
        {
          parse_mode: 'HTML',
          disable_preview: true,
          message_thread_id: this.adminTelegramTopicMap.proxy,
          allow_topic_fallback: false,
        },
      );
    } catch (error) {
      this.logger.warn(
        `Failed to send proxy order Telegram alert: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  private formatBillingCycle(value: string): string {
    const normalized = String(value || '')
      .trim()
      .toLowerCase();
    return normalized === 'yearly' || normalized === 'annual'
      ? 'Theo năm'
      : 'Theo tháng';
  }

  private formatCurrencyVnd(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(Number.isFinite(amount) ? amount : 0);
  }

  private formatDateTime(value: Date | string): string {
    const date = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
    });
  }
}
