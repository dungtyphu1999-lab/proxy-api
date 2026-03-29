import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import {
  WalletTransaction,
  CreateWalletTransactionData,
  WalletTransactionStatus,
  WalletTransactionType,
} from '@/database/entities/wallet-transaction.entity';
import { DatabaseService } from '@/database/database.service';
import {
  PaginationOptions,
  PaginatedResult,
} from '@/shared/pagination/pagination.interface';
import {
  paginateQuery,
  paginateUnionQuery,
} from '@/shared/pagination/pagination.util';
import { Knex } from 'knex';

@Injectable()
export class WalletTransactionRepository extends BaseRepository<WalletTransaction> {
  constructor(private readonly databaseService: DatabaseService) {
    super('wallet_transactions');
  }

  async createTransaction(
    data: CreateWalletTransactionData,
  ): Promise<WalletTransaction> {
    return await this.databaseService.transaction(async (trx) => {
      const result = await trx
        .table('wallet_transactions')
        .insert(data)
        .returning('*');
      return result[0] as WalletTransaction;
    });
  }

  async findByWalletId(walletId: string): Promise<WalletTransaction[]> {
    return await this.qb
      .where('wallet_id', walletId)
      .orderBy('created_at', 'desc');
  }

  async findByWalletIdWithPagination(
    walletId: string,
    options: PaginationOptions & { type?: string; status?: string } = {},
  ): Promise<PaginatedResult<WalletTransaction>> {
    const baseQuery = this.qb.clone().where('wallet_id', walletId);

    if (options.type) {
      baseQuery.andWhere('type', options.type);
    }
    if (options.status) {
      baseQuery.andWhere('status', options.status);
    }

    const paginationOptions: PaginationOptions = {
      page: options.page || 1,
      limit: options.limit || 10,
      search: options.search,
      searchFields: options.searchFields || [
        'transaction_number',
        'note',
        'method',
        'type',
        'status',
      ],
      orderBy: options.orderBy || 'created_at',
      orderDir: options.orderDir || 'desc',
      filters: options.filters,
    };

    return await paginateQuery<WalletTransaction>(baseQuery, paginationOptions);
  }

  async getByUserIdWithPagination(
    userId: string,
    options: PaginationOptions & {
      types?: string[];
      status?: string;
      start_date?: string;
      end_date?: string;
      exclude_pending_deposits?: boolean;
    } = {},
  ): Promise<
    PaginatedResult<
      WalletTransaction & {
        order_info?: any;
      }
    >
  > {
    // Check if types include 'order'
    const hasOrderType = options.types?.includes('order');
    const walletTypes = options.types
      ? options.types.filter((type) => type !== 'order')
      : [];

    if (
      options.types?.length === 1 &&
      hasOrderType &&
      options.status &&
      options.status !== 'success'
    ) {
      return {
        records: [],
        meta: {
          total: 0,
          page: options.page || 1,
          limit: options.limit || 10,
          totalPages: 0,
          hasPreviousPage: false,
          hasNextPage: false,
          previousPage: null,
          nextPage: null,
        },
      };
    }

    let baseQuery: Knex.QueryBuilder;

    // If no types specified, show both orders and wallet transactions
    if (!options.types || options.types.length === 0) {
      // Union query for both orders and wallet transactions when no types specified
      const queries: Knex.QueryBuilder[] = [];

      // Add orders query only if status allows it
      if (!options.status || options.status === 'success') {
        queries.push(this.buildOrderQuery(userId, options));
      }

      // Always add wallet transactions query
      queries.push(this.buildWalletTransactionQuery(userId, options));

      if (queries.length === 1) {
        baseQuery = queries[0];
      } else {
        const unionQuery = this.knexInstance.union(queries);
        baseQuery = this.knexInstance
          .select('*')
          .from(unionQuery.as('combined_results'));
      }
    } else if (hasOrderType && walletTypes.length > 0) {
      // Union query for both orders and wallet transactions
      const queries: Knex.QueryBuilder[] = [];

      // Add orders query only if status allows it
      if (!options.status || options.status === 'success') {
        queries.push(this.buildOrderQuery(userId, options));
      }

      // Add wallet transactions query
      queries.push(
        this.buildWalletTransactionQuery(userId, {
          ...options,
          types: walletTypes,
        }),
      );

      if (queries.length === 1) {
        baseQuery = queries[0];
      } else {
        const unionQuery = this.knexInstance.union(queries);
        baseQuery = this.knexInstance
          .select('*')
          .from(unionQuery.as('combined_results'));
      }
    } else if (hasOrderType) {
      // Only orders
      baseQuery = this.buildOrderQuery(userId, options);
    } else {
      // Only wallet transactions
      baseQuery = this.buildWalletTransactionQuery(userId, options);
    }

    // Determine if we're using UNION query
    const sqlString = baseQuery.toSQL().sql;
    const isUnionQuery = sqlString.includes('UNION');

    const paginationOptions: PaginationOptions = {
      page: options.page || 1,
      limit: options.limit || 10,
      search: options.search,
      // searchFields:
      //   options.searchFields ||
      //   (isUnionQuery
      //     ? ['transaction_number', 'note', 'method', 'type', 'order_number']
      //     : [
      //         'transaction_number',
      //         'note',
      //         'method',
      //         'type',
      //         'status',
      //         'order_number',
      //       ]),
      searchFields:
        options.searchFields ||
        (isUnionQuery
          ? ['transaction_number', 'note', 'method', 'type', 'order_number']
          : hasOrderType
            ? ['orders.order_number', 'orders.status'] // map đúng cột thật
            : [
                'wallet_transactions.transaction_number',
                'wallet_transactions.note',
                'wallet_transactions.method',
                'wallet_transactions.type',
                'wallet_transactions.status',
              ]),
      orderBy: options.orderBy || 'created_at',
      orderDir: options.orderDir || 'desc',
      filters: options.filters,
    };

    return await paginateUnionQuery<
      WalletTransaction & {
        order_info?: any;
      }
    >(this.knexInstance, baseQuery, paginationOptions);
  }

