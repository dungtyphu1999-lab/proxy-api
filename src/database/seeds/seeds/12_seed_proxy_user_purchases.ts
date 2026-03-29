import type { Knex } from 'knex';

const ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001';

/** Fake proxy IPs (residential-style) - đủ unique (user_id, address, port) */
function* fakeProxyAddresses(
  count: number,
): Generator<{ address: string; port: number }> {
  const bases = ['142.111', '185.202', '192.168', '10.88'];
  let idx = 0;
  for (let i = 0; i < count; i++) {
    const base = bases[i % bases.length];
    const lastOctet = (idx % 254) + 1;
    const port = 8000 + (idx % 5000);
    idx++;
    yield {
      address: `${base}.${Math.floor(idx / 254) % 256}.${lastOctet}`,
      port,
    };
  }
}

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();

  // 1) Lấy user (admin)
  const admin = await knex<{ id: string }>('users')
    .where('id', ADMIN_USER_ID)
    .first();
  if (!admin) {
    console.log(
      'Seed proxy user purchases: admin user not found. Run 03_seed_admin_user first.',
    );
    return;
  }
  const userId = admin.id;

  // 2) Lấy payment method
  const paymentMethod = await knex<{ id: number }>('payment_methods')
    .where('is_active', true)
    .orderBy('sort_order')
    .first();
  if (!paymentMethod) {
    console.log(
      'Seed proxy user purchases: no payment_methods. Run 11_seed_payment_methods first.',
    );
    return;
  }
  const paymentMethodId = paymentMethod.id;

  // 3) Lấy proxy products
  const staticProduct = await knex<{ id: number }>('proxy_products')
    .where('code', 'static_residential')
    .where('is_active', true)
    .first();
  const rotatingProduct = await knex<{ id: number }>('proxy_products')
    .where('code', 'rotating_residential')
    .where('is_active', true)
    .first();
  if (!staticProduct || !rotatingProduct) {
    console.log(
      'Seed proxy user purchases: proxy_products not found. Run 08_seed_proxy_all first.',
    );
    return;
  }

  // 4) Lấy proxy_product_options (static: exclusivity, quantity, bandwidth; rotating: bandwidth)
  const staticExclusivity = await knex<{ id: number }>('proxy_product_options')
    .where('product_id', staticProduct.id)
    .where('option_type', 'exclusivity')
    .where('option_value', 'shared')
    .first();
  const staticQuantity = await knex<{ id: number }>('proxy_product_options')
    .where('product_id', staticProduct.id)
    .where('option_type', 'quantity')
    .where('option_value', '20')
    .first();
  const staticBandwidth = await knex<{ id: number }>('proxy_product_options')
    .where('product_id', staticProduct.id)
    .where('option_type', 'bandwidth')
    .where('option_value', '1000')
    .first();
  const rotatingBandwidth = await knex<{ id: number }>('proxy_product_options')
    .where('product_id', rotatingProduct.id)
    .where('option_type', 'bandwidth')
    .where('option_value', '10')
    .first();
  if (
    !staticExclusivity ||
    !staticQuantity ||
    !staticBandwidth ||
    !rotatingBandwidth
  ) {
    console.log(
      'Seed proxy user purchases: proxy_product_options not found. Run 08_seed_proxy_all first.',
    );
    return;
  }

  // 5) Lấy proxy_locations
  const locationUs = await knex<{ id: number; country_code: string | null }>(
    'proxy_locations',
  )
    .where('location_key', 'us')
    .first();
  const locationRandom = await knex<{
    id: number;
    country_code: string | null;
  }>('proxy_locations')
    .where('location_key', 'random')
    .first();
  const locationGb = await knex<{ id: number; country_code: string | null }>(
    'proxy_locations',
  )
    .where('location_key', 'uk')
    .first();
  if (!locationUs || !locationRandom || !locationGb) {
    console.log(
      'Seed proxy user purchases: proxy_locations not found. Run 08_seed_proxy_all first.',
    );
    return;
  }

  // 6) Lấy proxy_additional_features
  const feature = await knex<{ id: number }>('proxy_additional_features')
    .where('is_active', true)
    .orderBy('sort_order')
    .first();

  // Idempotent: nếu đã có đơn proxy của admin thì bỏ qua
  const existingOrder = await knex<{ id: number }>('proxy_orders')
    .where('user_id', userId)
    .first();
  if (existingOrder) {
    console.log(
      'Seed proxy user purchases: proxy orders already exist for admin. Skip.',
    );
    return;
  }

  // 7) Tạo proxy_orders (luồng mua: 3 đơn, 1 pending_payment, 1 paid, 1 active)
  const ordersToInsert: Array<{
    user_id: string;
    product_id: number;
    exclusivity_option_id: number | null;
    quantity_option_id: number | null;
    bandwidth_option_id: number | null;
    location_id: number | null;
    additional_feature_id: number | null;
    discount_percent: number;
    amount_total: string;
    billing_cycle: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  }> = [
    {
      user_id: userId,
      product_id: staticProduct.id,
      exclusivity_option_id: staticExclusivity.id,
      quantity_option_id: staticQuantity.id,
      bandwidth_option_id: staticBandwidth.id,
      location_id: locationUs.id,
      additional_feature_id: feature != null ? feature.id : null,
      discount_percent: 0,
      amount_total: '270.00',
      billing_cycle: 'monthly',
      status: 'pending_payment',
      created_at: now,
      updated_at: now,
    },
    {
      user_id: userId,
      product_id: staticProduct.id,
      exclusivity_option_id: staticExclusivity.id,
      quantity_option_id: staticQuantity.id,
      bandwidth_option_id: staticBandwidth.id,
      location_id: locationGb.id,
      additional_feature_id: null,
      discount_percent: 10,
      amount_total: '243.00',
      billing_cycle: 'monthly',
      status: 'paid',
      created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      updated_at: now,
    },
    {
      user_id: userId,
      product_id: rotatingProduct.id,
      exclusivity_option_id: null,
      quantity_option_id: null,
      bandwidth_option_id: rotatingBandwidth.id,
      location_id: locationRandom.id,
      additional_feature_id: feature != null ? feature.id : null,
      discount_percent: 0,
      amount_total: '89.50',
      billing_cycle: 'monthly',
      status: 'active',
      created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
      updated_at: now,
    },
  ];

  const insertedOrders = await knex('proxy_orders')
    .insert(ordersToInsert)
    .returning<Array<{ id: string; status: string }>>('*');

  if (insertedOrders.length === 0) {
    console.log('Seed proxy user purchases: no orders inserted.');
    return;
  }

  // 8) Tạo proxy_transactions cho đơn đã thanh toán (paid, active)
  const paidOrderIds = insertedOrders
    .filter((o) => ['paid', 'active'].includes(o.status))
    .map((o) => o.id);
  const transactionsToInsert = paidOrderIds.map((proxy_order_id) => ({
    proxy_order_id,
    type: 'payment',
    amount: '243.00',
    currency: 'USD',
    payment_method_id: paymentMethodId,
    external_id: `ext_${proxy_order_id.slice(0, 8)}_${Date.now()}`,
    status: 'paid',
    paid_at: now,
    metadata: null,
    created_at: now,
    updated_at: now,
  }));

  // Sửa amount cho đơn thứ 2 (active) nếu có 2 đơn paid
  if (transactionsToInsert.length >= 2) {
    transactionsToInsert[1].amount = '89.50';
  }
  await knex('proxy_transactions').insert(transactionsToInsert);

  // 9) Tạo proxies cho đơn active (user đã có proxy thực tế)
  const activeOrder = insertedOrders.find((o) => o.status === 'active');
  if (activeOrder) {
    const proxyCount = 4;
    const locationsWithCountry: Array<{
      location_id: number;
      country_code: string;
    }> = [
      { location_id: locationRandom.id, country_code: 'US' },
      { location_id: locationRandom.id, country_code: 'GB' },
      { location_id: locationRandom.id, country_code: 'DE' },
      { location_id: locationRandom.id, country_code: 'FR' },
    ];
    const cities: Record<string, string> = {
      US: 'New York',
      GB: 'London',
      DE: 'Berlin',
      FR: 'Paris',
    };
    const gen = fakeProxyAddresses(proxyCount);
    const proxiesToInsert: Array<{
      user_id: string;
      address: string;
      port: number;
      username: string;
      password: string;
      country_code: string;
      city: string | null;
      status: string;
      last_checked_at: Date | null;
      proxy_type: string;
      created_at: Date;
      updated_at: Date;
    }> = [];
    let proxyIdx = 0;
    for (const { address, port } of gen) {
      const loc = locationsWithCountry[proxyIdx % locationsWithCountry.length];
      const countryCode = loc.country_code;
      proxiesToInsert.push({
        user_id: userId,
        address,
        port,
        username: `proxy_user_${userId.slice(0, 8)}_${proxyIdx}`,
        password: `pw_${proxyIdx}_${Date.now().toString(36)}`,
        country_code: countryCode,
        city: cities[countryCode] ?? null,
        status: proxyIdx === 0 ? 'inactive' : 'active',
        last_checked_at:
          proxyIdx === 0 ? null : new Date(now.getTime() - 60 * 60 * 1000),
        proxy_type: 'rotating_residential',
        created_at: now,
        updated_at: now,
      });
      proxyIdx++;
    }
    await knex('proxies').insert(proxiesToInsert);

    // 10) Tạo proxy_check_logs cho vài proxy vừa tạo
    const proxyRows = await knex<{ id: number }>('proxies')
      .where('user_id', userId)
      .orderBy('id', 'desc')
      .limit(proxyCount);
    for (const row of proxyRows.slice(0, 2)) {
      await knex('proxy_check_logs').insert([
        {
          proxy_id: row.id,
          checked_at: new Date(now.getTime() - 2 * 60 * 60 * 1000),
          status: 'active',
          created_at: now,
        },
        {
          proxy_id: row.id,
          checked_at: now,
          status: 'active',
          created_at: now,
        },
      ]);
    }
  }

  // 11) Lưu user_proxy_country_filters (bộ lọc quốc gia) cho admin
  const existingFilters = await knex<{ user_id: string }>(
    'user_proxy_country_filters',
  )
    .where('user_id', userId)
    .first();
  if (!existingFilters) {
    await knex('user_proxy_country_filters').insert([
      { user_id: userId, country_code: 'US', created_at: now },
      { user_id: userId, country_code: 'GB', created_at: now },
      { user_id: userId, country_code: 'FR', created_at: now },
    ]);
  }

  console.log(
    'Seed proxy user purchases: done. Orders, transactions, proxies, check_logs, country_filters created.',
  );
}
