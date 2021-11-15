import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";

import "../../globalStyle.css";
import "./style.css";

function Home() {
    const navigate = useNavigate();

    function sair() {
        navigate("/");
    }

    function opcoes(rota) {
        navigate(`/${rota}`);
    }

    return (
        <div id="home">
            <div id="home-header">
                <button id="icon-sair">
                    <FiLogOut size={36} color="#00000" onClick={sair} />
                </button>
            </div>
            <div id="home-container">
                <button
                    className="bloco"
                    id="discentes"
                    onClick={() => opcoes("discentes")}
                >
                    <p id="titulo-bloco">Discentes</p>
                </button>
                <button
                    className="bloco"
                    id="acervo"
                    onClick={() => opcoes("exemplares")}
                >
                    <p id="titulo-bloco">Acervo</p>
                </button>
                <button className="bloco" id="emprestimos" onClick={() => {}}>
                    <p id="titulo-bloco">Emprestimos</p>
                </button>
            </div>
        </div>
    );
}

export default Home;
