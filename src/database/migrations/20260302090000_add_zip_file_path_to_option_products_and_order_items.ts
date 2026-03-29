import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_products', (table) => {
    table.text('zip_file_path').nullable();
    table.text('zip_file_name').nullable();
  });

  await knex.schema.alterTable('order_items', (table) => {
    table.text('download_link').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('order_items', (table) => {
    table.dropColumn('download_link');
  });

  await knex.schema.alterTable('option_products', (table) => {
    table.dropColumn('zip_file_path');
    table.dropColumn('zip_file_name');
  });
}
