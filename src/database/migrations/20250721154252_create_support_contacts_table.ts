import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('support_contacts', (table) => {
    table.uuid('id').primary();
    table.string('full_name', 255).notNullable();
    table.string('phone_number', 20).notNullable();
    table.string('email', 255).notNullable();
    table.text('content').notNullable();
    table
      .enum('status', ['pending', 'processing', 'completed'])
      .defaultTo('pending');

    table.text('admin_reply').nullable();
    table.uuid('handled_by').nullable();
    table.timestamp('replied_at').nullable();

    table.timestamps(true, true);

    // Indexes for search and sort
    table.index(['created_at']);
    table.index(['status']);
    table.index(['email']);
    table.index(['phone_number']);
    table.index(['full_name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('support_contacts');
}
