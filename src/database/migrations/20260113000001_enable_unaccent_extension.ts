import { Knex } from 'knex';

/**
 * Migration to enable the unaccent extension in PostgreSQL
 * This extension provides the unaccent() function for accent-insensitive text search
 * Required for Vietnamese diacritics search functionality
 */
export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE EXTENSION IF NOT EXISTS unaccent;`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`DROP EXTENSION IF EXISTS unaccent;`);
}
