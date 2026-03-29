export interface ProductVersionImage {
  id: string;
  product_version_id: string;
  file_path: string;
  sort_order: number;
  is_primary: boolean;
  created_at: Date;
}
