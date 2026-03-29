import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_proxy_country_filters', (table) => {
    table.bigIncrements('id').primary();
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('country_code', 2).notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(`
    CREATE UNIQUE INDEX idx_user_proxy_country_filters_unique
      ON user_proxy_country_filters(user_id, country_code);
  `);
  await knex.raw(
    'CREATE INDEX idx_user_proxy_country_filters_user ON user_proxy_country_filters(user_id)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_proxy_country_filters');
}
