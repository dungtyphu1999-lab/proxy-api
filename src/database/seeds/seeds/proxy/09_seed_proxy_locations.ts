import type { Knex } from 'knex';

const LOCATIONS = [
  {
    location_key: 'random',
    country_code: null,
    name_vi: 'Ngẫu nhiên',
    name_en: 'Random',
    available_count: 1000,
    sort_order: 0,
  },
  {
    location_key: 'us',
    country_code: 'US',
    name_vi: 'Hoa Kỳ',
    name_en: 'United States',
    available_count: 30460,
    sort_order: 1,
  },
  {
    location_key: 'fr',
    country_code: 'FR',
    name_vi: 'Pháp',
    name_en: 'France',
    available_count: 5450,
    sort_order: 2,
  },
  {
    location_key: 'de',
    country_code: 'DE',
    name_vi: 'Đức',
    name_en: 'Germany',
    available_count: 12490,
    sort_order: 3,
  },
  {
    location_key: 'uk',
    country_code: 'GB',
    name_vi: 'Vương quốc Anh',
    name_en: 'United Kingdom',
    available_count: 3450,
    sort_order: 4,
  },
  {
    location_key: 'be',
    country_code: 'BE',
    name_vi: 'Bỉ',
    name_en: 'Belgium',
    available_count: 10350,
    sort_order: 5,
  },
  {
    location_key: 'ca',
    country_code: 'CA',
    name_vi: 'Canada',
    name_en: 'Canada',
    available_count: 30469,
    sort_order: 6,
  },
  {
    location_key: 'jp',
    country_code: 'JP',
    name_vi: 'Nhật Bản',
    name_en: 'Japan',
    available_count: 2460,
    sort_order: 7,
  },
];

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();
  for (const row of LOCATIONS) {
    const exists = await knex<{ location_key: string }>('proxy_locations')
      .where('location_key', row.location_key)
      .first();
    if (exists) {
      await knex('proxy_locations')
        .where('location_key', row.location_key)
        .update({
          ...row,
          updated_at: now,
        });
    } else {
      await knex('proxy_locations').insert({
        ...row,
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }
  }
}
