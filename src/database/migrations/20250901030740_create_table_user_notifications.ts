import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Tạo bảng user_notifications để track trạng thái đọc của từng user
  await knex.schema.createTable('user_notifications', (table) => {
    table.increments('id').primary();
    table
      .integer('notification_id')
      .references('id')
      .inTable('notifications')
      .onDelete('CASCADE');
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.boolean('is_read').defaultTo(false);
    table.timestamp('read_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Unique constraint để tránh duplicate
    table.unique(['notification_id', 'user_id']);

    // Index để tối ưu query
    table.index(['user_id', 'is_read']);
    table.index(['notification_id', 'is_read']);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Xóa bảng user_notifications
  await knex.schema.dropTableIfExists('user_notifications');
}
