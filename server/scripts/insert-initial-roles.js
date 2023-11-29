const bcrypt = require("bcrypt");
const { Roles } = require("../models");
const { Usuarios } = require("../models");

const rolesData = [
  { descripcion: "Profesor" },
  { descripcion: "Director" },
  { descripcion: "Exp" },
];

const usersData = [
  {
    nombre: "Profesor",
    apellido: "Usuario",
    email: "profe@ejemplo.com",
    documento: "123456789",
    password: bcrypt.hashSync("profe", 10),
    RoleId: 1, // Profesor
  },
  {
    nombre: "Director",
    apellido: "Usuario",
    email: "dire@ejemplo.com",
    documento: "987654321",
    password: bcrypt.hashSync("dire", 10),
    RoleId: 2, // Director
  },
  {
    nombre: "Exp",
    apellido: "Exp",
    email: "exp@ejemplo.com",
    documento: "456789123",
    password: bcrypt.hashSync("exp", 10),
    RoleId: 3, // Exp
  },
];

const createInitialRoles = async () => {
  try {
    await Roles.bulkCreate(rolesData);
    await Usuarios.bulkCreate(usersData);

    console.log(
      "Valores iniciales de Roles y Usuarios insertados correctamente."
    );
  } catch (error) {
    console.error(
      "Error al insertar valores iniciales de Roles y Usuarios:",
      error
    );
  }
};

createInitialRoles();
