import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.dropColumn('is_free');
    table
      .uuid('pending_version_id')
      .nullable()
      .references('id')
      .inTable('product_versions');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('products', (table) => {
    table.dropColumn('pending_version_id');
    table.boolean('is_free').defaultTo(false);
  });
}
