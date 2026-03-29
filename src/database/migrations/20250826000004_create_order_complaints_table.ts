import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('order_complaints', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('order_id')
      .notNullable()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table
      .uuid('complainant_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .uuid('shop_id')
      .notNullable()
      .references('id')
      .inTable('shops')
      .onDelete('CASCADE');
    table
      .enum('type', [
        'product_quality',
        'delivery_issue',
        'payment_issue',
        'fraud',
        'other',
      ])
      .notNullable();
    table.string('title', 255).notNullable();
    table.text('description').notNullable();
    table.jsonb('evidence_images');
    table
      .enum('status', [
        'pending',
        'investigating',
        'resolved',
        'closed',
        'dismissed',
      ])
      .defaultTo('pending');
    table
      .enum('priority', ['low', 'medium', 'high', 'urgent'])
      .defaultTo('medium');
    table.uuid('assigned_to').references('id').inTable('users');
    table.text('resolution');
    table.enum('resolution_type', [
      'refund',
      'replacement',
      'compensation',
      'other',
    ]);
    table.decimal('refund_amount', 14, 2);
    table.timestamp('resolved_at');
    table.uuid('resolved_by').references('id').inTable('users');
    table.timestamp('closed_at');
    table.uuid('closed_by').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    // Indexes
    table.index(['order_id']);
    table.index(['shop_id']);
    table.index(['complainant_id']);
    table.index(['type']);
    table.index(['status']);
    table.index(['priority']);
    table.index(['assigned_to']);
    table.index(['created_at']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('order_complaints');
}
