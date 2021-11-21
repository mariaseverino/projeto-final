import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

import Header from "../../components/Header";
import api from "../../services/api";

import "./style.css";

import "../../globalStyle.css";
import { Link } from "react-router-dom";

function ListarExemplares() {
    const [exemplares, setExemplares] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("exemplares").then(({ data }) => {
            setExemplares(data);
        });
    }, []);

    async function remover(id) {
        try {
            await api.delete(`exemplar/${id}`);

            setExemplares(exemplares.filter((exemplar) => exemplar.id != id));
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <Header />
            <div id="container-listar-exemplares">
                <div id="div-busca">
                    <FiSearch size={24} color="#34315e" />
                    <input id="busca" />
                </div>
                <div>
                    <div id="titulo-exemplar">
                        <h2 id="nome-exemplar">Titulos</h2>
                        <h2 id="isbn-exemplar">ISBN</h2>
                        <h2 id="qtd-exemplar">Exemplares Disponiveis</h2>
                    </div>
                    <ul>
                        {exemplares.map((dado) => (
                            <li key={dado.id}>
                                <div id="info-exemplar">
                                    <div id="nome-exemplar">
                                        <p>{dado.nome}</p>
                                    </div>
                                    <div id="isbn-exemplar">
                                        <p>{dado.isbn}</p>
                                    </div>
                                    <div id="qtd-exemplar">
                                        <p>{dado.qtdExemplares}</p>
                                    </div>
                                    <div id="botoes">
                                        <Link
                                            to={`/exemplar/alterar/${dado.id}`}
                                        >
                                            <button id="editar">Editar</button>
                                        </Link>
                                        <button
                                            id="remover"
                                            onClick={() => remover(dado.id)}
                                        >
                                            Remover
                                        </button>
                                        <Link
                                            to={`/emprestimo/cadastrar/${dado.id}`}
                                        >
                                            <button id="emprestar">
                                                Emprestar
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    id="adiciona"
                    onClick={() => navigate("/exemplar/cadastrar")}
                >
                    <h1>+ Adicionar Exemplar</h1>
                </button>
            </div>
        </div>
    );
}

export default ListarExemplares;
