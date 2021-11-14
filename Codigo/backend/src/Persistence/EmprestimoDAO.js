const knex = require("../database");

class EmprestimoDAO {
    async listarEmprestimos() {
        const emprestimos = await knex("emprestimos")
            .join("discentes", "emprestimos.idDiscente", "=", "discentes.id")
            .join("exemplares", "emprestimos.idExemplar", "=", "exemplares.id")
            .select(
                "exemplares.nome",
                "discentes.matricula",
                "emprestimos.dataLimite"
            );
        return emprestimos;
    }

    /* ver se o discente ja possui o livro que ele quer pegar emprestado? */
    async cadastrarEmprestimo(matricula, idExemplar) {
        const discenteExiste = await knex("discentes")
            .select("id", "numEmprestimos")
            .where({ matricula })
            .first();

        if (discenteExiste === undefined) {
            throw new Error("Discente não encontrado");
        }

        const exemplar = await knex("exemplares")
            .select("qtdExemplares", "qtdEmprestimo")
            .where({ id: idExemplar })
            .first();

        if (exemplar.qtdExemplares < 1) {
            throw new Error("Não há exemplar disponivel");
        }

        let qtdExemplares = exemplar.qtdExemplares - 1;
        let qtdEmprestimo = exemplar.qtdEmprestimo + 1;
        let numEmprestimos = exemplar.numEmprestimos + 1;

        await knex("exemplares")
            .update({ qtdExemplares, qtdEmprestimo })
            .where({ id: idExemplar });

        const dataEmprestimo = new Date();
        const dataLimite = new Date();

        dataLimite.setDate(dataLimite.getDate() + 5);

        await knex("discentes")
            .update({
                numEmprestimos,
                ultimoEmprestimo: dataEmprestimo.toJSON(),
            })
            .where({ matricula });

        await knex("emprestimos").insert({
            idDiscente: discenteExiste.id,
            idExemplar,
            dataEmprestimo: dataEmprestimo.toJSON(),
            dataLimite: dataLimite.toJSON(),
        });
    }

    async renovarEmprestimo(id) {
        let data = await knex("emprestimos")
            .where({ id })
            .select("dataLimite")
            .first();

        console.log(data);
        let novaData = new Date(data.dataLimite);
        console.log(novaData);
        novaData.setDate(novaData.getDate() + 5);

        console.log(novaData.toJSON());

        await knex("emprestimos")
            .update({ dataLimite: novaData.toJSON() })
            .where({ id });
    }

    /* apos emprestimo ser finalizado tem que aumentar quantidade de livro */
    /* finalizar -> remover a */
}

module.exports = EmprestimoDAO;
