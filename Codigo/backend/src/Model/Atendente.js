const { Model } = require("objection");
const connection = require("../database");

Model.knex(connection);

class Atendente extends Model {
    static get tableName() {
        return "atendentes";
    }

    static get jsonSchema() {
        return {
            type: "object",
            properties: {
                id: { type: "integer" },
                email: { type: "string" },
                senha: { type: "string" },
                adm: { type: "boolean" },
            },
        };
    }
}

module.exports = Atendente;
