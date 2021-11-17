class Exemplar {
    constructor(dados) {
        this.nome = dados.nome;
        this.isbn = dados.isbn;
        this.autor = dados.autor;
        this.editora = dados.editora;
        this.qtdExemplares = dados.qtdExemplares;
    }
}

module.exports = Exemplar;
