import type { Knex } from 'knex';

interface ProxyProductInsert {
  id: number;
}

/** Record shape for proxy_product_options (for Knex .where(object) typing) */
interface ProxyProductOptionRecord {
  id: number;
  product_id: number;
  option_type: string;
  option_value: string;
}

interface QuantityOption {
  option_value: string;
  label: string;
  price_per_unit: number | null;
  is_popular?: boolean;
}

interface BandwidthOption {
  option_value: string;
  label: string;
  is_popular?: boolean;
}

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();

  const products = [
    {
      code: 'static_residential',
      name_vi: 'Proxy dân cư tĩnh',
      name_en: 'Static Residential Proxy',
    },
    {
      code: 'rotating_residential',
      name_vi: 'Proxy dân cư xoay',
      name_en: 'Rotating Residential Proxy',
    },
    {
      code: 'proxy_server',
      name_vi: 'Proxy Server',
      name_en: 'Proxy Server',
    },
  ];

  for (const p of products) {
    const existing = await knex<{ id: number }>('proxy_products')
      .where('code', p.code)
      .select('id')
      .first();
    if (existing) continue;

    const insertedRows = await knex('proxy_products')
      .insert({
        code: p.code,
        name_vi: p.name_vi,
        name_en: p.name_en,
        is_active: true,
        created_at: now,
        updated_at: now,
      })
      .returning<ProxyProductInsert[]>('id');

    const inserted = insertedRows[0];
    if (!inserted) continue;
    const productId = inserted.id;

    if (p.code === 'static_residential') {
      const exclusivity = [
        {
          option_value: 'shared',
          label: 'Dùng chung',
          description: 'Chia sẻ với hơn 2 người dùng',
          extra_data: JSON.stringify({ subnet_count: 228 }),
        },
        {
          option_value: 'dedicated',
          label: 'Chuyên dụng',
          description: 'Toàn quyền sử dụng',
          extra_data: JSON.stringify({ subnet_count: 357 }),
        },
      ];
      for (let i = 0; i < exclusivity.length; i++) {
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'exclusivity',
            option_value: exclusivity[i].option_value,
          })
          .first();
        if (exists) continue;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'exclusivity',
          option_value: exclusivity[i].option_value,
          label: exclusivity[i].label,
          description: exclusivity[i].description,
          extra_data: exclusivity[i].extra_data,
          price_per_month: null,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }

      // PROXY NUMBER theo thứ tự ảnh: 20, 50, 75, 100, 250, 500, 1000 (Popular), 2000, 3000, 5000, 10000, Custom
      // Chỉ giữ các option có trong JSON: 20, 250, 1000, 5000, Custom
      // Giá từ JSON (1 USD = 26,000 VND), tính price_per_unit từ giá gói / số lượng IP
      // Sử dụng giá cho bandwidth 250 GB (option đầu tiên trong ảnh):
      // - 20 IPs + 250 GB: $75.00 → price_per_unit = (75 * 26000) / 20 = 97,500 VND/IP
      // - 250 IPs + 250 GB: $75.00 → price_per_unit = (75 * 26000) / 250 = 7,800 VND/IP
      // - 1000 IPs + 250 GB: $30.00 → price_per_unit = (30 * 26000) / 1000 = 780 VND/IP
      // - 5000 IPs + 250 GB: $150.00 → price_per_unit = (150 * 26000) / 5000 = 780 VND/IP
      const quantity: QuantityOption[] = [
        {
          option_value: '20',
          label: '20 IPs',
          price_per_unit: (75 * 26000) / 20, // $75.00 cho 250GB từ JSON
        },
        {
          option_value: '250',
          label: '250 IPs',
          price_per_unit: (75 * 26000) / 250, // $75.00 cho 250GB từ JSON
        },
        {
          option_value: '1000',
          label: '1000 IPs',
          price_per_unit: (30 * 26000) / 1000, // $30.00 cho 250GB từ JSON
          is_popular: true,
        },
        {
          option_value: '5000',
          label: '5000 IPs',
          price_per_unit: (150 * 26000) / 5000, // $150.00 cho 250GB từ JSON
        },
        { option_value: 'custom', label: 'Tuỳ chỉnh', price_per_unit: null },
      ];
      for (let i = 0; i < quantity.length; i++) {
        const q: QuantityOption = quantity[i];
        const extra = q.is_popular
          ? JSON.stringify({ is_popular: true })
          : null;
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'quantity',
            option_value: q.option_value,
          })
          .first();
        if (exists) continue;
        const pricePerMonth =
          q.price_per_unit && q.option_value !== 'custom'
            ? q.price_per_unit * parseInt(q.option_value, 10)
            : null;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'quantity',
          option_value: q.option_value,
          label: q.label,
          price_per_unit: q.price_per_unit,
          price_per_month: pricePerMonth,
          extra_data: extra,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }

      // BANDWIDTH theo thứ tự ảnh: 250 GB, 1,000 GB, 5,000 GB (Popular), Unlimited GB
      const bandwidth: BandwidthOption[] = [
        { option_value: '250', label: '250 GB' },
        { option_value: '1000', label: '1,000 GB' },
        { option_value: '5000', label: '5,000 GB', is_popular: true },
        { option_value: 'unlimited', label: 'Unlimited GB' },
      ];
      for (let i = 0; i < bandwidth.length; i++) {
        const bw: BandwidthOption = bandwidth[i];
        const extra = bw.is_popular
          ? JSON.stringify({ is_popular: true })
          : null;
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'bandwidth',
            option_value: bw.option_value,
          })
          .first();
        if (exists) continue;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'bandwidth',
          option_value: bw.option_value,
          label: bw.label,
          price_per_month: null,
          extra_data: extra,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }
    }

    if (p.code === 'proxy_server') {
      const exclusivity = [
        {
          option_value: 'shared',
          label: 'Dùng chung',
          description: 'Chia sẻ với hơn 2 người dùng',
          extra_data: JSON.stringify({ subnet_count: 228 }),
        },
      ];
      for (let i = 0; i < exclusivity.length; i++) {
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'exclusivity',
            option_value: exclusivity[i].option_value,
          })
          .first();
        if (exists) continue;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'exclusivity',
          option_value: exclusivity[i].option_value,
          label: exclusivity[i].label,
          description: exclusivity[i].description,
          extra_data: exclusivity[i].extra_data,
          price_per_month: null,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }

      const quantity: QuantityOption[] = [
        { option_value: '100', label: '100 IPs', price_per_unit: 0.6 },
        { option_value: '250', label: '250 IPs', price_per_unit: 0.6 },
        {
          option_value: '1000',
          label: '1000 IPs',
          price_per_unit: 0.6,
          is_popular: true,
        },
        { option_value: '5000', label: '5000 IPs', price_per_unit: 0.48 },
        { option_value: 'custom', label: 'Tuỳ chỉnh', price_per_unit: null },
      ];
      for (let i = 0; i < quantity.length; i++) {
        const q: QuantityOption = quantity[i];
        const extra = q.is_popular
          ? JSON.stringify({ is_popular: true })
          : null;
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'quantity',
            option_value: q.option_value,
          })
          .first();
        if (exists) continue;
        const pricePerMonth =
          q.price_per_unit && q.option_value !== 'custom'
            ? q.price_per_unit * parseInt(q.option_value, 10)
            : null;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'quantity',
          option_value: q.option_value,
          label: q.label,
          price_per_unit: q.price_per_unit,
          price_per_month: pricePerMonth,
          extra_data: extra,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }

      const bandwidth: BandwidthOption[] = [
        { option_value: '100', label: '100 GB' },
        { option_value: '250', label: '250 GB' },
        { option_value: '500', label: '500 GB' },
        { option_value: '1000', label: '1000 GB' },
        { option_value: '2500', label: '2500 GB' },
        { option_value: '5000', label: '5000 GB', is_popular: true },
        { option_value: '10000', label: '10000 GB' },
        { option_value: '15000', label: '15000 GB' },
        { option_value: '25000', label: '25000 GB' },
        { option_value: '40000', label: '40000 GB' },
        { option_value: '60000', label: '60000 GB' },
        { option_value: '100000', label: '100000 GB' },
        { option_value: 'unlimited', label: 'Unlimited' },
        { option_value: 'custom', label: 'Custom GB' },
      ];
      for (let i = 0; i < bandwidth.length; i++) {
        const bw: BandwidthOption = bandwidth[i];
        const extra = bw.is_popular
          ? JSON.stringify({ is_popular: true })
          : null;
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'bandwidth',
            option_value: bw.option_value,
          })
          .first();
        if (exists) continue;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'bandwidth',
          option_value: bw.option_value,
          label: bw.label,
          price_per_month: null,
          extra_data: extra,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }
    }

    if (p.code === 'rotating_residential') {
      const bandwidthOptions: BandwidthOption[] = [
        { option_value: '1', label: '1 GB', is_popular: true },
        { option_value: '3', label: '3 GB' },
        { option_value: '10', label: '10 GB' },
        { option_value: '25', label: '25 GB' },
        { option_value: '50', label: '50 GB' },
        { option_value: '100', label: '100 GB' },
        { option_value: '250', label: '250 GB' },
        { option_value: '500', label: '500 GB' },
        { option_value: '1000', label: '1000 GB' },
        { option_value: '3000', label: '3000 GB' },
      ];
      for (let i = 0; i < bandwidthOptions.length; i++) {
        const bo: BandwidthOption = bandwidthOptions[i];
        const extra = bo.is_popular
          ? JSON.stringify({ is_popular: true })
          : null;
        const exists = await knex<ProxyProductOptionRecord>(
          'proxy_product_options',
        )
          .where({
            product_id: productId,
            option_type: 'bandwidth',
            option_value: bo.option_value,
          })
          .first();
        if (exists) continue;
        await knex('proxy_product_options').insert({
          product_id: productId,
          option_type: 'bandwidth',
          option_value: bo.option_value,
          label: bo.label,
          price_per_month: null,
          extra_data: extra,
          sort_order: i + 1,
          is_active: true,
          created_at: now,
          updated_at: now,
        });
      }
    }
  }
}
