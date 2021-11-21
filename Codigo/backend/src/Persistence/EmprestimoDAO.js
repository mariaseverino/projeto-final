const Discente = require("../Model/Discente");
const Emprestimo = require("../Model/Emprestimo");
const Exemplar = require("../Model/Exemplar");

class EmprestimoDAO {
    async listarEmprestimos() {
        const emprestimos = await Emprestimo.query()
            .join("discentes", "emprestimos.idDiscente", "=", "discentes.id")
            .join("exemplares", "emprestimos.idExemplar", "=", "exemplares.id")
            .select(
                "emprestimos.id",
                "exemplares.nome",
                "discentes.matricula",
                "emprestimos.dataLimite",
                "emprestimos.status"
            );

        return emprestimos;
    }

    /* ver se o discente ja possui o livro que ele quer pegar emprestado? */
    async cadastrarEmprestimo(dado) {
        const discenteExiste = await Discente.query()
            .select("id", "numEmprestimos")
            .where({ matricula: dado.matricula })
            .first();

        if (discenteExiste === undefined) {
            throw new Error("Discente não encontrado");
        }

        const exemplar = await Exemplar.query()
            .select("qtdExemplares", "qtdEmprestimo")
            .where({ id: dado.id })
            .first();

        /* se esse livro existe? */
        console.log(exemplar);
        const emprestimoExiste = await Emprestimo.query()
            .where({
                idDiscente: discenteExiste.id,
                idExemplar: dado.id,
                status: true,
            })
            .first();

        console.log(emprestimoExiste);
        if (emprestimoExiste !== undefined) {
            throw new Error("Discente já esta com esse livro emprestado");
        }

        if (exemplar.qtdExemplares < 1) {
            throw new Error("Não há exemplar disponivel");
        }

        let qtdExemplares = exemplar.qtdExemplares - 1;
        let qtdEmprestimo = exemplar.qtdEmprestimo + 1;
        let numEmprestimos = discenteExiste.numEmprestimos + 1;

        await Exemplar.query()
            .update({ qtdExemplares, qtdEmprestimo })
            .where({ id: dado.id });

        const dataEmprestimo = new Date();
        const dataLimite = new Date();

        dataLimite.setDate(dataLimite.getDate() + 5);

        console.log(numEmprestimos);
        await Discente.query()
            .update({
                numEmprestimos,
                ultimoEmprestimo: dataEmprestimo.toJSON(),
            })
            .where({ matricula: dado.matricula });

        const novo = await Emprestimo.query().insert({
            idDiscente: discenteExiste.id,
            idExemplar: parseInt(dado.id),
            dataEmprestimo: dataEmprestimo.toJSON(),
            dataLimite: dataLimite.toJSON(),
            status: true,
        });
        console.log("id", novo);
    }

    async renovarEmprestimo(id) {
        const exemplar = await Emprestimo.query()
            .join("exemplares", "emprestimos.idExemplar", "=", "exemplares.id")
            .select(
                "emprestimos.idExemplar",
                "emprestimos.idDiscente",
                "exemplares.qtdEmprestimo",
                "emprestimos.dataLimite"
            )
            .where("emprestimos.id", id)
            .first();

        let qtdEmprestimo = exemplar.qtdEmprestimo + 1;

        await Exemplar.query()
            .update({ qtdEmprestimo: qtdEmprestimo })
            .where({ id: exemplar.idExemplar });

        let novaData = new Date(exemplar.dataLimite);

        novaData.setDate(novaData.getDate() + 5);

        await Discente.query()
            .update({ ultimoEmprestimo: new Date().toJSON() })
            .where({ id: exemplar.idDiscente });

        await Emprestimo.query()
            .update({ dataLimite: novaData.toJSON() })
            .where({ id });
    }

    /* apos emprestimo ser finalizado tem que aumentar quantidade de livro */
    /* finalizar -> remover a */
    async finalizarEmprestimo(id) {
        const dataEntrega = new Date();

        console.log(dataEntrega.toJSON());

        const emprestimo = await Emprestimo.query()
            .join("discentes", "emprestimos.idDiscente", "=", "discentes.id")
            .join("exemplares", "emprestimos.idExemplar", "=", "exemplares.id")
            .select(
                "emprestimos.id",
                "emprestimos.idExemplar",
                "emprestimos.idDiscente",
                "discentes.numEmprestimos",
                "exemplares.qtdExemplares"
            )
            .findById(id);

        let qtdExemplares = emprestimo.qtdExemplares + 1;
        let numEmprestimos = emprestimo.numEmprestimos - 1;

        console.log(numEmprestimos);

        await Emprestimo.query()
            .update({ dataEntrega: dataEntrega.toJSON(), status: false })
            .where({ id });

        await Exemplar.query()
            .update({ qtdExemplares })
            .where({ id: emprestimo.idExemplar });

        await Discente.query()
            .update({ numEmprestimos })
            .where({ id: emprestimo.idDiscente });
    }
}

module.exports = EmprestimoDAO;
