import * as crypto from 'crypto';

/**
 * Create hash for notification deduplication
 * @param id - Notification ID from database
 * @param type - Notification type
 * @param title - Notification title
 * @param message - Notification message
 * @returns MD5 hash string
 */
export function createNotificationHash(
  id: number,
  type: string,
  title: string,
  message: string,
): string {
  const hashString = `${id}_${type}_${title}_${message}`;
  return crypto.createHash('md5').update(hashString).digest('hex');
}
