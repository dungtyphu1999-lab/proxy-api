import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.string('verification_code', 10).nullable();
    table.timestamp('verification_code_expired_at', {
      useTz: true,
    }).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', table => {
    table.dropColumn('verification_code');
    table.dropColumn('verification_code_expired_at');
  });
}
