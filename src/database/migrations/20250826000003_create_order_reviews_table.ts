import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_reviews', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('order_id')
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
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
    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.string('title', 255);
    table.text('content');
    table.jsonb('images');
    table.boolean('is_verified_purchase').defaultTo(true);
    table.integer('is_helpful').defaultTo(0);
    table
      .enum('status', ['published', 'hidden', 'deleted'])
      .defaultTo('published');
    table.timestamp('hidden_at');
    table.uuid('hidden_by').references('id').inTable('users');
    table.text('hidden_reason');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(['order_id']);
    table.index(['buyer_id']);
    table.index(['shop_id']);
    table.index(['rating']);
    table.index(['status']);
    table.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_reviews');
}
