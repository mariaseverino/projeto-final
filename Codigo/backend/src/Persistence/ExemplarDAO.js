const knex = require("../database");

class ExemplarDAO {
    async listarExemplares() {
        const exemplares = await knex("exemplares").select(
            "id",
            "nome",
            "isbn",
            "qtdExemplares"
        );
        return exemplares;
    }

    async adicionarExemplar(dados) {
        await knex("exemplares").insert({
            nome: dados.nome,
            isbn: dados.isbn,
            autor: dados.autor,
            editora: dados.editora,
            qtdExemplares: dados.qtdExemplares,
        });
    }

    async alterarDadosExemplar(dados, id) {
        const exemplar = await knex("exemplares")
            .select("nome", "isbn", "autor", "editora", "qtdExemplares")
            .where({ id })
            .first();

        console.log(dados);
        await knex("exemplares")
            .update({
                nome: dados.nome === undefined ? exemplar.nome : dados.nome,
                isbn: dados.isbn === undefined ? exemplar.isbn : dados.isbn,
                autor: dados.autor === undefined ? exemplar.autor : dados.autor,
                editora:
                    dados.editora === undefined
                        ? exemplar.editora
                        : dados.editora,
                qtdExemplares:
                    dados.qtdExemplares === undefined
                        ? exemplar.qtdExemplares
                        : dados.qtdExemplares,
            })
            .where({ id });
    }

    async removerExemplar(id) {
        const exemplar = await knex("exemplares")
            .join("emprestimos", "exemplares.id", "=", "emprestimos.idExemplar")
            .where("status", true)
            .select("status")
            .first();

        console.log(exemplar);

        if (exemplar !== undefined) {
            throw new Error("Exemplar não pode ser removido");
        }
        await knex("exemplares").where({ id }).del();
    }
}

module.exports = ExemplarDAO;
