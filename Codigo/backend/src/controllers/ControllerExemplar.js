const ExemplarDAO = require("../Persistence/ExemplarDAO");

class ControllerExemplar {
    async listar(req, res) {
        try {
            let exemplarDAO = new ExemplarDAO();

            const dados = await exemplarDAO.listarExemplares();

            return res.json(dados);
        } catch (error) {
            return res.status(500).send();
        }
    }

    async criar(req, res) {
        try {
            /* obriga que todos os dados do formulario seja informado, caso contrario ocorrera erro */
            const { nome, isbn, autor, editora, qtdExemplares } = req.body;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.adicionarExemplar(
                nome,
                isbn,
                autor,
                editora,
                qtdExemplares
            );

            return res.status(201).send();
        } catch (error) {
            return res.status(400).send();
        }
    }

    async alterar(req, res) {
        try {
            /* basta que pelo menos 1 dado seja informado */
            const dados = req.body;
            const { id } = req.params;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.alterarDadosExemplar(dados, id);

            return res.send();
        } catch (error) {
            return res.status(400).send();
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;

            let exemplarDAO = new ExemplarDAO();

            await exemplarDAO.removerExemplar(id);

            return res.send();
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = ControllerExemplar;
