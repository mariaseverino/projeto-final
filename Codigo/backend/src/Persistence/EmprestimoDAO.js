class EmprestimoDAO {
    async listarEmprestimos() {
        const emprestimos = await knex("emprestimos");
        return emprestimos;
    }
}
