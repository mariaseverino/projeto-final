import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Header from "../../components/Header";
import api from "../../services/api";

import "./style.css";

import "../../globalStyle.css";

function ListarExemplares() {
    const [exemplares, setDiscentes] = useState([]);

    useEffect(() => {
        api.get("exemplares").then(({ data }) => {
            setDiscentes(data);
        });
    }, []);

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
                                        <button id="editar">Editar</button>
                                        <button id="remover">Remover</button>
                                        <button id="emprestar">
                                            Emprestar
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="adiciona">
                    <h1>+ Adicionar Exemplar</h1>
                </div>
            </div>
        </div>
    );
}

export default ListarExemplares;
