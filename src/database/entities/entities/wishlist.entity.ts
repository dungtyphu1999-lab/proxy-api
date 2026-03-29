export type WishlistObjectType = 'product' | 'post';

export interface Wishlist {
  id: string;
  user_id: string;
  object_type: WishlistObjectType;
  object_id: string;
  created_at: Date;
  updated_at: Date;
}
