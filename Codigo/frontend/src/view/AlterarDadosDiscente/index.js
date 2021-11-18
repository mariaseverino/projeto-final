import React, { useState, useEffect } from "react";
import imagem from "../../assets/menina-lendo.svg";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";
import "../../globalStyle.css";

function AlterarDadosDiscente() {
    const navigate = useNavigate();

    const [discente, setDiscente] = useState([]);
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [cpf, setCpf] = useState("");

    const { id } = useParams();

    useEffect(() => {
        api.get(`discente/alterar/${id}`).then(({ data }) => {
            setDiscente(data);
            setNome(data.nome);
            setMatricula(data.matricula);
            setCpf(data.cpf);
        });
    }, []);

    async function alterar(e) {
        try {
            e.preventDefault();
            let dados = {
                nome,
                matricula,
                cpf,
            };
            await api.put(`discente/alterar/${id}`, dados);

            navigate("/discentes");
        } catch (err) {
            alert(err.message);

            setNome(discente.nome);
            setMatricula(discente.matricula);
            setCpf(discente.cpf);
        }
    }
    return (
        <div className="container">
            <form className="formulario" onSubmit={alterar}>
                <div className="inputs">
                    <input
                        className="input-cadastro"
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        placeholder="Número de Matrícula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                    />
                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
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

export default AlterarDadosDiscente;
