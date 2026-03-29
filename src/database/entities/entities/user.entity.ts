export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  phone_number?: string;
  is_verified: boolean;
  is_locked: boolean;
  locked_at?: Date;
  last_online_at?: Date | null;
  is_online: boolean;
  has_received_welcome_message: boolean;
  created_at: Date;
  updated_at: Date;
  verification_code?: string | null;
  verification_code_expired_at?: Date | null;
}
