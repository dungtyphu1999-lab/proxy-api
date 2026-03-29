import { Inject } from '@nestjs/common';
import { Knex } from 'knex';

export class BaseRepository<T extends object> {
  @Inject('KnexConnection')
  private readonly knex: Knex;
  private trx: Knex.Transaction;

  constructor(private readonly tableName: string) {}

  get qb() {
    return this.trx
      ? this.trx<T>(this.tableName)
      : this.knex<T>(this.tableName);
  }

  protected get knexInstance() {
    return this.knex;
  }

  set transacting(trx: Knex.Transaction) {
    this.trx = trx;
  }
}
