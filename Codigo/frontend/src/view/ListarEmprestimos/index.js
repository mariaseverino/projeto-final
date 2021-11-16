import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

import Header from "../../components/Header";
import api from "../../services/api";

import "./style.css";

import "../../globalStyle.css";
import { format } from "date-fns";

function ListarEmprestimos() {
    const [emprestimos, setEmprestimos] = useState([]);

    /* pega dados do backend passados pela rota /emprestimos */
    useEffect(() => {
        api.get("emprestimos").then(({ data }) => {
            setEmprestimos(data);
        });
    }, []);

    async function devolverLivro(id) {
        try {
            await api.put(`emprestimo/finalizar/${id}`);

            emprestimos.map((emprestimo) => {
                if (emprestimo.id == id) {
                    emprestimo.status = 0;

                    emprestimo.dataLimite = emprestimo.dataEntrega;
                }
            });

            setEmprestimos([...emprestimos]);
        } catch (err) {
            alert(`erro ao deletar ${id}, ${err.message}`);
        }
    }

    return (
        <div>
            <Header />
            <div id="container-listar-emprestimos">
                <div id="div-busca">
                    <FiSearch size={24} color="#34315e" />
                    <input id="busca" />
                </div>
                <div>
                    <div id="titulo-emprestimo">
                        <h2 id="titulo-emprestimo">Titulos</h2>
                        <h2 id="isbn-emprestimo">Numero da Matricula</h2>
                        <h2 id="qtdLivros-emprestimo">Data de Devolução</h2>
                    </div>
                    <ul>
                        {emprestimos.map((dado) => (
                            <li key={dado.id}>
                                <div id="info-emprestimo">
                                    <div id="titulo-emprestimo">
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
                                    <div id="botoes-emprestimo">
                                        <button id="editar">Renovar</button>

                                        {dado.status ? (
                                            <button
                                                id="devolver"
                                                onClick={() =>
                                                    devolverLivro(dado.id)
                                                }
                                            >
                                                Devolver
                                            </button>
                                        ) : (
                                            <button id="devolvido">
                                                Devolvido
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ListarEmprestimos;
