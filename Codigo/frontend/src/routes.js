import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./view/Login";
import Home from "./view/Home";
import ListarDiscentes from "./view/ListarDiscentes";
import ListarExemplares from "./view/ListarExemplares";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/discentes" element={<ListarDiscentes />} />
                <Route path="/exemplares" element={<ListarExemplares />} />
            </Routes>
        </BrowserRouter>
    );
}
