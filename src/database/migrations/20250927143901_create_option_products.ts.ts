import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable('option_products');
  if (!exists) {
    await knex.schema.createTable('option_products', (table) => {
      table.increments('id').primary();
      table
        .uuid('product_id')
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.decimal('price', 12, 2).notNullable();
      table.integer('quantity').notNullable().defaultTo(0);
      table.timestamps(true, true);
      table.index(['product_id']);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('option_products');
}
