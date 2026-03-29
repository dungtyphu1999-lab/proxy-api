import type { Knex } from 'knex';

interface FeatureRow {
  code: string;
  title_vi: string;
  title_en: string;
  price_per_month: number;
  badge_type: string | null;
}

const FEATURES: FeatureRow[] = [
  {
    code: 'high-concurrency',
    title_vi: 'Đồng thời cao',
    title_en: 'High concurrency',
    price_per_month: 101.25,
    badge_type: 'popular',
  },
  {
    code: 'high-priority',
    title_vi: 'Mạng ưu tiên cao',
    title_en: 'High priority network',
    price_per_month: 66.5,
    badge_type: 'recommended',
  },
  {
    code: 'unlimited-ip',
    title_vi: 'Ủy quyền IP không giới hạn',
    title_en: 'Unlimited IP authorization',
    price_per_month: 5,
    badge_type: null,
  },
];

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();
  for (let i = 0; i < FEATURES.length; i++) {
    const row: FeatureRow = FEATURES[i];
    const exists = await knex<{ code: string }>('proxy_additional_features')
      .where('code', row.code)
      .first();
    if (exists) {
      await knex('proxy_additional_features')
        .where('code', row.code)
        .update({
          title_vi: row.title_vi,
          title_en: row.title_en,
          price_per_month: row.price_per_month,
          badge_type: row.badge_type,
          sort_order: i + 1,
          updated_at: now,
        });
    } else {
      const insertData: FeatureRow & {
        sort_order: number;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
      } = {
        ...row,
        sort_order: i + 1,
        is_active: true,
        created_at: now,
        updated_at: now,
      };
      await knex('proxy_additional_features').insert(insertData);
    }
  }
}
