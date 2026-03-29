import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
};

type ShopRow = {
  id: string;
  slug: string;
};

type ProductSeed = {
  slug: string;
  name: string;
  categorySlug: string;
  subcategorySlug?: string | null;
  price: number;
  discountPercent: number;
  isFree: boolean;
  description: string;
  instruction: string;
  meta: {
    demo_url?: string;
    download_link?: string | null;
    download_password?: string | null;
  };
  options: {
    name: string;
    price: number;
    quantity: number;
    description_quantity?: string[];
  }[];
};

const ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001';
const SHOP_ID = '00000000-0000-0000-0000-000000000101';
const SHOP_SLUG = 'shop-01';

const TAI_KHOAN_SUBCATEGORIES = [
  { name: 'Tài khoản FB', slug: 'tai-khoan-fb' },
  { name: 'BM', slug: 'bm' },
  { name: 'Zalo', slug: 'zalo' },
  { name: 'Twitter', slug: 'twitter' },
  { name: 'Telegram', slug: 'telegram' },
  { name: 'Instagram', slug: 'instagram' },
  { name: 'Shopee', slug: 'shopee' },
  { name: 'Discord', slug: 'discord' },
  { name: 'TikTok', slug: 'tiktok' },
  { name: 'Key Diệt Virus', slug: 'key-diet-virus' },
  { name: 'Capcut', slug: 'capcut' },
  { name: 'Canva', slug: 'canva' },
  { name: 'Key Window', slug: 'key-window' },
  { name: 'Tài khoản Khác', slug: 'tai-khoan-khac' },
];

const EMAIL_SUBCATEGORIES = [
  { name: 'Gmail', slug: 'gmail' },
  { name: 'HotMail', slug: 'hotmail' },
  { name: 'OutlookMail', slug: 'outlookmail' },
  { name: 'RuMail', slug: 'rumail' },
  { name: 'DomainMail', slug: 'domainmail' },
  { name: 'YahooMail', slug: 'yahoomail' },
  { name: 'ProtonMail', slug: 'protonmail' },
  { name: 'Loại Mail Khác', slug: 'loai-mail-khac' },
];

const IMAGE_POOL = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
];

