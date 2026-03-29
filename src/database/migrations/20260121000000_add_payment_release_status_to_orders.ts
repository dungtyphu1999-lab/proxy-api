import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create enum type for payment_release_status
  await knex.raw(`
    CREATE TYPE payment_release_status AS ENUM (
      'pending_release',
      'released',
      'disputed',
      'refunded'
    );
  `);

  // Add payment_release_status column to orders table
  await knex.schema.alterTable('orders', (table) => {
    table
      .specificType('payment_release_status', 'payment_release_status')
      .nullable()
      .after('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop payment_release_status column
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('payment_release_status');
  });

  // Drop enum type
  await knex.raw(`DROP TYPE IF EXISTS payment_release_status;`);
}
