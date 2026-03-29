import type { Knex } from 'knex';

interface TransactionWithNote {
  id: string;
  note: string;
}

interface TransactionWithBankInfo {
  id: string;
  bank_info: string | object;
}

interface BankInfo {
  bank_name: string;
  account_number: string;
  account_name: string;
  note: string;
}

export async function up(knex: Knex): Promise<void> {
  // Add new bank_info column with JSON type
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.json('bank_info').after('reference_code');
  });

  // Migrate existing note data to bank_info
  const transactions = (await knex('wallet_transactions')
    .whereNotNull('note')
    .select('id', 'note')) as TransactionWithNote[];

  for (const transaction of transactions) {
    if (transaction.note) {
      const noteParts = transaction.note.split('|');
      const bankInfo: BankInfo = {
        bank_name: noteParts[0] || '',
        account_number: noteParts[1] || '',
        account_name: noteParts[2] || '',
        note: noteParts[3] || '',
      };

      await knex('wallet_transactions')
        .where('id', transaction.id)
        .update({ bank_info: JSON.stringify(bankInfo) });
    }
  }

  // Drop the old note column
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('note');
  });

  // Add new note column
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.text('note');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop the new note column
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('note');
  });

  // Add back the old note column
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.text('note');
  });

  // Migrate bank_info data back to note
  const transactions = (await knex('wallet_transactions')
    .whereNotNull('bank_info')
    .select('id', 'bank_info')) as TransactionWithBankInfo[];

  for (const transaction of transactions) {
    if (transaction.bank_info) {
      const bankInfo: BankInfo =
        typeof transaction.bank_info === 'string'
          ? (JSON.parse(transaction.bank_info) as BankInfo)
          : (transaction.bank_info as BankInfo);

      const note = `${bankInfo.bank_name}|${bankInfo.account_number}|${bankInfo.account_name}|${bankInfo.note || ''}`;

      await knex('wallet_transactions')
        .where('id', transaction.id)
        .update({ note });
    }
  }

  // Drop the bank_info column
  await knex.schema.alterTable('wallet_transactions', (table) => {
    table.dropColumn('bank_info');
  });
}
