module.exports = (Sequelize, DataTypes) => {
  const Comportamiento = Sequelize.define(
    "Comportamiento",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      descripcion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "comportamiento",
    }
  );

  Comportamiento.associate = (models) => {
    Comportamiento.hasMany(models.AlumnoMateria, {
      onDelete: "CASCADE",
      foreignKey: "comportamientoId",
    });
  };

  return Comportamiento;
};
