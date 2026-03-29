export type CommentStatus = 'published' | 'pending' | 'hidden' | 'deleted';

export interface BlogComment {
  id: string;
  blog_post_id: string;
  author_id: string;
  parent_id?: string;
  content: string;
  status: CommentStatus;
  like_count: number;
  reply_count: number;
  is_service_confirmed: boolean;
  created_at: Date;
  updated_at: Date;
}
