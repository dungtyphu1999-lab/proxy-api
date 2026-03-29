import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // 1. Add UNIQUE constraint on order_id (1 complaint per order)
  // First drop the existing index
  await knex.raw('DROP INDEX IF EXISTS order_complaints_order_id_index');

  await knex.schema.alterTable('order_complaints', (table) => {
    // Add UNIQUE constraint
    table.unique(['order_id']);

    // Add new columns
    table.text('reason_detail').nullable(); // Chi tiết khi type = 'other'
    table.string('requested_resolution', 50).nullable(); // Phương án user yêu cầu: refund, replace, other
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('order_complaints', (table) => {
    // Drop new columns
    table.dropColumn('reason_detail');
    table.dropColumn('requested_resolution');

    // Drop unique constraint and add back regular index
    table.dropUnique(['order_id']);
    table.index(['order_id']);
  });
}
