import React, { useState, useEffect } from "react";
import imagem from "../../assets/estante.svg";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";
import "../../globalStyle.css";

function AlterarDadosExemplar() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [isbn, setIsbn] = useState("");
    const [autor, setAutor] = useState("");
    const [editora, setEditora] = useState("");
    const [qtdExemplares, setQuantidade] = useState("");

    const { id } = useParams();

    useEffect(() => {
        api.get(`exemplar/alterar/${id}`).then(({ data }) => {
            setNome(data.nome);
            setIsbn(data.isbn);
            setAutor(data.autor);
            setEditora(data.editora);
            setQuantidade(data.qtdExemplares);
        });
    }, []);

    async function alterar(e) {
        try {
            e.preventDefault();
            let dados = {
                nome,
                isbn,
                autor,
                editora,
                qtdExemplares,
            };
            await api.put(`exemplar/alterar/${id}`, dados);

            alert("Exemplar alterado com sucesso");

            navigate("/exemplares");
        } catch (err) {
            alert("Exemplar já possui cadastro no sistema");

            setNome(nome);
            setIsbn(isbn);
            setAutor(autor);
            setEditora(editora);
            setQuantidade(qtdExemplares);
        }
    }
    return (
        <div className="container">
            <form className="formulario" onSubmit={alterar}>
                <div className="inputs">
                    <input
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        pattern="^[a-zA-Z0-9][a-zA-Z0-9-_\s]{1,50}$" title="Digite de 1 a 50 caracteres para compor o nome do exemplar" maxLength="50" required
                    />
                    <input
                        placeholder="ISBN"
                        type="number"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        pattern="^[0-9]{13}$" title="Digite os 13 dígitos do ISBN" maxLength = "13" required
                    />
                    <input
                        placeholder="Autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                        pattern="^[a-zA-Z][a-zA-Z-_\s]{1,50}$" title="Digite de 1 a 50 caracteres para compor o nome do autor" maxLength="50" required
                    />
                    <input
                        placeholder="Editora"
                        value={editora}
                        onChange={(e) => setEditora(e.target.value)}
                        pattern="^[a-zA-Z0-9][a-zA-Z0-9-_\s]{1,20}$" title="Digite de 1 a 50 caracteres para compor o nome da editora" maxLength="20" required
                    />
                    <input
                        placeholder="Quantidade de Exemplares"
                        value={qtdExemplares}
                        type="number"
                        onChange={(e) => setQuantidade(e.target.value)}
                        pattern="^[0-9]{,13}$" title="Informe em digitos a quantidade de exemplares" required
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

export default AlterarDadosExemplar;
