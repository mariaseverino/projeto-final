import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Header from "../../components/Header";
import api from "../../services/api";

import "../../globalStyle.css";

import "./style.css";

function ListarDiscentes() {
    const [discentes, setDiscentes] = useState([]);

    useEffect(() => {
        api.get("discentes").then(({ data }) => {
            setDiscentes(data);
        });
    }, []);

    return (
        <div id="listar-discentes">
            <Header />
            <div id="container-listar-discentes">
                <div id="div-busca">
                    <FiSearch size={24} />
                    <input id="busca" />
                </div>
                <div>
                    <div id="titulo-discentes">
                        <h2 id="nome-discentes">Nome Aluno</h2>
                        <h2 id="matricula-discentes">Numero Matricula</h2>
                    </div>
                    <ul>
                        {discentes.map((dado) => (
                            <li key={dado.id}>
                                <div id="info-discentes">
                                    <div id="nome-discentes">
                                        <p>{dado.nome}</p>
                                    </div>
                                    <div id="matricula-discentes">
                                        <p>{dado.matricula}</p>
                                    </div>
                                    <div id="botoes-discentes">
                                        <button id="editar">Editar</button>
                                        <button id="remover">Remover</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="adiciona">
                    <h1>+ Adicionar Discente</h1>
                </div>
            </div>
        </div>
    );
}

export default ListarDiscentes;
