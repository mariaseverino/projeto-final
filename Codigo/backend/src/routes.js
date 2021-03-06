const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const ControllerExemplar = require("./controllers/ControllerExemplar");

const ControllerEmprestimo = require("./controllers/ControllerEmprestimo");

const ControllerAtendente = require("./controllers/ControllerAtendente");

const controllerDiscente = new ControllerDiscente();
const controllerExemplar = new ControllerExemplar();
const controllerEmprestimo = new ControllerEmprestimo();
const controllerAtendente = new ControllerAtendente();

routes
    .post("/registro", controllerAtendente.criar)
    .post("/", controllerAtendente.autenticar)
    .get("/atendentes", controllerAtendente.listar)

    .get("/discentes", controllerDiscente.listar)
    .post("/discente", controllerDiscente.criar)
    .get("/discente/alterar/:id", controllerDiscente.buscarDiscente)
    .put("/discente/alterar/:id", controllerDiscente.alterar)
    .delete("/discente/:id", controllerDiscente.remover)

    .get("/exemplares", controllerExemplar.listar)
    .post("/exemplar", controllerExemplar.criar)
    .get("/exemplar/alterar/:id", controllerExemplar.buscarExemplar)
    .put("/exemplar/alterar/:id", controllerExemplar.alterar)
    .delete("/exemplar/:id", controllerExemplar.remover)

    .get("/emprestimos", controllerEmprestimo.listar)
    .post("/emprestimo/:id", controllerEmprestimo.criar)
    .put("/emprestimo/:id", controllerEmprestimo.renovar)
    .put("/emprestimo/finalizar/:id", controllerEmprestimo.finalizar)
    .delete("/emprestimo/:id/:idAtendente", controllerEmprestimo.remover);

module.exports = routes;
