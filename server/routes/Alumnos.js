const express = require("express");
const router = express.Router();
const { Alumnos, Cursos } = require("../models");
const {
  registrarAlum,
  buscarPorDocu,
  updateAlum,
} = require("../services/AlumnoService");

router.get("/", async (req, res) => {
  const listOfAlumnos = await Alumnos.findAll();
  res.json(listOfAlumnos);
});

router.get("/cursos", async (req, res) => {
  const listOfCursos = await Cursos.findAll();
  res.json(listOfCursos);
});

router.post("/", (req, res) => {
  registrarAlum(req, res);
});

router.post("/buscar", async (req, res) => {
  buscarPorDocu(req, res);
});

router.put("/modificar", async (req, res) => {
  updateAlum(req, res);
});

module.exports = router;
