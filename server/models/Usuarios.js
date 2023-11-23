module.exports = (Sequelize, DataTypes) => {
  const Usuarios = Sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      rol: DataTypes.STRING,
    },
    {
      tableName: "usuarios",
    }
  );

  return Usuarios;
};
