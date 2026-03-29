import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_post_comments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('blog_post_id')
      .notNullable()
      .references('id')
      .inTable('blog_posts')
      .onDelete('CASCADE');
    table
      .uuid('author_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('parent_id')
      .references('id')
      .inTable('blog_post_comments')
      .onDelete('CASCADE');
    table.text('content').notNullable();
    table
      .enu('status', ['published', 'pending', 'hidden', 'deleted'])
      .defaultTo('published');
    table.integer('like_count').defaultTo(0);
    table.integer('reply_count').defaultTo(0);
    table.boolean('is_service_confirmed').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('blog_post_id', 'idx_blog_post_comments_blog_post_id');
    table.index('author_id', 'idx_blog_post_comments_author_id');
    table.index('parent_id', 'idx_blog_post_comments_parent_id');
    table.index('status', 'idx_blog_post_comments_status');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_post_comments');
}
