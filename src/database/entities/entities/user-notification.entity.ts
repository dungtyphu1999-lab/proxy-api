export interface UserNotification {
  id: number;
  notification_id: number;
  user_id: string;
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}
