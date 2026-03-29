import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('status');
  });

  // Create new enum type with only needed values
  await knex.raw(`
    CREATE TYPE order_status AS ENUM (
      'pending',
      'completed',
      'refunded'
    );
  `);

  await knex.schema.alterTable('orders', (table) => {
    table
      .specificType('status', 'order_status')
      .notNullable()
      .after('total_amount');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('status');
  });

  await knex.raw(`
    CREATE TYPE order_status AS ENUM (
      'pending',
      'completed',
      'refunded'
    );
  `);

  await knex.schema.alterTable('orders', (table) => {
    table.specificType('status', 'order_status').notNullable();
  });
}
