const knex = require("../database");

class EmprestimoDAO {
    async listarEmprestimos() {
        const emprestimos = await knex("emprestimos");
        return emprestimos;
    }

    /* ver se o discente ja possui o livro que ele quer pegar emprestado? */
    async cadastrarEmprestimo(matricula, idExemplar) {
        const discenteExiste = await knex("discentes")
            .select("id")
            .where({ matricula })
            .first();

        if (discenteExiste === undefined) {
            throw new Error("Discente não encontrado");
        }
        console.log(discenteExiste);

        const exemplar = await knex("exemplares")
            .select("qtdExemplares")
            .where({ id: idExemplar })
            .first();

        console.log(exemplar);

        if (exemplar.qtdExemplares < 1) {
            throw new Error("Não há exemplar disponivel");
        }

        let qtdExemplares = exemplar.qtdExemplares - 1;

        console.log(qtdExemplares);

        await knex("exemplares")
            .update({ qtdExemplares })
            .where({ id: idExemplar });

        const dataEntrega = new Date();
        console.log(dataEntrega);

        dataEntrega.setDate(dataEntrega.getDate() + 5);
        console.log(dataEntrega.toJSON());

        await knex("emprestimos").insert({
            idDiscente: discenteExiste.id,
            idExemplar,
            entrega: dataEntrega.toJSON(),
        });
    }
    async renovarEmprestimo(id) {
        let data = await knex("emprestimos")
            .where({ id })
            .select("entrega")
            .first();

        let novaData = new Date(data.inicio);
        console.log(novaData);
        novaData.setDate(novaData.getDate() + 5);

        console.log(novaData.toJSON());

        await knex("emprestimos")
            .update({ entrega: novaData.toJSON() })
            .where({ id });
    }

    /* apos emprestimo ser finalizado tem que aumentar quantidade de livro */
    /* finalizar -> remover a */
}

module.exports = EmprestimoDAO;
