import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.string('transaction_number', 20).notNullable().after('id').unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('transaction_number');
  });
}
