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

    async cadastrarDiscente(discente) {
        await knex("discentes").insert({
            nome: discente.nome,
            matricula: discente.matricula,
            cpf: discente.cpf,
        });
    }

    async alterarDadosDiscente(dados, id) {
        const discente = await knex("discentes")
            .select("nome", "matricula", "cpf")
            .where({ id })
            .first();

        await knex("discentes")
            .update({
                nome: dados.nome === undefined ? discente.nome : dados.nome,
                matricula:
                    dados.matricula === undefined
                        ? discente.matricula
                        : dados.matricula,
                cpf: dados.cpf === undefined ? discente.cpf : dados.cpf,
            })
            .where({ id });
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
