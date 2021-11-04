const knex = require("../database");

class ControllerDiscente {
    async cadastrarDiscente(req, res) {
        try {
            const { name, matricula, cpf } = req.body;

            await knex("discentes").insert({
                name,
                matricula,
                cpf,
            });

            return res.status(201).send();
        } catch (error) {
            return res.status(500).send();
        }
    }

    async alterarDadosDiscente(req, res) {
        try {
            const { name } = req.body;
            const { id } = req.params;

            await knex("discentes")
                .update({
                    name,
                })
                .where({ id });

            return res.send();
        } catch (error) {
            return res.status(500).send();
        }
    }
}

module.exports = ControllerDiscente;
