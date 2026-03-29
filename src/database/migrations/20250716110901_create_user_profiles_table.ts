import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_profiles', (table) => {
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('full_name');
    table.string('avatar_url');
    table.string('phone_number');
    table.date('dob');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_profiles');
}
