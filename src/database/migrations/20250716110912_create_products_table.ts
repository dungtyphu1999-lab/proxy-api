import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('shop_id').notNullable().references('id').inTable('shops');
    table
      .uuid('category_id')
      .notNullable()
      .references('id')
      .inTable('categories');
    table.string('name').notNullable();
    table.string('slug').notNullable();
    table.text('description');
    table.decimal('price', 12, 2).notNullable();
    table.integer('stock').defaultTo(0);
    table.integer('view_count').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.boolean('is_featured').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('products');
}
