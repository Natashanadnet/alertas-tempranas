module.exports = (Sequelize, DataTypes) => {
  const UsuarioMateria = Sequelize.define(
    "UsuarioMateria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      tableName: "usuario_materia",
    }
  );

  // Definir las asociaciones
  UsuarioMateria.associate = (models) => {
    UsuarioMateria.belongsTo(models.Usuarios, {
      onDelete: "CASCADE",
      foreignKey: "usuarioId",
    });

    UsuarioMateria.belongsTo(models.Materias, {
      onDelete: "CASCADE",
      foreignKey: "materiaId",
    });
  };

  return UsuarioMateria;
};
