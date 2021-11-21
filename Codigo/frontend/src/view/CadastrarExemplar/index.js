import imagem from "../../assets/estante.svg";
import { useNavigate } from "react-router";

import "./styles.css";
import "../../globalStyle.css";
import { useState } from "react";
import api from "../../services/api";

function CadastrarExemplar() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [isbn, setIsbn] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [qtdExemplares, setQuantidade] = useState("");

    async function cadastrar(e) {
        try {
            e.preventDefault();
            let dados = {
                nome,
                isbn,
                autor,
                editora,
                qtdExemplares,
            };

            await api.post("exemplar", dados);

            navigate("/exemplares");
        } catch (err) {
            alert(err.message);

            setNome("");
            setIsbn("");
            setAutor("");
            setEditora("");
            setQuantidade("");
        }
    }

    return (
        <div className="container">
            <form className="formulario" onSubmit={cadastrar}>
                <div className="inputs">
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        placeholder="ISBN"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                    />
                    <input
                        placeholder="Autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                    />
                    <input
                        placeholder="Editora"
                        value={editora}
                        onChange={(e) => setEditora(e.target.value)}
                    />
                    <input
                        placeholder="Quantidade de Exemplares"
                        value={qtdExemplares}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </div>
                <button className="botao" type="submit">
                    Cadastrar
                </button>
            </form>
            <img src={imagem} className="imagem" />
        </div>
    );
}

export default CadastrarExemplar;
