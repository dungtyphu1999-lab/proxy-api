import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shops', (table) => {
    // Flag to indicate shop is restricted due to complaints
    table.boolean('is_complaint_restricted').notNullable().defaultTo(false);
    // Timestamp when restriction was applied
    table.timestamp('complaint_restricted_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shops', (table) => {
    table.dropColumn('is_complaint_restricted');
    table.dropColumn('complaint_restricted_at');
  });
}
