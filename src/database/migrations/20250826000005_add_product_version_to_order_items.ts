import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('order_items', (table) => {
    table
      .uuid('product_version_id')
      .references('id')
      .inTable('product_versions')
      .onDelete('SET NULL');

    // Index cho product_version_id
    table.index(['product_version_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('order_items', (table) => {
    table.dropIndex(['product_version_id']);
    table.dropColumn('product_version_id');
  });
}
