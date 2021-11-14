import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./view/Login";
import Home from "./view/Home";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
