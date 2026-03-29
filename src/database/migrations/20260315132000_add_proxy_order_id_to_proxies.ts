import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasProxyOrderId = await knex.schema.hasColumn('proxies', 'proxy_order_id');
  if (!hasProxyOrderId) {
    await knex.schema.alterTable('proxies', (table) => {
      table
        .uuid('proxy_order_id')
        .nullable()
        .references('id')
        .inTable('proxy_orders')
        .onDelete('SET NULL');
    });
  }

  await knex.raw('CREATE INDEX IF NOT EXISTS idx_proxies_proxy_order_id ON proxies(proxy_order_id)');
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_user_type_addr_port_user');
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_user_type_address_port');
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_user_address_port');
  await knex.raw(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_proxies_user_type_order_addr_port_user
      ON proxies(user_id, proxy_type, proxy_order_id, address, port, username)
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_user_type_order_addr_port_user');
  await knex.raw(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_proxies_user_type_addr_port_user
      ON proxies(user_id, proxy_type, address, port, username)
  `);
  await knex.raw('DROP INDEX IF EXISTS idx_proxies_proxy_order_id');

  const hasProxyOrderId = await knex.schema.hasColumn('proxies', 'proxy_order_id');
  if (hasProxyOrderId) {
    await knex.schema.alterTable('proxies', (table) => {
      table.dropColumn('proxy_order_id');
    });
  }
}
