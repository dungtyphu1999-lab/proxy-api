import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { DatabaseService } from '@/database/database.service';
import { Notification } from '@/database/entities/notification.entity';
import {
  GetAdminNotificationsInputDto,
  AdminNotificationDto,
} from './dto/get-admin-notifications.dto';
import { CreateAdminNotificationInputDto } from './dto/create-admin-notification.dto';
import { ADMIN_NOTIFICATION_CONSTANTS } from './admin-notification.constants';
import {
  AdminNotificationWithStatusQueryResult,
  AdminNotificationInsertResult,
  AdminUserNotificationInsertResult,
  RelatedNotificationQueryResult,
  GlobalNotificationQueryResult,
} from './admin-notification.types';
import { uniqBy } from 'lodash';
import { SlugUtil } from '@/shared/utils';

@Injectable()
export class AdminNotificationRepository extends BaseRepository<Notification> {
  private readonly logger = new Logger(AdminNotificationRepository.name);

  constructor(private readonly databaseService: DatabaseService) {
    super('notifications');
  }

  private async getAdminRoleId(): Promise<string> {
    const adminRole = (await this.qb
      .select('id')
      .from('roles')
      .where('name', 'admin')
      .first()) as { id: string } | undefined;

    if (!adminRole) {
      throw new Error('Admin role not found in database');
    }

    return adminRole.id;
  }

  private async checkSlugExists(
    slug: string,
    excludeId?: number,
  ): Promise<boolean> {
    let query = this.qb.where('slug', slug);
    if (excludeId) {
      query = query.whereNot('id', excludeId);
    }
    const existing = await query.first();
    return !!existing;
  }

