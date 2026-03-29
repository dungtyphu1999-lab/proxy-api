export type OrderStatus = 'pending' | 'completed' | 'refunded';

export type PaymentReleaseStatus =
  | 'pending_release'
  | 'released'
  | 'disputed'
  | 'refunded';

export interface Order {
  id: string;
  order_number: string;
  buyer_id: string;
  shop_id: string;
  total_amount: number;
  status: OrderStatus;
  payment_release_status: PaymentReleaseStatus | null;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
