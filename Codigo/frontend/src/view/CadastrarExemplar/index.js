import imagem from "../../assets/estante.svg";
import { useNavigate } from "react-router";

import "./styles.css";
import "../../globalStyle.css";
import { useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";

function CadastrarExemplar() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [isbn, setIsbn] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [qtdExemplares, setQuantidade] = useState("");

    async function cadastrar(e) {
        e.preventDefault();
        let dados = {
            nome,
            isbn,
            autor,
            editora,
            qtdExemplares,
        };

        await api
            .post("exemplar", dados)
            .then(() => {
                alert("Exemplar cadastrado com sucesso");
                navigate("/exemplares");
            })
            .catch((err) => {
                alert("Exemplar já possui cadastro no sistema");
            });
    }

    return (
        <div>
            <Header />
            <div className="container">
                <form className="formulario" onSubmit={cadastrar}>
                    <div className="inputs">
                        <input
                            className="input"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            pattern="^[a-zA-Z0-9][a-zA-Z0-9-_\s]{1,50}$"
                            title="Digite de 1 a 50 caracteres para compor o nome do exemplar"
                            maxLength="50"
                            required
                        />
                        <input
                            className="input"
                            placeholder="ISBN"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            pattern="^[0-9]{13}$"
                            title="Digite os 13 dígitos do ISBN"
                            maxLength="13"
                            required
                        />
                        <input
                            className="input"
                            placeholder="Autor"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                            pattern="^[a-zA-Z][a-zA-Z-_\s]{1,50}$"
                            title="Digite de 1 a 50 caracteres para compor o nome do autor"
                            maxLength="50"
                            required
                        />
                        <input
                            className="input"
                            placeholder="Editora"
                            value={editora}
                            onChange={(e) => setEditora(e.target.value)}
                            pattern="^[a-zA-Z0-9][a-zA-Z0-9-_\s]{1,20}$"
                            title="Digite de 1 a 50 caracteres para compor o nome da editora"
                            maxLength="20"
                            required
                        />
                        <input
                            className="input"
                            placeholder="Quantidade de Exemplares"
                            value={qtdExemplares}
                            onChange={(e) => setQuantidade(e.target.value)}
                            pattern="^[0-9]{,13}$"
                            title="Informe em digitos a quantidade de exemplares"
                            required
                        />
                    </div>
                    <button className="botao" type="submit">
                        Cadastrar
                    </button>
                </form>
                <img src={imagem} className="imagem" />
            </div>
        </div>
    );
}

export default CadastrarExemplar;
