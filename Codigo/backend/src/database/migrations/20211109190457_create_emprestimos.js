exports.up = function (knex) {
    return knex.schema.createTable("emprestimos", (table) => {
        table.increments("id").primary();
        table.integer("idDiscente").notNullable();
        table.integer("idExemplar").notNullable();
        table.datetime("dataEmprestimo");
        table.datetime("dataLimite");
        table.datetime("dataEntrega");
        table.boolean("status").defaultTo(false);

        table.foreign("idDiscente").references("id").inTable("discentes");
        table.foreign("idExemplar").references("id").inTable("exemplares");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("emprestimos");
};
