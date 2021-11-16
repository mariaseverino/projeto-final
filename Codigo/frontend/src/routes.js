import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./view/Login";
import Home from "./view/Home";
import ListarDiscentes from "./view/ListarDiscentes";
import CadastrarDiscente from "./view/CadastrarDiscente";
import CadastrarExemplares from "./view/CadastrarExemplar";
import CadastrarEmprestimo from "./view/CadastrarEmprestimo";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/discentes" element={<ListarDiscentes />} />
                <Route path="/discentes/cadastrar" element={<CadastrarDiscente />} />
                <Route path="/exemplar/cadastrar" element={<CadastrarExemplares />} />
                <Route path="/emprestimo/cadastrar" element={<CadastrarEmprestimo />} />
            </Routes>
        </BrowserRouter>
    );
}
