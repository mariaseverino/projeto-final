import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";

import Header from "../../components/Header";
import api from "../../services/api";

import "../../globalStyle.css";

import "./style.css";

function ListarDiscentes() {
    const [discentes, setDiscentes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("discentes").then(({ data }) => {
            setDiscentes(data);
        });
    }, []);

    async function remover(id) {
        try {
            await api.delete(`discente/${id}`);

            setDiscentes(discentes.filter((discente) => discente.id != id));
        } catch (error) {
            alert(error.message);
        }
    }

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
                                        <Link
                                            to={`/discente/alterar/${dado.id}`}
                                        >
                                            <button id="editar">Editar</button>
                                        </Link>
                                        <button
                                            id="remover"
                                            onClick={() => remover(dado.id)}
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    id="adiciona"
                    onClick={() => navigate("/discentes/cadastrar")}
                >
                    <h1>+ Adicionar Discente</h1>
                </button>
            </div>
        </div>
    );
}

export default ListarDiscentes;
