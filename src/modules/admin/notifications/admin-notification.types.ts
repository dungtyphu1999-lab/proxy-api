// Admin Notification Repository Types and Interfaces

export interface AdminNotificationQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  slug?: string;
  thumbnail_url?: string;
  target_audience: string;
  created_by?: string;
  related_entity_type?: string;
  related_entity_id?: string;
  created_at: Date;
}

export interface AdminUserNotificationQueryResult {
  id: number;
  notification_id: number;
  user_id: string;
  is_read: boolean;
  read_at?: Date;
  created_at: Date;
}

export interface AdminNotificationWithStatusQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  slug?: string;
  thumbnail_url?: string;
  is_global?: boolean;
  target_audience: string;
  created_by?: string;
  related_entity_type?: string;
  related_entity_id?: string;
  created_at: Date;
  is_read: boolean;
  read_at?: Date;
}

export interface AdminNotificationInsertResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  slug?: string;
  thumbnail_url?: string;
  is_global?: boolean;
  target_audience: string;
  created_by?: string;
  related_entity_type?: string;
  related_entity_id?: string;
  created_at: Date;
}

export interface AdminUserNotificationInsertResult {
  id: number;
  notification_id: number;
  user_id: string;
  is_read: boolean;
  created_at: Date;
}

export interface AdminSearchNotificationQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url?: string;
  slug?: string;
  thumbnail_url?: string;
  is_global?: boolean;
  target_audience: string;
  related_entity_type?: string;
  related_entity_id?: string;
  created_at: Date;
  relevance_score: string;
}

export interface RelatedNotificationQueryResult {
  id: number;
}

export interface GlobalNotificationQueryResult {
  id: number;
  type: string;
  title: string;
  message: string;
  link_url: string | null;
  slug?: string;
  thumbnail_url?: string;
  is_global: boolean;
  target_audience: string;
  created_at: Date;
}
