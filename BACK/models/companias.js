const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Companias = sequelize.define(
  "companias",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    tableName: "companias",
    underscored: true,
  }
);

module.exports = Companias;