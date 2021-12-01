const DiscenteDAO = require("../Persistence/DiscenteDAO");

class ControllerDiscente {
    async listar(req, res) {
        try {
            let discenteDAO = new DiscenteDAO();

            const dados = await discenteDAO.listarDiscentes();

            return res.json(dados);
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async criar(req, res) {
        try {
            const dados = req.body;

            let discenteDAO = new DiscenteDAO();

            const discente = await discenteDAO.cadastrarDiscente(dados);

            return res.status(201).json({ discente });
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async buscarDiscente(req, res) {
        try {
            const { id } = req.params;

            let discenteDAO = new DiscenteDAO();

            const dados = await discenteDAO.dadosDiscente(id);

            return res.json(dados);
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async alterar(req, res) {
        try {
            const dados = req.body;
            const { id } = req.params;

            let discenteDAO = new DiscenteDAO();

            await discenteDAO.alterarDadosDiscente(dados, id);

            return res.send();
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;

            let discenteDAO = new DiscenteDAO();

            await discenteDAO.removerDiscente(id);

            return res.send();
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }
}

module.exports = ControllerDiscente;
