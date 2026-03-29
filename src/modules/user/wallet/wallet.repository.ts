import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { Wallet, WalletCurrency } from '@/database/entities/wallet.entity';
import { DatabaseService } from '@/database/database.service';
import { Knex } from 'knex';
import { ErrorCode } from '@/shared/constants/error-codes.enum';

/**
 * @description Balance data for wallet
 * @property deposit_balance - Deposit balance
 * @property sale_balance - Sale balance
 * @property locked_balance - Locked balance
 */
type BalanceData = {
  deposit_balance?: number;
  sale_balance?: number;
  locked_balance?: number;
};

@Injectable()
export class WalletRepository extends BaseRepository<Wallet> {
  constructor(private readonly databaseService: DatabaseService) {
    super('wallets');
  }

  async findByUserId(
    userId: string,
    trx?: Knex.Transaction,
  ): Promise<Wallet | null> {
    const qb = trx ? trx<Wallet>('wallets') : this.qb;
    const wallet = await qb.where('user_id', userId).first();
    return wallet || null;
  }

  async findById(id: string): Promise<Wallet | null> {
    const wallet = await this.qb.where('id', id).first();
    return wallet || null;
  }

  async createWallet(userId: string, trx?: Knex.Transaction): Promise<Wallet> {
    const [createdWallet] = await (trx ? trx<Wallet>('wallets') : this.qb)
      .insert({
        user_id: userId,
        balance: 0,
        currency: 'VND' as WalletCurrency,
        is_locked: false,
      })
      .returning('*');
    return createdWallet;
  }

  async updateBalance(
    walletId: string,
    newBalance: number,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const qb = trx ? trx<Wallet>('wallets') : this.qb;
    await qb.where('id', walletId).update({
      balance: newBalance,
      updated_at: new Date(),
    });
  }

  async deductBalance(
    trx: Knex.Transaction,
    walletId: string,
    amount: number,
    isWithdraw: boolean = false,
  ): Promise<void> {
    const qb = trx ? trx<Wallet>('wallets') : this.qb;

    // Lock the wallet row to avoid race conditions
    const wallet = await qb.where('id', walletId).forUpdate().first();

    if (!wallet) {
      throw new NotFoundException(ErrorCode.WALLET_NOT_FOUND);
    }

    let remaining = amount;
    let newDepositBalance = Number(wallet.deposit_balance);
    let newSaleBalance = Number(wallet.sale_balance);
    const newLockedBalance = Number(wallet.locked_balance);

    if (isWithdraw) {
      // Chỉ trừ ở sale_balance. balance và locked_balance không liên quan.
      // Validate: sale_balance không được âm sau khi trừ
      if (newSaleBalance < amount) {
        throw new BadRequestException(ErrorCode.WALLET_INSUFFICIENT_BALANCE);
      }
      newSaleBalance -= amount;

      await qb.where('id', walletId).update({
        sale_balance: newSaleBalance,
        updated_at: new Date(),
      });
      return;
    }

    // Deduct from deposit_balance first (non-withdraw path)
    if (newDepositBalance >= remaining) {
      newDepositBalance -= remaining;
      remaining = 0;
    } else {
      remaining -= newDepositBalance;
      newDepositBalance = 0;

      // Deduct the rest from sale_balance
      if (newSaleBalance - Number(wallet.locked_balance) >= remaining) {
        newSaleBalance -= remaining;
        remaining = 0;
      } else {
        throw new BadRequestException(ErrorCode.WALLET_INSUFFICIENT_BALANCE);
      }
    }

    // Validate sale_balance không được âm (non-withdraw path)
    if (newSaleBalance < 0) {
      throw new BadRequestException(ErrorCode.WALLET_INSUFFICIENT_BALANCE);
    }

    await qb.where('id', walletId).update({
      deposit_balance: newDepositBalance,
      sale_balance: newSaleBalance,
      locked_balance: newLockedBalance,
      balance: Number(wallet.balance) - amount,
      updated_at: new Date(),
    });
  }

  async incrementBalance(
    trx: Knex.Transaction,
    walletId: string,
    balanceData: Partial<BalanceData>,
  ): Promise<void> {
    const qb = trx ? trx<Wallet>('wallets') : this.qb;

    const wallet = await qb.where('id', walletId).forUpdate().first();

    if (!wallet) {
      throw new NotFoundException(ErrorCode.WALLET_NOT_FOUND);
    }

    const newData: Partial<Wallet> = {};
    let balanceIncrement = 0;

    if (balanceData.deposit_balance) {
      newData.deposit_balance =
        Number(wallet.deposit_balance) + balanceData.deposit_balance;
      balanceIncrement += balanceData.deposit_balance;
    }
    if (balanceData.sale_balance) {
      newData.sale_balance =
        Number(wallet.sale_balance) + balanceData.sale_balance;
      balanceIncrement += balanceData.sale_balance;
    }
    if (balanceData.locked_balance) {
      newData.locked_balance =
        Number(wallet.locked_balance) + balanceData.locked_balance;
      balanceIncrement += balanceData.locked_balance;
    }

    if (balanceIncrement > 0) {
      newData.balance = Number(wallet.balance) + balanceIncrement;
    }

    await qb.where('id', walletId).update({
      ...newData,
      updated_at: new Date(),
    });
  }

  async updateLockedBalance(
    walletId: string,
    newLockedBalance: number,
    trx?: Knex.Transaction,
  ): Promise<void> {
    const qb = trx ? trx<Wallet>('wallets') : this.qb;
    await qb.where('id', walletId).update({
      locked_balance: newLockedBalance < 0 ? 0 : newLockedBalance,
      updated_at: new Date(),
    });
  }

  async lockWallet(walletId: string): Promise<void> {
    await this.qb.where('id', walletId).update({
      is_locked: true,
      updated_at: new Date(),
    });
  }

  async unlockWallet(walletId: string): Promise<void> {
    await this.qb.where('id', walletId).update({
      is_locked: false,
      updated_at: new Date(),
    });
  }
}
