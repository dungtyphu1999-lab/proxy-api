import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    // Add engagement metrics columns
    table.integer('total_like').defaultTo(0).notNullable();
    table.integer('total_view').defaultTo(0).notNullable();
    table.integer('total_review').defaultTo(0).notNullable();

    // Add indexes for performance
    table.index('total_like', 'idx_products_total_like');
    table.index('total_view', 'idx_products_total_view');
    table.index('total_review', 'idx_products_total_review');
    table.index(
      ['total_like', 'total_view', 'total_review'],
      'idx_products_engagement_metrics',
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('products', (table) => {
    // Remove indexes
    table.dropIndex(
      ['total_like', 'total_view', 'total_review'],
      'idx_products_engagement_metrics',
    );
    table.dropIndex('total_review', 'idx_products_total_review');
    table.dropIndex('total_view', 'idx_products_total_view');
    table.dropIndex('total_like', 'idx_products_total_like');

    // Remove columns
    table.dropColumn('total_review');
    table.dropColumn('total_view');
    table.dropColumn('total_like');
  });
}
