const bcrypt = require("bcrypt");
const {
  Roles,
  Usuarios,
  Colegios,
  Cursos,
  ColegioPersonal,
  Alumnos,
  Materias,
} = require("../models");

//Para los roles:
const rolesData = [
  { descripcion: "Profesor" },
  { descripcion: "Director" },
  { descripcion: "Exp" },
];

//Para los usuarios:
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

//Para los colegios:
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

//Para las relaciones entre colegios y usuarios
const colegiosUsuariosData = [
  { colegioId: 1, usuarioId: 1 },
  { colegioId: 1, usuarioId: 2 },
  { colegioId: 1, usuarioId: 3 },
  { colegioId: 2, usuarioId: 1 },
  { colegioId: 2, usuarioId: 2 },
  { colegioId: 2, usuarioId: 3 },
];

//Para los cursos:
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

//Para los alumnos:
const alumnosData = [
  {
    nombre: "Carla",
    apellido: "Perez",
    documento: "12345678",
    fechaNac: "2008-08-13",
    email: "carlaperez@correo.com",
    sexo: 1,
    ColegioId: 1,
    CursoId: 4,
  },
  {
    nombre: "Marta",
    apellido: "Garcia",
    documento: "12467627",
    fechaNac: "2009-06-05",
    email: "martaagarcia@correo.com",
    sexo: 1,
    ColegioId: 1,
    CursoId: 2,
  },
  {
    nombre: "Gabriel",
    apellido: "Rodriguez",
    documento: "22071899",
    fechaNac: "2005-01-12",
    email: "gabrielrodriguez@correo.com",
    sexo: 2,
    ColegioId: 1,
    CursoId: 5,
  },
  {
    nombre: "Diego",
    apellido: "Gomez",
    documento: "87639265",
    fechaNac: "2005-07-24",
    email: "diego@diego",
    sexo: 2,
    ColegioId: 1,
    CursoId: 8,
  },
  {
    nombre: "Lucia",
    apellido: "Lopez",
    documento: "19176399",
    fechaNac: "2005-05-23",
    email: "lucialopez@correo.com",
    sexo: 1,
    ColegioId: 1,
    CursoId: 5,
  },
  {
    nombre: "Gabriel",
    apellido: "Fernandez",
    documento: "79100429",
    fechaNac: "2008-05-19",
    email: "gabrielfernandez@correo.com",
    sexo: 2,
    ColegioId: 2,
    CursoId: 1,
  },
  {
    nombre: "Lucas",
    apellido: "Garcia",
    documento: "49476032",
    fechaNac: "2007-11-22",
    email: "lucasgarcia@correo.com",
    sexo: 2,
    ColegioId: 2,
    CursoId: 4,
  },
  {
    nombre: "Juan",
    apellido: "Perez",
    documento: "70130352",
    fechaNac: "2005-11-12",
    email: "juanperez@correo.com",
    sexo: 2,
    ColegioId: 2,
    CursoId: 6,
  },
  {
    nombre: "Lucas",
    apellido: "Perez",
    documento: "34759715",
    fechaNac: "2009-09-25",
    email: "lucasperez@correo.com",
    sexo: 2,
    ColegioId: 2,
    CursoId: 4,
  },
  {
    nombre: "Lucas",
    apellido: "Fernandez",
    documento: "15791937",
    fechaNac: "2007-05-06",
    email: "lucasfernandez@correo.com",
    sexo: 2,
    ColegioId: 2,
    CursoId: 7,
  },
  {
    nombre: "Marta",
    apellido: "Fernandez",
    documento: "70568490",
    fechaNac: "2008-12-11",
    email: "martafernandez@correo.com",
    sexo: 1,
    ColegioId: 2,
    CursoId: 9,
  },
];

//Para las materias:
const materiasData = [
  { codigo: "mate", descripcion: "Matematica" },
  { codigo: "leng", descripcion: "Lengua y Literatura" },
  { codigo: "csoc", descripcion: "Ciencias Sociales" },
  { codigo: "cnat", descripcion: "Ciencias Naturales" },
  { codigo: "guar", descripcion: "Guarani" },
  { codigo: "edart", descripcion: "Artes" },
  { codigo: "comp", descripcion: "Computacion" },
  { codigo: "ingl", descripcion: "Ingles" },
];

//Para las relaciones entre materia, colegio y profesor:

const createInitialRoles = async () => {
  try {
    await Roles.bulkCreate(rolesData);
    await Usuarios.bulkCreate(usersData);
    await Colegios.bulkCreate(colegiosData);
    await Cursos.bulkCreate(cursosData);
    await ColegioPersonal.bulkCreate(colegiosUsuariosData);
    await Alumnos.bulkCreate(alumnosData);
    await Materias.bulkCreate(materiasData);

    console.log(
      "Valores iniciales de Roles, Usuarios, Colegios, Cursos, Alumnos y Materias insertados correctamente."
    );
  } catch (error) {
    console.error(
      "Error al insertar valores iniciales de Roles, Usuarios, Colegios, Cursos, Alumnos y Materias:",
      error
    );
  }
};

createInitialRoles();
