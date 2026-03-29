import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_post_images', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('filename', 255).notNullable();
    table.text('url').notNullable();
    table.timestamp('uploaded_at').defaultTo(knex.fn.now());
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('post_id')
      .references('id')
      .inTable('blog_posts')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('user_id', 'idx_blog_post_images_user_id');
    table.index('post_id', 'idx_blog_post_images_post_id');
    table.index('uploaded_at', 'idx_blog_post_images_uploaded_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_post_images');
}
