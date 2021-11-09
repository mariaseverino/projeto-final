const knex = require("../database");

class ExemplarDAO {
    async listarExemplares() {
        const exemplares = await knex("exemplares");
        return exemplares;
    }
}

module.exports = ExemplarDAO;
