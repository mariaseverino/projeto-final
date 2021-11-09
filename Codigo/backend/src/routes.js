const express = require("express");

const routes = express.Router();

const ControllerDiscente = require("./controllers/ControllerDiscente");

const ControllerExemplar = require("./controllers/ControllerExemplar");

const controllerDiscente = new ControllerDiscente();
const controllerExemplar = new ControllerExemplar();

routes
    .post("/discente", controllerDiscente.criar)
    .put("/discente/:id", controllerDiscente.alterar)
    .delete("/discente/:id", controllerDiscente.remover)
    .get("/discentes", controllerDiscente.listar)

    .get("/exemplares", controllerExemplar.listar);

module.exports = routes;
