import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

import "../../globalStyle.css";
import "./style.css";

function Home() {
    const navigate = useNavigate();

    function sair() {
        navigate("/");
    }

    return (
        <div id="home">
            <div id="home-header">
                <button id="icon-sair">
                    <FiLogOut size={36} color="#00000" onClick={sair} />
                </button>
            </div>
            <div id="home-container">
                <div className="bloco" id="discentes">
                    <p id="titulo-bloco">Discentes</p>
                </div>
                <div className="bloco" id="acervo">
                    <p id="titulo-bloco">Acervo</p>
                </div>
                <div className="bloco" id="emprestimos">
                    <p id="titulo-bloco">Emprestimos</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
