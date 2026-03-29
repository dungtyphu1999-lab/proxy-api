import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasPoolKey = await knex.schema.hasColumn('proxy_whale_accounts', 'pool_key');
  if (!hasPoolKey) {
    await knex.schema.alterTable('proxy_whale_accounts', (table) => {
      table.string('pool_key').nullable().index();
      table.integer('proxy_count_threshold').nullable();
      table.integer('bandwidth_threshold_gb').nullable();
      table.boolean('allow_unlimited_bandwidth').notNullable().defaultTo(false);
      table.integer('priority').notNullable().defaultTo(100);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasPoolKey = await knex.schema.hasColumn('proxy_whale_accounts', 'pool_key');
  if (!hasPoolKey) return;

  await knex.schema.alterTable('proxy_whale_accounts', (table) => {
    table.dropColumn('priority');
    table.dropColumn('allow_unlimited_bandwidth');
    table.dropColumn('bandwidth_threshold_gb');
    table.dropColumn('proxy_count_threshold');
    table.dropColumn('pool_key');
  });
}
