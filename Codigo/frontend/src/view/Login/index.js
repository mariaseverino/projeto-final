import imagem from "../../assets/menina-livros.svg"
import { useNavigate } from "react-router";

import "./styles.css"
import "../../globalStyle.css"

function Login () {
    const navigate = useNavigate();
    return (
        <div className = "container">
            <img src = {imagem} className = "imagem" />

            
            <form className = "formulario">
                <div className = "inputs">
                    <input type = "email" name = "cemail" placeholder = "E-mail" 
                     onChange = {() => {}}/>
                    <input type = "passaword" name = "csenha" placeholder = "Senha" 
                     onChange = {() => {}}/>
                </div>
                <button className = "botao" onClick={() =>navigate("/home")} >ENTRAR</button>
            </form>
        </div>)
}

export default Login;