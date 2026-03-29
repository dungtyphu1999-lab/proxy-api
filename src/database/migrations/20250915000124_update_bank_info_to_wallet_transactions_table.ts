import type { Knex } from 'knex';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

interface BankData {
  id: string;
  name: string;
  code: string;
  bin: number;
  short_name: string;
  logo_url: string;
  icon_url: string;
  swift_code: string;
  lookup_supported: number;
}

interface BankListResponse {
  code: number;
  success: boolean;
  data: BankData[];
  msg: string;
}

interface OldBankInfo {
  bank_name: string;
  account_number: string;
  account_name: string;
}

interface NewBankInfo {
  bank_code: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

interface WalletTransaction {
  id: string;
  bank_info: string | object;
}

export async function up(knex: Knex): Promise<void> {
  try {
    // Fetch bank list from EKYC API
    const httpService = new HttpService();
    const apiBankList =
      process.env.EKYC_API_BANK_LIST || 'https://api.ekyc.vn/banks';

    const response = await firstValueFrom(
      httpService.get<BankListResponse>(apiBankList, {
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );

    const bankList = response.data.data;

    // Create mapping from short names and names to bank codes
    const bankMapping = new Map<string, { code: string; name: string }>();

    bankList.forEach((bank) => {
      bankMapping.set(bank.code.toUpperCase(), {
        code: bank.code,
        name: bank.short_name,
      });
    });

    // Get all wallet transactions with bank_info
    const transactions = await knex('wallet_transactions')
      .select('id', 'bank_info')
      .whereNotNull('bank_info');

    for (const transaction of transactions as WalletTransaction[]) {
      try {
        // Handle both JSON string and object formats
        let oldBankInfo: OldBankInfo;

        if (typeof transaction.bank_info === 'string') {
          oldBankInfo = JSON.parse(transaction.bank_info) as OldBankInfo;
        } else {
          // If it's already an object, use it directly
          oldBankInfo = transaction.bank_info as unknown as OldBankInfo;
        }

        if (oldBankInfo.bank_name) {
          // Try to find bank by short name or full name
          const bankKey = oldBankInfo.bank_name.toUpperCase();
          const bankData = bankMapping.get(bankKey);

          if (bankData) {
            const newBankInfo: NewBankInfo = {
              bank_code: bankData.code,
              bank_name: bankData.name,
              account_number: oldBankInfo.account_number,
              account_name: oldBankInfo.account_name,
            };

            // Update the transaction with new bank_info format
            await knex('wallet_transactions')
              .where('id', transaction.id)
              .update({
                bank_info: JSON.stringify(newBankInfo),
              });
          } else {
            console.warn(`Bank not found for: ${oldBankInfo.bank_name}`);
          }
        }
      } catch (error) {
        console.error(`Error processing transaction ${transaction.id}:`, error);
        throw error;
      }
    }

    console.log('Successfully updated bank_info in wallet_transactions table');
  } catch (error) {
    console.error('Error in migration:', error);
    throw error;
  }
}

export async function down(knex: Knex): Promise<void> {
  try {
    // Get all wallet transactions with new bank_info format
    const transactions = await knex('wallet_transactions')
      .select('id', 'bank_info')
      .whereNotNull('bank_info');

    for (const transaction of transactions as WalletTransaction[]) {
      try {
        // Handle both JSON string and object formats
        let newBankInfo: NewBankInfo;

        if (typeof transaction.bank_info === 'string') {
          newBankInfo = JSON.parse(transaction.bank_info) as NewBankInfo;
        } else {
          // If it's already an object, use it directly
          newBankInfo = transaction.bank_info as unknown as NewBankInfo;
        }

        if (newBankInfo.bank_code && newBankInfo.bank_name) {
          // Revert to old format (using short name if possible)
          const oldBankInfo: OldBankInfo = {
            bank_name: newBankInfo.bank_name, // Keep full name for now
            account_number: newBankInfo.account_number,
            account_name: newBankInfo.account_name,
          };

          // Update the transaction with old bank_info format
          await knex('wallet_transactions')
            .where('id', transaction.id)
            .update({
              bank_info: JSON.stringify(oldBankInfo),
            });
        }
      } catch (error) {
        console.error(`Error reverting transaction ${transaction.id}:`, error);
      }
    }

    console.log('Successfully reverted bank_info in wallet_transactions table');
  } catch (error) {
    console.error('Error in migration rollback:', error);
    throw error;
  }
}
