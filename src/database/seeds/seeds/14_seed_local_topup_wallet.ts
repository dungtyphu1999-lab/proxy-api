import { Knex } from 'knex';

/**
 * Local/dev helper seed: ensure a test user has enough wallet balance for testing.
 *
 * Defaults:
 * - email: user@local.test
 * - amount: 10,000,000 VND
 *x
 * Safe to re-run: will upsert wallet balance to the amount.
 */
export async function seed(knex: Knex): Promise<void> {
  const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
  if (env === 'production') return;

  const email = process.env.LOCAL_TEST_TOPUP_EMAIL || 'user@local.test';
  const amount = Number(process.env.LOCAL_TEST_TOPUP_AMOUNT || 10_000_000);

  const user = await knex('users')
    .select('id')
    .where('email', email)
    .first<{ id: string }>();
  if (!user?.id) {
    console.log(`Topup seed skipped: user not found for email=${email}`);
    return;
  }

  const hasDepositBalance = await knex.schema.hasColumn(
    'wallets',
    'deposit_balance',
  );
  const hasSaleBalance = await knex.schema.hasColumn('wallets', 'sale_balance');
  const hasLockedBalance = await knex.schema.hasColumn(
    'wallets',
    'locked_balance',
  );

  const existingWallet = await knex('wallets')
    .select('id', 'balance')
    .where('user_id', user.id)
    .first<{ id: string; balance: string | number }>();

  const now = new Date();
  const walletData: Record<string, any> = {
    user_id: user.id,
    balance: amount,
    currency: 'VND',
    updated_at: now,
  };
  if (hasDepositBalance) walletData.deposit_balance = amount;
  if (hasSaleBalance) walletData.sale_balance = 0;
  if (hasLockedBalance) walletData.locked_balance = 0;

  let walletId = existingWallet?.id;
  if (!walletId) {
    walletData.created_at = now;
    // Avoid relying on dialect-specific `returning()` typing; re-select after insert.
    await knex('wallets').insert(walletData);
    const insertedWallet = await knex('wallets')
      .select('id')
      .where('user_id', user.id)
      .first<{ id: string }>();
    walletId = insertedWallet?.id;
  } else {
    await knex('wallets').where('id', walletId).update(walletData);
  }

  if (walletId) {
    // Record a transaction for visibility when debugging.
    const hasTransactionNumber = await knex.schema.hasColumn(
      'wallet_transactions',
      'transaction_number',
    );
    const hasUserId = await knex.schema.hasColumn(
      'wallet_transactions',
      'user_id',
    );
    const hasMethod = await knex.schema.hasColumn(
      'wallet_transactions',
      'method',
    );
    const tx: Record<string, any> = {
      wallet_id: walletId,
      type: 'topup',
      amount,
      status: 'success',
      reference_code: `LOCAL_TOPUP_${email}_${now.getTime()}`,
      note: `Local seed topup for ${email}`,
      created_at: now,
      completed_at: now,
    };
    if (hasTransactionNumber)
      tx.transaction_number = `LT${now.getTime()}`.slice(0, 20);
    if (hasUserId) tx.user_id = user.id;
    if (hasMethod) tx.method = 'seed';
    await knex('wallet_transactions').insert(tx);
  }

  console.log(`Local topup done: ${email} -> ${amount} VND`);
}
