import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Step 1: Drop foreign key constraint
  await knex.schema.alterTable('blog_post_type_relations', (table) => {
    table.dropForeign(['type_id']);
  });

  // Step 2: Drop related tables
  await knex.schema.dropTableIfExists('blog_post_type_relations');
  await knex.schema.dropTableIfExists('blog_post_types');

  // Step 3: Recreate blog_post_types with integer ID and no slug
  await knex.schema.createTable('blog_post_types', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable().unique();
    table.text('description');
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('is_active', 'idx_blog_post_types_is_active');
  });

  // Step 4: Recreate blog_post_type_relations with integer type_id
  await knex.schema.createTable('blog_post_type_relations', (table) => {
    table
      .uuid('blog_post_id')
      .notNullable()
      .references('id')
      .inTable('blog_posts')
      .onDelete('CASCADE');
    table
      .integer('type_id')
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
  // Step 1: Drop foreign key constraint
  await knex.schema.alterTable('blog_post_type_relations', (table) => {
    table.dropForeign(['type_id']);
  });

  // Step 2: Drop tables
  await knex.schema.dropTableIfExists('blog_post_type_relations');
  await knex.schema.dropTableIfExists('blog_post_types');

  // Step 3: Recreate original blog_post_types with UUID and slug
  await knex.schema.createTable('blog_post_types', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 100).notNullable().unique();
    table.string('slug', 100).notNullable().unique();
    table.text('description');
    table.integer('sort_order').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index('slug', 'idx_blog_post_types_slug');
    table.index('is_active', 'idx_blog_post_types_is_active');
  });

  // Step 4: Recreate original blog_post_type_relations with UUID type_id
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
