module.exports = (Sequelize, DataTypes) => {
  const UsuarioMateria = Sequelize.define(
    "UsuarioMateria",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
    },
    {
      tableName: "usuario_materia",
    }
  );

  UsuarioMateria.associate = (models) => {
    UsuarioMateria.belongsTo(models.Usuarios, {
      onDelete: "CASCADE",
      foreignKey: "usuarioId",
    });
    UsuarioMateria.belongsTo(models.Materias, {
      onDelete: "CASCADE",
      foreignKey: "materiaId",
    });

    UsuarioMateria.belongsTo(models.Colegios, {
      onDelete: "CASCADE",
    });
  };

  return UsuarioMateria;
};
