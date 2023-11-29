const { Usuarios } = require("../models");
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

module.exports = {
  crearUsuario,
  login,
};
