exports.up = function (knex) {
  return knex.schema.table('order_items', function (table) {
    table.bigInteger('option_product_id').nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table('order_items', function (table) {
    table.dropColumn('option_product_id');
  });
};
