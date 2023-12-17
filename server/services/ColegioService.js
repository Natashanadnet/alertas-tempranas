const { Colegios, Usuarios, ColegioPersonal } = require("../models");

const getColegiosUsuarios = async (req, res) => {
  try {
    const usuarioId = +req.params.usuarioId;
    const usuario = await Usuarios.findByPk(usuarioId, {
      include: [
        {
          model: Colegios,
          through: {
            model: ColegioPersonal,
            attributes: [],
          },
          attributes: ["id", "nombre", "codigo", "telefono", "direccion"],
        },
      ],
    });

    if (!usuario) {
      return res.status(400).json({
        error: "No se encontró al usuario o no tiene colegios asociados.",
      });
    }

    res.json(usuario.Colegios);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al buscar los colegios asociados al usuario." });
  }
};

const crearColegio = async (req, res) => {
  try {
    const usuarioId = +req.params.usuarioId;
    const colegio = req.body;

    const colegioExistente = await Colegios.findOne({
      where: { codigo: colegio.codigo },
    });
    if (colegioExistente) {
      return res
        .status(400)
        .json({ error: "El código del colegio ya está en uso" });
    }

    const colegioNuevo = await Colegios.create(colegio);

    await ColegioPersonal.create({
      colegioId: colegioNuevo.id, // ID del colegio recién creado
      usuarioId: usuarioId, // ID del usuario
    });

    res.json(colegioNuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el colegio" });
  }
};

const asignarColegio = async (req, res) => {
  try {
    const usuarioId = +req.body.usuarioId;
    const colegioId = +req.body.colegioId;

    const colegioExistente = await Colegios.findOne({
      where: { id: colegioId },
    });
    if (!colegioExistente) {
      return res.status(400).json({ error: "El código del colegio no existe" });
    }

    const asignacionExistente = await ColegioPersonal.findOne({
      where: {
        usuarioId: usuarioId,
        colegioId: colegioId,
      },
    });
    if (asignacionExistente) {
      return res
        .status(400)
        .json({ error: "El profesor ya esta asignado a este colegio" });
    }

    await ColegioPersonal.create({
      colegioId: colegioId, // ID del colegio recién creado
      usuarioId: usuarioId, // ID del usuario
    });

    res.json({ message: "Colegio asignado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al asignar el colegio" });
  }
};

module.exports = {
  getColegiosUsuarios,
  crearColegio,
  asignarColegio,
};
