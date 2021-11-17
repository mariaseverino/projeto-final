import imagem from "../../assets/estante.svg"
import { useNavigate } from "react-router";

import "./styles.css"
import "../../globalStyle.css"

function CadastrarExemplar () {
    const navigate = useNavigate();
    return (
        <div className = "container">            
            <form className = "formulario">
                <div className = "inputs">
                <input type = "nome" name = "cnome" placeholder = "Nome"/>
                <input type = "isbn" name = "cisbn" placeholder = "ISBN"/>
                <input type = "autor" name = "cautor" placeholder = "Autor"/>
                <input type = "editora" name = "ceditora" placeholder = "Editora"/>
                <input type = "quantidade" name = "cquantidade" placeholder = "Quantidade de Exemplares"/>
                </div>
                <button className = "botao" onClick={() =>navigate("/home")} >Cadastrar</button>
            </form>
            <img src = {imagem} className = "imagem" />
        </div>)
}

export default CadastrarExemplar;