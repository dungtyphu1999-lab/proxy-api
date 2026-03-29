import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Install pg_trgm extension for trigram-based text search
  await knex.raw('CREATE EXTENSION IF NOT EXISTS pg_trgm');

  await knex.schema.createTable('chat_messages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    // Message relationship
    table
      .uuid('conversation_id')
      .notNullable()
      .references('id')
      .inTable('chat_conversations')
      .onDelete('CASCADE');
    table
      .uuid('sender_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    // Message content
    table.text('content').notNullable();
    table
      .enum('message_type', ['text', 'image', 'file', 'system'])
      .defaultTo('text');

    // File attachments (optional)
    table.string('file_url', 500).nullable();
    table.string('file_name', 255).nullable();
    table.integer('file_size').nullable();
    table.string('file_type', 100).nullable();

    // Message status
    table.boolean('is_read').defaultTo(false);
    table.timestamp('read_at').nullable();
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('deleted_at').nullable();

    // Message metadata
    table.jsonb('metadata').nullable(); // For additional data like reactions, mentions, etc.

    // Timestamps
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes for performance
    table.index(['conversation_id']);
    table.index(['sender_id']);
    table.index(['message_type']);
    table.index(['is_read']);
    table.index(['is_deleted']);
    table.index(['created_at']);

    // Composite indexes for common queries
    table.index(['conversation_id', 'created_at']);
    table.index(['conversation_id', 'is_read']);
    table.index(['sender_id', 'created_at']);
  });

  // Full-text search index on content using gin_trgm_ops for text similarity
  await knex.raw(
    'CREATE INDEX idx_chat_messages_content_gin ON chat_messages USING gin (content gin_trgm_ops)',
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('chat_messages');
}
