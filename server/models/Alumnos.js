module.exports = (Sequelize, DataTypes) => {
  const Alumnos = Sequelize.define(
    "Alumnos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nombre: { type: DataTypes.STRING, allowNull: false },
      apellido: { type: DataTypes.STRING, allowNull: false },
      documento: { type: DataTypes.STRING, allowNull: false, unique: true },
      fechaNac: { type: DataTypes.DATEONLY, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      sexo: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "alumnos",
    }
  );

  Alumnos.associate = (models) => {
    Alumnos.belongsTo(models.Colegios, {
      onDelete: "CASCADE",
    });
    Alumnos.belongsTo(models.Cursos, {
      onDelete: "CASCADE",
    });
  };

  return Alumnos;
};
