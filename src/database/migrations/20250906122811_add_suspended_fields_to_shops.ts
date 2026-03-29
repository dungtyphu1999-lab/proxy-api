import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('shops', (table) => {
    table
      .enum('suspension_reason', [
        'suspicious_activity',
        'terms_violation',
        'other',
      ])
      .nullable();
    table.timestamp('suspension_date').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('shops', (table) => {
    table.dropColumn('suspension_reason');
    table.dropColumn('suspension_date');
  });
}
