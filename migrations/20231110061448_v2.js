/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('gift', function (table) {
        table.float('max_suggest_price');
        table.string('title');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('gift', function (table) {
        table.dropColumn('max_suggest_price');
        table.dropColumn('title');
    })
};
