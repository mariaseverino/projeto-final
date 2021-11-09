exports.up = function (knex) {
    return knex.schema.createTable("exemplares", (table) => {
        table.increments("id").primary();
        table.string("nome", 50).unique().notNullable();
        table.string("isbn", 13).unique().notNullable();
        table.string("autor", 50).notNullable();
        table.string("editora", 20).notNullable();
        table.integer("qtdExemplares", 6).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("exemplares");
};
