import { Knex } from 'knex';

// Ensure home menu items are clickable (remove "Đang cập nhật" flags) for:
// Proxy, Tools, Dịch vụ, Website.
export async function up(knex: Knex): Promise<void> {
  const now = new Date();
  await knex('categories')
    .whereNull('parent_id')
    .whereIn('slug', ['proxy', 'tools', 'dich-vu', 'website'])
    .update({
      is_coming_soon: false,
      updated_at: now,
    });
}

export async function down(knex: Knex): Promise<void> {
  const now = new Date();
  await knex('categories')
    .whereNull('parent_id')
    .whereIn('slug', ['proxy', 'tools', 'dich-vu', 'website'])
    .update({
      is_coming_soon: true,
      updated_at: now,
    });
}
