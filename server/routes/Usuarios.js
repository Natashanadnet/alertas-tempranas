const express = require("express");
const router = express.Router();
const { Usuarios } = require("../models");
const {
  crearUsuario,
  login,
  buscarProfesor,
  listarProfesoresSegunColegio,
  eliminarUsuarioDeColegio,
} = require("../services/UsuarioService");

router.get("/", async (req, res) => {
  const listOfUsers = await Usuarios.findAll();
  res.json(listOfUsers);
});

router.get("/listar", async (req, res) => {
  listarProfesoresSegunColegio(req, res);
});

router.post("/", (req, res) => {
  crearUsuario(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
});

router.post("/buscar", async (req, res) => {
  buscarProfesor(req, res);
});

router.delete("/eliminar-cole", eliminarUsuarioDeColegio);

module.exports = router;
