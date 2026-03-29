import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create ENUM first
  await knex.raw(`
    CREATE TYPE boost_event_type AS ENUM (
      'impression',
      'click',
      'cta'
    );
  `);

  // Create product_boost_usage_logs table
  await knex.schema.createTable('product_boost_usage_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('boost_purchase_id')
      .references('id')
      .inTable('product_boost_purchases')
      .onDelete('CASCADE')
      .notNullable();
    table
      .uuid('product_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .notNullable();
    table
      .uuid('shop_id')
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE')
      .notNullable();
    table.specificType('event_type', 'boost_event_type').notNullable();
    table.uuid('user_id').references('id').inTable('users');
    table.string('ip_address');
    table.text('user_agent');
    table.jsonb('metadata');
    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  // Create indexes
  await knex.raw(`
    CREATE INDEX idx_boost_usage_purchase_time
      ON product_boost_usage_logs(boost_purchase_id, created_at DESC);
  `);

  await knex.raw(`
    CREATE INDEX idx_boost_usage_event_time
      ON product_boost_usage_logs(event_type, created_at DESC);
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('product_boost_usage_logs');

  await knex.raw('DROP TYPE IF EXISTS boost_event_type');
}
