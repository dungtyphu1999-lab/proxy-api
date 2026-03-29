import { z } from 'zod';

export const ShopRequestSchema = z.object({
  id: z.string(),
  shop_name: z.string(),
  user_id: z.string(),
  front_id_url: z.string(),
  back_id_url: z.string(),
  bank_code: z.string(),
  bank_name: z.string(),
  bank_account_number: z.string(),
  bank_account_name: z.string(),
  bank_status: z.enum(['valid', 'invalid', 'unknown']).default('unknown'),
  status: z.enum(['pending', 'approved', 'rejected']).default('pending'),
  note: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type ShopRequest = z.infer<typeof ShopRequestSchema>;
