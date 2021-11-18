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
    .get("/discente/alterar/:id", controllerDiscente.alterar1)
    .put("/discente/alterar/:id", controllerDiscente.alterar2)
    .delete("/discente/:id", controllerDiscente.remover)

    .get("/exemplares", controllerExemplar.listar)
    .post("/exemplar", controllerExemplar.criar)
    .put("/exemplar/:id", controllerExemplar.alterar)
    .delete("/exemplar/:id", controllerExemplar.remover)

    .get("/emprestimos", controllerEmprestimo.listar)
    .post("/emprestimo/:id", controllerEmprestimo.criar)
    .put("/emprestimo/:id", controllerEmprestimo.renovar)
    .put("/emprestimo/finalizar/:id", controllerEmprestimo.finalizar);

module.exports = routes;
