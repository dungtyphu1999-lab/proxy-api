import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('product_reviews', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    // Product reference
    table
      .uuid('product_id')
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .notNullable();

    // User who wrote the review
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();

    // Shop owner who can reply (optional)
    table
      .uuid('shop_id')
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE')
      .notNullable();

    // Parent review for replies (self-referencing)
    table
      .uuid('parent_review_id')
      .references('id')
      .inTable('product_reviews')
      .onDelete('CASCADE');

    // Review content
    table.text('content').notNullable();

    // Star rating (1-5)
    table.integer('rating').notNullable();

    // Review status
    table
      .enum('status', ['pending', 'approved', 'rejected'], {
        useNative: true,
        enumName: 'product_review_status',
      })
      .notNullable()
      .defaultTo('pending');

    // Like count for the review
    table.integer('like_count').defaultTo(0).notNullable();

    // Timestamps
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    // Indexes for performance
    table.index('product_id', 'idx_product_reviews_product_id');
    table.index('user_id', 'idx_product_reviews_user_id');
    table.index('shop_id', 'idx_product_reviews_shop_id');
    table.index('parent_review_id', 'idx_product_reviews_parent_id');
    table.index('status', 'idx_product_reviews_status');
    table.index('rating', 'idx_product_reviews_rating');
    table.index('created_at', 'idx_product_reviews_created_at');
    table.index(['product_id', 'status'], 'idx_product_reviews_product_status');
    table.index(['product_id', 'rating'], 'idx_product_reviews_product_rating');

    // Unique constraint: one review per user per product (only for main reviews, not replies)
    table.unique(['product_id', 'user_id', 'parent_review_id'], {
      indexName: 'uq_product_reviews_user_product',
      deferrable: 'deferred',
    });
  });

  // Create trigger to update updated_at
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_product_reviews_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  await knex.raw(`
    CREATE TRIGGER update_product_reviews_updated_at
      BEFORE UPDATE ON product_reviews
      FOR EACH ROW
      EXECUTE FUNCTION update_product_reviews_updated_at();
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop trigger and function
  await knex.raw(
    'DROP TRIGGER IF EXISTS update_product_reviews_updated_at ON product_reviews;',
  );
  await knex.raw(
    'DROP FUNCTION IF EXISTS update_product_reviews_updated_at();',
  );

  // Drop table
  await knex.schema.dropTableIfExists('product_reviews');
}
