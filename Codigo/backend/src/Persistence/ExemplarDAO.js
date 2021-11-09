const knex = require("../database");

class ExemplarDAO {
    async listarExemplares() {
        const exemplares = await knex("exemplares");
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
}

module.exports = ExemplarDAO;
