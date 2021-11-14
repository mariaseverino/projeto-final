const knex = require("../database");

class DiscenteDAO {
    async listarDiscentes() {
        const discentes = await knex("discentes").select(
            "id",
            "nome",
            "matricula"
        );
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
        const discente = await knex("discentes")
            .join("emprestimos", "discentes.id", "=", "emprestimos.idDiscente")
            .where("status", true)
            .select("status")
            .first();

        console.log(discente);

        if (discente !== undefined) {
            throw new Error(
                "Discente não pode ser removido, pois possui pendencias"
            );
        }
        await knex("discentes").where({ id }).del();
    }
}

module.exports = DiscenteDAO;
