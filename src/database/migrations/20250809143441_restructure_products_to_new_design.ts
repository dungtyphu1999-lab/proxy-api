import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Ensure functions for UUID
  await knex.schema.raw(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

  // Create enums idempotently (PostgreSQL)
  await knex.schema.raw(`
    DO $$ BEGIN
      CREATE TYPE product_state AS ENUM ('live','hidden','pending','suspended','draft','deleted');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE product_version_type AS ENUM ('new','edit');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE product_version_status AS ENUM ('pending','approved','rejected');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `);

  // Drop legacy tables if they exist
  await knex.schema.dropTableIfExists('product_images');
  await knex.schema.dropTableIfExists('products');

  // PRODUCTS
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('shop_id').notNullable().references('id').inTable('shops');
    table.uuid('approved_version_id').nullable();

    table.text('slug').notNullable().unique();

    table
      .enu(
        'state',
        ['live', 'hidden', 'pending', 'suspended', 'draft', 'deleted'],
        { useNative: true, enumName: 'product_state', existingType: true },
      )
      .notNullable()
      .defaultTo('pending');

    table.boolean('is_free').notNullable().defaultTo(false);
    table.integer('total_sales').notNullable().defaultTo(0);
    table.decimal('total_revenue', 12, 2).notNullable().defaultTo(0);

    table.decimal('rating_avg', 3, 2).notNullable().defaultTo(0);
    table.integer('rating_count').notNullable().defaultTo(0);

    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.raw(`
    ALTER TABLE products
    ADD CONSTRAINT chk_products_rating_avg CHECK (rating_avg >= 0 AND rating_avg <= 5)
  `);

  // PRODUCT_VERSIONS
  await knex.schema.createTable('product_versions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE');

    table
      .enu('version_type', ['new', 'edit'], {
        useNative: true,
        enumName: 'product_version_type',
        existingType: true,
      })
      .notNullable()
      .defaultTo('new');

    table
      .enu('status', ['pending', 'approved', 'rejected'], {
        useNative: true,
        enumName: 'product_version_status',
        existingType: true,
      })
      .notNullable()
      .defaultTo('pending');

    table.text('name').notNullable();

    table.text('slug').notNullable().unique();

    table.boolean('is_free').notNullable().defaultTo(false);
    table.decimal('price', 12, 2).notNullable();
    table.decimal('discount_percent', 5, 2).notNullable().defaultTo(0);

    table.uuid('category_id').references('id').inTable('categories');
    table.uuid('subcategory_id').references('id').inTable('categories');

    table.text('description');
    table.text('instruction');
    table.jsonb('meta').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));

    table.uuid('submitted_by').notNullable().references('id').inTable('users');
    table.uuid('reviewed_by').references('id').inTable('users');
    table.text('rejection_reason');

    table
      .timestamp('submitted_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table.timestamp('reviewed_at', { useTz: true });
    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.raw(`
    ALTER TABLE product_versions
    ADD CONSTRAINT chk_price_positive  CHECK (price >= 0),
    ADD CONSTRAINT chk_discount_range  CHECK (discount_percent >= 0 AND discount_percent <= 100)
  `);

  // PRODUCT_VERSION_IMAGES
  await knex.schema.createTable('product_version_images', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table
      .uuid('product_version_id')
      .notNullable()
      .references('id')
      .inTable('product_versions')
      .onDelete('CASCADE');
    table.text('file_path').notNullable();
    table.integer('sort_order').notNullable().defaultTo(0);
    table.boolean('is_primary').notNullable().defaultTo(false);
    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });

  await knex.schema.raw(`
    ALTER TABLE products
    ADD CONSTRAINT fk_products_approved_version
    FOREIGN KEY (approved_version_id) REFERENCES product_versions(id) ON DELETE SET NULL
  `);

  // Indexes
  await knex.schema.raw(`
    CREATE INDEX idx_products_shop_id        ON products(shop_id);
    CREATE INDEX idx_products_state          ON products(state);
    CREATE INDEX idx_products_shop_state     ON products(shop_id, state, created_at DESC);
    CREATE INDEX idx_products_approved_ver   ON products(approved_version_id);

    CREATE INDEX idx_product_versions_product ON product_versions(product_id);
    CREATE INDEX idx_product_versions_status  ON product_versions(status);

    CREATE INDEX idx_pv_images_version        ON product_version_images(product_version_id, sort_order);

    CREATE UNIQUE INDEX uq_pvimg_primary
      ON product_version_images(product_version_id) WHERE is_primary = TRUE;
  `);
}

export async function down(knex: Knex): Promise<void> {
  // Drop foreign key constraint first
  await knex.schema.raw(`
    ALTER TABLE products DROP CONSTRAINT IF EXISTS fk_products_approved_version
  `);

  await knex.schema.dropTableIfExists('product_version_images');
  await knex.schema.dropTableIfExists('product_versions');
  await knex.schema.dropTableIfExists('products');

  await knex.schema.raw(`DROP TYPE IF EXISTS product_version_status`);
  await knex.schema.raw(`DROP TYPE IF EXISTS product_version_type`);
  await knex.schema.raw(`DROP TYPE IF EXISTS product_state`);
}
