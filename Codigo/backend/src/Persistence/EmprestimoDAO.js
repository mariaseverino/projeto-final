const { json } = require("express");
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

        if (!discenteExiste.length) {
            throw new Error("Discente não encontrado");
        }

        let idDiscente = JSON.parse(JSON.stringify(discenteExiste));

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
