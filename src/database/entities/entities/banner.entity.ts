export interface Banner {
  id: string;
  title: string;
  image_url: string;
  desc?: string;
  link_url?: string;
  sort_order: number;
  is_active: boolean;
  start_date?: Date;
  end_date?: Date;
  created_at: Date;
  updated_at: Date;
}
