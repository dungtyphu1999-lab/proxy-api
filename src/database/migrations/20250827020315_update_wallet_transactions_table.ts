import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.string('transfer_proof_path').nullable().after('reference_code');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('transfer_proof_path');
  });
}
