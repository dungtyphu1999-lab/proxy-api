import { z } from 'zod';

export const SystemWalletTypeSchema = z.enum([
  'escrow',
  'commission',
  'penalty',
  'refund_reserve',
  'shop_boost',
]);

export type SystemWalletType = z.infer<typeof SystemWalletTypeSchema>;

export const SystemWalletStatusSchema = z.enum([
  'active',
  'locked',
  'processing',
  'closed',
]);

export type SystemWalletStatus = z.infer<typeof SystemWalletStatusSchema>;

export const SystemWalletSchema = z.object({
  id: z.uuid(),
  wallet_type: SystemWalletTypeSchema,
  reference_type: z.string().max(30).optional(),
  reference_id: z.uuid().optional(),
  holder_user_id: z.uuid().optional(),
  balance: z.number().nonnegative().default(0),
  reserved_amount: z.number().nonnegative().default(0),
  available_amount: z.number(),
  currency: z.string().max(10).default('VND'),
  status: SystemWalletStatusSchema.default('active'),
  auto_release_at: z.date().optional(),
  notes: z.string().optional(),
  metadata: z.record(z.any(), z.any()).optional(),
  created_at: z.date(),
  updated_at: z.date(),
  closed_at: z.date().optional(),
});

export type SystemWallet = z.infer<typeof SystemWalletSchema>;
