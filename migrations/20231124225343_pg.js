/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('gift', (table) =>  {
        table.string('desc', 1000).alter();
        table.string('title', 1000).alter();
        table.string('sob_story', 1000).alter();
        table.string('suggest_url', 1000).alter();
        table.string('url', 1000).alter();
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
        table.string('suggest_url').alter();
        table.string('url').alter();
    });
};
