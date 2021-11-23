const Exemplar = require("../Model/Exemplar");
const Emprestimo = require("../Model/Emprestimo");

class ExemplarDAO {
    async listarExemplares() {
        const exemplares = await Exemplar.query().select(
            "id",
            "nome",
            "isbn",
            "qtdExemplares"
        );
        return exemplares;
    }
    async dadosExemplar(id) {
        const exemplar = await Exemplar.query()
            .select("nome", "isbn", "autor", "editora", "qtdExemplares")
            .findById(id);

        return exemplar;
    }

    async adicionarExemplar(dados) {
        await Exemplar.query().insert({
            nome: dados.nome,
            isbn: parseInt(dados.isbn),
            autor: dados.autor,
            editora: dados.editora,
            qtdExemplares: parseInt(dados.qtdExemplares),
        });
    }

    async alterarDadosExemplar(dados, id) {
        console.log(dados);
        await Exemplar.query()
            .update({
                nome: dados.nome,
                isbn: parseInt(dados.isbn),
                autor: dados.autor,
                editora: dados.editora,
                qtdExemplares: parseInt(dados.qtdExemplares),
            })
            .where({ id });
    }

    async removerExemplar(id) {
        const emprestimo = await Emprestimo.query()
            .select("status")
            .where({ idExemplar: id, status: true })
            .first();
        /* tem que retorna undefined */
        /* se existir um exemplar ele não pde ser removido pois esta emprestado */
        console.log(emprestimo);

        /* se o livro nao tiver emprestado vai retornar undefined */
        if (emprestimo !== undefined) {
            console.log("nao removeu");
            throw new Error("Exemplar não pode ser removido");
        }
        // await Exemplar.query().where({ id }).del();
        await Exemplar.query().deleteById(id);
    }
}

module.exports = ExemplarDAO;
