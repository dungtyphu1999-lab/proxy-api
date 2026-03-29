import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxies', (table) => {
    table.bigIncrements('id').primary();
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('address', 45).notNullable();
    table.integer('port').notNullable();
    table.string('username', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('country_code', 2).notNullable();
    table.string('city', 100);
    table.string('status', 20).notNullable();
    table.timestamp('last_checked_at', { useTz: true });
    table.string('proxy_type', 30).notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(`
    CREATE UNIQUE INDEX idx_proxies_user_address_port
      ON proxies(user_id, address, port);
  `);
  await knex.raw('CREATE INDEX idx_proxies_user_id ON proxies(user_id)');
  await knex.raw(
    'CREATE INDEX idx_proxies_country_code ON proxies(country_code)',
  );
  await knex.raw('CREATE INDEX idx_proxies_status ON proxies(status)');
  await knex.raw(
    'CREATE INDEX idx_proxies_last_checked_at ON proxies(last_checked_at)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxies');
}
