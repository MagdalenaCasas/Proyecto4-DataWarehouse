const Canales = require("./canales");
const Ciudades = require("./ciudades");
const Companias = require("./companias");
const Contactos = require("./contactos");
const Paises = require("./paises");
const Regiones = require("./regiones");
const Usuarios = require("./usuarios");
const ContactosHasCanales = require("./ContactosHasCanales");


Usuarios.hasMany(Contactos, {
  foreignKey: "usuarios_id",
});


Ciudades.belongsTo(Paises, {
  foreignKey: "paises_id",
});

Paises.belongsTo(Regiones, {
  foreignKey: "regiones_id",
});

Companias.belongsTo(Ciudades, {
  foreignKey: "ciudades_id",
});

Companias.belongsTo(Paises, {
  foreignKey: "paises_id",
});

Companias.belongsTo(Regiones, {
  foreignKey: "regiones_id",
});

Contactos.belongsTo(Ciudades, {
  foreignKey: "ciudades_id",
});
Contactos.belongsTo(Paises, {
  foreignKey: "paises_id",
});
Contactos.belongsTo(Regiones, {
  foreignKey: "regiones_id",
});
Contactos.belongsTo(Companias, {
  foreignKey: "companias_id",
});


// mas importante la que soluciona el dashboard, los favoritos, estado de un pedido de un usuario
// 30%

Contactos.belongsToMany(Canales, {
  through: ContactosHasCanales,
});

module.exports = {
  Paises,
  ContactosHasCanales,
  Ciudades,
  Regiones,
  Companias,
  Canales,
  Contactos,
  Usuarios,
};
