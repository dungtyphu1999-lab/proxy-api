import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Remove check constraint on status column if it exists
  // PostgreSQL enum type already provides validation, so check constraint is redundant
  // and causes issues when adding new enum values
  await knex.raw(`
    ALTER TABLE order_complaints 
    DROP CONSTRAINT IF EXISTS order_complaints_status_check;
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Recreate check constraint with all valid status values
  // Note: This is not recommended as it will break when new enum values are added
  // But included for rollback completeness
  await knex.raw(`
    ALTER TABLE order_complaints 
    ADD CONSTRAINT order_complaints_status_check 
    CHECK (status IN (
      'pending',
      'investigating',
      'shop_responded',
      'admin_review',
      'resolved',
      'rejected',
      'cancelled',
      'closed',
      'dismissed'
    ));
  `);
}
