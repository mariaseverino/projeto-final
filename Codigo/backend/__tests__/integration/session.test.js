const connection = require("../../src/database");
const Atendente = require("../../src/Model/Atendente");
const AtendenteDAO = require("../../src/Persistence/AtendenteDAO");

// describe("Autentiticação", () => {
//     it("Deve retornar o id do atendente quando for inserido credencias validas", async() => {
//         const atendente = await Atendente.query().where({
//             email: "nicolas@gmail.com",
//         });
//     });
// });

describe("Cadastrar Atendente", () => {
    it("Deve retornar o email do atendente quando for inserido credencias validas", async () => {
        let atendenteDAO = new AtendenteDAO();

        const dados = {
            email: "maria12@gmail.com",
            senha: "senha12357",
            adm: false,
        };

        const atendente = await atendenteDAO.cadastrarAtendente(dados);

        console.log(atendente);

        await expect(atendente).toHaveProperty("id");
    });
});
