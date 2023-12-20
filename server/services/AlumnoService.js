const {
  Alumnos,
  Cursos,
  Materias,
  AlumnoMateria,
  Comportamiento,
  UsuarioMateria,
} = require("../models");
const { Op } = require("sequelize");

const registrarAlum = async (req, res) => {
  try {
    const alumno = req.body;

    // se ve si el alumno con ese mail ya existe
    const alumnoExistenteEmail = await Alumnos.findOne({
      where: { email: alumno.email },
    });
    if (alumnoExistenteEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    //se ve si el usuario con ese documento ya existe
    const alumnoExistenteDocu = await Alumnos.findOne({
      where: { documento: alumno.documento },
    });
    if (alumnoExistenteDocu) {
      return res.status(400).json({ error: "El documento ya está en uso" });
    }

    const alumnoNuevo = await Alumnos.create(alumno);
    res.json(alumnoNuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear al alumno" });
  }
};

const buscarPorDocu = async (req, res) => {
  try {
    const { documento } = req.body;

    // se ve si el alumno con ese mail ya existe
    const alumnoExistentedocu = await Alumnos.findOne({
      where: { documento: documento },
    });
    if (!alumnoExistentedocu) {
      return res
        .status(400)
        .json({ error: "No se encontro ningun alumno con ese documento." });
    }
    res.json({ alumno: alumnoExistentedocu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar al alumno" });
  }
};

const updateAlum = async (req, res) => {
  try {
    const alumno = req.body;
    const alumnoId = alumno.id;

    const alumnoExistenteEmail = await Alumnos.findOne({
      where: {
        email: alumno.email,
        id: { [Op.not]: alumnoId }, // Excluye al alumno con el ID actual
      },
    });
    if (alumnoExistenteEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    const alumnoExistenteDocu = await Alumnos.findOne({
      where: {
        documento: alumno.documento,
        id: { [Op.not]: alumnoId }, // Excluye al alumno con el ID actual
      },
    });
    if (alumnoExistenteDocu) {
      return res.status(400).json({ error: "El documento ya está en uso" });
    }

    // Actualiza los datos del alumno
    const [, [alumnoActualizado]] = await Alumnos.update(alumno, {
      where: { id: alumnoId },
      returning: true, // Devuelve el registro actualizado
    });

    res.json(alumnoActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar al alumno" });
  }
};

const listarPorColegio = async (req, res) => {
  try {
    const colegioId = req.query.colegioId;

    const colegioIdNumerico = parseInt(colegioId, 10);

    if (isNaN(colegioIdNumerico)) {
      return res.status(400).json({ error: "colegioId debe ser un número" });
    }

    const lista = await Alumnos.findAll({
      where: { ColegioId: colegioIdNumerico },
      include: [
        {
          model: Cursos,
          attributes: ["descripcion"],
        },
      ],
    });

    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar los alumnos" });
  }
};

const eliminarAlum = async (req, res) => {
  try {
    const { alumnoId } = req.params;

    const alumno = await Alumnos.findByPk(alumnoId);
    if (!alumno) {
      return res.status(404).json({ error: "No se encontró al alumno" });
    }

    await alumno.destroy();

    res.json({ message: "Alumno eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar al alumno" });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const alumnoId = req.query.alumnoId;

    const alumno = await Alumnos.findByPk(alumnoId);
    if (!alumno) {
      return res.status(404).json({ error: "No se encontró al alumno" });
    }

    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar al alumno" });
  }
};

const buscarPorIdConCurso = async (req, res) => {
  try {
    const alumnoId = req.query.alumnoId;

    const alumno = await Alumnos.findOne({
      where: { id: alumnoId },
      include: [
        {
          model: Cursos,
          attributes: ["descripcion"],
        },
      ],
    });

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    res.json(alumno);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar al alumno" });
  }
};

const vincularMateriaAlum = async (req, res) => {
  try {
    const datos = req.body;
    const materiaId = req.body.materiaId;
    const alumnoId = req.body.alumnoId;

    const materiaExistente = await Materias.findOne({
      where: { id: materiaId },
    });
    if (!materiaExistente) {
      return res.status(400).json({ error: "Esa materia no existe" });
    }

    const asignacionExistente = await AlumnoMateria.findOne({
      where: {
        alumnoId: alumnoId,
        materiaId: materiaId,
      },
    });
    if (asignacionExistente) {
      return res
        .status(400)
        .json({ error: "El alumno ya posee registros en esa materia" });
    }

    await AlumnoMateria.create(datos);

    res.json({ message: "Indicadores cargados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al cargar los indicadores" });
  }
};

const listarPorMateria = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    const { colegioId: ColegioId } = req.query;
    const { materiaId } = req.query;

    const lista = await AlumnoMateria.findAll({
      where: { materiaId: materiaId },
      include: [
        {
          model: Alumnos,
          attributes: ["id", "nombre", "apellido"],
          where: { ColegioId: ColegioId },
          include: [
            {
              model: Cursos,
              attributes: ["descripcion"],
            },
          ],
        },
        {
          model: Comportamiento,
          as: "Comportamiento",
          attributes: ["descripcion"],
        },
      ],
    });

    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar los reportes" });
  }
};

module.exports = {
  registrarAlum,
  buscarPorDocu,
  updateAlum,
  listarPorColegio,
  eliminarAlum,
  buscarPorId,
  buscarPorIdConCurso,
  vincularMateriaAlum,
  listarPorMateria,
};
