import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn('users', 'last_online_at');
  if (!hasColumn) {
    await knex.schema.alterTable('users', (table) => {
      table.timestamp('last_online_at').nullable().after('locked_at');
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('last_online_at');
  });
}
