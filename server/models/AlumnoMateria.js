module.exports = (Sequelize, DataTypes) => {
  const AlumnoMateria = Sequelize.define(
    "AlumnoMateria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nota: { type: DataTypes.INTEGER, allowNull: true },
      comportamiento: { type: DataTypes.STRING, allowNull: true },
      asistencia: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      tableName: "alumno_materia",
    }
  );

  // Definir las asociaciones
  AlumnoMateria.associate = (models) => {
    AlumnoMateria.belongsTo(models.Alumnos, {
      onDelete: "CASCADE",
      foreignKey: "alumnoId",
    });

    AlumnoMateria.belongsTo(models.Materias, {
      onDelete: "CASCADE",
      foreignKey: "materiaId",
    });
  };

  return AlumnoMateria;
};
