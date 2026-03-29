import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_locations', (table) => {
    table.bigIncrements('id').primary();
    table.string('location_key', 20).notNullable().unique();
    table.string('country_code', 2);
    table.string('name_vi', 100);
    table.string('name_en', 100);
    table.integer('available_count').defaultTo(0);
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(
    'CREATE INDEX idx_proxy_locations_country ON proxy_locations(country_code)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_locations');
}
