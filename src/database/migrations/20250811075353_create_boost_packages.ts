import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create boost_packages table
  await knex.schema.createTable('boost_packages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.boolean('is_active').notNullable().defaultTo(true);
    table.uuid('current_version_id').nullable();
    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    // Index for performance
    table.index('is_active', 'idx_bp_is_active');
  });

  // Create boost_package_versions table
  await knex.schema.createTable('boost_package_versions', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('package_id').notNullable();
    table.integer('version_no').notNullable();
    table.text('name').notNullable();
    table.integer('duration_days').notNullable();
    table.decimal('price', 12, 2).notNullable();
    table
      .enu('display_position', [
        'all',
        'product_list',
        'product_new',
        'product_suggestions',
        'best_of_week_list',
        'best_of_day_list',
        'best_of_month_list',
      ])
      .notNullable()
      .defaultTo('all');
    table.text('description').nullable();
    table
      .timestamp('created_at', { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());

    // Foreign key to boost_packages
    table
      .foreign('package_id')
      .references('id')
      .inTable('boost_packages')
      .onDelete('CASCADE');

    // Constraints
    table.check('version_no > 0');
    table.check('duration_days > 0');
    table.check('price >= 0');

    // Unique constraint for package_id and version_no
    table.unique(['package_id', 'version_no'], {
      indexName: 'uq_package_version',
    });

    // Indexes for performance
    table.index(['package_id', 'version_no'], 'idx_bpv_pkg_version');
    table.index(['package_id', 'created_at'], 'idx_bpv_pkg_created_at');
  });

  // Add foreign key constraint from boost_packages to boost_package_versions
  await knex.schema.alterTable('boost_packages', (table) => {
    table
      .foreign('current_version_id')
      .references('id')
      .inTable('boost_package_versions')
      .onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop foreign key constraint first
  await knex.schema.alterTable('boost_packages', (table) => {
    table.dropForeign('current_version_id');
  });

  // Drop tables in reverse order
  await knex.schema.dropTableIfExists('boost_package_versions');
  await knex.schema.dropTableIfExists('boost_packages');

  // Drop enum type
  await knex.raw('DROP TYPE IF EXISTS boost_display_position');
}
