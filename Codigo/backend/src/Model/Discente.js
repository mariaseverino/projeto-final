const { Model } = require("objection");
const connection = require("../database");
const Emprestimo = require("./Emprestimo");

Model.knex(connection);

class Discente extends Model {
    static get tableName() {
        return "discentes";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                nome: { type: "string" },
                matricula: { type: "integer" },
                cpf: { type: "integer" },
                numEmprestimos: { type: "integer" },
                ultimoEmprestimo: { type: "string" },
            },
        };
    }
}

module.exports = Discente;
