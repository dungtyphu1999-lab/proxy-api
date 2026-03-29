import { Injectable } from '@nestjs/common';
import { Role } from '@/database/entities/role.entity';
import { BaseRepository } from '@/database/repositories/base.repository';
import { Knex } from 'knex';

@Injectable()
export class RolesRepository extends BaseRepository<Role> {
  constructor() {
    super('roles');
  }

  async findByName(name: string, trx?: Knex.Transaction) {
    const qb = trx ? trx<Role>('roles') : this.qb;
    return qb.where({ name }).first();
  }

  async findAll(trx?: Knex.Transaction) {
    const qb = trx ? trx<Role>('roles') : this.qb;
    return qb.select('*');
  }

  async findOne(id: string, trx?: Knex.Transaction) {
    const qb = trx ? trx<Role>('roles') : this.qb;
    return qb.where({ id }).first();
  }

  async findUserRoleNames(
    userId: string,
    trx?: Knex.Transaction,
  ): Promise<string[]> {
    const qb = trx ? trx<Role>('roles') : this.qb;
    const result = await qb
      .join('user_role_map', 'roles.id', 'user_role_map.role_id')
      .where('user_role_map.user_id', userId)
      .select<Role[]>('roles.name');

    return result.map((role) => role.name);
  }
}
