/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('gift', (table) =>  {
        table.text('desc').alter();
        table.text('title').alter();
        table.text('sob_story').alter();
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
