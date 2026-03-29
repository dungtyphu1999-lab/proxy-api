import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create ENUMs first
  await knex.raw(`
    CREATE TYPE system_wallet_type AS ENUM (
      'escrow',
      'commission',
      'penalty',
      'refund_reserve',
      'shop_boost'
    );
  `);

  await knex.raw(`
    CREATE TYPE system_wallet_status AS ENUM (
      'active',
      'locked',
      'processing',
      'closed'
    );
  `);

  // Create system_wallets table
  await knex.schema.createTable('system_wallets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.specificType('wallet_type', 'system_wallet_type').notNullable();
    table.string('reference_type', 30);
    table.uuid('reference_id');
    table.uuid('holder_user_id').references('id').inTable('users');

    table.decimal('balance', 14, 2).defaultTo(0).checkPositive();
    table.decimal('reserved_amount', 14, 2).defaultTo(0).checkPositive();
    table.decimal('available_amount', 14, 2);
    table.string('currency', 10).defaultTo('VND');

    table.specificType('status', 'system_wallet_status').defaultTo('active');

    table.timestamp('auto_release_at', { useTz: true });
    table.text('notes');
    table.jsonb('metadata');

    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('closed_at', { useTz: true });
  });

  // Create indexes
  await knex.raw(`
    CREATE INDEX idx_system_wallet_type_status
      ON system_wallets(wallet_type, status);
  `);

  await knex.raw(`
    CREATE INDEX idx_system_wallet_ref
      ON system_wallets(reference_type, reference_id);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('system_wallets');

  await knex.raw('DROP TYPE IF EXISTS system_wallet_type');
  await knex.raw('DROP TYPE IF EXISTS system_wallet_status');
}
