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

            navigate("/exemplares");
        } catch (err) {
            alert(err.message);

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
                    />
                    <input
                        placeholder="ISBN"
                        type="number"
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
                        type="number"
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

export default AlterarDadosExemplar;
