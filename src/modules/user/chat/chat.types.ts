// Chat Repository Types and Interfaces

export interface ConversationQueryResult {
  id: string;
  title?: string;
  last_message?: string;
  last_message_at?: Date;
  last_message_type?: string;
  last_sender_id?: string;
  type: string;
  status: string;
  is_pinned: boolean;
  is_muted: boolean;
  muted_until?: Date;
  notifications_enabled: boolean;
  unread_count: number;
  created_at: Date;
  updated_at: Date;
  initiator_id: string;
  participant_id: string;
  initiator_name: string;
  initiator_avatar_url?: string;
  initiator_is_online?: boolean;
  initiator_last_online_at?: Date;
  participant_name: string;
  participant_avatar_url?: string;
  participant_is_online?: boolean;
  participant_last_online_at?: Date;
}

export interface ChatMessageQueryResult {
  id: string;
  content: string;
  message_type: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  is_read: boolean;
  read_at?: Date;
  is_deleted: boolean;
  deleted_at?: Date;
  sender_id: string;
  sender_name: string;
  sender_avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ConversationBasicResult {
  id: string;
  participant_id: string;
  type: string;
  title?: string;
  shop_id?: string | null;
}

export interface ConversationAccessResult {
  id: string;
  initiator_id: string;
  participant_id: string;
  unread_count: number;
}

export interface ConversationWithLastSenderResult {
  id: string;
  initiator_id: string;
  participant_id: string;
  unread_count: number;
  last_sender_id?: string;
}

export interface SearchConversationQueryResult {
  id: string;
  title?: string;
  last_message?: string;
  type: string;
  last_message_at?: Date;
  participant_id: string;
  participant_name: string;
  participant_avatar_url?: string;
  relevance_score: string;
}

export interface SearchMessageQueryResult {
  id: string;
  content: string;
  message_type: string;
  conversation_id: string;
  sender_id: string;
  created_at: Date;
  conversation_title?: string;
  sender_name: string;
  sender_avatar_url?: string;
  relevance_score: string;
}

export interface ChatMessageInsertResult {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  is_read: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface SearchContactQueryResult {
  id: string;
  name: string;
  avatar_url?: string;
  phone_number?: string;
  conversation_id: string;
  conversation_title?: string;
  last_message?: string;
  last_message_at?: Date;
  relevance_score: string;
}
