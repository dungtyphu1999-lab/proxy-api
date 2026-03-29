import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_product_options', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('proxy_products')
      .onDelete('CASCADE');
    table.string('option_type', 30).notNullable();
    table.string('option_value', 50).notNullable();
    table.string('label', 255);
    table.string('description', 500);
    table.decimal('price_per_month', 12, 2);
    table.decimal('price_per_unit', 12, 4);
    table.jsonb('extra_data');
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(`
    CREATE UNIQUE INDEX idx_proxy_product_options_unique
      ON proxy_product_options(product_id, option_type, option_value);
  `);
  await knex.raw(`
    CREATE INDEX idx_proxy_product_options_product_type
      ON proxy_product_options(product_id, option_type);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_product_options');
}
