import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_products', (table) => {
    table
      .specificType('account_keys', 'text[]')
      .nullable()
      .comment('Danh sách key dùng để check trùng');
    table
      .string('data_source')
      .nullable()
      .comment('Nguồn dữ liệu: txt | zip');
    table
      .string('data_delimiter')
      .nullable()
      .comment('Ký tự phân cách dữ liệu');
    table
      .integer('key_column')
      .nullable()
      .comment('Cột key (1-based)');
  });

  await knex.schema.alterTable('order_items', (table) => {
    table
      .specificType('account_keys', 'text[]')
      .nullable()
      .comment('Danh sách key đã bán');
  });

  await knex.schema.raw(
    'CREATE INDEX IF NOT EXISTS option_products_account_keys_gin ON option_products USING GIN (account_keys)',
  );
  await knex.schema.raw(
    'CREATE INDEX IF NOT EXISTS order_items_account_keys_gin ON order_items USING GIN (account_keys)',
  );
  await knex.schema.raw(
    'CREATE INDEX IF NOT EXISTS option_products_description_quantity_gin ON option_products USING GIN (description_quantity)',
  );
  await knex.schema.raw(
    'CREATE INDEX IF NOT EXISTS order_items_quantity_download_gin ON order_items USING GIN (quantity_download)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw(
    'DROP INDEX IF EXISTS option_products_account_keys_gin',
  );
  await knex.schema.raw('DROP INDEX IF EXISTS order_items_account_keys_gin');
  await knex.schema.raw(
    'DROP INDEX IF EXISTS option_products_description_quantity_gin',
  );
  await knex.schema.raw(
    'DROP INDEX IF EXISTS order_items_quantity_download_gin',
  );

  await knex.schema.alterTable('option_products', (table) => {
    table.dropColumn('account_keys');
    table.dropColumn('data_source');
    table.dropColumn('data_delimiter');
    table.dropColumn('key_column');
  });

  await knex.schema.alterTable('order_items', (table) => {
    table.dropColumn('account_keys');
  });
}
