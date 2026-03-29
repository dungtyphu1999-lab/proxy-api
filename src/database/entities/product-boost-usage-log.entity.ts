import { z } from 'zod';

export const BoostEventTypeSchema = z.enum(['impression', 'click', 'cta']);

export type BoostEventType = z.infer<typeof BoostEventTypeSchema>;

export const ProductBoostUsageLogSchema = z.object({
  id: z.uuid(),
  boost_purchase_id: z.uuid(),
  product_id: z.uuid(),
  shop_id: z.uuid(),
  event_type: BoostEventTypeSchema,
  user_id: z.uuid().optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  metadata: z.record(z.any(), z.any()).optional(),
  created_at: z.date(),
});

export type ProductBoostUsageLog = z.infer<typeof ProductBoostUsageLogSchema>;
