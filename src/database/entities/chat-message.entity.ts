export type MessageType = 'text' | 'image' | 'file' | 'system';

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: MessageType;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  is_read: boolean;
  read_at?: Date;
  is_deleted: boolean;
  deleted_at?: Date;
  metadata?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}
