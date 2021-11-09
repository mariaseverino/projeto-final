const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const controllerDiscente = new ControllerDiscente();

routes
    .post("/discente", controllerDiscente.criar)
    .put("/discente/:id", controllerDiscente.alterar)
    .delete("/discente/:id", controllerDiscente.remover)
    .get("/discentes", controllerDiscente.listar);

module.exports = routes;
