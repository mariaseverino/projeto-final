import { useState } from "react";
import imagem from "../../assets/menina-lendo.svg";
import { useNavigate } from "react-router";

import api from "../../services/api";

import "./styles.css";
import "../../globalStyle.css";

function CadastrarDiscente() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [cpf, setCpf] = useState("");

    async function cadastrar(e) {
        try {
            e.preventDefault();
            let dados = {
                nome,
                matricula,
                cpf,
            };
            await api.post("discente", dados);

            navigate("/discentes");
        } catch (err) {
            alert(err.message);

            setNome("");
            setMatricula("");
            setCpf("");
        }
    }
    return (
        <div className="container">
            <form className="formulario" onSubmit={cadastrar}>
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

export default CadastrarDiscente;
