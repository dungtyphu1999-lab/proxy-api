import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('smm_orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('order_number', 50).notNullable().unique();

    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // Provider mapping
    table.string('provider', 30).notNullable().defaultTo('mualikes');
    table.string('provider_order_id', 100);

    // Service snapshot (from provider catalog)
    table.integer('category_id');
    table.integer('service_id').notNullable(); // provider menuId
    table.string('service_name', 255).notNullable();
    table.integer('server_id').notNullable(); // provider serverId
    table.string('server_name', 255);

    // User input snapshot
    table.text('target').notNullable(); // post_link (normalized)
    table.text('original_link'); // originalLink (raw/original)
    table.integer('quantity').notNullable();

    // Pricing snapshot
    table.decimal('unit_price_provider', 14, 2).notNullable(); // price at provider
    table.decimal('unit_price_customer', 14, 2).notNullable(); // finalPrice for customer
    table.decimal('total_provider', 14, 2).notNullable();
    table.decimal('total_customer', 14, 2).notNullable();
    table.decimal('commission_percent', 5, 2).notNullable().defaultTo(0);

    // Status tracking
    table
      .enum('status', [
        'creating',
        'running',
        'completed',
        'failed',
        'refunded',
        'cancelled',
      ])
      .notNullable()
      .defaultTo('creating');
    table.string('provider_status', 50);

    // Link to wallet transaction that charged the user (optional if created later)
    table
      .uuid('wallet_transaction_id')
      .references('id')
      .inTable('wallet_transactions');

    // Audit/debug
    table.jsonb('provider_request');
    table.jsonb('provider_response');
    table.text('error_message');

    table.timestamp('synced_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(['user_id', 'created_at']);
    table.index(['status', 'created_at']);
    table.index(['service_id']);
    table.index(['category_id']);
    table.index(['provider']);
    table.index(['provider_order_id']);
    table.index(['order_number']);
    table.unique(['provider', 'provider_order_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('smm_orders');
}
