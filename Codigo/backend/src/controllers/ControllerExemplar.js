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
}

module.exports = ControllerExemplar;
