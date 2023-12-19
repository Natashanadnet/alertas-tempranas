const express = require("express");
const router = express.Router();
const { Materias, UsuarioMateria, AlumnoMateria } = require("../models");
const {
  getListaCompletaMaterias,
  agregarMateriasUsuario,
  getMateriasProfesor,
} = require("../services/MateriaService");

router.get("/listar", getListaCompletaMaterias);

router.get("/listar-profe", getMateriasProfesor);

router.post("/agregar", agregarMateriasUsuario);

module.exports = router;
