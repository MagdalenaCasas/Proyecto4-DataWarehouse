const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Ciudades = sequelize.define(
  "ciudades",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "ciudades",
    underscored: true,
  }
);

module.exports = Ciudades;