import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('system_wallets', (table) => {
    table
      .specificType('wallet_type', 'system_wallet_type')
      .notNullable()
      .after('id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('system_wallets', (table) => {
    table.dropColumn('wallet_type');
  });
}
