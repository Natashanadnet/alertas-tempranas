const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const usuariosRouter = require("./routes/Usuarios");
app.use("/usuarios", usuariosRouter);

const colegiosRouter = require("./routes/Colegios");
app.use("/colegios", colegiosRouter);

const alumnosRouter = require("./routes/Alumnos");
app.use("/alumnos", alumnosRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("server running on port 3001");
  });
});
