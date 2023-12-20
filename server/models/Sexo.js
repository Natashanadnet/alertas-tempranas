module.exports = (Sequelize, DataTypes) => {
  const Sexo = Sequelize.define(
    "Sexo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      descripcion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "sexo",
    }
  );

  Sexo.associate = (models) => {
    Sexo.hasMany(models.Alumnos, {
      onDelete: "CASCADE",
    });
  };

  return Sexo;
};
