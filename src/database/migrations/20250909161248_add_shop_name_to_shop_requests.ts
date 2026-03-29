import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.string('shop_name', 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.dropColumn('shop_name');
  });
}
