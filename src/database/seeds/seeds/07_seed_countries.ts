import type { Knex } from 'knex';

const COUNTRIES = [
  {
    code: 'US',
    name_vi: 'Hoa Kỳ',
    name_en: 'United States',
    continent: 'americas',
    is_popular: true,
    sort_order: 1,
  },
  {
    code: 'GB',
    name_vi: 'Vương quốc Anh',
    name_en: 'United Kingdom',
    continent: 'europe',
    is_popular: true,
    sort_order: 2,
  },
  {
    code: 'PL',
    name_vi: 'Ba Lan',
    name_en: 'Poland',
    continent: 'europe',
    is_popular: false,
    sort_order: 3,
  },
  {
    code: 'ES',
    name_vi: 'Tây Ban Nha',
    name_en: 'Spain',
    continent: 'europe',
    is_popular: false,
    sort_order: 4,
  },
  {
    code: 'FR',
    name_vi: 'Pháp',
    name_en: 'France',
    continent: 'europe',
    is_popular: true,
    sort_order: 5,
  },
  {
    code: 'DE',
    name_vi: 'Đức',
    name_en: 'Germany',
    continent: 'europe',
    is_popular: true,
    sort_order: 6,
  },
  {
    code: 'BE',
    name_vi: 'Bỉ',
    name_en: 'Belgium',
    continent: 'europe',
    is_popular: false,
    sort_order: 7,
  },
  {
    code: 'CA',
    name_vi: 'Canada',
    name_en: 'Canada',
    continent: 'americas',
    is_popular: true,
    sort_order: 8,
  },
  {
    code: 'JP',
    name_vi: 'Nhật Bản',
    name_en: 'Japan',
    continent: 'asia',
    is_popular: true,
    sort_order: 9,
  },
];

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();
  for (const row of COUNTRIES) {
    const exists = await knex<{ code: string }>('countries')
      .where('code', row.code)
      .first();
    if (exists) {
      await knex('countries').where('code', row.code).update({
        name_vi: row.name_vi,
        name_en: row.name_en,
        continent: row.continent,
        is_popular: row.is_popular,
        sort_order: row.sort_order,
        updated_at: now,
      });
    } else {
      await knex('countries').insert({
        ...row,
        created_at: now,
        updated_at: now,
      });
    }
  }
}
