import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('categories', (table) => {
    table.integer('order').notNullable().defaultTo(0);
    table.boolean('is_coming_soon').notNullable().defaultTo(false);
  });

  // Create index for sorting by order
  await knex.schema.raw(
    'CREATE INDEX idx_categories_order ON categories("order")',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.raw('DROP INDEX IF EXISTS idx_categories_order');

  await knex.schema.alterTable('categories', (table) => {
    table.dropColumn('order');
    table.dropColumn('is_coming_soon');
  });
}
