export type ContactStatus = 'pending' | 'processing' | 'completed';

export interface SupportContact {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  content: string;
  status: ContactStatus;
  admin_reply?: string;
  handled_by?: string;
  replied_at?: Date;
  created_at: Date;
  updated_at: Date;
}
