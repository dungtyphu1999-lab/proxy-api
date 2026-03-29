// seeds/seed_categories.ts
import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

interface CategoryRecord {
  id: string;
  slug: string;
}

interface CommissionRecord {
  id: string;
  category_id: string;
}

export async function seed(knex: Knex): Promise<void> {
  const now = new Date();

  const categoryData = [
    {
      name: 'Tài khoản',
      slug: 'tai-khoan',
      commission: 10.0,
      icon_url: '/icons/account.svg',
      order: 1,
      is_coming_soon: false,
      children: [
        { name: 'Tài khoản FB', slug: 'tai-khoan-fb', order: 1 },
        { name: 'BM', slug: 'bm', order: 2 },
        { name: 'Zalo', slug: 'zalo', order: 3 },
        { name: 'Twitter', slug: 'twitter', order: 4 },
        { name: 'Telegram', slug: 'telegram', order: 5 },
        { name: 'Instagram', slug: 'instagram', order: 6 },
        { name: 'Shopee', slug: 'shopee', order: 7 },
        { name: 'Discord', slug: 'discord', order: 8 },
        { name: 'TikTok', slug: 'tiktok', order: 9 },
        { name: 'Key Diệt Virus', slug: 'key-diet-virus', order: 10 },
        { name: 'Capcut', slug: 'capcut', order: 11 },
        { name: 'Canva', slug: 'canva', order: 12 },
        { name: 'Key Window', slug: 'key-window', order: 13 },
        { name: 'Tài khoản Khác', slug: 'tai-khoan-khac', order: 14 },
      ],
    },
    {
      name: 'Email',
      slug: 'email',
      commission: 10.0,
      icon_url: '/icons/email.svg',
      order: 2,
      is_coming_soon: false,
      children: [
        { name: 'Gmail', slug: 'gmail', order: 1 },
        { name: 'HotMail', slug: 'hotmail', order: 2 },
        { name: 'OutlookMail', slug: 'outlookmail', order: 3 },
        { name: 'RuMail', slug: 'rumail', order: 4 },
        { name: 'DomainMail', slug: 'domainmail', order: 5 },
        { name: 'YahooMail', slug: 'yahoomail', order: 6 },
        { name: 'ProtonMail', slug: 'protonmail', order: 7 },
        { name: 'Loại Mail Khác', slug: 'loai-mail-khac', order: 8 },
      ],
    },
    {
      name: 'Proxy',
      slug: 'proxy',
      commission: 12.0,
      icon_url: '/icons/proxy.svg',
      order: 3,
      is_coming_soon: false,
    },
    {
      name: 'Tools',
      slug: 'tools',
      commission: 15.0,
      icon_url: '/icons/tools.svg',
      order: 4,
      is_coming_soon: false,
    },
    {
      name: 'Dịch vụ',
      slug: 'dich-vu',
      commission: 12.0,
      icon_url: '/icons/service.svg',
      order: 5,
      is_coming_soon: false,
    },
    {
      name: 'Website',
      slug: 'website',
      commission: 20.0,
      icon_url: '/icons/website.svg',
      order: 6,
      is_coming_soon: false,
    },
  ];

  const validSlugs = categoryData.map((c) => c.slug);

  // Deactivate categories not in the new list (only parent categories)
  await knex('categories')
    .whereNull('parent_id')
    .whereNotIn('slug', validSlugs)
    .update({
      is_active: false,
      updated_at: now,
    });

  // Upsert each category
  for (const data of categoryData) {
    const existingCategory = await knex<CategoryRecord>('categories')
      .where('slug', data.slug)
      .whereNull('parent_id')
      .first();

    let categoryId: string;

    if (existingCategory) {
      // Update existing category
      categoryId = existingCategory.id;
      await knex('categories').where('id', categoryId).update({
        name: data.name,
        icon_url: data.icon_url,
        order: data.order,
        is_coming_soon: data.is_coming_soon,
        is_active: true,
        updated_at: now,
      });
    } else {
      // Insert new category
      categoryId = uuidv4();
      await knex('categories').insert({
        id: categoryId,
        parent_id: null,
        name: data.name,
        slug: data.slug,
        icon_url: data.icon_url,
        order: data.order,
        is_coming_soon: data.is_coming_soon,
        is_active: true,
        created_at: now,
        updated_at: now,
      });
    }

    // Upsert category commission
    const existingCommission = await knex<CommissionRecord>(
      'category_commissions',
    )
      .where('category_id', categoryId)
      .first();

    if (existingCommission) {
      await knex('category_commissions')
        .where('category_id', categoryId)
        .update({
          commission_rate: data.commission,
          effective_from: now,
          updated_at: now,
        });
    } else {
      await knex('category_commissions').insert({
        id: uuidv4(),
        category_id: categoryId,
        commission_rate: data.commission,
        effective_from: now,
        created_at: now,
        updated_at: now,
      });
    }

    // Handle child categories if they exist
    if (data.children && data.children.length > 0) {
      const validChildSlugs = data.children.map((c) => c.slug);

      // Deactivate child categories not in the new list
      await knex('categories')
        .where('parent_id', categoryId)
        .whereNotIn('slug', validChildSlugs)
        .update({
          is_active: false,
          updated_at: now,
        });

      // Upsert each child category
      for (const childData of data.children) {
        const existingChild = await knex<CategoryRecord>('categories')
          .where('slug', childData.slug)
          .where('parent_id', categoryId)
          .first();

        if (existingChild) {
          // Update existing child category
          await knex('categories').where('id', existingChild.id).update({
            name: childData.name,
            order: childData.order,
            is_active: true,
            updated_at: now,
          });
        } else {
          // Insert new child category
          const childId = uuidv4();
          await knex('categories').insert({
            id: childId,
            parent_id: categoryId,
            name: childData.name,
            slug: childData.slug,
            icon_url: null,
            order: childData.order,
            is_coming_soon: false,
            is_active: true,
            created_at: now,
            updated_at: now,
          });
        }
      }
    }
  }
}
