import { ComplaintStatus } from './order-complaint.entity';

export type ComplaintActorType = 'system' | 'buyer' | 'seller' | 'admin';

export interface ComplaintStatusLogMetadata {
  download_link?: string;
  attachments?: string[];
  [key: string]: unknown;
}

export interface ComplaintStatusLog {
  id: string;
  complaint_id: string;
  status: ComplaintStatus;
  actor_type: ComplaintActorType;
  actor_id?: string;
  message?: string;
  metadata?: ComplaintStatusLogMetadata;
  created_at: Date;
}
