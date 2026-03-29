import { z } from 'zod';

export const SystemTransactionTypeSchema = z.enum([
  'deposit',
  'release',
  'refund',
  'commission_collect',
  'penalty',
  'boost_payment',
]);

export type SystemTransactionType = z.infer<typeof SystemTransactionTypeSchema>;

export const TransactionStatusSchema = z.enum([
  'pending',
  'success',
  'failed',
  'cancelled',
]);

export type TransactionStatus = z.infer<typeof TransactionStatusSchema>;

export const SystemWalletTransactionSchema = z.object({
  id: z.uuid(),
  system_wallet_id: z.uuid(),
  from_wallet_id: z.uuid().optional(),
  to_wallet_id: z.uuid().optional(),
  transaction_type: SystemTransactionTypeSchema,
  amount: z.number().nonnegative(),
  status: TransactionStatusSchema.default('pending'),
  notes: z.string().optional(),
  processed_by: z.uuid().optional(),
  created_at: z.date(),
  processed_at: z.date().optional(),
});

export type SystemWalletTransaction = z.infer<
  typeof SystemWalletTransactionSchema
>;
