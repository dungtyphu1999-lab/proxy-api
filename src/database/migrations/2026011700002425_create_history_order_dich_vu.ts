import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('history_order_dich_vu');

  // Idempotent for environments restored from backups where the table exists
  // but the knex_migrations record is missing.
  if (hasTable) return;

  await knex.schema.createTable('history_order_dich_vu', (table) => {
    table.bigIncrements('id').primary();

    table
      .decimal('price', 12, 2)
      .notNullable()
      .comment('Giá gốc');

    table
      .decimal('final_price', 12, 2)
      .notNullable()
      .comment('Giá sau khi áp dụng chiết khấu');

    table
      .decimal('commission', 5, 2)
      .notNullable()
      .comment('Phần trăm hoa hồng');

    table
      .string('user_id', 255)
      .notNullable()
      .comment('ID người dùng');

    table
      .string('name_dich_vu', 255)
      .notNullable()
      .comment('Tên dịch vụ');

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table
      .timestamp('updated_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('history_order_dich_vu');
}
