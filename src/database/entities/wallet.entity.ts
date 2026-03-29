export type WalletCurrency = 'VND';

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  deposit_balance: number;
  sale_balance: number;
  locked_balance: number;
  currency: WalletCurrency;
  is_locked: boolean;
  created_at: Date;
  updated_at: Date;
}
