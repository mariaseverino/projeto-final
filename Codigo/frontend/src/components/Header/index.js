import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiLogOut } from "react-icons/fi";
import "./style.css";

function Header() {
    const navigate = useNavigate();

    function voltar() {
        navigate("/home");
    }

    function sair() {
        navigate("/");
    }
    return (
        <div id="container-header">
            <button id="icon-header" onClick={voltar}>
                <FiArrowLeft size={36} color="#00000" />
            </button>
            <button id="icon-header" onClick={sair}>
                <FiLogOut size={36} color="#00000" />
            </button>
        </div>
    );
}

export default Header;
