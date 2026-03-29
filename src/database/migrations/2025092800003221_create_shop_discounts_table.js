/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable('shop_discounts', function (table) {
        table
            .uuid('id')
            .primary()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('shop_id').notNullable();
        table.string('discount_type', 20).notNullable();
        table
            .decimal('discount_value', 5, 2)
            .notNullable();
        table
            .boolean('is_active')
            .defaultTo(true);
        table.timestamp('start_at', { useTz: false }).nullable();
        table.timestamp('end_at', { useTz: false }).nullable();
        table
            .timestamp('created_at', { useTz: false })
            .defaultTo(knex.fn.now());
        table
            .timestamp('updated_at', { useTz: false })
            .defaultTo(knex.fn.now());
        // Foreign key (nếu có bảng shops)
        // table
        //   .foreign('shop_id')
        //   .references('id')
        //   .inTable('shops')
        //   .onDelete('CASCADE');
        // Index thường dùng
        table.index(['shop_id']);
        table.index(['is_active']);
    });
};
/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shop_discounts');
};
