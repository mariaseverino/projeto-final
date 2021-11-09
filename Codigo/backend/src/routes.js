const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const ControllerExemplar = require("./controllers/ControllerExemplar");

const controllerDiscente = new ControllerDiscente();
const controllerExemplar = new ControllerExemplar();

routes
    .get("/discentes", controllerDiscente.listar)
    .post("/discente", controllerDiscente.criar)
    .put("/discente/:id", controllerDiscente.alterar)
    .delete("/discente/:id", controllerDiscente.remover)

    .get("/exemplares", controllerExemplar.listar)
    .post("/exemplar", controllerExemplar.criar);

module.exports = routes;
