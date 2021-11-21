const EmprestimoDAO = require("../Persistence/EmprestimoDAO");

class ControllerEmprestimo {
    async listar(req, res) {
        try {
            let emprestimoDAO = new EmprestimoDAO();

            const dados = await emprestimoDAO.listarEmprestimos();

            return res.json(dados);
        } catch (error) {
            return res.send({ erro: err.message });
        }
    }

    async criar(req, res) {
        try {
            const { matricula } = req.body;
            const { id } = req.params;

            let dados = { matricula, id };

            let emprestimoDAO = new EmprestimoDAO();

            await emprestimoDAO.cadastrarEmprestimo(dados);

            return res.send();
        } catch (err) {
            return res.send({ erro: err.message });
        }
    }
    async renovar(req, res) {
        try {
            const { id } = req.params;

            let emprestimoDAO = new EmprestimoDAO();

            await emprestimoDAO.renovarEmprestimo(id);

            return res.send();
        } catch (err) {
            return res.send({ erro: err.message });
        }
    }

    async finalizar(req, res) {
        try {
            const { id } = req.params;

            let emprestimoDAO = new EmprestimoDAO();

            await emprestimoDAO.finalizarEmprestimo(parseInt(id));

            return res.send();
        } catch (err) {
            return res.send({ erro: err.message });
        }
    }
}

module.exports = ControllerEmprestimo;
