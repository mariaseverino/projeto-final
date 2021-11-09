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
}

module.exports = ControllerEmprestimo;
