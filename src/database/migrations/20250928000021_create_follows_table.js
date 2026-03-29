/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
    return knex.schema.createTable('follows', function (table) {
        table
            .uuid('id')
            .primary()
            .defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('user_id').notNullable();
        table.uuid('shop_id').notNullable();
        table
            .timestamp('created_at', { useTz: false })
            .defaultTo(knex.fn.now());
        // Nếu có bảng users & shops thì mở comment FK
        // table
        //   .foreign('user_id')
        //   .references('id')
        //   .inTable('users')
        //   .onDelete('CASCADE');
        // table
        //   .foreign('shop_id')
        //   .references('id')
        //   .inTable('shops')
        //   .onDelete('CASCADE');
        // Tránh follow trùng
        table.unique(['user_id', 'shop_id']);
    });
};
/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('follows');
};
