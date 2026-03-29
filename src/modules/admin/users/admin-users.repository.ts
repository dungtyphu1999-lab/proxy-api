import { User } from '@/database/entities/user.entity';
import { BaseRepository } from '@/database/repositories/base.repository';
import type {
  PaginatedResult,
  PaginationOptions,
} from '@/shared/pagination/pagination.interface';
import { paginateQuery } from '@/shared/pagination/pagination.util';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminUsersRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async findById(id: string): Promise<(User & { full_name: string }) | null> {
    const user = await this.qb
      .from('users')
      .select('users.*', 'user_profiles.full_name')
      .leftJoin('user_profiles', 'user_profiles.user_id', 'users.id')
      .where('users.id', id)
      .first<User & { full_name: string }>();

    return user || null;
  }

  async findAllUsers(
    options: PaginationOptions & {
      isLocked?: number;
      isVerified?: number;
    } = {},
  ): Promise<PaginatedResult<User>> {
    const baseQuery = this.qb
      .select(
        'users.id',
        'users.username',
        'users.email',
        'users.is_locked',
        'users.is_verified',
        'users.created_at',
        'users.updated_at',
        'user_profiles.full_name',
        'wallets.balance as wallet_balance',
        'wallets.currency as wallet_currency',
        'shops.id as shop_id',
      )
      .leftJoin('user_profiles', 'user_profiles.user_id', 'users.id')
      .leftJoin('wallets', 'wallets.user_id', 'users.id')
      .leftJoin('shops', 'shops.owner_id', 'users.id')
      .leftJoin('user_role_map', 'user_role_map.user_id', 'users.id')
      .leftJoin('roles', 'roles.id', 'user_role_map.role_id')
      .whereNotIn('users.id', function () {
        this.select('user_id')
          .from('user_role_map')
          .leftJoin('roles', 'roles.id', 'user_role_map.role_id')
          .where('roles.name', 'admin');
      });

    if (options.isLocked === 1) {
      baseQuery.where('users.is_locked', 1);
    } else if (typeof options.isVerified === 'number') {
      baseQuery.where('users.is_locked', 0);
      baseQuery.andWhere('users.is_verified', options.isVerified);
    }

    const paginationOptions: PaginationOptions = {
      page: options.page || 1,
      limit: options.limit || 10,
      search: options.search,
      searchFields: options.searchFields || [
        'users.email',
        'user_profiles.full_name',
      ],
      orderBy: options.orderBy || 'users.created_at',
      orderDir: options.orderDir || 'desc',
      filters: options.filters,
    };

    return await paginateQuery<User>(baseQuery, paginationOptions);
  }

  async updateUserStatusAndLog(
    userId: string,
    isLocked: boolean,
    reason: string,
    note: string,
    performedBy: string,
  ) {
    const now = new Date();

    const [updatedUser] = await this.qb
      .where('id', userId)
      .update({ is_locked: isLocked, locked_at: now, updated_at: now })
      .returning('*');

    if (!updatedUser) {
      throw new Error(`User ${userId} not found`);
    }

    await this.qb.from('user_lock_logs').insert({
      user_id: userId,
      action: isLocked ? 'lock' : 'unlock',
      reason: reason || 'others',
      note,
      performed_by: performedBy,
      created_at: now,
      updated_at: now,
    });

    return updatedUser;
  }

  async updateUser(id: string, updates: Partial<User>) {
    const [user] = await this.qb.where('id', id).update(updates).returning('*');

    return user;
  }

  async findUserExist(id: string) {
    const user = await this.qb.where('id', id).first();
    return user || null;
  }
}
