import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Remove fields from orders table
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('subtotal');
    table.dropColumn('commission_fee');
    table.dropColumn('shipping_fee');
    table.dropColumn('discount_amount');
    table.dropColumn('currency');
    table.dropColumn('payment_status');
    table.dropColumn('payment_method');
    table.dropColumn('shipping_address');
    table.dropColumn('billing_address');
    table.dropColumn('estimated_delivery');
    table.dropColumn('delivered_at');
    table.dropColumn('cancelled_at');
    table.dropColumn('cancelled_by');
    table.dropColumn('cancellation_reason');
  });

  // Update status enum to only have 3 values
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('status');
  });

  await knex.schema.alterTable('orders', (table) => {
    table
      .enum('status', ['pending', 'completed', 'refunded'])
      .defaultTo('pending');
  });

  // Remove fields from order_items table
  await knex.schema.alterTable('order_items', (table) => {
    table.dropColumn('unit_price');
    table.dropColumn('is_digital');
    table.dropColumn('download_expires_at');
    table.dropColumn('download_count');
    table.dropColumn('max_downloads');
  });

  // Add category_commissions_id field to order_items table
  await knex.schema.alterTable('order_items', (table) => {
    table
      .uuid('category_commissions_id')
      .references('id')
      .inTable('category_commissions')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Remove category_commissions_id field from order_items table
  await knex.schema.alterTable('order_items', (table) => {
    table.dropColumn('category_commissions_id');
  });

  // Restore fields to orders table
  await knex.schema.alterTable('orders', (table) => {
    table.decimal('subtotal', 14, 2).notNullable();
    table.decimal('commission_fee', 14, 2).defaultTo(0);
    table.decimal('shipping_fee', 14, 2).defaultTo(0);
    table.decimal('discount_amount', 14, 2).defaultTo(0);
    table.string('currency', 10).defaultTo('VND');
    table
      .enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])
      .defaultTo('pending');
    table.string('payment_method', 50);
    table.jsonb('shipping_address');
    table.jsonb('billing_address');
    table.date('estimated_delivery');
    table.timestamp('delivered_at');
    table.timestamp('cancelled_at');
    table.uuid('cancelled_by').references('id').inTable('users');
    table.text('cancellation_reason');
  });

  // Restore original status enum
  await knex.schema.alterTable('orders', (table) => {
    table.dropColumn('status');
  });

  await knex.schema.alterTable('orders', (table) => {
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
  });

  // Restore fields to order_items table
  await knex.schema.alterTable('order_items', (table) => {
    table.decimal('unit_price', 14, 2).notNullable();
    table.boolean('is_digital').defaultTo(false);
    table.timestamp('download_expires_at');
    table.integer('download_count').defaultTo(0);
    table.integer('max_downloads').defaultTo(1);
  });
}
