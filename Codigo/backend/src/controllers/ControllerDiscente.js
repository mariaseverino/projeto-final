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
}

module.exports = ControllerDiscente;
