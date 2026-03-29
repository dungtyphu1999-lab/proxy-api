export type NotificationType =
  | 'order'
  | 'wallet'
  | 'system'
  | 'support'
  | 'product'
  | 'complaint'
  | 'chat'
  | 'payment'
  | 'boost'
  | 'shop'
  | 'blog';

export type TargetAudience = 'admin' | 'user' | 'all';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  link_url?: string;
  slug?: string;
  thumbnail_url?: string;
  is_global: boolean;
  target_audience: TargetAudience;
  created_by?: string;
  related_entity_type?: string;
  related_entity_id?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  deleted_by?: string;
}
