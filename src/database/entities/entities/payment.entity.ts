import { z } from 'zod';

export const PaymentStatusSchema = z.enum([
  'pending',
  'processing',
  'paid',
  'failed',
  'refunded',
  'cancelled',
]);

export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;

export const PaymentMethodSchema = z.enum([
  'wallet',
  'bank_transfer',
  'credit_card',
  'paypal',
  'momo',
  'other',
]);

export type PaymentMethod = z.infer<typeof PaymentMethodSchema>;

export const PaymentReferenceTypeSchema = z.enum(['order', 'product_boost']);

export type PaymentReferenceType = z.infer<typeof PaymentReferenceTypeSchema>;

export const PaymentSchema = z.object({
  id: z.uuid(),
  payment_code: z.string().max(30),
  reference_type: PaymentReferenceTypeSchema,
  reference_id: z.uuid(),
  payer_id: z.uuid(),
  payee_id: z.uuid().optional(),
  system_wallet_id: z.uuid().optional(),
  amount: z.number().nonnegative(),
  currency: z.string().max(10).default('VND'),
  method: PaymentMethodSchema,
  status: PaymentStatusSchema.default('pending'),
  metadata: z.record(z.any(), z.any()).optional(),
  note: z.string().optional(),
  created_at: z.date(),
  paid_at: z.date().optional(),
  updated_at: z.date(),
});

export type Payment = z.infer<typeof PaymentSchema>;
