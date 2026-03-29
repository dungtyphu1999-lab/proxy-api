import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_check_logs', (table) => {
    table.bigIncrements('id').primary();
    table
      .bigInteger('proxy_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('proxies')
      .onDelete('CASCADE');
    table
      .timestamp('checked_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string('status', 20).notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(
    'CREATE INDEX idx_proxy_check_logs_proxy_id ON proxy_check_logs(proxy_id)',
  );
  await knex.raw(
    'CREATE INDEX idx_proxy_check_logs_checked_at ON proxy_check_logs(checked_at)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_check_logs');
}
