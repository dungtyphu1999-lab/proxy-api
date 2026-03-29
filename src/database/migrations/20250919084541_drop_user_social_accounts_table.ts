import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_social_accounts');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_social_accounts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('provider');
    table.string('provider_id');
    table.timestamps(true, true);
  });
}
