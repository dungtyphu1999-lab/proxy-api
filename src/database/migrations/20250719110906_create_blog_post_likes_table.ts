import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_post_likes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('blog_post_id')
      .references('id')
      .inTable('blog_posts')
      .onDelete('CASCADE');
    table
      .uuid('comment_id')
      .references('id')
      .inTable('blog_post_comments')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Check constraint to ensure either blog_post_id or comment_id is set, but not both
    table.check(
      '(blog_post_id IS NOT NULL AND comment_id IS NULL) OR (blog_post_id IS NULL AND comment_id IS NOT NULL)',
      { constraintName: 'check_like_target' },
    );

    // Unique indexes to prevent duplicate likes
    table.unique(['user_id', 'blog_post_id'], {
      indexName: 'idx_blog_post_likes_user_blog',
    });
    table.unique(['user_id', 'comment_id'], {
      indexName: 'idx_blog_post_likes_user_comment',
    });

    // Additional indexes
    table.index('blog_post_id', 'idx_blog_post_likes_blog_post_id');
    table.index('comment_id', 'idx_blog_post_likes_comment_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_post_likes');
}
