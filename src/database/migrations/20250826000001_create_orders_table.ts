import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('order_number', 50).unique().notNullable();
    table
      .uuid('buyer_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('shop_id')
      .notNullable()
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE');
    table.decimal('total_amount', 14, 2).notNullable();
    table.decimal('subtotal', 14, 2).notNullable();
    table.decimal('commission_fee', 14, 2).defaultTo(0);
    table.decimal('shipping_fee', 14, 2).defaultTo(0);
    table.decimal('discount_amount', 14, 2).defaultTo(0);
    table.string('currency', 10).defaultTo('VND');
    table
      .enum('status', [
        'pending',
        'confirmed',
        'processing',
        'shipped',
        'delivered',
        'completed',
        'cancelled',
        'refunded',
      ])
      .defaultTo('pending');
    table
      .enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])
      .defaultTo('pending');
    table.string('payment_method', 50);
    table.jsonb('shipping_address');
    table.jsonb('billing_address');
    table.text('notes');
    table.date('estimated_delivery');
    table.timestamp('delivered_at');
    table.timestamp('cancelled_at');
    table.uuid('cancelled_by').references('id').inTable('users');
    table.text('cancellation_reason');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(['buyer_id']);
    table.index(['shop_id']);
    table.index(['status']);
    table.index(['payment_status']);
    table.index(['created_at']);
    table.index(['order_number']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('orders');
}
