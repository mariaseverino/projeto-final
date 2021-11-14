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

        const exemplar = await knex("emprestimos")
            .join("exemplares", "emprestimos.idExemplar", "=", "exemplares.id")
            .select(
                "exemplares.qtdEmprestimo",
                "exemplares.id",
                "emprestimos.idDiscente"
            )
            .where("emprestimos.id", "=", id)
            .first();

        let novaqtdEmprestimo = exemplar.qtdEmprestimo + 1;

        await knex("exemplares")
            .update({ qtdEmprestimo: novaqtdEmprestimo })
            .where({ id: exemplar.id });

        let novaData = new Date(data.dataLimite);

        novaData.setDate(novaData.getDate() + 5);

        await knex("discentes")
            .update({ ultimoEmprestimo: new Date().toJSON() })
            .where({ id: exemplar.idDiscente });

        console.log(novaData.toJSON());

        await knex("emprestimos")
            .update({ dataLimite: novaData.toJSON() })
            .where({ id });
    }

    /* apos emprestimo ser finalizado tem que aumentar quantidade de livro */
    /* finalizar -> remover a */
    async finalizarEmprestimo(id) {
        // const dataEmprestimo = new Date();
        const dataEntrega = new Date();
        console.log(dataEntrega);

        // dataEntrega.setDate(dataEntrega.getDate() + 5);
        console.log(dataEntrega.toJSON());

        const emprestimo = await knex("emprestimos")
            .join("exemplares", "emprestimos.idExemplar", "=", "exemplares.id")
            .select(
                "exemplares.qtdExemplares",
                "exemplares.id",
                "emprestimos.idDiscente"
            )
            .where("emprestimos.id", "=", id)
            .first();

        console.log(emprestimo);

        let qtdExemplares = emprestimo.qtdExemplares + 1;
        let numEmprestimos = emprestimo.numEmprestimos - 1;

        await knex("emprestimos")
            .update({ dataEntrega: dataEntrega.toJSON(), status: false })
            .where({ id });

        await knex("exemplares")
            .update({ qtdExemplares })
            .where({ id: emprestimo.id });

        await knex("discentes")
            .update({ numEmprestimos })
            .where({ id: emprestimo.idDiscente });
    }
}

module.exports = EmprestimoDAO;
