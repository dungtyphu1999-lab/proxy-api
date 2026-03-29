import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Update price column from NUMERIC(12, 2) to NUMERIC(12, 0)
  await knex.schema.raw(`
    ALTER TABLE product_versions 
    ALTER COLUMN price TYPE NUMERIC(12, 0)
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Rollback: change price column back to NUMERIC(12, 2)
  await knex.schema.raw(`
    ALTER TABLE product_versions 
    ALTER COLUMN price TYPE NUMERIC(12, 2)
  `);
}
