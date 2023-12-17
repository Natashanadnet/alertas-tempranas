const { Usuarios, Colegios, ColegioPersonal } = require("../models");
const bcrypt = require("bcrypt");

const crearUsuario = async (req, res) => {
  try {
    const usuario = req.body;

    // se ve si el usuario con ese mail ya existe
    const usuarioExistenteEmail = await Usuarios.findOne({
      where: { email: usuario.email },
    });
    if (usuarioExistenteEmail) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    //se ve si el usuario con ese documento ya existe
    const usuarioExistenteDocu = await Usuarios.findOne({
      where: { documento: usuario.documento },
    });
    if (usuarioExistenteDocu) {
      return res.status(400).json({ error: "El documento ya está en uso" });
    }

    // Si no existe, se crea el usuario
    // Se hashea la contraseña
    const passHasheado = await bcrypt.hash(usuario.password, 10);
    usuario.password = passHasheado;
    const usuarioNuevo = await Usuarios.create(usuario);
    res.json(usuarioNuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuarios.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      // Si no se encuentra un usuario con el correo electrónico proporcionado
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const match = await bcrypt.compare(password, usuario.password);

    if (match) {
      res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", usuario: usuario });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const buscarProfesor = async (req, res) => {
  try {
    const { documento } = req.body;

    const usuario = await Usuarios.findOne({
      where: { documento: documento },
    });

    if (!usuario) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    if (usuario.RoleId !== 1) {
      return res.status(404).json({ error: "El usuario no es profesor" });
    }

    res.json({ usuario: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar el profesor" });
  }
};

const listarProfesoresSegunColegio = async (req, res) => {
  try {
    const colegioId = +req.query.colegioId;

    const profesores = await Usuarios.findAll({
      where: { RoleId: 1 },
      include: [
        {
          model: Colegios,
          through: { model: ColegioPersonal, attributes: [] },
          where: { id: colegioId },
          attributes: [],
        },
      ],
    });

    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar los profesores" });
  }
};

const eliminarUsuarioDeColegio = async (req, res) => {
  try {
    const colegioId = req.query.colegioId;
    const usuarioId = req.query.usuarioId;

    const usuario = await Usuarios.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const colegio = await Colegios.findByPk(colegioId);

    if (!colegio) {
      return res.status(404).json({ error: "Colegio no encontrado" });
    }

    await ColegioPersonal.destroy({
      where: {
        colegioId: colegioId,
        usuarioId: usuarioId,
      },
    });

    res.json({ message: "Profesor eliminado del colegio" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el profesor del colegio" });
  }
};

module.exports = {
  crearUsuario,
  login,
  buscarProfesor,
  listarProfesoresSegunColegio,
  eliminarUsuarioDeColegio,
};
