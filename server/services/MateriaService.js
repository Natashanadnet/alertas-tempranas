const { Materias, UsuarioMateria, AlumnoMateria } = require("../models");
const { Op } = require("sequelize");

const getListaCompletaMaterias = async (req, res) => {
  try {
    const lista = await Materias.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar las materias." });
  }
};

const agregarMateriasUsuario = async (req, res) => {
  try {
    const asignaciones = req.body; // Array de { usuarioId, colegioId, materiaId }

    for (const asignacion of asignaciones) {
      // Verificar si el profesor ya tiene dos materias asignadas
      const cantidadMateriasAsignadas = await UsuarioMateria.count({
        where: {
          usuarioId: asignacion.usuarioId,
          ColegioId: asignacion.ColegioId,
        },
      });

      if (cantidadMateriasAsignadas >= 2) {
        return res.status(400).json({
          error: `El profesor ya cuenta con el limite de dos materias asignadas`,
        });
      }

      // Verificar si ya existe un profesor asignado a esa materia en ese colegio
      const asignacionExistente = await UsuarioMateria.findOne({
        where: {
          ColegioId: asignacion.ColegioId,
          materiaId: asignacion.materiaId,
          usuarioId: {
            [Op.ne]: asignacion.usuarioId,
          },
        },
      });

      if (asignacionExistente) {
        return res.status(400).json({
          error: `Otro profesor en el colegio ya se encuentra enseñando esa materia`,
        });
      }

      // Verificar si el profesor ya tiene asignada la materia
      const materiaYaAsignada = await UsuarioMateria.findOne({
        where: {
          usuarioId: asignacion.usuarioId,
          materiaId: asignacion.materiaId,
          ColegioId: asignacion.ColegioId,
        },
      });

      if (materiaYaAsignada) {
        return res.status(400).json({
          error: `La materia ya se encuentra asignada al profesor`,
        });
      }

      // Crear la asignación
      await UsuarioMateria.create(asignacion);
    }

    res.status(200).json({ message: "Materias asignadas correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al asignar las materias" });
  }
};

const getMateriasProfesor = async (req, res) => {
  try {
    const { usuarioId } = req.query;
    const { colegioId: ColegioId } = req.query;

    const materias = await UsuarioMateria.findAll({
      where: {
        usuarioId: usuarioId,
        ColegioId: ColegioId,
      },
      include: [
        {
          model: Materias,
          attributes: ["descripcion"],
        },
      ],
    });

    res.json(materias);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener las materias del profesor" });
  }
};

module.exports = {
  getListaCompletaMaterias,
  agregarMateriasUsuario,
  getMateriasProfesor,
};