function formatVND(price: number): string {
  return price
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatPriceWithAbbreviation(
  price: number,
): { display: string; fullPrice: string } {
  const safePrice = Number(price) || 0;
  const fullPrice = `${formatVND(safePrice)} đ`;

  if (safePrice < 1_000_000) {
    return { display: fullPrice, fullPrice };
  }

  if (safePrice >= 1_000_000_000) {
    const value = safePrice / 1_000_000_000;
    const rounded = Math.round(value * 10) / 10;
    const display =
      rounded % 1 === 0
        ? `${rounded.toFixed(0)} tỷ đ`
        : `${rounded.toFixed(1)} tỷ đ`;
    return { display, fullPrice };
  }

  const value = safePrice / 1_000_000;
  const rounded = Math.round(value * 10) / 10;
  const display =
    rounded % 1 === 0
      ? `${rounded.toFixed(0)} triệu đ`
      : `${rounded.toFixed(1)} triệu đ`;

  return { display, fullPrice };
}

function buildPriceMinMax(prices: number[]): string {
  if (!prices.length) return formatPriceWithAbbreviation(0).display;
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceFormatted = formatPriceWithAbbreviation(minPrice);
  const maxPriceFormatted = formatPriceWithAbbreviation(maxPrice);
  if (minPrice === maxPrice) return minPriceFormatted.display;
  return `${formatVND(minPrice)}-${maxPriceFormatted.display}`;
}

function buildOptions(
  basePrice: number,
  baseQty: number,
  seedKey: string,
): ProductSeed['options'] {
  const tiers = [
    { name: 'Gói 1', price: basePrice, quantity: baseQty },
    { name: 'Gói 2', price: Math.round(basePrice * 1.5), quantity: baseQty * 2 },
    { name: 'Gói 3', price: Math.round(basePrice * 2), quantity: baseQty * 4 },
  ];

  return tiers.map((tier, idx) => ({
    ...tier,
    description_quantity: Array.from(
      { length: tier.quantity },
      (_, i) => `${seedKey}-${idx + 1}-${i + 1}`,
    ),
  }));
}

function buildImages(index: number): { file_path: string; sort_order: number; is_primary: boolean }[] {
  const first = IMAGE_POOL[index % IMAGE_POOL.length];
  const second = IMAGE_POOL[(index + 1) % IMAGE_POOL.length];
  return [
    { file_path: first, sort_order: 0, is_primary: true },
    { file_path: second, sort_order: 1, is_primary: false },
  ];
}

export async function seed(knex: Knex): Promise<void> {
  const env = String(process.env.NODE_ENV || '').toLowerCase();
  if (env === 'production') {
    console.log('Seed products skipped in production.');
    return;
  }

  const admin = await knex('users').where('id', ADMIN_USER_ID).first();
  if (!admin) {
    throw new Error(
      'Admin user not found. Please run seed 03_seed_admin_user first.',
    );
  }

  const now = new Date();

  let shop = await knex<ShopRow>('shops').where('slug', SHOP_SLUG).first();
  if (!shop) {
    await knex('shops').insert({
      id: SHOP_ID,
      owner_id: ADMIN_USER_ID,
      name: 'Shop 01',
      slug: SHOP_SLUG,
      description: 'Shop demo dùng cho dữ liệu sản phẩm mẫu.',
      avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
      created_at: now,
      updated_at: now,
    });
    shop = { id: SHOP_ID, slug: SHOP_SLUG };
  }

  const categories = await knex<CategoryRow>('categories').select(
    'id',
    'slug',
    'name',
    'parent_id',
  );
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

  const products: ProductSeed[] = [];
  let index = 1;

  const pushProduct = (
    categorySlug: string,
    subcategorySlug: string | null,
    displayName: string,
  ) => {
    const basePrice = 50000 + index * 12000;
    const baseQty = 5 + (index % 3) * 3;
    const seedKey = `${categorySlug}-${subcategorySlug ?? 'default'}-${index}`;
    const options = buildOptions(basePrice, baseQty, seedKey);
    const slugIndex = String(index).padStart(3, '0');
    let slug = `shop-01-product-${slugIndex}-${subcategorySlug ?? categorySlug}`;
    if (categorySlug === 'tai-khoan' && index === 7) {
      slug = 'shop-01-product-007-tai-khoan';
    }

    const name = `${displayName} - Gói ${slugIndex}`;

    products.push({
      slug,
      name,
      categorySlug,
      subcategorySlug,
      price: Math.min(...options.map((opt) => opt.price)),
      discountPercent: index % 2 === 0 ? 10 : 0,
      isFree: false,
      description: `Sản phẩm ${displayName.toLowerCase()} chất lượng cao, bảo hành 7 ngày.`,
      instruction:
        'Sau khi mua, bạn có thể xem hướng dẫn chi tiết và tải dữ liệu trong phần đơn hàng.',
      meta: {
        demo_url: 'https://bachhoammo.net',
        download_link: 'https://bachhoammo.net',
        download_password: '123456',
      },
      options,
    });

    index += 1;
  };

  for (const sub of TAI_KHOAN_SUBCATEGORIES) {
    pushProduct('tai-khoan', sub.slug, sub.name);
  }

  for (const sub of EMAIL_SUBCATEGORIES) {
    pushProduct('email', sub.slug, sub.name);
  }

  const miscCategories = [
    { slug: 'tools', name: 'Tools' },
    { slug: 'dich-vu', name: 'Dịch vụ' },
    { slug: 'website', name: 'Website' },
  ];

  for (const misc of miscCategories) {
    pushProduct(misc.slug, null, misc.name);
    pushProduct(misc.slug, null, `${misc.name} Pro`);
  }

  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    const category = categoryBySlug.get(product.categorySlug);
    if (!category) {
      console.warn(
        `Seed products: missing category slug=${product.categorySlug}`,
      );
      continue;
    }
    const subcategory = product.subcategorySlug
      ? categoryBySlug.get(product.subcategorySlug)
      : null;

    const totalQuantity = product.options.reduce(
      (sum, opt) => sum + (Number(opt.quantity) || 0),
      0,
    );
    const priceMinMax = buildPriceMinMax(
      product.options.map((opt) => opt.price),
    );

    const existingProduct = await knex('products')
      .where('slug', product.slug)
      .first<{ id: string }>();
    const productId = existingProduct?.id ?? uuidv4();

    if (existingProduct) {
      await knex('products').where('id', productId).update({
        shop_id: shop.id,
        slug: product.slug,
        state: 'live',
        price_min_max: priceMinMax,
        total_quantity: totalQuantity,
        updated_at: now,
      });
    } else {
      await knex('products').insert({
        id: productId,
        shop_id: shop.id,
        approved_version_id: null,
        pending_version_id: null,
        slug: product.slug,
        state: 'live',
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
    }

    const existingVersion = await knex('product_versions')
      .where('slug', product.slug)
      .first<{ id: string }>();
    const versionId = existingVersion?.id ?? uuidv4();

    if (existingVersion) {
      await knex('product_versions').where('id', versionId).update({
        product_id: productId,
        version_type: 'new',
        status: 'approved',
        name: product.name,
        slug: product.slug,
        is_free: product.isFree,
        price: product.price,
        discount_percent: product.discountPercent,
        category_id: category.id,
        subcategory_id: subcategory?.id ?? null,
        description: product.description,
        instruction: product.instruction,
        meta: product.meta,
        reviewed_by: ADMIN_USER_ID,
        reviewed_at: now,
        updated_at: now,
        total_quantity: totalQuantity,
        price_min_max: priceMinMax,
      });
    } else {
      await knex('product_versions').insert({
        id: versionId,
        product_id: productId,
        version_type: 'new',
        status: 'approved',
        name: product.name,
        slug: product.slug,
        is_free: product.isFree,
        price: product.price,
        discount_percent: product.discountPercent,
        category_id: category.id,
        subcategory_id: subcategory?.id ?? null,
        description: product.description,
        instruction: product.instruction,
        meta: product.meta,
        submitted_by: ADMIN_USER_ID,
        reviewed_by: ADMIN_USER_ID,
        submitted_at: now,
        reviewed_at: now,
        created_at: now,
        updated_at: now,
        total_quantity: totalQuantity,
        price_min_max: priceMinMax,
      });
    }

    await knex('products')
      .where('id', productId)
      .update({ approved_version_id: versionId, pending_version_id: null });

    await knex('product_version_images')
      .where('product_version_id', versionId)
      .del();
    const images = buildImages(i);
    await knex('product_version_images').insert(
      images.map((img) => ({
        id: uuidv4(),
        product_version_id: versionId,
        file_path: img.file_path,
        sort_order: img.sort_order,
        is_primary: img.is_primary,
        created_at: now,
      })),
    );

    await knex('option_products').where('product_id', productId).del();
    if (product.options.length > 0) {
      await knex('option_products').insert(
        product.options.map((opt) => ({
          product_id: productId,
          name: opt.name,
          price: opt.price,
          quantity: opt.quantity,
          description_quantity: opt.description_quantity ?? null,
        })),
      );
    }
  }
}
