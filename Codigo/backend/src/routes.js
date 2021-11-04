const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const controllerDiscente = new ControllerDiscente();

routes
    .post("/discente", controllerDiscente.cadastrarDiscente)
    .put("/discente/:id", controllerDiscente.alterarDadosDiscente);

module.exports = routes;
