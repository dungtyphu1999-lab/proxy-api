import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('notifications', (table) => {
    // Add related entity columns
    table
      .string('related_entity_type', 50)
      .nullable()
      .comment('Type of related entity (blog, product, order, etc.)');
    table
      .string('related_entity_id', 255)
      .nullable()
      .comment('ID of the related entity');
  });

  // Create index for better query performance
  await knex.schema.raw(`
    CREATE INDEX idx_notifications_related_entity 
    ON notifications(related_entity_type, related_entity_id) 
    WHERE related_entity_type IS NOT NULL AND related_entity_id IS NOT NULL
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop index first
  await knex.schema.raw(
    'DROP INDEX IF EXISTS idx_notifications_related_entity',
  );

  // Drop columns
  await knex.schema.alterTable('notifications', (table) => {
    table.dropColumn('related_entity_type');
    table.dropColumn('related_entity_id');
  });
}
