const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const ControllerBiblioteca = require("./controllers/ControllerBiblioteca");

const controllerDiscente = new ControllerDiscente();
const controllerBiblioteca = new ControllerBiblioteca();

routes
    .post("/discente", controllerDiscente.cadastrarDiscente)
    .put("/discente/:id", controllerDiscente.alterarDadosDiscente)
    .delete("/discente/:id", controllerDiscente.removerDiscente)
    .get("/discentes", controllerBiblioteca.ListarDiscentes);

module.exports = routes;
