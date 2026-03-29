export interface Category {
  id: string;
  parent_id?: string;
  name: string;
  slug: string;
  icon_url?: string;
  is_active: boolean;
  order: number;
  is_coming_soon: boolean;
  created_at: Date;
  updated_at: Date;
}
