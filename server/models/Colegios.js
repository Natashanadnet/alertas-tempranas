module.exports = (Sequelize, DataTypes) => {
  const Colegios = Sequelize.define(
    "Colegios",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: false },
      direccion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "colegios",
    }
  );

  return Colegios;
};
