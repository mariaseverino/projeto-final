const EmprestimoDAO = require("../Persistence/EmprestimoDAO");

class ControllerEmprestimo {
    async listar(req, res) {
        try {
            let emprestimoDAO = new EmprestimoDAO();

            const dados = await emprestimoDAO.listarEmprestimos();

            return res.json(dados);
        } catch (error) {
            return res.status(500).send();
        }
    }

    async criar(req, res) {
        try {
            const { matricula } = req.body;
            const { id } = req.params;

            let emprestimoDAO = new EmprestimoDAO();

            await emprestimoDAO.cadastrarEmprestimo(matricula, id);

            return res.status(201).send();
        } catch (err) {
            return res.status(404).send({ erro: err.message });
        }
    }
}

module.exports = ControllerEmprestimo;