  private buildOrderQuery(
    userId: string,
    options: {
      status?: string;
      start_date?: string;
      end_date?: string;
    },
  ) {
    const query = this.knexInstance('orders')
      .select([
        this.knexInstance.raw('orders.order_number::text as id'),
        'orders.order_number as transaction_number',
        this.knexInstance.raw('NULL::uuid as wallet_id'),
        'orders.buyer_id as user_id',
        this.knexInstance.raw('?::text as method', ['order']),
        'orders.total_amount as amount',
        this.knexInstance.raw('0::numeric as fee_amount'),
        this.knexInstance.raw('orders.status::text as status'),
        this.knexInstance.raw('orders.order_number::text as reference_code'),
        this.knexInstance.raw('NULL::jsonb as bank_info'),
        this.knexInstance.raw('NULL::text as note'),
        this.knexInstance.raw('NULL::text as transfer_proof_path'),
        'orders.created_at',
        'orders.updated_at as completed_at',
        this.knexInstance.raw('?::text as type', ['order']),
        'orders.id as order_id',
        this.knexInstance.raw('orders.order_number::text as order_number'),
        'orders.total_amount as order_total_amount',
        this.knexInstance.raw('orders.status::text as order_status'),
        'orders.created_at as order_created_at',
        'orders.updated_at as order_updated_at',
      ])
      .where('orders.buyer_id', userId)
      .andWhere('orders.status', 'completed');

    // For orders, only filter by status if it's 'completed' or if no status filter is applied
    // The query already filters by 'completed' status above, so no additional filtering needed
    if (options.start_date) {
      query.andWhere('orders.created_at', '>=', options.start_date);
    }
    if (options.end_date) {
      query.andWhere('orders.created_at', '<=', options.end_date);
    }

    return query;
  }

