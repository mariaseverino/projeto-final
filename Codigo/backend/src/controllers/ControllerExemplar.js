const Exemplar = require("../Model/Exemplar");
const ExemplarDAO = require("../Persistence/ExemplarDAO");

class ControllerExemplar {
    async listar(req, res) {
        try {
            let exemplarDAO = new ExemplarDAO();

            const dados = await exemplarDAO.listarExemplares();

            return res.json(dados);
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }

    async criar(req, res) {
        try {
            /* obriga que todos os dados do formulario seja informado, caso contrario ocorrera erro */
            const { nome, isbn, autor, editora, qtdExemplares } = req.body;

            let dados = { nome, isbn, autor, editora, qtdExemplares };

            let exemplar = new Exemplar(dados);
            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.adicionarExemplar(exemplar);

            return res.status(201).send();
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }

    async alterar(req, res) {
        try {
            /* basta que pelo menos 1 dado seja informado */
            const dados = req.body;
            const { id } = req.params;

            let exemplar = new Exemplar(dados);
            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.alterarDadosExemplar(exemplar, id);

            return res.send();
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.removerExemplar(id);

            return res.send();
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }
}

module.exports = ControllerExemplar;
