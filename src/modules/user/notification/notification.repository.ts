import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { DatabaseService } from '@/database/database.service';
import {
  Notification,
  NotificationType,
} from '@/database/entities/notification.entity';
import {
  GetNotificationsInputDto,
  NotificationDto,
} from './dto/get-notifications.dto';
import { GetSystemNotificationsInputDto } from './dto/get-system-notifications.dto';
import { CreateNotificationInputDto } from './dto/create-notification.dto';
import { NOTIFICATION_CONSTANTS } from './notification.constants';
import {
  NotificationWithStatusQueryResult,
  NotificationInsertResult,
  UserNotificationInsertResult,
} from './notification.types';

interface SystemNotificationQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url: string | null;
  slug: string | null;
  thumbnail_url: string | null;
  is_global: boolean;
  target_audience: string;
  created_at: string;
}

@Injectable()
export class NotificationRepository extends BaseRepository<Notification> {
  private readonly logger = new Logger(NotificationRepository.name);

  constructor(private readonly databaseService: DatabaseService) {
    super('notifications');
  }

  async findNotificationsByUserId(
    userId: string,
    params: GetNotificationsInputDto,
  ): Promise<{ items: NotificationDto[]; total: number }> {
    const {
      page = 1,
      take: pageSize = NOTIFICATION_CONSTANTS.DEFAULT_PAGE_SIZE,
      type,
      is_read,
      is_global,
    } = params;
    const offset = (page - 1) * pageSize;

    let query = this.qb
      .select([
        'n.id',
        'n.type',
        'n.title',
        'n.message',
        'n.link_url',
        'n.is_global',
        'n.target_audience',
        'n.created_by',
        'n.created_at',
        'un.is_read',
        'un.read_at',
      ])
      .from('notifications as n')
      .leftJoin('user_notifications as un', 'n.id', 'un.notification_id')
      .where('un.user_id', userId)
      .whereNull('n.deleted_at');

    // Apply filters
    if (type) {
      query = query.where('n.type', type);
    }

    if (is_read !== undefined) {
      query = query.where('un.is_read', is_read);
    }

    if (is_global !== undefined) {
      query = query.where('n.is_global', is_global);
    }

    if (params.target_audience) {
      query = query.where('n.target_audience', params.target_audience);
    }

    // Get total count
    const countQuery = this.qb
      .from('notifications as n')
      .leftJoin('user_notifications as un', 'n.id', 'un.notification_id')
      .where('un.user_id', userId)
      .whereNull('n.deleted_at');

    if (type) {
      countQuery.where('n.type', type);
    }
    if (is_read !== undefined) {
      countQuery.where('un.is_read', is_read);
    }
    if (is_global !== undefined) {
      countQuery.where('n.is_global', is_global);
    }
    if (params.target_audience) {
      countQuery.where('n.target_audience', params.target_audience);
    }

    const totalResult =
      await countQuery.countDistinct<{ total: string }[]>('n.id as total');
    const total = parseInt(totalResult[0]?.total ?? '0', 10);

    // Get paginated results
    const results = await query
      .groupBy([
        'n.id',
        'n.type',
        'n.title',
        'n.message',
        'n.link_url',
        'n.is_global',
        'n.target_audience',
        'n.created_by',
        'n.created_at',
        'un.is_read',
        'un.read_at',
      ])
      .orderBy('n.created_at', 'desc') // Sort by creation date (newest first)
      .limit(pageSize)
      .offset(offset);

    const items = results.map((result: NotificationWithStatusQueryResult) =>
      this.mapToDto(result),
    );

    return { items, total };
  }

  async createNotification(
    createDto: CreateNotificationInputDto,
    createdBy: string,
  ): Promise<NotificationInsertResult> {
    const [result] = (await this.qb
      .insert({
        type: createDto.type,
        title: createDto.title,
        message: createDto.message,
        link_url: createDto.link_url,
        is_global: createDto.is_global || false,
        target_audience: createDto.target_audience || 'user',
        created_by: createdBy,
        created_at: new Date(),
      })
      .into('notifications')
      .returning([
        'id',
        'type',
        'title',
        'message',
        'link_url',
        'is_global',
        'target_audience',
        'created_by',
        'created_at',
      ])) as NotificationInsertResult[];

    return result;
  }

  async createUserNotifications(
    notificationId: number,
    userIds: string[],
  ): Promise<UserNotificationInsertResult[]> {
    if (userIds.length === 0) return [];

    // Filter out locked users before creating notifications
    const unlockedUsers = (await this.qb
      .select('id')
      .from('users')
      .whereIn('id', userIds)
      .where('is_locked', false)) as { id: string }[];

    if (unlockedUsers.length === 0) return [];

    const userNotifications = unlockedUsers.map((u) => ({
      notification_id: notificationId,
      user_id: u.id,
      is_read: NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
      created_at: new Date(),
    }));

    const results = (await this.qb
      .insert(userNotifications)
      .into('user_notifications')
      .onConflict(['notification_id', 'user_id'])
      .ignore()
      .returning([
        'id',
        'notification_id',
        'user_id',
        'is_read',
        'created_at',
      ])) as UserNotificationInsertResult[];

    return results;
  }

