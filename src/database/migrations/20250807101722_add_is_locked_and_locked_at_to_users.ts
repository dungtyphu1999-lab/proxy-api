import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.boolean('is_locked').defaultTo(false).after('is_verified');
    table.timestamp('locked_at').nullable().after('is_locked');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('locked_at');
    table.dropColumn('is_locked');
  });
}
