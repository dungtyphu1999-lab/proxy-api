import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

  await knex.schema.createTable('telegram_connections', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.bigInteger('telegram_user_id').notNullable();
    table.bigInteger('chat_id').notNullable();
    table.string('telegram_username');
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamp('connected_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table.unique(['user_id']);
    table.unique(['telegram_user_id']);
    table.unique(['chat_id']);

    table.index(['user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('telegram_connections');
}
