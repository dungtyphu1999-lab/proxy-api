import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('order_items', (table) => {
    // Remove unnecessary fields
    table.dropColumn('product_name');
    table.dropColumn('product_slug');
    table.dropColumn('product_image');
    table.dropColumn('download_url');
    table.dropColumn('password_download');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('order_items', (table) => {
    // Restore removed fields
    table.string('product_name', 255).notNullable();
    table.string('product_slug', 255).notNullable();
    table.text('product_image');
    table.text('download_url');
    table.string('password_download', 255);
  });
}
