import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_items', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('order_id')
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .uuid('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');
    table.string('product_name', 255).notNullable();
    table.string('product_slug', 255).notNullable();
    table.text('product_image');
    table.decimal('unit_price', 14, 2).notNullable();
    table.integer('quantity').notNullable().defaultTo(1);
    table.decimal('total_price', 14, 2).notNullable();
    table.decimal('discount_amount', 14, 2).defaultTo(0);
    table.decimal('final_price', 14, 2).notNullable();
    table.boolean('is_digital').defaultTo(false);
    table.text('download_url');
    table.string('password_download', 255);
    table.timestamp('download_expires_at');
    table.integer('download_count').defaultTo(0);
    table.integer('max_downloads').defaultTo(1);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(['order_id']);
    table.index(['product_id']);
    table.index(['is_digital']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_items');
}
