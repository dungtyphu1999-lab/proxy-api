import { z } from 'zod';

export const ProductReviewStatusSchema = z.enum([
  'pending',
  'approved',
  'rejected',
]);

export type ProductReviewStatus = z.infer<typeof ProductReviewStatusSchema>;

export const ProductReviewSchema = z.object({
  id: z.uuid(),
  product_id: z.uuid(),
  user_id: z.uuid(),
  shop_id: z.uuid(),
  parent_review_id: z.uuid().nullable(),
  content: z.string(),
  rating: z.number().int().min(1).max(5),
  status: ProductReviewStatusSchema,
  like_count: z.number().int().min(0),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ProductReview = z.infer<typeof ProductReviewSchema>;
