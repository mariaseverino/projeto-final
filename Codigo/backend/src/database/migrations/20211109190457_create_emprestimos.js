exports.up = function (knex) {
    return knex.schema.createTable("emprestimos", (table) => {
        table.increments("id").primary();
        table.integer("idDiscente").unsigned().notNullable();
        table.integer("idExemplar").unsigned().notNullable();
        table.timestamp("inicio").notNullable();
        table.timestamp("fim");

        table.foreign("idDiscente").references("id").inTable("discentes");
        table.foreign("idExemplar").references("id").inTable("exemplar");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("emprestimos");
};
