import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('proxy_pools', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('account_id', 100).notNullable();
    table.string('account_label', 255).notNullable();
    table.text('api_key').notNullable();
    table.string('pool_key', 100).nullable();
    table.boolean('enabled').notNullable().defaultTo(true);
    table.integer('buffer_percent').notNullable().defaultTo(10);
    table.text('notes').nullable();
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());

    table.unique(['account_id', 'pool_key']);
    table.index(['account_id']);
    table.index(['pool_key']);
  });

  await knex.schema.createTable('proxy_whale_accounts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('account_label', 255).notNullable();
    table.text('api_key').notNullable();
    table.boolean('enabled').notNullable().defaultTo(true);
    table.string('status', 50).notNullable().defaultTo('idle');
    table.text('notes').nullable();
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.alterTable('proxy_orders', (table) => {
    table.timestamp('expires_at', { useTz: true }).nullable();
    table.string('webshare_account_id', 100).nullable();
    table.string('webshare_pool_key', 100).nullable();

    table.index(['expires_at']);
    table.index(['webshare_account_id']);
    table.index(['webshare_pool_key']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('proxy_orders', (table) => {
    table.dropIndex(['webshare_pool_key']);
    table.dropIndex(['webshare_account_id']);
    table.dropIndex(['expires_at']);

    table.dropColumn('webshare_pool_key');
    table.dropColumn('webshare_account_id');
    table.dropColumn('expires_at');
  });

  await knex.schema.dropTableIfExists('proxy_whale_accounts');
  await knex.schema.dropTableIfExists('proxy_pools');
}
