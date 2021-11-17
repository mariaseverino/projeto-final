const Discente = require("../Model/Discente");
const DiscenteDAO = require("../Persistence/DiscenteDAO");

class ControllerDiscente {
    async listar(req, res) {
        try {
            let discenteDAO = new DiscenteDAO();

            const dados = await discenteDAO.listarDiscentes();

            return res.json(dados);
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }

    async criar(req, res) {
        try {
            /* obriga que todos os dados do formulario seja informado, caso contrario ocorrera erro */
            const { nome, matricula, cpf } = req.body;

            let dados = { nome, matricula, cpf };

            let discente = new Discente(dados);
            let discenteDAO = new DiscenteDAO();

            await discenteDAO.cadastrarDiscente(discente);

            return res.status(201).send();
        } catch (error) {
            return res.json({ erro: err.message });
        }
    }

    async alterar(req, res) {
        try {
            /* basta que pelo menos 1 dado seja informado */
            const dados = req.body;
            const { id } = req.params;

            let discente = new Discente(dados);
            let discenteDAO = new DiscenteDAO();

            await discenteDAO.alterarDadosDiscente(discente, id);

            return res.send();
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }

    async remover(req, res) {
        try {
            const { id } = req.params;

            let discenteDAO = new DiscenteDAO();

            await discenteDAO.removerDiscente(id);

            return res.send();
        } catch (err) {
            return res.json({ erro: err.message });
        }
    }
}

module.exports = ControllerDiscente;
