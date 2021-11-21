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
            /* required: ["nome", "matricula", "cpf"], */
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

    static get relationMappings() {
        return {
            emprestimos: {
                relation: Model.HasManyRelation,
                modelClass: Emprestimo,
                join: {
                    from: "discentes.id",
                    to: "emprestimos.idDiscente",
                },
            },
        };
    }
}

module.exports = Discente;
