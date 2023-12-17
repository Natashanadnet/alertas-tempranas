module.exports = (Sequelize, DataTypes) => {
  const Materias = Sequelize.define(
    "Materias",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
      descripcion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "materias",
    }
  );

  Materias.associate = (models) => {
    Materias.belongsToMany(models.Usuarios, {
      through: models.UsuarioMateria,
      foreignKey: "materiaId",
      onDelete: "CASCADE",
    });
    Materias.belongsToMany(models.Alumnos, {
      through: models.AlumnoMateria,
      foreignKey: "materiaId",
      onDelete: "CASCADE",
    });
  };

  return Materias;
};
