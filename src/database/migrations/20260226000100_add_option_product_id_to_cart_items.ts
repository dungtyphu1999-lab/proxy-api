import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasColumn = await knex.schema.hasColumn(
    'cart_items',
    'option_product_id',
  );

  if (!hasColumn) {
    await knex.schema.alterTable('cart_items', (table) => {
      table.bigInteger('option_product_id').nullable();
      table.index(['option_product_id']);
    });
  }

  // Drop old unique constraint if it exists (cart_id, product_id)
  await knex.raw(
    'ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_cart_id_product_id_unique',
  );

  // Create new unique constraint including option_product_id
  await knex.schema.alterTable('cart_items', (table) => {
    table.unique(
      ['cart_id', 'product_id', 'option_product_id'],
      'cart_items_cart_id_product_id_option_product_id_unique',
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    'ALTER TABLE cart_items DROP CONSTRAINT IF EXISTS cart_items_cart_id_product_id_option_product_id_unique',
  );

  const hasColumn = await knex.schema.hasColumn(
    'cart_items',
    'option_product_id',
  );

  if (hasColumn) {
    await knex.schema.alterTable('cart_items', (table) => {
      table.dropIndex(['option_product_id']);
      table.dropColumn('option_product_id');
    });
  }

  await knex.schema.alterTable('cart_items', (table) => {
    table.unique(['cart_id', 'product_id']);
  });
}
