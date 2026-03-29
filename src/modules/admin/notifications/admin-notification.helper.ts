import { Injectable } from '@nestjs/common';
import { AdminNotificationRepository } from './admin-notification.repository';

/**
 * Helper class for auto-marking notifications as read when admin actions are performed
 */
@Injectable()
export class AdminNotificationHelper {
  constructor(
    private readonly adminNotificationRepository: AdminNotificationRepository,
  ) {}

  /**
   * Mark all notifications related to a specific entity as read for an admin user
   * @param adminUserId - ID of the admin user
   * @param entityType - Type of the entity (blog, product, order, etc.)
   * @param entityId - ID of the entity
   * @returns Number of notifications marked as read
   */
  async markEntityNotificationsAsRead(
    adminUserId: string,
    entityType: string,
    entityId: string,
  ): Promise<number> {
    try {
      return await this.adminNotificationRepository.markNotificationsAsReadByRelatedEntity(
        adminUserId,
        entityType,
        entityId,
      );
    } catch (error) {
      console.error(
        `Failed to mark ${entityType} notifications as read for admin ${adminUserId}:`,
        error,
      );
      return 0;
    }
  }
}
