export interface ProductVersion {
  id: string;
  product_id: string;
  version_type: 'new' | 'edit';
  status: 'pending' | 'approved' | 'rejected';
  name: string;
  slug: string;
  is_free: boolean;
  price: number;
  discount_percent: number;
  category_id: string;
  subcategory_id: string;
  description: string;
  instruction: string;
  meta?: Record<string, unknown>;
  submitted_by: string;
  submitted_at: Date;
  reviewed_by?: string;
  reviewed_at?: Date;
  rejection_reason?: string;
  created_at: Date;
  updated_at: Date;
  price_min_max: string;
  total_quantity: number;
}
