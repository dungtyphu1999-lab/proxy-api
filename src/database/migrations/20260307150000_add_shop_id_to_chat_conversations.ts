import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn(
    'chat_conversations',
    'shop_id',
  );
  if (hasColumn) return;
  await knex.schema.alterTable('chat_conversations', (table) => {
    table
      .uuid('shop_id')
      .nullable()
      .references('id')
      .inTable('shops')
      .onDelete('SET NULL');

    table.index(['shop_id']);
    table.index(['initiator_id', 'participant_id', 'type', 'shop_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn(
    'chat_conversations',
    'shop_id',
  );
  if (!hasColumn) return;
  await knex.schema.alterTable('chat_conversations', (table) => {
    table.dropIndex(['initiator_id', 'participant_id', 'type', 'shop_id']);
    table.dropIndex(['shop_id']);
    table.dropColumn('shop_id');
  });
}
