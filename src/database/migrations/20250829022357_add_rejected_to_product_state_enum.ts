import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Add 'rejected' value to the product_state enum
  await knex.raw(`
    ALTER TYPE product_state ADD VALUE 'rejected';
  `);
}

export async function down(knex: Knex): Promise<void> {
  // PostgreSQL doesn't support removing enum values directly
  // We would need to recreate the enum type, which is complex
  // For safety, we'll leave a comment about the rollback limitation
  await knex.raw(`
    -- Cannot remove enum values in PostgreSQL directly
    -- Would require recreating the enum and updating all dependent objects
    -- Manual rollback required if needed
    SELECT 1;
  `);
}
