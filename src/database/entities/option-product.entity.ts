export interface OptionProduct {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  description_quantity?: string[];
  account_keys?: string[];
  data_source?: string | null;
  data_delimiter?: string | null;
  key_column?: number | null;
  zip_file_path?: string | null;
  zip_file_name?: string | null;
  status?: 'pending' | 'approved' | 'rejected';
  pending_description_quantity?: string[];
  pending_account_keys?: string[];
  pending_zip_file_path?: string | null;
  pending_zip_file_name?: string | null;
}
