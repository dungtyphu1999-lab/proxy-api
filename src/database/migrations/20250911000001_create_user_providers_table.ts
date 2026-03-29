import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_providers', (table) => {
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('provider').notNullable(); // google, facebook
    table.string('provider_id').notNullable(); // id unique từ provider
    table.timestamps(true, true);

    table.unique(['provider', 'provider_id']);

    table.index('user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_providers');
}
