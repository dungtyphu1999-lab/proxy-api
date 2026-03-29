import { Shop, ShopRequest } from '@/database/entities';

export type ShopWithRequestInfo = Shop &
  Pick<
    ShopRequest,
    | 'front_id_url'
    | 'back_id_url'
    | 'bank_code'
    | 'bank_account_number'
    | 'bank_account_name'
    | 'status'
    | 'bank_status'
    | 'shop_name'
  > & {
    owner_username: string;
    owner_email: string;
  };
