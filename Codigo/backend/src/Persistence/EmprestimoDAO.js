const knex = require("../database");

class EmprestimoDAO {
    async listarEmprestimos() {
        const emprestimos = await knex("emprestimos");
        return emprestimos;
    }

    async cadastrarEmprestimo(matricula, idExemplar) {
        const discenteExiste = await knex("discentes")
            .select("id")
            .where({ matricula });

        if (discenteExiste.length == 0) {
            throw new Error("Discente não encontrado");
        }

        const exemplar = await knex("exemplares")
            .select("qtdExemplares")
            .where({ id: idExemplar });

        let idDiscente = JSON.parse(JSON.stringify(discenteExiste));

        let qtdExemplares = JSON.parse(JSON.stringify(exemplar));

        if (qtdExemplares[0].qtdExemplares < 1) {
            throw new Error("Não há exemplar disponivel");
        }

        qtdExemplares = qtdExemplares[0].qtdExemplares - 1;

        console.log(qtdExemplares);

        await knex("exemplares")
            .update({ qtdExemplares: qtdExemplares })
            .where({ id: idExemplar });

        idDiscente = idDiscente[0].id;

        const inicio = new Date();

        if (idDiscente) {
            await knex("emprestimos").insert({
                idDiscente,
                idExemplar,
                inicio,
            });
        }
    }
}

module.exports = EmprestimoDAO;