  private buildWalletTransactionQuery(
    userId: string,
    options: {
      types?: string[];
      status?: string;
      start_date?: string;
      end_date?: string;
      exclude_pending_deposits?: boolean;
    },
  ) {
    const query = this.knexInstance('wallet_transactions')
      .select([
        this.knexInstance.raw('wallet_transactions.id::text as id'),
        'wallet_transactions.transaction_number',
        'wallet_transactions.wallet_id',
        'wallet_transactions.user_id',
        this.knexInstance.raw('wallet_transactions.method::text as method'),
        'wallet_transactions.amount',
        'wallet_transactions.fee_amount',
        this.knexInstance.raw('wallet_transactions.status::text as status'),
        this.knexInstance.raw(
          'wallet_transactions.reference_code::text as reference_code',
        ),
        this.knexInstance.raw(
          'wallet_transactions.bank_info::jsonb as bank_info',
        ),
        this.knexInstance.raw('wallet_transactions.note::text as note'),
        this.knexInstance.raw(
          'wallet_transactions.transfer_proof_path::text as transfer_proof_path',
        ),
        'wallet_transactions.created_at',
        'wallet_transactions.completed_at',
        this.knexInstance.raw('wallet_transactions.type::text as type'),
        this.knexInstance.raw('NULL::uuid as order_id'),
        this.knexInstance.raw('NULL::text as order_number'),
        this.knexInstance.raw('NULL::numeric as order_total_amount'),
        this.knexInstance.raw('NULL::text as order_status'),
        this.knexInstance.raw('NULL::timestamp as order_created_at'),
        this.knexInstance.raw('NULL::timestamp as order_updated_at'),
      ])
      .where('wallet_transactions.user_id', userId);

    // Exclude deposit transactions with pending status if option is enabled
    if (options.exclude_pending_deposits) {
      query.andWhereNot(function () {
        this.where(
          'wallet_transactions.type',
          'deposit' as WalletTransactionType,
        ).andWhere(
          'wallet_transactions.status',
          'pending' as WalletTransactionStatus,
        );
      });
    }

    if (options.types && options.types.length > 0) {
      query.whereIn('wallet_transactions.type', options.types);
    }
    if (options.status) {
      query.andWhere('wallet_transactions.status', options.status);
    }
    if (options.start_date) {
      query.andWhere(
        'wallet_transactions.created_at',
        '>=',
        options.start_date,
      );
    }
    if (options.end_date) {
      query.andWhere('wallet_transactions.created_at', '<=', options.end_date);
    }

    return query;
  }

  async findById(id: string): Promise<WalletTransaction | null> {
    const transaction = await this.qb.where('id', id).first();
    return transaction || null;
  }

  async findStatusById(
    id: string,
  ): Promise<{ id: string; status: string; user_id: string } | null> {
    const transaction = await this.qb
      .select('id', 'status', 'user_id')
      .where('id', id)
      .first();
    return transaction || null;
  }

  async findByReferenceCode(
    referenceCode: string,
    minutes?: number,
  ): Promise<WalletTransaction | null> {
    let query = this.qb
      .where('reference_code', referenceCode)
      .andWhere('status', 'pending' as WalletTransactionStatus);

    if (minutes) {
      query = query.andWhere(
        'created_at',
        '>=',
        new Date(Date.now() - minutes * 60 * 1000),
      );
    }

    const transaction = await query.first();
    return transaction || null;
  }

  async updateStatus(
    id: string,
    status: WalletTransaction['status'],
    completedAt?: Date,
  ): Promise<void> {
    await this.databaseService.transaction(async (trx) => {
      await trx
        .table('wallet_transactions')
        .where('id', id)
        .update({ status, completed_at: completedAt });
    });
  }

  async findPendingTransactions(): Promise<WalletTransaction[]> {
    return await this.qb
      .where('status', 'pending')
      .orderBy('created_at', 'desc');
  }

  async deletePendingDepositOlderThan(minutes: number): Promise<number> {
    const minutesAgo = new Date(Date.now() - minutes * 60 * 1000);

    const result = await this.qb
      .where('status', 'pending')
      .andWhere('type', 'deposit' as WalletTransactionType)
      .andWhere('created_at', '<', minutesAgo)
      .del();

    return result;
  }

  async createOrderReleaseTransaction(
    trx: Knex.Transaction,
    userId: string,
    walletId: string,
    amount: number,
    transactionNumber: string,
    note: string,
  ): Promise<void> {
    // Create wallet transaction for shop
    await trx('wallet_transactions').insert({
      wallet_id: walletId,
      user_id: userId,
      type: 'order_release' satisfies WalletTransactionType,
      amount: amount,
      status: 'success',
      note: note,
      transaction_number: transactionNumber,
      created_at: trx.fn.now(),
      completed_at: trx.fn.now(),
    });
  }
}
