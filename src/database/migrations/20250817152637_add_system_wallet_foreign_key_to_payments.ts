import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payments', (table) => {
    table
      .foreign('system_wallet_id')
      .references('id')
      .inTable('system_wallets');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payments', (table) => {
    table.dropForeign('system_wallet_id');
  });
}
