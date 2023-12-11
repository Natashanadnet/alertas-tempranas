const { Alumnos } = require("../models");

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

module.exports = {
  registrarAlum,
};
