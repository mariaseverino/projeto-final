const knex = require("../database");

class ControllerDiscente {
    async cadastrarDiscente(req, res) {
        try {
            // obriga que todos os dados do formulario seja informado, caso contrario ocorrera erro
            const { nome, matricula, cpf } = req.body;

            await knex("discentes").insert({
                nome,
                matricula,
                cpf,
            });

            return res.status(201).send();
        } catch (error) {
            return res.status(400).send();
        }
    }

    async alterarDadosDiscente(req, res) {
        try {
            // basta que pelo menos 1 dado seja informado
            const dados = req.body;
            const { id } = req.params;

            await knex("discentes").update(dados).where({ id });

            return res.send();
        } catch (error) {
            return res.status(400).send();
        }
    }

    async removerDiscente(req, res) {
        try {
            const { id } = req.params;

            await knex("discentes").where({ id }).del();

            return res.send();
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = ControllerDiscente;
