import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_post_type_relations', (table) => {
    table
      .uuid('blog_post_id')
      .notNullable()
      .references('id')
      .inTable('blog_posts')
      .onDelete('CASCADE');
    table
      .uuid('type_id')
      .notNullable()
      .references('id')
      .inTable('blog_post_types')
      .onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Composite primary key
    table.primary(['blog_post_id', 'type_id']);

    // Indexes
    table.index('blog_post_id', 'idx_blog_post_type_relations_blog_post_id');
    table.index('type_id', 'idx_blog_post_type_relations_type_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_post_type_relations');
}
