import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_price_matrix', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('proxy_products')
      .onDelete('CASCADE');
    table
      .bigInteger('exclusivity_option_id')
      .unsigned()
      .references('id')
      .inTable('proxy_product_options')
      .onDelete('SET NULL');
    table
      .bigInteger('quantity_option_id')
      .unsigned()
      .references('id')
      .inTable('proxy_product_options')
      .onDelete('SET NULL');
    table
      .bigInteger('bandwidth_option_id')
      .unsigned()
      .references('id')
      .inTable('proxy_product_options')
      .onDelete('SET NULL');
    table.string('price_type', 20).notNullable(); // 'fixed' | 'per_unit' | 'per_month'
    table.decimal('price_value_vnd', 15, 2).notNullable(); // Giá bằng VND
    table.decimal('price_original_usd', 12, 4); // Giá gốc bằng USD (để reference)
    table.string('price_original_text', 50); // Giá gốc dạng text (ví dụ: "$3.50", "$0.24/IP", "$5.00/MO")
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  // Index để query nhanh theo combination
  await knex.raw(`
    CREATE UNIQUE INDEX idx_proxy_price_matrix_unique
      ON proxy_price_matrix(product_id, exclusivity_option_id, quantity_option_id, bandwidth_option_id)
      WHERE is_active = true;
  `);

  await knex.raw(`
    CREATE INDEX idx_proxy_price_matrix_product
      ON proxy_price_matrix(product_id, is_active);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_price_matrix');
}
