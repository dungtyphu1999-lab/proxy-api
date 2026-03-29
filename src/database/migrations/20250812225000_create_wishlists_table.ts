import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create enum type for wishlist object types
  await knex.schema.raw(`
    CREATE TYPE wishlist_object_type AS ENUM ('product', 'post')
  `);

  // Create wishlists table
  await knex.schema.createTable('wishlists', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.specificType('object_type', 'wishlist_object_type').notNullable();
    table.uuid('object_id').notNullable();
    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    // Add unique constraint
    table.unique(['user_id', 'object_type', 'object_id'], {
      indexName: 'uq_wishlist',
    });
  });

  // Create indexes
  await knex.schema.raw(
    'CREATE INDEX idx_wishlist_user ON wishlists(user_id, created_at DESC)',
  );
  await knex.schema.raw(
    'CREATE INDEX idx_wishlist_object ON wishlists(object_type, object_id)',
  );
}

export async function down(knex: Knex): Promise<void> {
  // Drop indexes
  await knex.schema.raw('DROP INDEX IF EXISTS idx_wishlist_user');
  await knex.schema.raw('DROP INDEX IF EXISTS idx_wishlist_object');

  // Drop table
  await knex.schema.dropTableIfExists('wishlists');

  // Drop enum type
  await knex.schema.raw('DROP TYPE IF EXISTS wishlist_object_type');
}
