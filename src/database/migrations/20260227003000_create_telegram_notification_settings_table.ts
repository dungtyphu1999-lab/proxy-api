import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

  await knex.schema.createTable('telegram_notification_settings', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.boolean('notify_new_message').notNullable().defaultTo(true);
    table.boolean('notify_new_order').notNullable().defaultTo(true);
    table.boolean('notify_new_preorder').notNullable().defaultTo(true);
    table.boolean('notify_warranty_request').notNullable().defaultTo(true);
    table.boolean('notify_new_complaint').notNullable().defaultTo(true);
    table.boolean('notify_admin').notNullable().defaultTo(true);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    table.unique(['user_id']);
    table.index(['user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('telegram_notification_settings');
}
