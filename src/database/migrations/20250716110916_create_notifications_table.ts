import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notifications', (table) => {
    table.increments('id').primary();
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.string('type', 50).notNullable();
    table.string('title', 255).notNullable();
    table.text('message').notNullable();
    table.text('link_url');
    table.boolean('is_read').defaultTo(false);
    table.boolean('is_global').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('read_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notifications');
}
