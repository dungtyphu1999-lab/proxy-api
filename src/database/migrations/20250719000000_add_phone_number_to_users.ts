import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_profiles', (table) => {
    table.dropColumn('phone_number');
  });
  await knex.schema.alterTable('users', (table) => {
    table.string('phone_number').nullable().after('username');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user_profiles', (table) => {
    table.string('phone_number').nullable();
  });
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('phone_number');
  });
}
