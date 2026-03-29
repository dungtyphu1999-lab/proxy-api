import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.string('bank_name').nullable().after('bank_code');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.dropColumn('bank_name');
  });
}
