const express = require("express");
const router = express.Router();
const { Colegios } = require("../models");
// const { crearUsuario, login } = require("../services/UsuarioService");

router.get("/", async (req, res) => {
  const listOfColegios = await Colegios.findAll();
  res.json(listOfColegios);
});

module.exports = router;
