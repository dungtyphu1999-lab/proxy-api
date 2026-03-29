export type ComplaintType =
  | 'product_quality'
  | 'delivery_issue'
  | 'payment_issue'
  | 'fraud'
  | 'other';

export type ComplaintStatus =
  | 'pending'
  | 'shop_responded'
  | 'admin_review'
  | 'investigating'
  | 'resolved'
  | 'rejected'
  | 'cancelled'
  | 'closed'
  | 'dismissed';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ResolutionType =
  | 'refund'
  | 'replacement'
  | 'compensation'
  | 'other';

export interface OrderComplaint {
  id: string;
  order_id: string;
  shop_id: string;
  complainant_id: string;
  type: ComplaintType;
  title: string;
  description: string;
  evidence_images?: string[];
  reason_detail?: string; // NEW: chi tiết khi type = 'other'
  requested_resolution?: string; // NEW: phương án user yêu cầu
  status: ComplaintStatus;
  priority: ComplaintPriority;
  assigned_to?: string;
  resolution?: string;
  resolution_type?: ResolutionType;
  refund_amount?: number;
  resolved_at?: Date;
  resolved_by?: string;
  closed_at?: Date;
  closed_by?: string;
  created_at: Date;
  updated_at: Date;
}

// Constants for business rules
export const COMPLAINT_DEADLINE_DAYS = 7;
export const MAX_UNRESOLVED_COMPLAINTS_BEFORE_RESTRICTION = 5;

// Helper: statuses that are considered "resolved/done"
export const RESOLVED_STATUSES: ComplaintStatus[] = [
  'resolved',
  'closed',
  'dismissed',
  'rejected',
  'cancelled',
];

// Helper: statuses that are still "in progress"
export const PROCESSING_STATUSES: ComplaintStatus[] = [
  'pending',
  'shop_responded',
  'admin_review',
  'investigating',
];