  async createGlobalUserNotifications(
    notificationId: number,
  ): Promise<UserNotificationInsertResult[]> {
    // Get all unlocked user IDs from users table
    const users = (await this.qb
      .select('id')
      .from('users')
      .where('is_locked', false)) as { id: string }[];

    if (users.length === 0) return [];

    const userNotifications = users.map((u) => ({
      notification_id: notificationId,
      user_id: u.id,
      is_read: NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
      created_at: new Date(),
    }));

    const results = (await this.qb
      .insert(userNotifications)
      .into('user_notifications')
      .onConflict(['notification_id', 'user_id'])
      .ignore()
      .returning([
        'id',
        'notification_id',
        'user_id',
        'is_read',
        'created_at',
      ])) as UserNotificationInsertResult[];

    return results;
  }

  async markNotificationAsRead(
    userId: string,
    notificationId?: number,
  ): Promise<number> {
    const result = (await this.qb
      .table('user_notifications')
      .update({
        is_read: true,
        read_at: new Date(),
      })
      .where('user_id', userId)
      .modify((qb) => {
        if (notificationId) {
          qb.where('notification_id', notificationId);
        }
      })
      .returning('id')) as { id: number }[];

    return result.length;
  }

  async getUnreadCount(userId: string): Promise<number> {
    const result = (await this.qb
      .count('* as total')
      .from('user_notifications as un')
      .join('notifications as n', 'un.notification_id', 'n.id')
      .where('un.user_id', userId)
      .where('un.is_read', false)
      .whereNull('n.deleted_at')
      .first()) as { total: string } | undefined;

    return parseInt(result?.total ?? '0', 10);
  }

  async findSystemNotifications(
    params: GetSystemNotificationsInputDto,
  ): Promise<{ items: NotificationDto[]; total: number }> {
    const {
      page = 1,
      pageRow: pageSize = NOTIFICATION_CONSTANTS.DEFAULT_PAGE_SIZE,
    } = params;
    const offset = (page - 1) * pageSize;

    // Get total count
    const totalResult = (await this.qb
      .count('* as count')
      .from('notifications as n')
      .where('n.is_global', true)
      .where('n.target_audience', 'user')
      .whereNull('n.deleted_at')
      .first()) as { count: string } | undefined;

    const total = parseInt(totalResult?.count ?? '0', 10);

    // Get paginated results
    const results = (await this.qb
      .select([
        'n.id',
        'n.type',
        'n.title',
        'n.message',
        'n.link_url',
        'n.is_global',
        'n.target_audience',
        'n.created_at',
      ])
      .from('notifications as n')
      .where('n.is_global', true)
      .where('n.target_audience', 'user')
      .whereNull('n.deleted_at')
      .orderBy('n.created_at', 'desc')
      .limit(pageSize)
      .offset(offset)) as unknown as SystemNotificationQueryResult[];

    const items = results.map((result) => ({
      id: result.id,
      type: result.type as NotificationType,
      title: result.title,
      message: result.message,
      link_url: result.link_url || undefined,
      is_global: result.is_global,
      target_audience:
        result.target_audience as Notification['target_audience'],
      created_at: new Date(result.created_at),
      is_read: false,
      read_at: undefined,
    }));

    return { items, total };
  }

  async findLatestSystemNotifications(
    limit: number = 10,
  ): Promise<SystemNotificationQueryResult[]> {
    const results = (await this.qb
      .select([
        'id',
        'type',
        'title',
        'message',
        'link_url',
        'slug',
        'thumbnail_url',
        'created_at',
      ])
      .from('notifications')
      .where('is_global', true)
      .where('target_audience', 'user')
      .whereNull('deleted_at')
      .orderBy('created_at', 'desc')
      .limit(limit)) as SystemNotificationQueryResult[];

    return results;
  }

  async findNotificationById(
    notificationId: number,
  ): Promise<SystemNotificationQueryResult | null> {
    const result = (await this.qb
      .select([
        'id',
        'type',
        'title',
        'message',
        'link_url',
        'slug',
        'thumbnail_url',
        'is_global',
        'target_audience',
        'created_at',
      ])
      .from('notifications')
      .where('id', notificationId)
      .whereNull('deleted_at')
      .first()) as SystemNotificationQueryResult | undefined;

    return result || null;
  }

  async findNotificationBySlug(
    slug: string,
  ): Promise<SystemNotificationQueryResult | null> {
    const result = (await this.qb
      .select([
        'id',
        'type',
        'title',
        'message',
        'link_url',
        'slug',
        'thumbnail_url',
        'is_global',
        'target_audience',
        'created_at',
      ])
      .from('notifications')
      .where('slug', slug)
      .whereNull('deleted_at')
      .first()) as SystemNotificationQueryResult | undefined;

    return result || null;
  }

  private mapToDto(result: NotificationWithStatusQueryResult): NotificationDto {
    return {
      id: result.id,
      type: result.type as NotificationType,
      title: result.title,
      message: result.message,
      link_url: result.link_url,
      is_global: result.is_global,
      target_audience:
        result.target_audience as unknown as Notification['target_audience'],
      is_read: result.is_read || false,
      read_at: result.read_at,
      created_at: result.created_at,
    };
  }
}
