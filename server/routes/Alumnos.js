const express = require("express");
const router = express.Router();
const { Alumnos, Cursos } = require("../models");
const {
  registrarAlum,
  buscarPorDocu,
  updateAlum,
  listarPorColegio,
  eliminarAlum,
  buscarPorId,
} = require("../services/AlumnoService");

router.get("/", async (req, res) => {
  const listOfAlumnos = await Alumnos.findAll();
  res.json(listOfAlumnos);
});

router.get("/buscar-id", buscarPorId);

router.get("/cursos", async (req, res) => {
  const listOfCursos = await Cursos.findAll();
  res.json(listOfCursos);
});

router.get("/listar", async (req, res) => {
  listarPorColegio(req, res);
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

router.delete("/eliminar/:alumnoId", eliminarAlum);

module.exports = router;
