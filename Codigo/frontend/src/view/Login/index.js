import imagem from "../../assets/menina-livros.svg";
import { useNavigate } from "react-router";

import "./styles.css";
import "../../globalStyle.css";
import api from "../../services/api";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function registrar(e) {
        try {
            e.preventDefault();
            let dados = {
                email,
                senha,
            };

            await api.post("/", dados).then((res) => {
                localStorage.setItem("atendente-id", res.data.atendente);
                navigate("/home");
            });
        } catch (err) {
            alert("Email ou senha incorreto!");
        }
    }

    return (
        <div className="container">
            <img src={imagem} className="imagem" />

            <form className="formulario" onSubmit={registrar}>
                <div className="inputs">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button className="botao" type="submit">
                    ENTRAR
                </button>
            </form>
        </div>
    );
}

export default Login;
