// Notification Repository Types and Interfaces

export interface NotificationQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  is_global: boolean;
  target_audience: string;
  created_by?: string;
  created_at: Date;
}

export interface UserNotificationQueryResult {
  id: number;
  notification_id: number;
  user_id: string;
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}

export interface NotificationWithStatusQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  is_global: boolean;
  target_audience: string;
  created_by?: string;
  created_at: Date;
  is_read: boolean;
  read_at?: Date;
}

export interface NotificationInsertResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  is_global: boolean;
  target_audience: string;
  created_by?: string;
  created_at: Date;
}

export interface UserNotificationInsertResult {
  id: number;
  notification_id: number;
  user_id: string;
  is_read: boolean;
  created_at: Date;
}

export interface SearchNotificationQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  is_global: boolean;
  target_audience: string;
  created_at: Date;
  relevance_score: string;
}
