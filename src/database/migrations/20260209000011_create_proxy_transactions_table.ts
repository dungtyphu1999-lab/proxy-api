import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('proxy_order_id')
      .notNullable()
      .references('id')
      .inTable('proxy_orders')
      .onDelete('CASCADE');
    table.string('type', 20).notNullable();
    table.decimal('amount', 12, 2).notNullable();
    table.string('currency', 3).notNullable().defaultTo('USD');
    table
      .bigInteger('payment_method_id')
      .unsigned()
      .references('id')
      .inTable('payment_methods')
      .onDelete('SET NULL');
    table.string('external_id', 255);
    table.string('status', 20).notNullable();
    table.timestamp('paid_at', { useTz: true });
    table.jsonb('metadata');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(
    'CREATE INDEX idx_proxy_transactions_order ON proxy_transactions(proxy_order_id)',
  );
  await knex.raw(
    'CREATE INDEX idx_proxy_transactions_status ON proxy_transactions(status)',
  );
  await knex.raw(
    'CREATE INDEX idx_proxy_transactions_external_id ON proxy_transactions(external_id)',
  );
  await knex.raw(
    'CREATE INDEX idx_proxy_transactions_created_at ON proxy_transactions(created_at)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_transactions');
}
