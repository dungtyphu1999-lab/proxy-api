import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TABLE notifications 
    ALTER COLUMN type TYPE VARCHAR(50)
  `);

  await knex.schema.alterTable('notifications', (table) => {
    table.dropForeign(['user_id']);
    table.dropColumn('user_id');
  });

  await knex.schema.alterTable('notifications', (table) => {
    table.dropColumn('is_read');
  });

  await knex.schema.alterTable('notifications', (table) => {
    table.dropColumn('read_at');
  });

  await knex.schema.alterTable('notifications', (table) => {
    table
      .uuid('created_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });

  // Add target_audience column to distinguish between admin and user notifications
  await knex.schema.alterTable('notifications', (table) => {
    table
      .enum('target_audience', ['admin', 'user', 'all'])
      .defaultTo('user')
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notifications', (table) => {
    table.dropForeign(['created_by']);
    table.dropColumn('created_by');
  });

  // Drop target_audience column
  await knex.schema.alterTable('notifications', (table) => {
    table.dropColumn('target_audience');
  });

  await knex.schema.alterTable('notifications', (table) => {
    table.timestamp('read_at');
  });

  await knex.schema.alterTable('notifications', (table) => {
    table.boolean('is_read').defaultTo(false);
  });

  await knex.schema.alterTable('notifications', (table) => {
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
  });

  await knex.raw(`
    ALTER TABLE notifications 
    ALTER COLUMN type TYPE VARCHAR(50)
  `);
}
