import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('shop_rating_stats', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('shop_id').notNullable().references('id').inTable('shops');
    table.integer('total_reviews').defaultTo(0);
    table.decimal('rating_avg', 4, 2).defaultTo(0);
    table.decimal('rating_1', 4, 2).defaultTo(0);
    table.decimal('rating_2', 4, 2).defaultTo(0);
    table.decimal('rating_3', 4, 2).defaultTo(0);
    table.decimal('rating_4', 4, 2).defaultTo(0);
    table.decimal('rating_5', 4, 2).defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('shop_rating_stats');
}
