import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('banners', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('image_url').notNullable();
    table.text('desc');
    table.text('link_url');
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.date('start_date');
    table.date('end_date');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('banners');
}
