import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_user_address_port');
  await knex.raw(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_proxies_user_type_address_port
      ON proxies(user_id, proxy_type, address, port)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_user_type_address_port');
  await knex.raw(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_proxies_user_address_port
      ON proxies(user_id, address, port)
  `);
}
