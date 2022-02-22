const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Contactos = sequelize.define(
  "contactos",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "contactos",
    underscored: true,
  }
);

module.exports = Contactos;