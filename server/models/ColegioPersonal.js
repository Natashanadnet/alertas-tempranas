module.exports = (Sequelize, DataTypes) => {
  const ColegioPersonal = Sequelize.define(
    "ColegioPersonal",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "colegio_personal",
    }
  );

  // Definir las asociaciones
  ColegioPersonal.associate = (models) => {
    ColegioPersonal.belongsTo(models.Colegios, {
      onDelete: "CASCADE",
      foreignKey: "colegioId",
    });

    ColegioPersonal.belongsTo(models.Usuarios, {
      onDelete: "CASCADE",
      foreignKey: "usuarioId",
    });
  };

  return ColegioPersonal;
};
