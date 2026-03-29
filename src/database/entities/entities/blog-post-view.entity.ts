export interface BlogPostView {
  id: string;
  blog_post_id: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  viewed_at: Date;
}
