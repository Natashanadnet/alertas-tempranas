module.exports = (Sequelize, DataTypes) => {
  const Colegios = Sequelize.define(
    "Colegios",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      codigo: { type: DataTypes.STRING, allowNull: false, unique: true },
      nombre: { type: DataTypes.STRING, allowNull: false },
      telefono: { type: DataTypes.STRING, allowNull: false },
      direccion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "colegios",
    }
  );

  // Definir las asociaciones
  Colegios.associate = (models) => {
    Colegios.belongsToMany(models.Usuarios, {
      through: models.ColegioPersonal,
      foreignKey: "colegioId",
      onDelete: "CASCADE",
    });
    Colegios.hasMany(models.Alumnos, {
      onDelete: "CASCADE",
    });
    Colegios.hasMany(models.UsuarioMateria, {
      onDelete: "CASCADE",
    });
  };

  return Colegios;
};