  private extractFirstImageUrl(content: string): string | null {
    const regex = /<img[^>]+src="([^">]+)"/i;
    const match = regex.exec(content);

    return match && match[1] ? match[1] : null;
  }

  async findAllAdminNotifications(
    params: GetAdminNotificationsInputDto,
    userId: string,
  ): Promise<{ items: AdminNotificationDto[]; total: number }> {
    const {
      page = 1,
      pageRow: pageSize = ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_PAGE_SIZE,
      type,
      is_read,
      is_global,
      target_audience,
      sortOrder = 'desc',
    } = params;

    // Handle different cases based on is_global filter
    if (is_global === true) {
      // For global notifications, only query notifications table
      let query = this.qb
        .select([
          'n.id',
          'n.type',
          'n.title',
          'n.message',
          'n.link_url',
          'n.slug',
          'n.thumbnail_url',
          'n.is_global',
          'n.target_audience',
          'n.created_by',
          'n.related_entity_type',
          'n.related_entity_id',
          'n.created_at',
        ])
        .from('notifications as n')
        .where('n.is_global', true)
        .whereNull('n.deleted_at');

      // Apply other filters
      if (type) {
        query = query.where('n.type', type);
      }

      if (target_audience) {
        query = query.where('n.target_audience', target_audience);
      }

      // Get total count (separate query without select columns)
      const countQuery = this.qb
        .count('* as total')
        .from('notifications as n')
        .where('n.is_global', true)
        .whereNull('n.deleted_at');

      // Apply same filters to count query
      if (type) {
        countQuery.where('n.type', type);
      }
      if (target_audience) {
        countQuery.where('n.target_audience', target_audience);
      }

      const totalResult = (await countQuery.first()) as unknown as {
        total: string;
      };
      const total = parseInt(totalResult?.total ?? '0', 10);

      // Get paginated results
      const results = (await query
        .orderBy('n.created_at', sortOrder)
        .limit(pageSize)
        .offset(
          (page - 1) * pageSize,
        )) as unknown as GlobalNotificationQueryResult[];

      const items: AdminNotificationDto[] = results.map(
        (result: GlobalNotificationQueryResult) => ({
          id: result.id,
          type: result.type as AdminNotificationDto['type'],
          title: result.title,
          message: result.message,
          link_url: result.link_url || undefined,
          slug: result.slug || undefined,
          thumbnail_url: result.thumbnail_url || undefined,
          is_global: result.is_global,
          target_audience: result.target_audience,
          is_read: false, // Global notifications are always unread for admin view
          read_at: undefined,
          created_at: result.created_at,
        }),
      );

      return { items, total };
    } else {
      // For non-global notifications, query both tables with join
      let query = this.qb
        .select([
          'n.id',
          'n.type',
          'n.title',
          'n.message',
          'n.link_url',
          'n.slug',
          'n.thumbnail_url',
          'n.is_global',
          'n.target_audience',
          'n.created_by',
          'n.related_entity_type',
          'n.related_entity_id',
          'n.created_at',
          'un.is_read',
          'un.read_at',
        ])
        .from('notifications as n')
        .leftJoin('user_notifications as un', 'n.id', 'un.notification_id')
        .whereNull('n.deleted_at')
        .where('un.user_id', userId); // Filter by admin user ID

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

      if (target_audience) {
        query = query.where('n.target_audience', target_audience);
      }

      // Get all results first (without pagination to get unique items)
      const allResults = await query
        .groupBy([
          'n.id',
          'n.type',
          'n.title',
          'n.message',
          'n.link_url',
          'n.slug',
          'n.thumbnail_url',
          'n.is_global',
          'n.target_audience',
          'n.created_by',
          'n.related_entity_type',
          'n.related_entity_id',
          'n.created_at',
          'un.is_read',
          'un.read_at',
        ])
        .orderBy('n.created_at', sortOrder);

      const allItems = allResults.map(
        (result: AdminNotificationWithStatusQueryResult) =>
          this.mapToAdminDto(result),
      );

      // Remove duplicates by notification id using lodash
      const uniqueItems = uniqBy(allItems, 'id');

      // Apply pagination to unique items
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedItems = uniqueItems.slice(startIndex, endIndex);

      return { items: paginatedItems, total: uniqueItems.length };
    }
  }

  async createAdminNotification(
    createDto: CreateAdminNotificationInputDto,
    createdBy: string | null,
  ): Promise<AdminNotificationInsertResult> {
    // Generate SEO-optimized slug from title
    const baseSlug = SlugUtil.generate(createDto.title);
    const slug = await SlugUtil.makeUnique(baseSlug, (slug: string) =>
      this.checkSlugExists(slug),
    );

    // Extract thumbnail URL from message content (if it contains HTML with images)
    const thumbnailUrl = this.extractFirstImageUrl(createDto.message);

    const [result] = (await this.qb
      .insert({
        type: createDto.type,
        title: createDto.title,
        message: createDto.message,
        link_url: createDto.link_url,
        slug,
        thumbnail_url: thumbnailUrl || undefined,
        target_audience: 'admin',
        created_by: createdBy || undefined,
        related_entity_type: createDto.related_entity_type || undefined,
        related_entity_id: createDto.related_entity_id || undefined,
        created_at: new Date(),
      })
      .into('notifications')
      .returning([
        'id',
        'type',
        'title',
        'message',
        'link_url',
        'slug',
        'thumbnail_url',
        'target_audience',
        'created_by',
        'related_entity_type',
        'related_entity_id',
        'created_at',
      ])) as AdminNotificationInsertResult[];

    return result;
  }

  async createAdminUserNotifications(
    notificationId: number,
    adminUserIds: string[],
  ): Promise<AdminUserNotificationInsertResult[]> {
    if (adminUserIds.length === 0) return [];

    // Filter out locked users before creating notifications
    const unlockedUsers = (await this.qb
      .select('id')
      .from('users')
      .whereIn('id', adminUserIds)
      .where('is_locked', false)) as { id: string }[];

    if (unlockedUsers.length === 0) return [];

    const userNotifications = unlockedUsers.map((u) => ({
      notification_id: notificationId,
      user_id: u.id,
      is_read: ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
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
      ])) as AdminUserNotificationInsertResult[];

    return results;
  }

  async createAllAdminUserNotifications(
    notificationId: number,
  ): Promise<AdminUserNotificationInsertResult[]> {
    // Get all admin user IDs who are not locked
    const adminRoleId = await this.getAdminRoleId();

    const adminUsers = (await this.qb
      .select('users.id')
      .from('users')
      .join('user_role_map', 'users.id', 'user_role_map.user_id')
      .where('user_role_map.role_id', adminRoleId)
      .where('users.is_locked', false)) as { id: string }[];

    if (adminUsers.length === 0) return [];

    const userNotifications = adminUsers.map((u) => ({
      notification_id: notificationId,
      user_id: u.id,
      is_read: ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
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
      ])) as AdminUserNotificationInsertResult[];

    return results;
  }

  async createUserNotification(
    createDto: CreateAdminNotificationInputDto,
    createdBy: string | null,
  ): Promise<AdminNotificationInsertResult> {
    // Generate SEO-optimized slug from title
    const baseSlug = SlugUtil.generate(createDto.title);
    const slug = await SlugUtil.makeUnique(baseSlug, (slug: string) =>
      this.checkSlugExists(slug),
    );

    // Extract thumbnail URL from message content (if it contains HTML with images)
    const thumbnailUrl = this.extractFirstImageUrl(createDto.message);

    const [result] = (await this.qb
      .insert({
        type: createDto.type,
        title: createDto.title,
        message: createDto.message,
        link_url: `/notification/${slug}`,
        slug,
        thumbnail_url: thumbnailUrl || undefined,
        is_global: true,
        target_audience: 'user',
        created_by: createdBy || undefined,
        related_entity_type: createDto.related_entity_type || undefined,
        related_entity_id: createDto.related_entity_id || undefined,
        created_at: new Date(),
      })
      .into('notifications')
      .returning([
        'id',
        'type',
        'title',
        'message',
        'link_url',
        'slug',
        'thumbnail_url',
        'is_global',
        'target_audience',
        'created_by',
        'related_entity_type',
        'related_entity_id',
        'created_at',
      ])) as AdminNotificationInsertResult[];

    return result;
  }

  async createUserNotifications(
    notificationId: number,
    userIds: string[],
  ): Promise<AdminUserNotificationInsertResult[]> {
    if (userIds.length === 0) return [];

    const userNotifications = userIds.map((uid: string) => ({
      notification_id: notificationId,
      user_id: uid,
      is_read: ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
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
      ])) as AdminUserNotificationInsertResult[];

    return results;
  }

  async createAllVerifiedUserNotifications(
    notificationId: number,
  ): Promise<AdminUserNotificationInsertResult[]> {
    // Get all verified and unblocked user IDs who are NOT admins
    const adminRoleId = await this.getAdminRoleId();

    const verifiedUsers = (await this.knexInstance('users')
      .select('users.id')
      .where('users.is_verified', true)
      .where('users.is_locked', false)
      .whereNotExists(
        this.knexInstance('user_role_map')
          .select('*')
          .whereRaw('user_role_map.user_id = users.id')
          .where('user_role_map.role_id', adminRoleId),
      )) as { id: string }[];

    if (verifiedUsers.length === 0) return [];

    const userNotifications = verifiedUsers.map((u) => ({
      notification_id: notificationId,
      user_id: u.id,
      is_read: ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
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
      ])) as AdminUserNotificationInsertResult[];

    return results;
  }

  async markAdminNotificationAsRead(
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
      .where('is_read', false) // Only update unread notifications
      .modify((qb) => {
        if (notificationId) {
          qb.where('notification_id', notificationId);
        }
      })
      .returning('id')) as { id: number }[];

    return result.length;
  }

  async deleteAdminNotification(
    userId: string,
    notificationId: number,
  ): Promise<boolean> {
    // Soft delete the notification by setting deleted_at and deleted_by
    const result = await this.qb
      .table('notifications')
      .update({
        deleted_at: new Date(),
        deleted_by: userId,
      })
      .where('id', notificationId)
      .whereNull('deleted_at'); // Only update if not already deleted

    return result > 0;
  }

  async getAdminUnreadCount(userId: string): Promise<number> {
    const result = (await this.qb
      .count('* as total')
      .from('user_notifications as un')
      .join('notifications as n', 'un.notification_id', 'n.id')
      .where('un.user_id', userId)
      .where('un.is_read', false)
      .where('n.target_audience', 'admin')
      .whereNull('n.deleted_at')
      .first()) as { total: string } | undefined;

    return parseInt(result?.total ?? '0', 10);
  }

  async getTotalAdminUnreadCount(): Promise<number> {
    const result = (await this.qb
      .count('* as total')
      .from('user_notifications as un')
      .join('notifications as n', 'un.notification_id', 'n.id')
      .where('un.is_read', false)
      .where('n.target_audience', 'admin')
      .whereNull('n.deleted_at')
      .first()) as { total: string } | undefined;

    return parseInt(result?.total ?? '0', 10);
  }

  async markNotificationsAsReadByRelatedEntity(
    userId: string,
    relatedEntityType: string,
    relatedEntityId: string,
  ): Promise<number> {
    try {
      const relatedNotifications = (await this.qb
        .select('id')
        .from('notifications')
        .where('related_entity_type', relatedEntityType)
        .where('related_entity_id', relatedEntityId)
        .where('target_audience', 'admin')
        .whereNull('deleted_at')) as RelatedNotificationQueryResult[];

      if (relatedNotifications.length === 0) {
        this.logger.log(
          `No notifications found for entity ${relatedEntityType}:${relatedEntityId}`,
        );
        return 0;
      }

      const notificationIds = relatedNotifications.map((n) => n.id);

      // Mark all related notifications as read for the user (only unread ones)
      const result = await this.qb
        .table('user_notifications')
        .update({
          is_read: true,
          read_at: new Date(),
        })
        .where('user_id', userId)
        .where('is_read', false) // Only update unread notifications
        .whereIn('notification_id', notificationIds)
        .returning('id');

      return result.length;
    } catch (error) {
      this.logger.error(
        `Error marking notifications as read for user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  private mapToAdminDto(
    result: AdminNotificationWithStatusQueryResult,
  ): AdminNotificationDto {
    return {
      id: result.id,
      type: result.type as unknown as AdminNotificationDto['type'],
      title: result.title,
      message: result.message,
      link_url: result.link_url,
      slug: result.slug || undefined,
      thumbnail_url: result.thumbnail_url || undefined,
      is_global: result.is_global || false,
      target_audience: result.target_audience,
      is_read: result.is_read || false,
      read_at: result.read_at,
      created_at: result.created_at,
    };
  }
}
