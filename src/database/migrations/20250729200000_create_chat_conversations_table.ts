import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('chat_conversations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    // Participants - support multiple participants
    table
      .uuid('initiator_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('participant_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // Conversation metadata
    table.string('title', 255).nullable();
    table.text('last_message').nullable();
    table.timestamp('last_message_at').nullable();
    table
      .uuid('last_sender_id')
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');

    // Conversation type and status
    table
      .enum('type', [
        'user_to_user',
        'user_to_shop',
        'user_to_admin',
        'admin_to_user',
      ])
      .notNullable();
    table.enum('status', ['active', 'archived', 'blocked']).defaultTo('active');

    // User preferences (integrated from chat_user_preferences)
    table.boolean('is_pinned').defaultTo(false);
    table.boolean('is_muted').defaultTo(false);
    table.timestamp('muted_until').nullable();
    table.boolean('notifications_enabled').defaultTo(true);
    table.integer('unread_count').defaultTo(0);

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes for performance
    table.index(['initiator_id']);
    table.index(['participant_id']);
    table.index(['type']);
    table.index(['status']);
    table.index(['last_message_at']);
    table.index(['is_pinned']);
    table.index(['is_muted']);
    table.index(['unread_count']);

    // Composite indexes for common queries
    table.index(['initiator_id', 'participant_id']);
    table.index(['initiator_id', 'type']);
    table.index(['participant_id', 'type']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chat_conversations');
}
