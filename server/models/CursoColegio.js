module.exports = (Sequelize, DataTypes) => {
  const CursoColegio = Sequelize.define(
    "CursoColegio",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "curso_colegio",
    }
  );

  CursoColegio.associate = (models) => {
    CursoColegio.belongsTo(models.Colegios, {
      onDelete: "CASCADE",
      foreignKey: "colegioId",
    });
    CursoColegio.belongsTo(models.Cursos, {
      onDelete: "CASCADE",
      foreignKey: "cursoId",
    });
  };

  return CursoColegio;
};
