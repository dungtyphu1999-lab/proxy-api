import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.renameColumn('front_cccd_url', 'front_id_url');
    table.renameColumn('back_cccd_url', 'back_id_url');
    table.renameColumn('bank_name', 'bank_code');
    table.renameColumn('bank_account', 'bank_account_number');
    table.renameColumn('account_name', 'bank_account_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('shop_requests', (table) => {
    table.renameColumn('front_id_url', 'front_cccd_url');
    table.renameColumn('back_id_url', 'back_cccd_url');
    table.renameColumn('bank_code', 'bank_name');
    table.renameColumn('bank_account_number', 'bank_account');
    table.renameColumn('bank_account_name', 'account_name');
  });
}
