import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .bigInteger('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('proxy_products')
      .onDelete('RESTRICT');
    table
      .bigInteger('exclusivity_option_id')
      .unsigned()
      .references('id')
      .inTable('proxy_product_options')
      .onDelete('SET NULL');
    table
      .bigInteger('quantity_option_id')
      .unsigned()
      .references('id')
      .inTable('proxy_product_options')
      .onDelete('SET NULL');
    table
      .bigInteger('bandwidth_option_id')
      .unsigned()
      .references('id')
      .inTable('proxy_product_options')
      .onDelete('SET NULL');
    table
      .bigInteger('location_id')
      .unsigned()
      .references('id')
      .inTable('proxy_locations')
      .onDelete('SET NULL');
    table
      .bigInteger('additional_feature_id')
      .unsigned()
      .references('id')
      .inTable('proxy_additional_features')
      .onDelete('SET NULL');
    table.decimal('discount_percent', 5, 2).defaultTo(0);
    table.decimal('amount_total', 12, 2).notNullable();
    table.string('billing_cycle', 10).notNullable();
    table.string('status', 20).notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
  });

  await knex.raw(
    'CREATE INDEX idx_proxy_orders_user_id ON proxy_orders(user_id)',
  );
  await knex.raw(
    'CREATE INDEX idx_proxy_orders_status ON proxy_orders(status)',
  );
  await knex.raw(
    'CREATE INDEX idx_proxy_orders_created_at ON proxy_orders(created_at)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('proxy_orders');
}
