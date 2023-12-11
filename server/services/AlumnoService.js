const { Alumnos } = require("../models");
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

module.exports = {
  registrarAlum,
  buscarPorDocu,
  updateAlum,
};
