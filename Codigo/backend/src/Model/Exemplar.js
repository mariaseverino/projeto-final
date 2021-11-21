const { Model } = require("objection");
const connection = require("../database");

Model.knex(connection);

class Exemplar extends Model {
    static get tableName() {
        return "exemplares";
    }

    static get jsonSchema() {
        return {
            type: "object",
            /* required: ["nome", "isbn", "autor", "editora", "qtdExemplares"], */
            properties: {
                id: { type: "integer" },
                nome: { type: "string" },
                isbn: { type: "integer" },
                autor: { type: "string" },
                editora: { type: "string" },
                qtdExemplares: { type: "integer" },
                qtdEmprestimo: { type: "integer" },
            },
        };
    }
}

module.exports = Exemplar;
