import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('complaint_status_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('complaint_id')
      .notNullable()
      .references('id')
      .inTable('order_complaints')
      .onDelete('CASCADE');

    // Status at this point in time
    table
      .enum('status', [
        'pending',
        'sent_to_shop',
        'shop_responded',
        'escalated',
        'resolved',
        'admin_resolved',
        'rejected',
        'closed',
      ])
      .notNullable();

    // Actor type - who performed this action
    table
      .enum('actor_type', ['system', 'buyer', 'seller', 'admin'])
      .notNullable();

    // Actor ID - null if system
    table.uuid('actor_id').references('id').inTable('users');

    // Message content
    table.text('message');

    // Additional metadata (e.g., new download link, attachments)
    table.jsonb('metadata');

    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Index for querying logs by complaint
    table.index(['complaint_id', 'created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('complaint_status_logs');
}
