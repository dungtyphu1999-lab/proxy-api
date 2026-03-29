import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Drop the old enum type
  await knex.raw('DROP TYPE system_wallet_type CASCADE');

  // Create new enum type with only needed values
  await knex.raw(`
    CREATE TYPE system_wallet_type AS ENUM (
      'escrow',
      'shop_boost'
    );
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop the new enum type
  await knex.raw('DROP TYPE system_wallet_type CASCADE');

  // Recreate the original enum type
  await knex.raw(`
    CREATE TYPE system_wallet_type AS ENUM (
      'escrow',
      'commission',
      'penalty',
      'refund_reserve',
      'shop_boost'
    );
  `);
}
