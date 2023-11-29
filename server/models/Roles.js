module.exports = (Sequelize, DataTypes) => {
  const Roles = Sequelize.define(
    "Roles",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descripcion: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "roles",
    }
  );
  Roles.associate = (models) => {
    Roles.hasMany(models.Usuarios);
  };

  return Roles;
};
