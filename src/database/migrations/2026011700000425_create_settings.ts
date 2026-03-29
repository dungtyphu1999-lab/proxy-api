import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('settings');

  // This migration is made idempotent because some environments may already
  // have the `settings` table created manually or from a backup, while the
  // knex_migrations record is missing.
  if (!hasTable) {
    await knex.schema.createTable('settings', (table) => {
      table.increments('id').primary();

      table
        .text('key')
        .notNullable()
        .unique()
        .comment('Key cấu hình');

      table
        .text('value')
        .notNullable()
        .comment('Giá trị cấu hình');
    });
  }

  // Insert default data (safe if it already exists).
  const existing = await knex('settings')
    .where({ key: 'setting_percent_price_serve' })
    .first();
  if (!existing) {
    await knex('settings').insert({
      key: 'setting_percent_price_serve',
      value: '10',
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('settings');
}
