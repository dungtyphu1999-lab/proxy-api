import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_post_views', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('blog_post_id')
      .notNullable()
      .references('id')
      .inTable('blog_posts')
      .onDelete('CASCADE');
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.specificType('ip_address', 'INET');
    table.text('user_agent');
    table.timestamp('viewed_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('blog_post_id', 'idx_blog_post_views_blog_post_id');
    table.index('user_id', 'idx_blog_post_views_user_id');
    table.index('viewed_at', 'idx_blog_post_views_viewed_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_post_views');
}
