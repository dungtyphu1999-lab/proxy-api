import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Drop existing table (safe since no data)
  await knex.schema.dropTableIfExists('banners');

  // Recreate table with UUID
  await knex.schema.createTable('banners', (table) => {
    table.uuid('id').primary();
    table.string('title', 255).notNullable();
    table.text('image_url').notNullable();
    table.text('desc').nullable();
    table.text('link_url').nullable();
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.date('start_date').nullable();
    table.date('end_date').nullable();
    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();

    // Indexes for performance
    table.index(['is_active']);
    table.index(['sort_order']);
    table.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop UUID table
  await knex.schema.dropTableIfExists('banners');

  // Recreate with auto-increment (rollback)
  await knex.schema.createTable('banners', (table) => {
    table.increments('id').primary();
    table.string('title', 255).notNullable();
    table.text('image_url').notNullable();
    table.text('desc').nullable();
    table.text('link_url').nullable();
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.date('start_date').nullable();
    table.date('end_date').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['is_active']);
    table.index(['sort_order']);
    table.index(['created_at']);
  });
}
