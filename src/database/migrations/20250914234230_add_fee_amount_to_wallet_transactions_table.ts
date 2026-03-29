import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table
      .decimal('fee_amount', 14, 2)
      .notNullable()
      .defaultTo(0)
      .after('amount');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('fee_amount');
  });
}
