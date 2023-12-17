module.exports = (Sequelize, DataTypes) => {
  const Secciones = Sequelize.define(
    "Secciones",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "secciones",
    }
  );

  // Definir las asociaciones
  Secciones.associate = (models) => {
    Secciones.hasMany(models.Alumnos, {
      onDelete: "CASCADE",
    });

    Secciones.belongsTo(models.Cursos, {
      onDelete: "CASCADE",
    });
  };

  return Secciones;
};
