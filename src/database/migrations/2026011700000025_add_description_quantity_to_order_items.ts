import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('order_items', (table) => {
    table
      .specificType('quantity_download', 'text[]')
      .nullable()
      .comment('Danh sách link / nội dung download theo số lượng');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('order_items', (table) => {
    table.dropColumn('quantity_download');
  });
}
