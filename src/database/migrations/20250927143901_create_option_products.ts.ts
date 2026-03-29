// import type { Knex } from 'knex';
export async function up(): Promise<void> {
  // await knex.schema.createTable('option_products', (table) => {
  //   table.increments('id').primary(); // 🔥 id tự tăng (INT)
  //   table
  //     .uuid('product_id')
  //     .notNullable()
  //     .references('id')
  //     .inTable('products')
  //     .onDelete('CASCADE');
  //   table.string('name').notNullable();
  //   table.decimal('price', 12, 2).notNullable();
  //   table.integer('quantity').notNullable().defaultTo(0);
  //   table.timestamp('created_at').defaultTo(knex.fn.now());
  //   table.timestamp('updated_at').defaultTo(knex.fn.now());
  //   table.index(['product_id']);
  // });
}

export async function down(): Promise<void> {
  // await knex.schema.dropTableIfExists('option_products');
}
