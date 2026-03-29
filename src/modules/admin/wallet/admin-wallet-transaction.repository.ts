import { DatabaseService } from '@/database/database.service';
import { WalletTransaction } from '@/database/entities/wallet-transaction.entity';
import { BaseRepository } from '@/database/repositories/base.repository';
import {
  PaginatedResult,
  PaginationOptions,
} from '@/shared/pagination/pagination.interface';
import { paginateQuery } from '@/shared/pagination/pagination.util';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { pickBy } from 'lodash';

@Injectable()
export class AdminWalletTransactionRepository extends BaseRepository<WalletTransaction> {
  constructor(private readonly databaseService: DatabaseService) {
    super('wallet_transactions');
  }

  async findById(id: string): Promise<WalletTransaction | null> {
    const transaction = await this.qb.where('id', id).first();
    return transaction || null;
  }

  async updateStatus(
    id: string,
    status: WalletTransaction['status'],
    completedAt?: Date,
    note?: string,
  ): Promise<void> {
    await this.databaseService.transaction(async (trx) => {
      const updateData: {
        status: WalletTransaction['status'];
        completed_at?: Date;
        note?: string;
      } = { status, completed_at: completedAt };

      if (note !== undefined) {
        updateData.note = note;
      }

      await trx.table('wallet_transactions').where('id', id).update(updateData);
    });
  }

  async update(
    id: string,
    data: Partial<WalletTransaction>,
    trx?: Knex.Transaction,
  ) {
    const qb = trx ? trx<WalletTransaction>('wallet_transactions') : this.qb;

    const updateData: Partial<WalletTransaction> = pickBy(
      data,
      (value) => !!value,
    );
    const [walletTransaction] = await qb
      .where({ id: id })
      .update(updateData)
      .returning('*');
    return walletTransaction;
  }

  async getWithdrawalsWithPagination(
    options: PaginationOptions & {
      status?: string[];
      authorId?: string;
      typeTransaction?: string[];
    } = {},
  ): Promise<PaginatedResult<WalletTransaction>> {
    const baseQuery = this.qb
      .clone()
      .leftJoin('users', 'wallet_transactions.user_id', 'users.id')
      .select(
        'wallet_transactions.*',
        'users.id as user_id',
        'users.email as user_email',
        'users.username as user_username',
      );

    // Apply status filter if provided
    if (options.authorId) {
      baseQuery.where('wallet_transactions.user_id', options.authorId);
    }

    if (options.status && options.status.length > 0) {
      baseQuery.whereIn('wallet_transactions.status', options.status);
    }

    if (options.typeTransaction && options.typeTransaction.length > 0) {
      baseQuery.whereIn('wallet_transactions.type', options.typeTransaction);
    }

    // Configure pagination options with defaults
    const paginationOptions: PaginationOptions = {
      page: options.page || 1,
      limit: options.limit || 10,
      search: options.search,
      searchFields: options.searchFields || [
        'transaction_number',
        'note',
        'users.email',
        'users.username',
      ],
      orderBy: options.orderBy || 'wallet_transactions.created_at',
      orderDir: options.orderDir || 'asc',
      filters: options.filters,
    };

    // Execute pagination query
    return await paginateQuery<WalletTransaction>(baseQuery, paginationOptions);
  }
}
