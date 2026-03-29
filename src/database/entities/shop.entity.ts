export interface Shop {
  id: string;
  owner_id: string; // user id
  name: string; // user_name of the owner
  slug: string; // user_name of the owner
  description?: string;
  avatar_url?: string; // avatar of the owner
  shop_request_id?: string; // reference to shop request that created this shop
  is_suspended: boolean;
  suspension_reason?: ShopSuspensionReason;
  suspension_date?: Date;
  is_complaint_restricted: boolean; // restricted due to too many unresolved complaints
  complaint_restricted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export enum ShopSuspensionReason {
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  TERMS_VIOLATION = 'terms_violation',
  OTHER = 'other',
}
