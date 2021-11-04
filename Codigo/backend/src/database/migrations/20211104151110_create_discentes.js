exports.up = function (knex) {
    return knex.schema.createTable("discentes", (table) => {
        table.increments("id");
        table.string("name", 50).unique().notNullable();
        table.integer("matricula", 10).unique().notNullable();
        table.integer("cpf", 11).unique().notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("discentes");
};
