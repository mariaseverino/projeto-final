import imagem from "../../assets/livro.svg";
import { useNavigate, useParams } from "react-router";

import "./styles.css";
import "../../globalStyle.css";
import { useState } from "react";
import api from "../../services/api";

function CadastrarEmprestimo() {
    const navigate = useNavigate();

    const [matricula, setMatricula] = useState();
    const { id } = useParams();

    async function cadastrar(e) {
        try {
            e.preventDefault();
            let dados = {
                matricula,
            };

            await api.post(`emprestimo/${id}`, dados);

            navigate("/emprestimos");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="container">
            <form className="formulario" onSubmit={cadastrar}>
                <div className="inputs">
                    <input
                        placeholder="Matricula do Aluno"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        pattern="^[0-9]{9}$"
                        title="Digite os 9 dígitos da matrícula "
                        maxLength="9"
                        required
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

export default CadastrarEmprestimo;
