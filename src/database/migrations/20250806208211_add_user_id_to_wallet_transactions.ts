import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .after('wallet_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('user_id');
  });
}
