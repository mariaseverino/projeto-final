const knex = require("../database");

class ControllerBiblioteca {
    async ListarDiscentes(req, res) {
        try {
            const discentes = await knex("discentes");

            return res.status(201).json(discentes);
        } catch (error) {
            return res.status(500).send();
        }
    }
}

module.exports = ControllerBiblioteca;
