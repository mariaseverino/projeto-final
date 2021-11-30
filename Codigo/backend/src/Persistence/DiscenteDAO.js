const connection = require("../database");
const Discente = require("../Model/Discente");

class DiscenteDAO {
    async listarDiscentes() {
        const discentes = await Discente.query().select(
            "id",
            "nome",
            "matricula",
            "numEmprestimos"
        );
        return discentes;
    }

    async dadosDiscente(id) {
        const discente = await Discente.query()
            .select("nome", "matricula", "cpf")
            .findById(id);

        return discente;
    }

    async cadastrarDiscente(dados) {
        let discente = await Discente.query()
            .select("id")
            .where("cpf", dados.cpf)
            .first();

        if (discente != undefined) {
            throw new Error("Discente ja existe");
        }

        discente = await Discente.query().insert({
            nome: dados.nome,
            matricula: parseInt(dados.matricula),
            cpf: parseInt(dados.cpf),
        });

        return discente;
    }

    async alterarDadosDiscente(dados, id) {
        await Discente.query()
            .update({
                nome: dados.nome,
                matricula: parseInt(dados.matricula),
                cpf: parseInt(dados.cpf),
            })
            .where({ id });
    }

    async removerDiscente(id) {
        const discente = await Discente.query()
            .where("numEmprestimos", ">", 0)
            .findById(id);

        if (discente !== undefined) {
            throw new Error(
                "Discente não pode ser removido, pois possui pendencias"
            );
        }

        await Discente.query().deleteById(id);
    }
}

module.exports = DiscenteDAO;
