/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable('shop_reviews', function (table) {
        table
            .uuid('id')
            .primary()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('shop_id').notNullable();
        table.uuid('user_id').notNullable();
        table
            .integer('rating')
            .notNullable();
        table
            .timestamp('created_at', { useTz: false })
            .defaultTo(knex.fn.now());
        // Foreign keys (nếu có users & shops)
        // table
        //   .foreign('shop_id')
        //   .references('id')
        //   .inTable('shops')
        //   .onDelete('CASCADE');
        // table
        //   .foreign('user_id')
        //   .references('id')
        //   .inTable('users')
        //   .onDelete('CASCADE');
        // 1 user chỉ review 1 shop
        table.unique(['shop_id', 'user_id']);
        // Index cho query phổ biến
        table.index(['shop_id']);
        table.index(['rating']);
    });
};
/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('shop_reviews');
};
