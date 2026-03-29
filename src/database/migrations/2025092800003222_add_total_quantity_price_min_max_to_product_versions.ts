/**
 * @param {import('knex').Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.alterTable('product_versions', function (table) {
    table.bigInteger('total_quantity').nullable();
    table.string('price_min_max').nullable();
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.alterTable('product_versions', function (table) {
    table.dropColumn('total_quantity');
    table.dropColumn('price_min_max');
  });
};
