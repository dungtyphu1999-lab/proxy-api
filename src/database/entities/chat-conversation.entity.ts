export type ConversationType =
  | 'user_to_user'
  | 'user_to_shop'
  | 'user_to_admin'
  | 'admin_to_user'
  | 'admin_to_shop';
export type ConversationStatus = 'active' | 'archived' | 'blocked';

export interface ChatConversation {
  id: string;
  initiator_id: string;
  participant_id: string;
  shop_id?: string | null;
  title?: string;
  last_message?: string;
  last_message_at?: Date;
  last_sender_id?: string;
  type: ConversationType;
  status: ConversationStatus;
  is_pinned: boolean;
  is_muted: boolean;
  muted_until?: Date;
  notifications_enabled: boolean;
  unread_count: number;
  created_at: Date;
  updated_at: Date;
}
