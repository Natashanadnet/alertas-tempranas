const express = require("express");
const app = express();
app.use(express.json());

const db = require("./models");

//Routers
const usuariosRouter = require("./routes/Usuarios");
app.use("/usuarios", usuariosRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
