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

            alert("Discente alterado com sucesso");
            
            navigate("/discentes");
        } catch (err) {
            alert("Discente já possui cadastro no sistema");

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
                        pattern="^[a-zA-Z]{1,50}$" title="Digite de 1 a 50 caracteres para compor o nome" maxLength="50" required
                    />
                    <input
                        placeholder="Número de Matrícula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        pattern="^[0-9]{9}$" title="Digite os 9 dígitos da matrícula " maxLength = "9" required
                    />
                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        pattern="^[0-9]{11}$" title="Digite os 11 dígitos da do cpf sem pontos, espaços e barras" maxLength = "11" required
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
