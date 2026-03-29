import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_products', (table) => {
    table
      .text('status')
      .notNullable()
      .defaultTo('approved');
    table
      .jsonb('pending_description_quantity')
      .notNullable()
      .defaultTo(knex.raw(`'[]'::jsonb`));
    table
      .jsonb('pending_account_keys')
      .notNullable()
      .defaultTo(knex.raw(`'[]'::jsonb`));
    table.text('pending_zip_file_path').nullable();
    table.text('pending_zip_file_name').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_products', (table) => {
    table.dropColumn('pending_zip_file_name');
    table.dropColumn('pending_zip_file_path');
    table.dropColumn('pending_account_keys');
    table.dropColumn('pending_description_quantity');
    table.dropColumn('status');
  });
}
