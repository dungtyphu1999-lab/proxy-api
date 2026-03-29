export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_version_id?: string;
  category_commissions_id?: string;
  quantity: number;
  total_price: number;
  discount_amount: number;
  final_price: number;
  created_at: Date;
  updated_at: Date;
  download_link?: string | null;
}
