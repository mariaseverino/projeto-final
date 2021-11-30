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
    const [busca, setBusca] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        api.get("exemplares").then(({ data }) => {
            setExemplares(data);
        });
    }, []);

    let exemplaresFiltrados = exemplares.filter(
        (exemplar) =>
            exemplar.nome.toLowerCase().includes(busca.toLowerCase()) ||
            exemplar.isbn.toString().toLowerCase().includes(busca.toLowerCase())
    );

    async function remover(id) {
        await api
            .delete(`exemplar/${id}`)
            .then(() => {
                setExemplares(
                    exemplares.filter((exemplar) => exemplar.id != id)
                );
                alert(
                    "Exemplar removido com sucesso"
                );
            })
            .catch((err) => {
                alert(
                    "Não é possivel remover exemplares que estejam emprestados"
                );
            });
    }

    return (
        <div>
            <Header />
            <div id="container-listar-exemplares">
                <div id="div-busca">
                    <FiSearch size={24} color="#34315e" id="icon" />
                    <input
                        id="busca"
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
                <div>
                    <div id="titulo-exemplar">
                        <h2 id="nome-exemplar">Titulos</h2>
                        <h2 id="isbn-exemplar">ISBN</h2>
                        <h2 id="qtd-exemplar">Exemplares Disponiveis</h2>
                    </div>
                    {exemplaresFiltrados.length ? (
                        <ul>
                            {exemplaresFiltrados.map((dado) => (
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
                                                <button id="editar">
                                                    Editar
                                                </button>
                                            </Link>
                                            <button
                                                id="remover-exemplar"
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
                    ) : (
                        <div id="conteudo">
                            <h1>Nenhum exemplar encontrado</h1>
                        </div>
                    )}
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
