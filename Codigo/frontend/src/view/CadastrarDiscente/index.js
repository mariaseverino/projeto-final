import imagem from "../../assets/menina-lendo.svg"
import { useNavigate } from "react-router";

import "./styles.css"
import "../../globalStyle.css"

function CadastrarDiscente () {
    const navigate = useNavigate();
    return (
        <div className = "container">            
            <form className = "formulario">
                <div className = "inputs">
                    <input type = "nome" name = "cnome" placeholder = "Nome Completo" 
                     onChange = {() => {}}/>
                    <input type = "matricula" name = "cmatricula" placeholder = "Número de Matrícula" 
                     onChange = {() => {}}/>
                     <input type = "cpf" name = "ccpf" placeholder = "CPF" 
                     onChange = {() => {}}/>
                </div>
                <button className = "botao" onClick={() =>navigate("/discentes")} >Cadastrar</button>
            </form>
            <img src = {imagem} className = "imagem" />
        </div>)
}

export default CadastrarDiscente;