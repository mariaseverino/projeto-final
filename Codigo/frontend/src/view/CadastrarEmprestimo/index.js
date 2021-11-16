import imagem from "../../assets/livro.svg"
import { useNavigate } from "react-router";

import "./styles.css"
import "../../globalStyle.css"

function CadastrarEmprestimo () {
    const navigate = useNavigate();
    return (
        <div className = "container">            
            <form className = "formulario">
                <div className = "inputs">
    
                <input type = "matricula" name = "cmatricula" placeholder = "Matricula do Aluno"/>
                </div>
                <button className = "botao" onClick={() =>navigate("/home")} >Cadastrar</button>
            </form>
            <img src = {imagem} className = "imagem" />
        </div>)
}

export default CadastrarEmprestimo;