const express = require("express");
const router = express.Router();
const { Usuarios } = require("../models");

router.get("/", async (req, res) => {
  const listOfUsers = await Usuarios.findAll();
  res.json(listOfUsers);
});

router.post("/", async (req, res) => {
  const user = req.body;
  await Usuarios.create(user);
  res.json(user);
});

module.exports = router;
