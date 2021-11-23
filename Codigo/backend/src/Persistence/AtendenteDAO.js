const bcrypt = require("bcryptjs");
const Atendente = require("../Model/Atendente");

class AtendenteDAO {
    async listarAtendentes() {
        const discentes = await Atendente.query().select(
            "id",
            "email",
            "senha",
            "adm"
        );
        return discentes;
    }

    async cadastrarAtendente(dados) {
        /* verificar se o usuario existe */
        const atendenteExiste = await Atendente.query()
            .where({ email: dados.email })
            .first();

        console.log("teste", dados);
        if (atendenteExiste !== undefined) {
            throw new Error("Atendente já existe");
        }
        /* se nao existir cadastra */
        /* criptografa senha */
        const senhaCriptografada = await bcrypt.hash(dados.senha, 8);

        const atendente = await Atendente.query().insert({
            email: dados.email,
            senha: senhaCriptografada,
            adm: dados.adm,
        });

        return atendente;
    }

    async autenticar(email, senha) {
        /* verificar se o usuario existe */
        const atendenteExiste = await Atendente.query()
            .where({ email })
            .first();

        if (atendenteExiste === undefined) {
            throw new Error("email ou senha incorretos");
        }

        const senhaCorreta = await bcrypt.compare(senha, atendenteExiste.senha);

        if (senhaCorreta != true) {
            throw new Error("email ou senha incorretos");
        }

        const id = atendenteExiste.id;

        return id;
    }
}

module.exports = AtendenteDAO;
