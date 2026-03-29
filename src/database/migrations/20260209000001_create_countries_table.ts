import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('countries', (table) => {
    table.string('code', 2).primary().comment('ISO 3166-1 alpha-2');
    table.string('name_vi', 100);
    table.string('name_en', 100);
    table.string('continent', 20);
    table.boolean('is_popular').defaultTo(false);
    table.integer('sort_order').defaultTo(0);
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(
    'CREATE INDEX idx_countries_continent ON countries(continent)',
  );
  await knex.raw(
    'CREATE INDEX idx_countries_is_popular ON countries(is_popular)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('countries');
}
