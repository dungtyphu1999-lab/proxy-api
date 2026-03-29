import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('wallet_transactions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('wallet_id').references('id').inTable('wallets').notNullable();
    table.string('type', 20).notNullable();
    table.string('method', 30);
    table.decimal('amount', 14, 2).notNullable();
    table.string('status', 20).defaultTo('pending');
    table.string('reference_code', 100);
    table.text('note');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('completed_at');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('wallet_transactions');
}
