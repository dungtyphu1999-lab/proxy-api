import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('shop_requests', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.text('front_cccd_url').notNullable();
    table.text('back_cccd_url').notNullable();
    table.string('bank_name', 100).notNullable();
    table.string('bank_account', 100).notNullable();
    table.string('account_name', 100).notNullable();
    table
      .enum('status', ['pending', 'approved', 'rejected'])
      .defaultTo('pending');
    table.text('note');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('shop_requests');
}
