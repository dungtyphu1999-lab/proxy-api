import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_lock_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable();
    table.enum('action', ['lock', 'unlock']).notNullable();
    table.enum('reason', ['suspicion', 'violation', 'others']).notNullable();
    table.text('note').nullable();
    table.uuid('performed_by').notNullable();
    table.timestamps(true, true);

    // Foreign key constraints
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('performed_by')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('user_lock_logs');
}
