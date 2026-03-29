import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('proxy_orders', (table) => {
    table.bigInteger('webshare_plan_id');
    table.bigInteger('webshare_subuser_id');
    table.string('webshare_status', 30);
    table.text('webshare_error');
    table.jsonb('webshare_meta');
    table.timestamp('webshare_activated_at', { useTz: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('proxy_orders', (table) => {
    table.dropColumn('webshare_activated_at');
    table.dropColumn('webshare_meta');
    table.dropColumn('webshare_error');
    table.dropColumn('webshare_status');
    table.dropColumn('webshare_subuser_id');
    table.dropColumn('webshare_plan_id');
  });
}
