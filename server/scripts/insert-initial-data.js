const bcrypt = require("bcrypt");
const { Roles } = require("../models");
const { Usuarios } = require("../models");
const { Colegios } = require("../models");
const { Cursos } = require("../models");

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

const colegiosData = [
  {
    codigo: "C1",
    nombre: "Colegio Tecnico San Nicolas",
    telefono: "123456789",
    direccion: "Calle A, Ciudad A",
  },
  {
    codigo: "C2",
    nombre: "Colegio Las Teresas",
    telefono: "987654321",
    direccion: "Calle B, Ciudad B",
  },
  {
    codigo: "C3",
    nombre: "Colegio San Jose",
    telefono: "555555555",
    direccion: "Calle C, Ciudad C",
  },
];

const cursosData = [
  { descripcion: "1º Grado", nivel: "Primaria" },
  { descripcion: "2º Grado", nivel: "Primaria" },
  { descripcion: "3º Grado", nivel: "Primaria" },
  { descripcion: "4º Grado", nivel: "Primaria" },
  { descripcion: "5º Grado", nivel: "Primaria" },
  { descripcion: "6º Grado", nivel: "Primaria" },
  { descripcion: "7º Grado", nivel: "Secundaria" },
  { descripcion: "8º Grado", nivel: "Secundaria" },
  { descripcion: "9º Grado", nivel: "Secundaria" },
  { descripcion: "1º Curso", nivel: "Secundaria" },
  { descripcion: "2º Curso", nivel: "Secundaria" },
  { descripcion: "3º Curso", nivel: "Secundaria" },
];

const createInitialRoles = async () => {
  try {
    await Roles.bulkCreate(rolesData);
    await Usuarios.bulkCreate(usersData);
    await Colegios.bulkCreate(colegiosData);
    await Cursos.bulkCreate(cursosData);

    console.log(
      "Valores iniciales de Roles, Usuarios, Colegios y Cursos insertados correctamente."
    );
  } catch (error) {
    console.error(
      "Error al insertar valores iniciales de Roles, Usuarios, Colegios y Cursos:",
      error
    );
  }
};

createInitialRoles();
