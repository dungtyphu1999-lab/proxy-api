import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallets', (table) => {
    table.decimal('deposit_balance', 14, 2).defaultTo(0);
    table.decimal('sale_balance', 14, 2).defaultTo(0);
    table.decimal('locked_balance', 14, 2).defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallets', (table) => {
    table.dropColumn('deposit_balance');
    table.dropColumn('sale_balance');
    table.dropColumn('locked_balance');
  });
}
