export interface Product {
  id: string;
  shop_id: string;
  approved_version_id?: string;
  pending_version_id?: string;
  slug: string;
  state:
    | 'live'
    | 'hidden'
    | 'pending'
    | 'suspended'
    | 'draft'
    | 'deleted'
    | 'rejected';
  total_sales: number;
  total_revenue: number;
  rating_avg: number;
  rating_count: number;
  total_like: number;
  total_view: number;
  total_review: number;
  created_at: Date;
  updated_at: Date;
  price_min_max?: string;
  total_quantity?: number;
  price?:string |number;
}
