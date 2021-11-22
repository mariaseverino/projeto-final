import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Header from "../../components/Header";
import api from "../../services/api";

import "./style.css";

import "../../globalStyle.css";
import { format } from "date-fns";

function ListarEmprestimos() {
    const [emprestimos, setEmprestimos] = useState([]);
    const [busca, setBusca] = useState("");

    /* pega dados do backend passados pela rota /emprestimos */
    useEffect(() => {
        api.get("emprestimos").then(({ data }) => {
            setEmprestimos(data);
        });
    }, []);

    let emprestimosFiltrados = emprestimos.filter(
        (emprestimo) =>
            emprestimo.nome.toLowerCase().includes(busca.toLowerCase()) ||
            emprestimo.matricula
                .toString()
                .toLowerCase()
                .includes(busca.toLowerCase())
    );

    async function devolverLivro(id) {
        try {
            await api.put(`emprestimo/finalizar/${id}`);

            emprestimos.map((emprestimo) => {
                if (emprestimo.id == id) {
                    emprestimo.status = 0;

                    emprestimo.dataLimite = new Date().toJSON().toString();
                    // alert(new Date().toJSON().toString(),emprestimo.dataLimite);
                }
            });

            setEmprestimos([...emprestimos]);
        } catch (err) {
            alert(`erro ao deletar ${id}, ${err.message}`);
        }
    }

    async function renovarEmprestimo(id) {
        try {
            await api.put(`emprestimo/${id}`);

            emprestimos.map((emprestimo) => {
                if (emprestimo.id == id) {
                    let novaData = new Date (emprestimo.dataLimite);
                    emprestimo.dataLimite = novaData.setDate(novaData.getDate() + 5);
                }
            });

            setEmprestimos([...emprestimos]);
        } catch (err) {
            alert(`erro ao renovar ${id}, ${err.message}`);
        }
    }

    return (
        <div>
            <Header />
            <div id="container-listar-emprestimos">
                <div id="div-busca">
                    <FiSearch size={24} color="#34315e" id="icon" />
                    <input
                        id="busca"
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
                <div>
                    <div id="titulo-emprestimo">
                        <h2 id="nome-emprestimo">Titulos</h2>
                        <h2 id="isbn-emprestimo">Numero da Matricula</h2>
                        <h2 id="qtdLivros-emprestimo">Data de Devolução</h2>
                    </div>
                    {emprestimosFiltrados.length ? (
                        <ul>
                            {emprestimosFiltrados.map((dado) => (
                                <li key={dado.id}>
                                    <div id="info-emprestimo">
                                        <div id="nome-emprestimo">
                                            <p>{dado.nome}</p>
                                        </div>
                                        <div id="isbn-emprestimo">
                                            <p>{dado.matricula}</p>
                                        </div>
                                        <div id="qtdLivros-emprestimo">
                                            <p>
                                                {/* tem que mudar a data limite */}
                                                {/* data formatada */}
                                                {format(
                                                    new Date(dado.dataLimite),
                                                    "dd/MM/yyyy"
                                                )}
                                                {/* {dado.dataLimite} */}
                                            </p>
                                        </div>
                                        {dado.status ? (
                                            <div id="botoes-emprestimo">
                                                <button id="editar" onClick={() =>
                                                        renovarEmprestimo(dado.id)
                                                    }
                                                >
                                                    Renovar
                                                </button>

                                                <button
                                                    id="devolver"
                                                    onClick={() =>
                                                        devolverLivro(dado.id)
                                                    }
                                                >
                                                    Devolver
                                                </button>
                                            </div>
                                        ) : (
                                            <div id="botoes-emprestimo">
                                                <div id="editar2">Renovar</div>
                                                <div id="devolvido">
                                                    Devolvido
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div id="conteudo">
                            <h1>Nenhum emprestimo encontrado</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListarEmprestimos;
