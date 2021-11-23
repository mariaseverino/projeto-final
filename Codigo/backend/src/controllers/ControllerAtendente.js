const AtendenteDAO = require("../Persistence/AtendenteDAO");

class ControllerAtendente {
    async listar(req, res) {
        try {
            let atendenteDAO = new AtendenteDAO();

            const dados = await atendenteDAO.listarAtendentes();
            console.log(dados);

            return res.json(dados);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async criar(req, res) {
        try {
            const dados = req.body;

            let atendenteDAO = new AtendenteDAO();

            const atendente = await atendenteDAO.cadastrarAtendente(dados);

            return res.json({ atendente });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }

    async autenticar(req, res) {
        try {
            const { email, senha } = req.body;

            let atendenteDAO = new AtendenteDAO();

            const atendente = await atendenteDAO.autenticar(email, senha);

            return res.json({ atendente });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
}

module.exports = ControllerAtendente;
