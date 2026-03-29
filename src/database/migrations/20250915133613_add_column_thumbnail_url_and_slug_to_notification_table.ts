import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notifications', (table) => {
    table
      .string('slug')
      .nullable()
      .comment('URL-friendly identifier for the notification');
    table
      .string('thumbnail_url')
      .nullable()
      .comment('URL to the notification thumbnail image');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notifications', (table) => {
    table.dropColumn('slug');
    table.dropColumn('thumbnail_url');
  });
}
