import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_posts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title', 255).notNullable();
    table.string('slug', 255).notNullable().unique();
    table.text('content').notNullable();
    table.text('excerpt');
    table.text('featured_image_url');
    table
      .uuid('author_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('shop_id')
      .references('id')
      .inTable('shops')
      .onDelete('SET NULL');
    table
      .enu('status', ['draft', 'pending', 'published', 'rejected', 'hidden'])
      .defaultTo('draft');
    table.enu('service_status', ['seeking', 'found']); // Nullable for non-service posts
    table.boolean('is_featured').defaultTo(false);
    table.integer('view_count').defaultTo(0);
    table.integer('like_count').defaultTo(0);
    table.integer('comment_count').defaultTo(0);
    table.timestamp('published_at');
    table
      .uuid('approved_by')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.timestamp('approved_at');
    table.text('approval_notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('author_id', 'idx_blog_posts_author_id');
    table.index('shop_id', 'idx_blog_posts_shop_id');
    table.index('status', 'idx_blog_posts_status');
    table.index('service_status', 'idx_blog_posts_service_status');
    table.index('published_at', 'idx_blog_posts_published_at');
    table.index('approved_by', 'idx_blog_posts_approved_by');
    table.index('approved_at', 'idx_blog_posts_approved_at');
    table.index('slug', 'idx_blog_posts_slug');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_posts');
}
