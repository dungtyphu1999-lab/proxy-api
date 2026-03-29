export interface Cart {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CartItem {
  id: string;
  cart_id: string;
  product_id: string;
  option_product_id?: number; // ✅ thêm code
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateCartData {
  user_id: string;
}

export interface CreateCartItemData {
  cart_id: string;
  product_id: string;
  option_product_id?: string; // ✅ thêm
  quantity: number;
}
