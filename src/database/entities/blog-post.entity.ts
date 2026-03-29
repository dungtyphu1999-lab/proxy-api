export type BlogPostStatus =
  | 'draft'
  | 'pending'
  | 'published'
  | 'rejected'
  | 'hidden';

export type ServiceStatus = 'seeking' | 'found';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_url?: string;
  author_id: string;
  shop_id?: string;
  status: BlogPostStatus;
  service_status?: ServiceStatus | null;
  is_featured: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  published_at?: Date;
  approved_by?: string;
  approved_at?: Date;
  approval_notes?: string;
  created_at: Date;
  updated_at: Date;
}
