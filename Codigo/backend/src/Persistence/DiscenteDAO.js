const knex = require("../database");

class DiscenteDAO {
    async listarDiscentes() {
        const discentes = await knex("discentes");
        return discentes;
    }

    async cadastrarDiscente(nome, matricula, cpf) {
        await knex("discentes").insert({
            nome,
            matricula,
            cpf,
        });
    }

    async alterarDadosDiscente(dados, id) {
        await knex("discentes").update(dados).where({ id });
    }

    async removerDiscente(id) {
        await knex("discentes").where({ id }).del();
    }
}

module.exports = DiscenteDAO;
