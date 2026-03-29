import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/database/repositories/base.repository';
import { User } from '@/database/entities';
import { Knex } from 'knex';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('users');
  }

  async findByEmail(email: string) {
    const user = await this.qb.where('email', email).first();
    return user || null;
  }

  async findByUsername(username: string) {
    const user = await this.qb.where('username', username).first();
    return user || null;
  }

  async findByPhone(phone: string) {
    const user = await this.qb.where('phone_number', phone).first();
    return user || null;
  }

  async findById(id: string) {
    const user = await this.qb.where('id', id).first();
    return user || null;
  }

  async createUser(data: Partial<User>, trx?: Knex.Transaction) {
    const qb = trx ? trx<User>('users') : this.qb;
    const [user] = await qb.insert(data).returning('*');

    return user;
  }

  async updateUser(id: string, updates: Partial<User>) {
    const [user] = await this.qb.where('id', id).update(updates).returning('*');

    return user;
  }

  async findAdminUser(): Promise<User | null> {
    const adminRoleId = '00000000-0000-0000-0000-000000000001';

    const user = (await this.qb
      .select('users.*')
      .from('users')
      .join('user_role_map', 'users.id', 'user_role_map.user_id')
      .where('user_role_map.role_id', adminRoleId)
      .orderBy('users.created_at', 'asc')
      .first()) as User | undefined;

    return user || null;
  }

  async hasAdminRole(userId: string): Promise<boolean> {
    const adminRoleId = '00000000-0000-0000-0000-000000000001';

    const result = (await this.qb
      .select('user_role_map.role_id')
      .from('user_role_map')
      .where('user_role_map.user_id', userId)
      .where('user_role_map.role_id', adminRoleId)
      .first()) as { role_id: string } | undefined;

    return !!result;
  }

  async updateLastOnlineAt(userId: string): Promise<void> {
    await this.qb
      .where('id', userId)
      .update({ last_online_at: new Date() } as Partial<User>);
  }

  async getLastOnlineAt(userId: string): Promise<Date | null> {
    const user = await this.qb
      .select('last_online_at')
      .where('id', userId)
      .first<{ last_online_at: Date | null }>();
    return user?.last_online_at ?? null;
  }

  async setOnlineStatus(userId: string, isOnline: boolean): Promise<void> {
    await this.qb
      .where('id', userId)
      .update({ is_online: isOnline } as Partial<User>);
  }

  async updateLastOnlineAtAndSetOnline(userId: string): Promise<void> {
    await this.qb.where('id', userId).update({
      last_online_at: new Date(),
      is_online: true,
    } as Partial<User>);
  }

  async updateUsersOfflineIfInactive(minutes: number): Promise<number> {
    const cutoffTime = new Date();
    cutoffTime.setMinutes(cutoffTime.getMinutes() - minutes);

    const result = await this.qb
      .where('is_online', true)
      .where((builder) => {
        builder
          .whereNull('last_online_at')
          .orWhere('last_online_at', '<', cutoffTime);
      })
      .update({ is_online: false } as Partial<User>);

    return result;
  }
}
