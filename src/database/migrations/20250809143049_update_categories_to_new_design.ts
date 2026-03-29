import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Update categories table to match new design
  await knex.schema.alterTable('categories', (table) => {
    // Add constraints that were missing
    table.string('name').notNullable().alter();
    table.string('slug').notNullable().alter();
    table.boolean('is_active').notNullable().defaultTo(true).alter();

    // Change timestamps to timestamptz
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });

  // Add timestamptz columns using raw SQL for proper timezone support
  await knex.schema.raw(`
    ALTER TABLE categories 
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  `);

  // Drop and recreate parent_id with proper foreign key constraint
  await knex.schema.alterTable('categories', (table) => {
    table.dropForeign(['parent_id']);
    table.dropColumn('parent_id');
  });

  await knex.schema.alterTable('categories', (table) => {
    table
      .uuid('parent_id')
      .nullable()
      .references('id')
      .inTable('categories')
      .onDelete('SET NULL');
  });

  // Add constraints
  await knex.schema.raw(`
    ALTER TABLE categories 
    ADD CONSTRAINT uq_categories_parent_slug UNIQUE (parent_id, slug)
  `);

  await knex.schema.raw(`
    ALTER TABLE categories 
    ADD CONSTRAINT chk_categories_parent_self 
    CHECK (parent_id IS NULL OR parent_id <> id)
  `);

  // Create indexes
  await knex.schema.raw(
    'CREATE INDEX idx_categories_parent ON categories(parent_id)',
  );
  await knex.schema.raw(
    'CREATE INDEX idx_categories_is_active ON categories(is_active)',
  );
  await knex.schema.raw('CREATE INDEX idx_categories_slug ON categories(slug)');

  // Update category_commissions table
  await knex.schema.alterTable('category_commissions', (table) => {
    // Add check constraint for commission_rate
    table.decimal('commission_rate', 5, 2).notNullable().alter();

    // Change timestamps to timestamptz
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });

  // Add timestamptz columns using raw SQL for proper timezone support
  await knex.schema.raw(`
    ALTER TABLE category_commissions 
    ADD COLUMN effective_from TIMESTAMPTZ NOT NULL,
    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  `);

  // Drop and recreate category_id with proper cascade behavior
  await knex.schema.alterTable('category_commissions', (table) => {
    table.dropForeign(['category_id']);
    table.dropColumn('category_id');
  });

  await knex.schema.alterTable('category_commissions', (table) => {
    table
      .uuid('category_id')
      .notNullable()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE');
  });

  // Add constraints
  await knex.schema.raw(`
    ALTER TABLE category_commissions 
    ADD CONSTRAINT chk_commission_rate_range 
    CHECK (commission_rate >= 0 AND commission_rate <= 100)
  `);

  await knex.schema.raw(`
    ALTER TABLE category_commissions 
    ADD CONSTRAINT uq_cat_comm_moment UNIQUE (category_id, effective_from)
  `);

  // Create performance index
  await knex.schema.raw(
    'CREATE INDEX idx_cat_comm_current ON category_commissions(category_id, effective_from DESC)',
  );
}

export async function down(knex: Knex): Promise<void> {
  // Drop indexes
  await knex.schema.raw('DROP INDEX IF EXISTS idx_categories_parent');
  await knex.schema.raw('DROP INDEX IF EXISTS idx_categories_is_active');
  await knex.schema.raw('DROP INDEX IF EXISTS idx_categories_slug');
  await knex.schema.raw('DROP INDEX IF EXISTS idx_cat_comm_current');

  // Drop constraints
  await knex.schema.raw(
    'ALTER TABLE categories DROP CONSTRAINT IF EXISTS uq_categories_parent_slug',
  );
  await knex.schema.raw(
    'ALTER TABLE categories DROP CONSTRAINT IF EXISTS chk_categories_parent_self',
  );
  await knex.schema.raw(
    'ALTER TABLE category_commissions DROP CONSTRAINT IF EXISTS chk_commission_rate_range',
  );
  await knex.schema.raw(
    'ALTER TABLE category_commissions DROP CONSTRAINT IF EXISTS uq_cat_comm_moment',
  );

  // Revert categories table
  await knex.schema.alterTable('categories', (table) => {
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });

  await knex.schema.alterTable('categories', (table) => {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  // Revert category_commissions table
  await knex.schema.alterTable('category_commissions', (table) => {
    table.dropColumn('effective_from');
    table.dropColumn('created_at');
    table.dropColumn('updated_at');
  });

  await knex.schema.alterTable('category_commissions', (table) => {
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}
