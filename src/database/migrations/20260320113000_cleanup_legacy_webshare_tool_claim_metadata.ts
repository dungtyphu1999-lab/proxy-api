import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const hasMetaColumn = await knex.schema.hasColumn('proxy_orders', 'webshare_meta');
  const hasStatusColumn = await knex.schema.hasColumn('proxy_orders', 'webshare_status');
  const hasErrorColumn = await knex.schema.hasColumn('proxy_orders', 'webshare_error');

  if (hasMetaColumn) {
    await knex('proxy_orders')
      .whereNotNull('webshare_meta')
      .update({
        webshare_meta: knex.raw(
          "COALESCE(webshare_meta, '{}'::jsonb) - 'tool_claim' - 'tool_last_failure' - 'tool_last_success'",
        ),
      });
  }

  if (hasStatusColumn) {
    const patch: Record<string, unknown> = {
      webshare_status: 'pending',
      updated_at: knex.fn.now(),
    };
    if (hasErrorColumn) {
      patch.webshare_error = knex.raw(
        "CASE WHEN webshare_error ILIKE '%tool%' OR webshare_error ILIKE '%claim%' THEN NULL ELSE webshare_error END",
      );
    }

    await knex('proxy_orders')
      .where('status', 'pending')
      .andWhere('webshare_status', 'processing')
      .update(patch);
  }
}

export async function down(): Promise<void> {
  // Data cleanup migration is intentionally irreversible.
}
