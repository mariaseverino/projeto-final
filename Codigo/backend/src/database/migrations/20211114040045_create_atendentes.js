exports.up = function (knex) {
    return knex.schema.createTable("atendentes", (table) => {
        table.increments("id").primary();
        table.string("email").unique();
        table.integer("senha").unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("atendentes");
};
