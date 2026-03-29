export interface BlogPostImage {
  id: string;
  filename: string;
  url: string;
  uploaded_at: Date;
  user_id: string;
  post_id: string | null;
  created_at: Date;
  updated_at: Date;
}
