import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import {
  GetNotificationsInputDto,
  GetNotificationsOutputDto,
} from './dto/get-notifications.dto';
import { GetSystemNotificationsInputDto } from './dto/get-system-notifications.dto';
import {
  CreateNotificationInputDto,
  CreateNotificationOutputDto,
} from './dto/create-notification.dto';
import {
  MarkNotificationReadInputDto,
  MarkNotificationReadOutputDto,
} from './dto/mark-read.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotifications(
    userId: string,
    params: GetNotificationsInputDto,
  ): Promise<GetNotificationsOutputDto> {
    const { items, total } =
      await this.notificationRepository.findNotificationsByUserId(
        userId,
        params,
      );

    const { page = 1, take: pageSize = 20 } = params;

    // Get unread count
    const unreadCount =
      await this.notificationRepository.getUnreadCount(userId);

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

  async getSystemNotifications(
    params: GetSystemNotificationsInputDto,
  ): Promise<GetNotificationsOutputDto> {
    const { items, total } =
      await this.notificationRepository.findSystemNotifications(params);

    const { page = 1, pageRow: pageSize = 10 } = params;

    const unreadCount = total;

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
    createDto: CreateNotificationInputDto,
    createdBy: string,
  ): Promise<CreateNotificationOutputDto> {
    // Create the notification
    const notification = await this.notificationRepository.createNotification(
      createDto,
      createdBy,
    );

    let usersNotified = 0;

    if (createDto.is_global) {
      // Create user notifications for all users
      const userNotifications =
        await this.notificationRepository.createGlobalUserNotifications(
          notification.id,
        );
      usersNotified = userNotifications.length;
    } else if (createDto.user_ids && createDto.user_ids.length > 0) {
      // Create user notifications for specific users
      const userNotifications =
        await this.notificationRepository.createUserNotifications(
          notification.id,
          createDto.user_ids,
        );
      usersNotified = userNotifications.length;
    } else {
      throw new BadRequestException(
        'Either is_global must be true or user_ids must be provided',
      );
    }

    return {
      id: notification.id,
      type: notification.type as CreateNotificationOutputDto['type'],
      title: notification.title,
      message: notification.message,
      link_url: notification.link_url,
      is_global: notification.is_global,
      target_audience: notification.target_audience as 'admin' | 'user' | 'all',
      users_notified: usersNotified,
      created_at: notification.created_at,
    };
  }

  async markNotificationAsRead(
    userId: string,
    markReadDto: MarkNotificationReadInputDto,
  ): Promise<MarkNotificationReadOutputDto> {
    const markedCount =
      await this.notificationRepository.markNotificationAsRead(
        userId,
        markReadDto.notification_id,
      );

    // Get updated unread count
    const unreadCount =
      await this.notificationRepository.getUnreadCount(userId);

    return {
      success: true,
      unread_count: unreadCount,
      marked_count: markedCount,
    };
  }

  async markAllNotificationsAsRead(
    userId: string,
  ): Promise<MarkNotificationReadOutputDto> {
    const markedCount =
      await this.notificationRepository.markNotificationAsRead(userId);

    // Get updated unread count
    const unreadCount =
      await this.notificationRepository.getUnreadCount(userId);

    return {
      success: true,
      unread_count: unreadCount,
      marked_count: markedCount,
    };
  }

  async getUnreadCount(userId: string): Promise<{ unread_count: number }> {
    const unreadCount =
      await this.notificationRepository.getUnreadCount(userId);

    return { unread_count: unreadCount };
  }

  async getLatestSystemNotifications(limit: number = 10): Promise<{
    notifications: {
      id: number;
      type: string;
      title: string;
      message: string;
      link_url?: string;
      slug?: string;
      thumbnail_url?: string;
      created_at: string;
    }[];
    total: number;
    limit: number;
  }> {
    const results =
      await this.notificationRepository.findLatestSystemNotifications(limit);

    const notifications = results.map((result) => ({
      id: result.id,
      type: result.type,
      title: result.title,
      message: result.message,
      link_url: result.link_url || undefined,
      slug: result.slug || undefined,
      thumbnail_url: result.thumbnail_url || undefined,
      created_at: new Date(result.created_at).toISOString(),
    }));

    return {
      notifications,
      total: notifications.length,
      limit,
    };
  }

  async getNotificationById(notificationId: number): Promise<{
    notification: {
      id: number;
      type: string;
      title: string;
      message: string;
      link_url?: string;
      slug?: string;
      thumbnail_url?: string;
      is_global: boolean;
      target_audience: string;
      created_at: string;
    } | null;
    found: boolean;
  }> {
    const result =
      await this.notificationRepository.findNotificationById(notificationId);

    if (!result) {
      return {
        notification: null,
        found: false,
      };
    }

    const notification = {
      id: result.id,
      type: result.type,
      title: result.title,
      message: result.message,
      link_url: result.link_url || undefined,
      slug: result.slug || undefined,
      thumbnail_url: result.thumbnail_url || undefined,
      is_global: result.is_global,
      target_audience: result.target_audience,
      created_at: new Date(result.created_at).toISOString(),
    };

    return {
      notification,
      found: true,
    };
  }

  async getNotificationBySlug(slug: string): Promise<{
    id: number;
    type: string;
    title: string;
    message: string;
    link_url?: string;
    slug?: string;
    thumbnail_url?: string;
    is_global: boolean;
    target_audience: string;
    created_at: string;
  }> {
    const result =
      await this.notificationRepository.findNotificationBySlug(slug);

    if (!result) {
      throw new NotFoundException(`Notification with slug ${slug} not found`);
    }

    return {
      id: result.id,
      type: result.type,
      title: result.title,
      message: result.message,
      link_url: result.link_url || undefined,
      slug: result.slug || undefined,
      thumbnail_url: result.thumbnail_url || undefined,
      is_global: result.is_global,
      target_audience: result.target_audience,
      created_at: new Date(result.created_at).toISOString(),
    };
  }
}
