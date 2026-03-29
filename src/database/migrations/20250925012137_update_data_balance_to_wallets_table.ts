import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.transaction(async (trx) => {
    // Update from_wallet_id, to_wallet_id from system_wallet_transactions
    await trx.raw(`
      UPDATE system_wallet_transactions swt
      SET from_wallet_id = sub.wallet_id
      FROM (
        SELECT swt.id, w.id AS wallet_id
        FROM system_wallet_transactions swt
        JOIN system_wallets sw ON sw.id = swt.system_wallet_id
        JOIN orders o ON o.id = sw.reference_id
        JOIN wallets w ON w.user_id = o.buyer_id
        WHERE swt.transaction_type IN ('deposit','release')
      ) AS sub
      WHERE swt.id = sub.id
    `);

    await trx.raw(`
      UPDATE system_wallet_transactions swt
      SET to_wallet_id = sub.wallet_id
      FROM (
        SELECT swt.id, w.id AS wallet_id
        FROM system_wallet_transactions swt
        JOIN system_wallets sw ON sw.id = swt.system_wallet_id
        JOIN orders o ON o.id = sw.reference_id
        JOIN shops s ON s.id = o.shop_id
        JOIN wallets w ON w.user_id = s.owner_id
        WHERE swt.transaction_type IN ('release')
      ) AS sub
      WHERE swt.id = sub.id
    `);

    // Update wallet deposit_balance and sale_balance
    await knex.raw(`
      UPDATE wallets w
      SET
        sale_balance = COALESCE(s.total, 0),
        deposit_balance = w.balance - COALESCE(s.total, 0)
      FROM (
        SELECT to_wallet_id, SUM(amount) AS total
        FROM system_wallet_transactions
        WHERE transaction_type = 'release' AND to_wallet_id IS NOT NULL
        GROUP BY to_wallet_id
      ) AS s
      WHERE w.id = s.to_wallet_id
    `);

    await knex.raw(`
      UPDATE wallets w
      SET deposit_balance = balance
      WHERE sale_balance = 0
    `);
  });
}

export async function down(): Promise<void> {}
