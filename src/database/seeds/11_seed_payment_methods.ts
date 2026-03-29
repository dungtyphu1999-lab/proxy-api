import type { Knex } from 'knex';

interface PaymentMethodRow {
  code: string;
  name_vi: string;
  name_en: string;
  sort_order: number;
}

const METHODS: PaymentMethodRow[] = [
  {
    code: 'bank_transfer',
    name_vi: 'Chuyển khoản ngân hàng',
    name_en: 'Bank transfer',
    sort_order: 1,
  },
  { code: 'momo', name_vi: 'Ví MoMo', name_en: 'MoMo e-wallet', sort_order: 2 },
  { code: 'vnpay', name_vi: 'VNPay', name_en: 'VNPay', sort_order: 3 },
  {
    code: 'stripe',
    name_vi: 'Thẻ quốc tế (Stripe)',
    name_en: 'Stripe',
    sort_order: 4,
  },
];

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();
  for (const row of METHODS) {
    const exists = await knex<{ code: string }>('payment_methods')
      .where('code', row.code)
      .first();
    if (exists) {
      await knex('payment_methods').where('code', row.code).update({
        name_vi: row.name_vi,
        name_en: row.name_en,
        sort_order: row.sort_order,
        updated_at: now,
      });
    } else {
      await knex('payment_methods').insert({
        ...row,
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }
  }
}
