import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('advertisements', (table) => {
    // Primary key
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    // Basic info
    table.string('title', 200).notNullable();
    table
      .string('placement', 50)
      .notNullable()
      .comment('home_banner, wallet_sidebar, etc');
    table.enu('content_type', ['image', 'video', 'html']).notNullable();

    // Content
    table.string('media_url', 500).nullable();
    table.text('html_content').nullable();
    table.string('click_url', 500).nullable();

    // Display & tracking
    table.integer('display_order').defaultTo(0).comment('simple ordering');
    table.integer('impressions').defaultTo(0);
    table.integer('clicks').defaultTo(0);
    table.boolean('is_active').defaultTo(true);

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(
      ['placement', 'is_active', 'display_order'],
      'idx_placement_active_order',
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('advertisements');
}
