import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shops', (table) => {
    table
      .uuid('shop_request_id')
      .references('id')
      .inTable('shop_requests')
      .after('id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shops', (table) => {
    table.dropColumn('shop_request_id');
  });
}
