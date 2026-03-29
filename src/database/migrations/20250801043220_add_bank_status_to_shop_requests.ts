import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table
      .enum('bank_status', ['valid', 'invalid', 'unknown'])
      .defaultTo('unknown');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.dropColumn('bank_status');
  });
}
