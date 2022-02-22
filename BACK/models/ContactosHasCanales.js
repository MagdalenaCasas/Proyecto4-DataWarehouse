const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Contactos = require("./contactos");
const Canales = require("./canales");

const ContactosHasCanales = sequelize.define(
  "contactos_has_canales",
  {
    interes: {
      type: DataTypes.ENUM(
        '0',
        '25',
        '50',
        '75',
        '100'
      ),
      defaultValue: '0',
      allowNull: false,
    },
    preferencias: {
      type: DataTypes.ENUM(
        'NO MOLESTAR',
        'ACTIVO',
        'EN EL TRABAJO',
        'AUSENTE'
      ),
      defaultValue: 'ACTIVO',
      allowNull: false,
    },
    cuenta: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contacto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "contacto_id",
      references: {
        model: Contactos,
        key: "id",
      },
    },
    canale_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "canale_id",
      references: {
        model: Canales,
        key: "id",
      },
    },
  },
  {
    tableName: "contactos_has_canales",
    underscored: true,
    timestamps: false,
  }
);

module.exports = ContactosHasCanales;
