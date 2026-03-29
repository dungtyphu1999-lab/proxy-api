import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('product_boost_purchases', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

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

    table
      .uuid('owner_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();

    table
      .uuid('package_version_id')
      .references('id')
      .inTable('boost_package_versions')
      .notNullable();

    table.decimal('price', 12, 2).notNullable().checkPositive();

    table.timestamp('start_at').notNullable();
    table.timestamp('end_at').notNullable();

    table
      .string('status', 20)
      .notNullable()
      .checkIn(['pending', 'active', 'expired', 'cancelled']);

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.raw(`
    CREATE INDEX idx_boost_product_active
      ON product_boost_purchases(product_id, status, start_at, end_at);
  `);

  await knex.raw(`
    CREATE INDEX idx_boost_shop_active
      ON product_boost_purchases(shop_id, status, start_at, end_at);
  `);

  await knex.raw(`
  CREATE INDEX idx_boost_shop_id
    ON product_boost_purchases(shop_id);
`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('product_boost_purchases');
}
