const { Model } = require("objection");
const Discente = require("./Discente");
const Exemplar = require("./Exemplar");

const connection = require("../database");

Model.knex(connection);

class Emprestimo extends Model {
    static get tableName() {
        return "emprestimos";
    }

    static get jsonSchema() {
        return {
            type: "object",
            /* required: ["id"], */
            properties: {
                id: { type: "integer" },
                idDiscente: { type: "integer" },
                idExemplar: { type: "integer" },
                dataEmprestimo: { type: "string" },
                dataLimite: { type: "string" },
                dataEntrega: { type: "string" },
                status: { type: "boolean" },
            },
        };
    }

    static get relationMappings() {
        return {
            discentes: {
                relation: Model.BelongsToOneRelation,
                modelClass: Discente,
                join: {
                    from: "emprestimos.idDiscente",
                    to: "discentes.id",
                },
            },
            exemplares: {
                relation: Model.BelongsToOneRelation,
                modelClass: Exemplar,
                join: {
                    from: "emprestimos.idExemplar",
                    to: "exemplares.id",
                },
            },
        };
    }
}

module.exports = Emprestimo;
