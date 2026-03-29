export interface AuthToken {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: Date;
  revoked: boolean;
  created_at: Date;
}
