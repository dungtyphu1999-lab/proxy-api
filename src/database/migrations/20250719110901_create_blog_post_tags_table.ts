import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('blog_post_tags', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 50).notNullable().unique();
    table.string('slug', 50).notNullable().unique();
    table.integer('usage_count').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('slug', 'idx_blog_post_tags_slug');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('blog_post_tags');
}
