/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('gift', (table) =>  {
        table.text('desc', 1000).alter();
        table.text('title', 1000).alter();
        table.text('sob_story', 1000).alter();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('gift', (table) =>  {
        table.string('desc').alter();
        table.string('title').alter();
        table.string('sob_story').alter();
    });
};
