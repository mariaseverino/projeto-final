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
            alert("Discente cadastrado com sucesso");

            navigate("/discentes");
        } catch (err) {
            alert("Já existe discente com dado informado");
        }
    }
    return (
        <div className="container">
            <form className="formulario" onSubmit={cadastrar} autoComplete="off">
                <div className="inputs">
                    <input
                        className="input-cadastro"
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        pattern="^[a-zA-Z][a-zA-Z0-9-_\s]{1,50}$" title="Digite de 1 a 50 caracteres para compor o nome" maxLength="50" required
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

export default CadastrarDiscente;
