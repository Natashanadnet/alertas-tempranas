const express = require("express");
const router = express.Router();
const { Usuarios } = require("../models");
const { crearUsuario, login } = require("../services/UsuarioService");

router.get("/", async (req, res) => {
  const listOfUsers = await Usuarios.findAll();
  res.json(listOfUsers);
});

router.post("/", (req, res) => {
  crearUsuario(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
});

module.exports = router;
