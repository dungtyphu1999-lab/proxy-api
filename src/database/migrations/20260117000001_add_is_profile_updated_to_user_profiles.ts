import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_profiles', (table) => {
    table.boolean('is_profile_updated').defaultTo(false).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_profiles', (table) => {
    table.dropColumn('is_profile_updated');
  });
}
