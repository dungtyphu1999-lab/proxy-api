import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create ENUMs first
  await knex.raw(`
    CREATE TYPE system_transaction_type AS ENUM (
      'deposit',
      'release',
      'refund',
      'commission_collect',
      'penalty',
      'boost_payment'
    );
  `);

  await knex.raw(`
    CREATE TYPE transaction_status AS ENUM (
      'pending',
      'success',
      'failed',
      'cancelled'
    );
  `);

  // Create system_wallet_transactions table
  await knex.schema.createTable('system_wallet_transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('system_wallet_id')
      .references('id')
      .inTable('system_wallets')
      .onDelete('CASCADE')
      .notNullable();

    table.uuid('from_wallet_id').references('id').inTable('wallets');
    table.uuid('to_wallet_id').references('id').inTable('wallets');

    table
      .specificType('transaction_type', 'system_transaction_type')
      .notNullable();
    table.decimal('amount', 14, 2).notNullable().checkPositive();
    table.specificType('status', 'transaction_status').defaultTo('pending');

    table.text('notes');
    table.uuid('processed_by').references('id').inTable('users');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('processed_at', { useTz: true });
  });

  // Create index
  await knex.raw(`
    CREATE INDEX idx_system_wallet_txn_type
      ON system_wallet_transactions(transaction_type, status);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('system_wallet_transactions');

  await knex.raw('DROP TYPE IF EXISTS system_transaction_type');
  await knex.raw('DROP TYPE IF EXISTS transaction_status');
}
