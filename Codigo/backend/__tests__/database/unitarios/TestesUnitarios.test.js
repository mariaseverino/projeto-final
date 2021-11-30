const connection = require("../../../src/database");
const AtendenteDAO = require("../../../src/Persistence/AtendenteDAO");
const DiscenteDAO = require("../../../src/Persistence/DiscenteDAO");

describe("Testes Unitários", () => {
    afterAll((done) => {
        connection.destroy();
        done();
    });

    it("Deve cadastrar um atendente e se cadastrado com sucesso o atendente deve ter um id", async () => {
        let atendenteDAO = new AtendenteDAO();

        const dados = {
            email: "maria@gmail.com",
            senha: "senha12357",
            adm: true,
        };

        const atendente = await atendenteDAO.cadastrarAtendente(dados);

        expect(atendente).toHaveProperty("id");
    });

    it("Deve autenticar um atendente e se as informações estiverem corretas, deve retornar o id", async () => {
        let atendenteDAO = new AtendenteDAO();

        const dados = {
            email: "maria@gmail.com",
            senha: "senha12357",
        };

        const idAtendente = await atendenteDAO.autenticar(
            dados.email,
            dados.senha
        );

        expect(idAtendente).toBe(1);
    });

    it("Deve cadastrar um discente e se cadastrado com sucesso o discente deve ter um id", async () => {
        const dados = {
            nome: "Pedro Augusto Ramos",
            matricula: "201720285",
            cpf: "11786090421",
        };

        let discenteDAO = new DiscenteDAO();

        const discente = await discenteDAO.cadastrarDiscente(dados);

        expect(discente).toHaveProperty("id");
    });
});
