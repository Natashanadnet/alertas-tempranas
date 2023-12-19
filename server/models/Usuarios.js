const UsuarioMateria = require("./UsuarioMateria");

module.exports = (Sequelize, DataTypes) => {
  const Usuarios = Sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      documento: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "usuarios",
    }
  );

  Usuarios.associate = (models) => {
    Usuarios.belongsTo(models.Roles, { onDelete: "CASCADE" });
    Usuarios.belongsToMany(models.Colegios, {
      through: models.ColegioPersonal,
      foreignKey: "usuarioId",
      onDelete: "CASCADE",
    });
    Usuarios.belongsToMany(models.Materias, {
      through: { model: models.UsuarioMateria, unique: false },
      foreignKey: "usuarioId",
    });
  };

  return Usuarios;
};
