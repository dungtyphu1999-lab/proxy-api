export interface UserLockLog {
  id: string;
  user_id: string;
  action: 'lock' | 'unlock';
  reason: 'suspicion' | 'violation' | 'others';
  note?: string;
  performed_by: string;
  created_at: Date;
  updated_at: Date;
}
