import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_products', (table) => {
    table.specificType('description_quantity', 'text[]').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('option_products', (table) => {
    table.dropColumn('description_quantity');
  });
}
