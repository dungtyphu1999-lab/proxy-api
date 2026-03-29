import { z } from 'zod';

export const ProductBoostPurchaseStatusSchema = z.enum([
  'pending',
  'active',
  'expired',
  'cancelled',
]);

export type ProductBoostPurchaseStatus = z.infer<
  typeof ProductBoostPurchaseStatusSchema
>;

export const ProductBoostPurchaseSchema = z.object({
  id: z.uuid(),
  product_id: z.uuid(),
  shop_id: z.uuid(),
  owner_id: z.uuid(),
  package_version_id: z.uuid(),
  price: z.number().nonnegative(),
  start_at: z.date(),
  end_at: z.date(),
  status: ProductBoostPurchaseStatusSchema,
  created_at: z.date(),
});

export type ProductBoostPurchase = z.infer<typeof ProductBoostPurchaseSchema>;
