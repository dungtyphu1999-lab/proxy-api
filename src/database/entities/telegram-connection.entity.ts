export interface TelegramConnection {
  id: string;
  user_id: string;
  telegram_user_id: string;
  chat_id: string;
  telegram_username?: string | null;
  is_active: boolean;
  connected_at: Date;
  created_at: Date;
  updated_at: Date;
}
