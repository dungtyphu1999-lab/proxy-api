import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_products', (table) => {
    table.bigIncrements('id').primary();
    table.string('code', 50).notNullable().unique();
    table.string('name_vi', 255);
    table.string('name_en', 255);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_products');
}
