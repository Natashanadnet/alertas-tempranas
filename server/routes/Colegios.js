const express = require("express");
const router = express.Router();
const { Colegios } = require("../models");
const {
  getColegiosUsuarios,
  crearColegio,
  asignarColegio,
} = require("../services/ColegioService");

router.get("/", async (req, res) => {
  const listOfColegios = await Colegios.findAll();
  res.json(listOfColegios);
});

router.get("/:usuarioId", getColegiosUsuarios);

router.post("/asignar", asignarColegio);

router.post("/:usuarioId", crearColegio);

module.exports = router;
