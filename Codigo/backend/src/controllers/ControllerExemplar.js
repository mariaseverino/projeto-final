const ExemplarDAO = require("../Persistence/ExemplarDAO");

class ControllerExemplar {
    async listar(req, res) {
        try {
            let exemplarDAO = new ExemplarDAO();

            const dados = await exemplarDAO.listarExemplares();

            return res.json(dados);
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async criar(req, res) {
        try {
            const dados = req.body;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.adicionarExemplar(dados);

            return res.status(201).send();
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async alterar1(req, res) {
        try {
            const { id } = req.params;

            let exemplarDAO = new ExemplarDAO();

            const dados = await exemplarDAO.dadosExemplar(id);

            return res.json(dados);
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async alterar2(req, res) {
        try {
            const dados = req.body;
            const { id } = req.params;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.alterarDadosExemplar(dados, id);

            return res.send();
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.removerExemplar(id);

            return res.send();
        } catch (err) {
            return res.status(400).send({ erro: err.message });
        }
    }
}

module.exports = ControllerExemplar;
