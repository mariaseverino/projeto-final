const knex = require("../database");

class ExemplarDAO {
    async listarExemplares() {
        const exemplares = await knex("exemplares").select(
            "nome",
            "isbn",
            "qtdExemplares"
        );
        return exemplares;
    }

    async adicionarExemplar(nome, isbn, autor, editora, qtdExemplares) {
        await knex("exemplares").insert({
            nome,
            isbn,
            autor,
            editora,
            qtdExemplares,
        });
    }

    async alterarDadosExemplar(dados, id) {
        await knex("exemplares").update(dados).where({ id });
    }

    async removerExemplar(id) {
        await knex("exemplares").where({ id }).del();
    }
}

module.exports = ExemplarDAO;
