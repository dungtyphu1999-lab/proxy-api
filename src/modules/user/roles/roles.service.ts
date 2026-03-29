import { Injectable } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { Knex } from 'knex';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findByName(name: string, trx?: Knex.Transaction) {
    return this.rolesRepository.findByName(name, trx);
  }

  async findAll(trx?: Knex.Transaction) {
    return this.rolesRepository.findAll(trx);
  }

  async findOne(id: string, trx?: Knex.Transaction) {
    return this.rolesRepository.findOne(id, trx);
  }

  async getUserRoleNames(
    userId: string,
    trx?: Knex.Transaction,
  ): Promise<string[]> {
    return this.rolesRepository.findUserRoleNames(userId, trx);
  }
}
