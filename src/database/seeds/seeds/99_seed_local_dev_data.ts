import { Knex } from 'knex';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';

type CategoryRow = {
  id: string;
  parent_id: string | null;
};

type UserSeed = {
  id: string;
  email: string;
  username: string;
};

type ShopSeed = {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
};

const USERS_COUNT = 10;
const SHOPS_COUNT = 20;
const PRODUCTS_COUNT = 100;
const OPTIONS_COUNT = 200;
const TOTAL_KEYS = 500;

const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
];

function formatVND(price: number): string {
  return `${price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
}

function buildPriceMinMax(prices: number[]): string {
  if (!prices.length) return formatVND(0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  if (minPrice === maxPrice) return formatVND(minPrice);
  return `${formatVND(minPrice)}-${formatVND(maxPrice)}`;
}

function buildImages(index: number) {
  const first = IMAGE_POOL[index % IMAGE_POOL.length];
  const second = IMAGE_POOL[(index + 1) % IMAGE_POOL.length];
  return [
    { file_path: first, sort_order: 0, is_primary: true },
    { file_path: second, sort_order: 1, is_primary: false },
  ];
}

export async function seed(knex: Knex): Promise<void> {
  const env = String(
    process.env.APP_ENV || process.env.NODE_ENV || '',
  ).toLowerCase();
  if (env === 'production') {
    console.log('Local dev seed skipped in production.');
    return;
  }

  const now = new Date();
  const hasOptionAccountKeys = await knex.schema.hasColumn(
    'option_products',
    'account_keys',
  );
  const hasOptionDescriptionQty = await knex.schema.hasColumn(
    'option_products',
    'description_quantity',
  );
  const hasOptionDataSource = await knex.schema.hasColumn(
    'option_products',
    'data_source',
  );
  const hasProfileUsername = await knex.schema.hasColumn(
    'user_profiles',
    'username',
  );

  await knex.raw(`
    TRUNCATE TABLE
      order_items,
      orders,
      cart_items,
      carts,
      product_version_images,
      product_versions,
      option_products,
      products,
      shops,
      wallet_transactions,
      wallets,
      user_profiles,
      user_role_map,
      users
    RESTART IDENTITY CASCADE
  `);

  const role = await knex('roles')
    .select('id')
    .where('name', 'user')
    .first<{ id: string }>();
  if (!role?.id) {
    throw new Error('Missing role "user". Seed roles before running this.');
  }

  const passwordHash = await bcrypt.hash('Test@12345', 10);

  const users: UserSeed[] = [];
  for (let i = 1; i <= USERS_COUNT; i += 1) {
    const id = randomUUID();
    const email = `dev_user_${i}@local.test`;
    const username = `dev_user_${i}`;
    users.push({ id, email, username });

    await knex('users').insert({
      id,
      email,
      username,
      password_hash: passwordHash,
      is_verified: true,
      is_locked: false,
      is_online: false,
      has_received_welcome_message: true,
      created_at: now,
      updated_at: now,
    });

    const profileRow: Record<string, any> = {
      user_id: id,
      full_name: `Dev User ${i}`,
      is_profile_updated: true,
    };
    if (hasProfileUsername) {
      profileRow.username = username;
    }
    await knex('user_profiles').insert(profileRow);

    await knex('user_role_map').insert({
      id: randomUUID(),
      user_id: id,
      role_id: role.id,
      assigned_at: now,
    });
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

  for (let i = 0; i < users.length; i += 1) {
    const amount = 5_000_000 + i * 500_000;
    const walletData: Record<string, any> = {
      id: randomUUID(),
      user_id: users[i].id,
      balance: amount,
      currency: 'VND',
      is_locked: false,
      created_at: now,
      updated_at: now,
    };
    if (hasDepositBalance) walletData.deposit_balance = amount;
    if (hasSaleBalance) walletData.sale_balance = 0;
    if (hasLockedBalance) walletData.locked_balance = 0;

    await knex('wallets').insert(walletData);
  }

  const shops: ShopSeed[] = [];
  for (let i = 1; i <= SHOPS_COUNT; i += 1) {
    const owner = users[(i - 1) % users.length];
    const name = `Dev Shop ${i}`;
    const slug = slugify(name, { lower: true, strict: true });
    const shopId = randomUUID();
    shops.push({ id: shopId, owner_id: owner.id, name, slug });

    await knex('shops').insert({
      id: shopId,
      owner_id: owner.id,
      name,
      slug,
      description: `Shop demo ${i} cho test local/dev.`,
      avatar_url: `https://randomuser.me/api/portraits/lego/${(i % 10) + 1}.jpg`,
      is_suspended: false,
      created_at: now,
      updated_at: now,
    });
  }

  const categories = await knex<CategoryRow>('categories').select(
    'id',
    'parent_id',
  );
  const subcategories = categories.filter((c) => c.parent_id);
  if (!subcategories.length) {
    throw new Error('No subcategories found. Seed categories first.');
  }

  const baseKeysPerOption = Math.floor(TOTAL_KEYS / OPTIONS_COUNT);
  const extraKeys = TOTAL_KEYS % OPTIONS_COUNT;
  let optionIndex = 0;
  let keyCounter = 1;

  for (let i = 1; i <= PRODUCTS_COUNT; i += 1) {
    const shop = shops[(i - 1) % shops.length];
    const subcategory = subcategories[(i - 1) % subcategories.length];
    const categoryId = subcategory.parent_id as string;
    const productId = randomUUID();
    const slug = `dev-product-${String(i).padStart(3, '0')}`;
    const name = `Dev Product ${i}`;
    const basePrice = 50_000 + i * 1_000;
    const state =
      i <= 60 ? 'live' : i <= 80 ? 'pending' : i <= 90 ? 'hidden' : 'rejected';

    const options = Array.from({ length: 2 }, (_, optIdx) => {
      const qty = baseKeysPerOption + (optionIndex < extraKeys ? 1 : 0);
      const label = `P${i}-O${optIdx + 1}`;
      const keys = Array.from({ length: qty }, () => {
        const key = `KEY-${label}-${String(keyCounter).padStart(4, '0')}`;
        keyCounter += 1;
        return key;
      });
      optionIndex += 1;

      return {
        name: `Gói ${optIdx + 1}`,
        price: basePrice + optIdx * 15_000,
        quantity: qty,
        account_keys: keys,
        description_quantity: keys,
      };
    });

    const totalQuantity = options.reduce(
      (sum, opt) => sum + (Number(opt.quantity) || 0),
      0,
    );
    const priceMinMax = buildPriceMinMax(options.map((opt) => opt.price));

    await knex('products').insert({
      id: productId,
      shop_id: shop.id,
      approved_version_id: null,
      pending_version_id: null,
      slug,
      state,
      total_sales: 0,
      total_revenue: 0,
      rating_avg: 0,
      rating_count: 0,
      total_like: 0,
      total_view: 0,
      total_review: 0,
      price_min_max: priceMinMax,
      total_quantity: totalQuantity,
      created_at: now,
      updated_at: now,
    });

    const versionId = randomUUID();
    const versionStatus =
      state === 'rejected'
        ? 'rejected'
        : state === 'pending'
          ? 'pending'
          : 'approved';
    await knex('product_versions').insert({
      id: versionId,
      product_id: productId,
      version_type: 'new',
      status: versionStatus,
      name,
      slug,
      is_free: false,
      price: basePrice,
      discount_percent: i % 3 === 0 ? 10 : 0,
      category_id: categoryId,
      subcategory_id: subcategory.id,
      description: `Mô tả sản phẩm ${i}`,
      instruction: `Hướng dẫn sử dụng sản phẩm ${i}`,
      meta: { demo_url: 'https://example.com' },
      submitted_by: shop.owner_id,
      reviewed_by: shop.owner_id,
      submitted_at: now,
      reviewed_at: now,
      created_at: now,
      updated_at: now,
      total_quantity: totalQuantity,
      price_min_max: priceMinMax,
    });

    await knex('products')
      .where('id', productId)
      .update({
        approved_version_id: versionStatus === 'approved' ? versionId : null,
        pending_version_id: versionStatus !== 'approved' ? versionId : null,
      });

    const images = buildImages(i);
    await knex('product_version_images').insert(
      images.map((img) => ({
        id: randomUUID(),
        product_version_id: versionId,
        file_path: img.file_path,
        sort_order: img.sort_order,
        is_primary: img.is_primary,
        created_at: now,
      })),
    );

    await knex('option_products').insert(
      options.map((opt) => {
        const row: Record<string, any> = {
          product_id: productId,
          name: opt.name,
          price: opt.price,
          quantity: opt.quantity,
          created_at: now,
          updated_at: now,
        };
        if (hasOptionDescriptionQty) {
          row.description_quantity = opt.description_quantity;
        }
        if (hasOptionAccountKeys) {
          row.account_keys = opt.account_keys;
        }
        if (hasOptionDataSource) {
          row.data_source = 'manual';
        }
        return row;
      }),
    );
  }

  console.log(
    `Seeded: ${USERS_COUNT} users, ${SHOPS_COUNT} shops, ${PRODUCTS_COUNT} products, ${OPTIONS_COUNT} options, ${TOTAL_KEYS} keys.`,
  );
}
