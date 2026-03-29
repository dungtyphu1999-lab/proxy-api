import { PAYMENT_METHOD } from '@/shared/enum/payment-menthod.enum';

export type WalletTransactionType =
  | 'deposit'
  | 'withdraw'
  | 'transfer'
  | 'refund'
  | 'payment'
  | 'order_release'
  | 'PROXY';

export const WALLET_TRANSACTION_TYPES: WalletTransactionType[] = [
  'deposit',
  'withdraw',
  'transfer',
  'refund',
  'payment',
  'order_release',
  'PROXY',
];

export type WalletTransactionStatus =
  | 'pending'
  | 'success'
  | 'failed'
  | 'cancelled';

export interface BankInfo {
  bank_code: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  note?: string;
}

export interface WalletTransaction {
  id: string;
  transaction_number: string;
  wallet_id: string;
  user_id: string;
  type: WalletTransactionType;
  method?: string;
  amount: number;
  fee_amount: number;
  status: WalletTransactionStatus;
  reference_code?: string;
  bank_info?: BankInfo;
  note?: string;
  transfer_proof_path?: string;
  created_at: Date;
  completed_at?: Date;
  name_user?: string;
  avatar_user?: string;
}

export interface CreateWalletTransactionData {
  transaction_number?: string;
  wallet_id: string;
  user_id: string;
  type: WalletTransactionType;
  method?: PAYMENT_METHOD;
  amount: number;
  reference_code?: string;
  status: WalletTransactionStatus;
  bank_info?: BankInfo;
  note?: string;
}
