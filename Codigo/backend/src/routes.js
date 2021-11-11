const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const ControllerExemplar = require("./controllers/ControllerExemplar");

const ControllerEmprestimo = require("./controllers/ControllerEmprestimo");

const controllerDiscente = new ControllerDiscente();
const controllerExemplar = new ControllerExemplar();
const controllerEmprestimo = new ControllerEmprestimo();

routes
    .get("/discentes", controllerDiscente.listar)
    .post("/discente", controllerDiscente.criar)
    .put("/discente/:id", controllerDiscente.alterar)
    .delete("/discente/:id", controllerDiscente.remover)

    .get("/exemplares", controllerExemplar.listar)
    .post("/exemplar", controllerExemplar.criar)
    .put("/exemplar/:id", controllerExemplar.alterar)
    .delete("/exemplar/:id", controllerExemplar.remover)

    .get("/emprestimos", controllerEmprestimo.listar)
    .post("/emprestimo/:id", controllerEmprestimo.criar)
    .put("/emprestimo/:id", controllerEmprestimo.renovar);

module.exports = routes;
