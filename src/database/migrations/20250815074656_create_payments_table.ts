import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create ENUMs first
  await knex.raw(`
    CREATE TYPE payment_status AS ENUM (
      'pending',
      'processing',
      'paid',
      'failed',
      'refunded',
      'cancelled'
    );
  `);

  await knex.raw(`
    CREATE TYPE payment_method AS ENUM (
      'wallet',
      'bank_transfer',
      'credit_card',
      'paypal',
      'momo',
      'other'
    );
  `);

  await knex.raw(`
    CREATE TYPE payment_reference_type AS ENUM (
      'order',
      'product_boost'
    );
  `);

  // Create payments table
  await knex.schema.createTable('payments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('payment_code', 30).unique().notNullable();

    table
      .specificType('reference_type', 'payment_reference_type')
      .notNullable();
    table.uuid('reference_id').notNullable();

    table.uuid('payer_id').references('id').inTable('users').notNullable();
    table.uuid('payee_id').references('id').inTable('users');

    table.uuid('system_wallet_id');
    table.decimal('amount', 14, 2).notNullable().checkPositive();
    table.string('currency', 10).defaultTo('VND');

    table.specificType('method', 'payment_method').notNullable();
    table.specificType('status', 'payment_status').defaultTo('pending');

    table.jsonb('metadata');
    table.text('note');

    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('paid_at', { useTz: true });
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  // Create indexes
  await knex.raw(`
    CREATE INDEX idx_payments_reference
      ON payments(reference_type, reference_id);
  `);

  await knex.raw(`
    CREATE INDEX idx_payments_payer
      ON payments(payer_id, status);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('payments');

  await knex.raw('DROP TYPE IF EXISTS payment_status');
  await knex.raw('DROP TYPE IF EXISTS payment_method');
  await knex.raw('DROP TYPE IF EXISTS payment_reference_type');
}
