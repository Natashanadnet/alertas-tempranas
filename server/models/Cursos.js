module.exports = (Sequelize, DataTypes) => {
  const Cursos = Sequelize.define(
    "Cursos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      descripcion: { type: DataTypes.STRING, allowNull: false },
      nivel: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "cursos",
    }
  );

  Cursos.associate = (models) => {
    Cursos.belongsToMany(models.Colegios, {
      through: models.CursoColegio,
      foreignKey: "cursoId",
      onDelete: "CASCADE",
    });
    Cursos.hasMany(models.Alumnos, {
      onDelete: "CASCADE",
    });
  };

  return Cursos;
};
