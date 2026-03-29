import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    ALTER TYPE payment_reference_type ADD VALUE IF NOT EXISTS 'proxy';
  `);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- down() requires same signature; no-op for enum
export async function down(knex: Knex): Promise<void> {
  // PostgreSQL does not support removing enum values; would require recreate enum and column
}
