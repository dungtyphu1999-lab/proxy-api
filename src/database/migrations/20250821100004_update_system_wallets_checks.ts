import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Drop constraint
  await knex.schema.alterTable('system_wallets', (table) => {
    table.dropChecks('system_wallets_balance_check');
    table.dropChecks('system_wallets_reserved_amount_check');
  });

  // Create new constraint
  await knex.schema.alterTable('system_wallets', (table) => {
    table.check('balance >= 0', [], 'system_wallets_balance_check');
    table.check(
      'reserved_amount >= 0',
      [],
      'system_wallets_reserved_amount_check',
    );
  });
}

export async function down(knex: Knex): Promise<void> {
  // Rollback to > 0
  await knex.schema.alterTable('system_wallets', (table) => {
    table.dropChecks('system_wallets_balance_check');
    table.dropChecks('system_wallets_reserved_amount_check');
  });

  await knex.schema.alterTable('system_wallets', (table) => {
    table.check('balance > 0', [], 'system_wallets_balance_check');
    table.check(
      'reserved_amount > 0',
      [],
      'system_wallets_reserved_amount_check',
    );
  });
}
