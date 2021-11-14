import React from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";

import Header from "../../components/Header";

import "./style.css";

function ListarDiscentes() {
    const dados = [
        {
            id: 1,
            nome: "Maria Rita de Souza Severino",
            matricula: "201820290",
        },
        {
            id: 2,
            nome: "Nicolas de Oliverira Aquivo Barbosa",
            matricula: "201820290",
        },
    ];
    return (
        <div id="listar-discentes">
            <Header />
            {/* <FiSearch size={18} /> */}
            <div id="container-listar-discentes">
                <div id="div-busca">
                    <FiSearch size={24} />
                    <input id="busca" />
                </div>
                <div id="tudo">
                    <div id="titulo">
                        <h2 id="tituloNome">Nome Aluno</h2>
                        <h2 id="matricula">Numero Matricula</h2>
                    </div>
                    <ul>
                        {dados.map((dado) => (
                            <li key={dado.id}>
                                <div id="info">
                                    <div id="nome">
                                        <p>{dado.nome}</p>
                                    </div>
                                    <div>
                                        <p>{dado.matricula}</p>
                                    </div>
                                    <div id="botoes">
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
