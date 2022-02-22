//importar librerías
const compression = require("compression");
const express = require("express");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const expressJwt = require("express-jwt");
const cors = require("cors");

//puerto del servidor
const PORT = process.env.SERVER_PORT;

//importar modelos
const {
  Paises,
  ContactosHasCanales,
  Ciudades,
  Regiones,
  Companias,
  Canales,
  Contactos,
  Usuarios,
} = require("./models/index");

//JWT secret
const JWT_SECRET = process.env.JWT_SECRET;

//crear instancia del server en express
const server = express();

//política de límite de peticiones
const limiter = rateLimit({
  windowMS: 120 * 1000,
  max: 10000000,
  message: "Excediste el número de peticiones. Intenta más tarde.",
});

//logger
const logger = (req, res, next) => {
  const path = req.path;
  const method = req.method;
  const body = req.body;

  process.nextTick(() => {
    console.log(`
        Método: ${method}
        Ruta: ${path}
        Body: ${JSON.stringify(body)}
        Params: ${JSON.stringify(req.params)}
        `);
  });

  next();
};

//middlewares globales
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(helmet());
server.use(limiter);
server.use(logger);

server.use(
  expressJwt({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: ["/login",],
  })
);

// .---- VERIFICAR ADMIN----------
const verifyAdminMiddleware = async (req, res, next) =>{
  const posibleUser = await Usuarios.findOne({
    where:{
      correo: req.user.correo,
    }
  });
  if(!posibleUser.esAdmin){
    res.status(403);
    res.json({ error: `Sin permisos de administrador` });
  }
  next();
}



// VERIFICAR EL BODY DE USUARIO O NUEVO REGISTRO------
/*const verifyUserBodyMiddleware = (req, res, next) =>{ 
  const {nombre, apellido, correo, perfil, contrasena} = req.body;
  if(!nombre || !apellido|| !correo || !perfil||!contrasena){
    res.status(400);
    res.json({ error: `Algun campo está vacío` });
  }
  next();
};*/

const verifyUserBodyContacto = (req, res, next) =>{ 
  const {nombre, apellido, cargo,correo,imagen,ciudades_id, companias_id, usuarios_id} = req.body;
  try{
    if(!nombre || !apellido || !cargo|| !correo || !ciudades_id||!companias_id|| !usuarios_id){
      res.status(400);
      res.json({ error: `Algun campo está vacío` });
    }
    next();
  }catch(error){
    res.status(400).json({error: error.message})
  }

};


// ------ VERIFICAR USUARIO---------------
const verifyUserExistsMiddleware = async (req, res, next) =>{ 
  const posibleUser = await Usuarios.findOne({
    where:{
      correo: req.body.correo,
    }
  });
  if(posibleUser != null){
    res.status(406);
    res.json({ error: `El usuario ya existe en la base` });
  }
  next();
};

const verifyContactExistsMiddleware = async (req, res, next) =>{ 
  const posibleContacto = {
    correo,
    ciudades_id
} = req.body;

const contactoInDb = await Contactos.findOne({
    where:{correo: correo}
})

const ciudadInDb = await Ciudades.findOne({
    where: {id: posibleContacto.ciudades_id}
})

if(contactoInDb){
    if(contactoInDb.correo == posibleContacto.correo){
        res.status(401);
        res.json({error: "El correo ingresado no se encuentra disponible"})
    }
    else{
        next()
    }
}else if(!ciudadInDb){
    res.status(401);
        res.json({error: "No existe la ciudad especificada"})
}else{
    next()
}
  
};




const regionValidation = async (req, res, next) => {
  const posibleRegion = {
      nombre
  } = req.body;
  
  const regionInDb = await Regiones.findOne({
      attributes: ["nombre"],
      $or: [{nombre: posibleRegion.nombre}]
  })
  if(regionInDb){
      if(regionInDb.nombre == posibleRegion.nombre){
          res.status(401);
          res.json({error: "El nombre de la región ingresada no se encuentra disponible"})
      }else{
          next()
      }
  }else{
      next()
  }
}

const paisValidation = async (req, res, next) => {
  const posiblePais = {
      nombre,
      regiones_id
  } = req.body;
  
  const paisInDb = await Paises.findOne({
      attributes: ["nombre"],
      $or: [{nombre: posiblePais.nombre}]
  })

  const regionInDb = await Regiones.findOne({
      where: {id: posiblePais.regiones_id}
  })

  if(paisInDb || regionInDb == null){
      if(paisInDb.nombre == posiblePais.nombre){
          res.status(401);
          res.json({error: "El nombre del pais ingresado no se encuentra disponible"})
      }else if(regionInDb == null){
          res.status(401);
          res.json({error: "No existe la región especificada"})
      }
      else{
          next()
      }
  }else{
      next()
  }
}

const ciudadValidation = async (req, res, next) => {
  const posibleCiudad = {
      nombre,
      paises_id
  } = req.body;
  
  const ciudadInDb = await Ciudades.findOne({
      where:{nombre: posibleCiudad.nombre}
  })

  const paisInDb = await Paises.findOne({
      where: {id: posibleCiudad.paises_id}
  })

  if(ciudadInDb){
      if(ciudadInDb.nombre == posibleCiudad.nombre){
          res.status(401);
          res.json({error: "El nombre de la ciudad ya existe"})
      }else{
          next()
      }
  }else if(!paisInDb){
      res.status(401);
      res.json({error: "No existe el pais especificado"})
  }else{
      next()
  }
}

//------------------------------------------------------------------------------------ENDPINTS-------------------------------------------



// NUEVO USUARIO
server.post("/registrar",  verifyUserExistsMiddleware, async (req, res)=>{
  
  const {nombre,apellido, correo, perfil,esAdmin,contrasena} = req.body;
  try {
    await Usuarios.create({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        perfil: perfil,
        esAdmin: esAdmin,
        contrasena: contrasena,
    });
  
    res.status(201).json(`nuevo usuario creado.`);
    
  } catch (error) {
    res.status(400).json(error.message);
  }
})


// OBTENER TODOS LOS USUARIOS

server.get("/usuarios", verifyAdminMiddleware, async(req,res)=>{
  try{
    const arrayUsuarios = await Usuarios.findAll()
    const usuarios = await arrayUsuarios.map((user)=>{
      return{
        usuario:{
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          perfil: user.perfil,
          esAdmin: user.esAdmin,
          correo: user.correo,
          contrasena: user.contrasena
        }
      }
    })
    res.status(200).json(usuarios)
  } catch(error){
    res.status(400).json(error.message)
  }
})

// MODIFICAR UN USUARIO
server.put("/usuarios/:id", verifyAdminMiddleware, async(req,res)=>{
  let idUsuario = req.params.id;
  const {nombre,apellido, correo, perfil,esAdmin,contrasena} = req.body;
  try {
      await Usuarios.update({nombre,apellido, correo, perfil,esAdmin,contrasena}, {where:{id: idUsuario}});
      const usuario = await Usuarios.findOne({where: {id: idUsuario}});

      if(usuario !== null){
          res.status(200).json(usuario)
      }else{
          throw new Error(`No existe una usuario con id ${idUsuario}`)
      }

  }catch (error) {
      res.status(400).json({error: error.message})
  }
})


//ELIMINAR UN USUARIO
server.delete("/usuarios/:id",verifyAdminMiddleware, async (req,res) =>{
  const idUsuario = req.params.id;
  
  const posibleUsuario= await Usuarios.findOne({
      where: {
          id:idUsuario,
      }
  })

  if(!posibleUsuario){
      res.status(404).json({
          error: `No existe un usuario con id ${idUsuario}`
      });
  }else{  
      await Usuarios.destroy({
          where: {
            id:idUsuario,
          }
      }); 
  } 

  res.status(200).json("El Usuario fue eliminado");
});



// LOGIN
server.post("/login",async (req,res)=>{
  const {correo, contrasena} = req.body;

  try{
      const posibleUsuario = await Usuarios.findOne({
          where: {
              correo,
              contrasena,
          },
      })

      if(posibleUsuario){
          const token = jwt.sign({
              //firmo solo con id, nombre y correo
              id: posibleUsuario.id,
              correo: posibleUsuario.correo,
              nombre: posibleUsuario.nombre,
              esAdmin: posibleUsuario.esAdmin,

          },JWT_SECRET, 
          {expiresIn: "120m"}
          );
          res.status(200).json({"token":token, "admin":posibleUsuario.esAdmin, "id":posibleUsuario.id});
      }else{
          res.status(401).json({
              error: "Correo y/o contraseña invalido"
          });
      }
  }catch (error) {
      console.log(error);
      res.status(500).json({
          error: "Error, intente nuevamente mas tarde...",
      });
  }

});


//NUEVO CONTACTO
server.post("/contactos/", async (req, res)=>{
  const {nombre, apellido, correo, cargo, imagen, direccion, ciudades_id, companias_id} = req.body;
  const canales = req.body.canales
  const usuarios_id = req.user.id
  
  try {
      const ciudad = await Ciudades.findOne({where:{id: ciudades_id }})
      const pais = await Paises.findOne({where:{id: ciudad.paises_id }})
      const region = await Regiones.findOne({where:{id: pais.regiones_id }})
      const nuevoContacto = await Contactos.create({
          nombre,
          apellido,
          correo,
          cargo,
          imagen,
          ciudades_id,
          direccion,
          paises_id: pais.id,
          regiones_id: region.id,
          companias_id,
          usuarios_id
      })
      await Promise.all(canales.map(async (canal)=>{
  
          await ContactosHasCanales.create({
              contacto_id: nuevoContacto.id,
              canale_id: canal.canale_id,
              cuenta: canal.cuenta,
              preferencias: canal.preferencias,
              interes: canal.interes
          },{
              fields: ["contacto_id","canale_id","cuenta", "preferencias","interes"]
          });
      }));

      res.status(200).json("Contacto creado con éxito")
  } catch (error) {
      res.status(400).json({error: error.message})
  }
});


//AGREGAR CANALES
/*
server.put("/contactos/:id", async (req, res)=>{
  const idParam = req.params.id;
  const canales = req.body.canales
  const usuarios_id = req.user.id

  
  try {
      const contacto = await Contactos.findOne({where:{id: idParam }})
      await Promise.all(canales.map(async (canal)=>{
  
          await ContactosHasCanales.create({
              contacto_id: idParam,
              canale_id: canal.canale_id,
              cuenta: canal.cuenta,
              preferencias: canal.preferencias,
              interes: canal.interes
          },{
              fields: ["contacto_id","canale_id","cuenta", "preferencias","interes"]
          });
      }));

      res.status(200).json("canal agregado con exito")
  } catch (error) {
      res.status(400).json({error: error.message})
  }
});*/


// ELIMINAR UN CONTACTO
server.delete("/contactos/:id", async (req,res) =>{
  const idParam = req.params.id;
  
  const posibleContacto = await Contactos.findOne({
      where: {
          id:idParam,
      }
  })

  if(!posibleContacto){
      res.status(404).json({
          error: `No existe contacto con id ${idParam}`
      });
  }else{  

      await ContactosHasCanales.destroy({
          where: {
              contacto_id: idParam,
          }
      });

     await Contactos.destroy({
          where: {
              id: idParam,
          }
      }); 
  } 

  res.status(204);
  res.json(`El Contacto con id ${idParam} fue eliminado`);
});




// MODIFICAR CONTACTO
/*
server.put("/contactos/:id", async(req,res)=>{
  const idContacto = req.params.id;
  const {nombre, apellido, cargo,correo,direccion,imagen,ciudades_id, companias_id,} = req.body;
  const canales = req.body.canales
  try {
      
      
    await Contactos.update({
      nombre,
      apellido,
      cargo,
      correo,
      direccion,
      imagen,
      ciudades_id,
      companias_id,
      
      },
      {where:{id: idContacto}});
  
      if(ciudades_id){
          const ciudad = await Ciudades.findOne({where:{id: ciudades_id }})
          const pais = await Paises.findOne({where:{id: ciudad.paises_id }})
          const region = await Regiones.findOne({where:{id: pais.regiones_id }})

          await Contactos.update({
          regiones_id: region.id,
          paises_id: pais.id
          },
          {where:{id: idContacto}});
      }
       await ContactosHasCanales.destroy({
              where:{contacto_id: idContacto} })


      for(let i=0; i<req.body.canales.length; i++){ 

        const {interes, preferencias, canale_id,cuenta} = req.body.canales[i];
        await ContactosHasCanales.create({preferencias, interes,cuenta, canale_id}, {where:{contacto_id: idContacto}});
           
      }
      
      const contacto = await Contactos.findOne({where: {id: idContacto}, include:{model:Canales}});
     

      if(contacto){
          res.status(200).json(contacto)
      }else{
          throw new Error("no existe contacto con ese id")
      }
      
  } catch (error) {
      res.status(400).json({error: error.message})
  }
})*/


// MODIFICAR CONTACTOS

//MODIFICAR CONTACTO-----------------------PROBAR ENDPOINTS
server.put("/contactos/:id", async(req,res)=>{
  let idContacto = req.params.id;
  const {
      nombre,
      apellido,
      cargo,
      correo,
      imagen,
      direccion,
      ciudades_id,
      companias_id,
  } = req.body;

  try {
      
      
  await Contactos.update({
      nombre,
      apellido,
      cargo,
      correo,
      imagen,
      direccion,
      ciudades_id,
      companias_id,
      },
      {where:{id: idContacto}});

      if(ciudades_id){
          const ciudad = await Ciudades.findOne({where:{id: ciudades_id }})
          const pais = await Paises.findOne({where:{id: ciudad.paises_id }})
          const region = await Regiones.findOne({where:{id: pais.regiones_id }})

          await Contactos.update({
          regiones_id: region.id,
          paises_id: pais.id
          },
          {where:{id: idContacto}});
      }
      const contacto = await Contactos.findOne({
          where: {id: idContacto},
          include:{model:Canales}
      });

      if(contacto){
          res.status(200).json(contacto)
      }else{
          throw new Error("No existe contacto con ese id")
      }

  } catch (error) {
      res.status(400).json({error: error.message})
  }
})

//MODIFICAR CONTACTOS HAS CANALES (INTERES, CANALES, PREFERENCIAS)
server.put("/contactosHasCanales/:idContacto", async(req,res)=>{
      const idContacto = req.params.idContacto
      const canales = req.body.canales
      try {
          await ContactosHasCanales.destroy({
              where:{contacto_id: idContacto}
          })

          await Promise.all(canales.map(async (canal)=>{
  
              await ContactosHasCanales.create({
                  contacto_id: idContacto,
                  canale_id: canal.canale_id,
                  cuenta: canal.cuenta,
                  preferencias: canal.preferencias,
                  interes: canal.interes
              },{
                  fields: ["contacto_id","canale_id","cuenta", "preferencias","interes"]
              });
          }));

          const contacto = await Contactos.findOne({
                  where:{id: idContacto},
                  include:{model:Canales}
          })
      
      res.status(200).json(contacto)

    } catch (error) {
      res.status(400).json(error.message)
    }
})







// LISTAR TODOS LOS CONTACTOS
server.get("/contactos", async(req,res)=>{
  try{
    const arrayContactos = await Contactos.findAll({
      include:[
        {model: Canales, attributes: ["id","nombre"]},
        {model: Ciudades, attributes: ["nombre"]},
        {model: Companias, attributes: ["nombre"]},
        {model: Paises, attributes: ["nombre"]},
        {model: Regiones, attributes: ["nombre"]}
      ], where:{usuarios_id: req.user.id}
    })

    res.status(200).json(arrayContactos)
  } catch(error){
    res.status(400).json(error.message)
  }
})



// MODIFICAR ESTADO-INTERESES-CANALES X CONTACTO
server.post("/contactosHasCanales/:id", async(req,res)=>{
  const idContacto = req.params.id;
 try {
      console.log(req.body.canales)

    await Promise.all(async ()=>{
     
      for(let i=0; i<req.body.canales.length; i++){ 
  
     const {interes, preferencias, canale_id,cuenta} = req.body.canales[i];
     await ContactosHasCanales.create({preferencias, interes,cuenta, canale_id, contacto_id: idContacto},{
      fields: ["contacto_id","canale_id","cuenta", "preferencias","interes"]
     });}    
   }).then(res.json("se creo"))

  
} catch (error) {
      res.status(400).json({error: error.message})
  }
})



// AGREGAR UNA NUEVA REGION
server.post("/regiones", regionValidation, async (req,res) =>{
  try{const {nombre,} = req.body;
  const nuevaRegion = await Regiones.create({
      nombre, 
  });

  res.status(201).json(nuevaRegion);}
  catch(error){
   res.status(400).json({error:error.message});
  }
});


// MODIFICAR UNA REGION
server.put("/regiones/:id", async(req,res)=>{
  idRegion = req.params.id;
  const {nombre} = req.body;
  try {
      await Regiones.update({nombre}, {where:{id: idRegion}});
      const region = await Regiones.findOne({where: {id: idRegion}});
      res.status(200).json(region)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
})



// ELIMINAR UNA REGION
//ELIMINAR REGION
server.delete("/regiones/:id", async (req,res) =>{
  const idRegion = req.params.id;
  
  try {
      const posibleRegion = await Regiones.findOne({
          where: {
              id:idRegion,
          }
      })
  
      if(!posibleRegion){
          res.status(404).json({
              error: `No existe region con id ${idRegion}`
          });
      }else{  
          const paisesDeLaRegion = await Paises.findAll({
              where: {
                  regiones_id: idRegion
              }
          })
          const paisesId = paisesDeLaRegion.map(pais =>{
              return pais.id
          })
  
          const ciudadesPais = await Ciudades.findAll({
              where:{paises_id: paisesId}
          })
          const idCiudadesPais = ciudadesPais.map(ciudad =>{
              return ciudad.id
          })
      
          const contactosCiudad = await Contactos.findAll({
              where:{ciudades_id: idCiudadesPais}
          })
  
          const contactosId = contactosCiudad.map(contacto =>{
              return contacto.id
          })
  
          await ContactosHasCanales.destroy({
              where: {contacto_id: contactosId}
          })
  
          await Contactos.destroy({
              where: {ciudades_id: idCiudadesPais}
          })
  
          await Companias.destroy({
              where: {ciudades_id: idCiudadesPais}
          })
          
          await Ciudades.destroy({
              where: {
                  paises_id: paisesId,
              }
          }); 
  
          await Paises.destroy({
              where: {
                  regiones_id: idRegion,
              }
          }); 
  
          await Regiones.destroy({
              where: {
                  id: idRegion,
              }
          });
      } 
  
      res.status(200).json("Se ha eliminado la región con éxito");
  } catch (error) {
      res.status(400).json(error.message)
  }
});


// LISTAR TODAS LAS REGIONES
server.get("/regiones/", async(req,res)=>{
  const regiones = await Regiones.findAll();
  
  res.status(200).json(regiones)
});


// AGREGAR UN PAIS

server.post("/paises",paisValidation, async (req,res) =>{
  try{const {nombre,regiones_id} = req.body;
  const nuevoPais = await Paises.create({
      nombre, 
      regiones_id
  });

  res.status(201).json(nuevoPais);}
  catch(error){
   res.status(400).json({error:error.message});
  }
});



// MODIFICAR UN PAIS
server.put("/paises/:id", async(req,res)=>{
  idPais = req.params.id;
  const {nombre, regiones_id} = req.body;
  try {
      await Paises.update({nombre, regiones_id}, {where:{id: idPais}});
      const pais = await Paises.findOne({where: {id: idPais}});
      res.status(200).json(pais)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
})

//ELIMINAR UN PAIS
server.delete("/paises/:id", async (req,res) =>{
  const idPais = req.params.id;
  
  const posiblePais = await Paises.findOne({
      where: {
          id:idPais,
      }
  })

  if(!posiblePais){
      res.status(404).json({
          error: `No existe pais con id ${idPais}`
      });
  }else{ 
      
      const ciudadesPais = await Ciudades.findAll({
          where:{paises_id: idPais}
      })
      const idCiudadesPais = ciudadesPais.map(ciudad =>{
          return ciudad.id
      })
  
      const contactosCiudad = await Contactos.findAll({
          where:{ciudades_id: idCiudadesPais}
      })

      const contactosId = contactosCiudad.map(contacto =>{
          return contacto.id
      })

      await ContactosHasCanales.destroy({
          where: {contacto_id: contactosId}
      })

      await Contactos.destroy({
          where: {ciudades_id: idCiudadesPais}
      })

      await Companias.destroy({
          where: {ciudades_id: idCiudadesPais}
      })
      
      await Ciudades.destroy({
          where: {
              paises_id: idPais,
          }
      }); 

      await Paises.destroy({
          where: {
              id: idPais,
          }
      });
  } 

  res.status(200).json("El pais fue eliminado");
});

//LISTAR PAISES POR REGION ID
server.get("/paises/:idRegion", async(req,res)=>{
  const idRegion = req.params.idRegion
  try{
    const paises= await Paises.findAll({
      where: {regiones_id: idRegion}}
     );
    res.status(200).json(paises)
  }catch(error){
    res.status(400).json(error.message)
  }
});


server.get("/paises", async(req,res)=>{
  try{
    const paises= await Paises.findAll({
      include:[
        {model: Regiones, attributes: ["id","nombre"]}]
    });
    res.status(200).json(paises)
  }catch(error){
    res.status(400).json(error.message)
  }
});



// BUSCAR PAISES POR ID
server.get("/paises/:idPais", async(req,res)=>{
  const idPais = req.params.idPais
  try{
    const pais= await Paises.findAll({
      where: {id: idPais }}
     );
    res.status(200).json(pais)
  }catch(error){
    res.status(400).json(error.message)
  }
});


// AGREGAR CIUDAD
server.post("/ciudades", ciudadValidation, async (req,res) =>{
  try{const {nombre,paises_id} = req.body;
  const nuevaCiudad = await Ciudades.create({
      nombre, 
      paises_id
  });

  res.status(201).json(nuevaCiudad);}
  catch(error){
   res.status(400).json({error:error.message});
  }
});


// MODIFICAR CIUDAD
server.put("/ciudades/:id",async(req,res)=>{
  idCiudad = req.params.id;
  const {nombre, paises_id} = req.body;
  try {
      await Ciudades.update({nombre, paises_id}, {where:{id: idCiudad}});
      const ciudad = await Ciudades.findOne({where: {id: idCiudad}});
      res.status(200).json(ciudad)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
})



//ELIMINAR UNA CIUDAD
server.delete("/ciudades/:id", async (req,res) =>{
  const idCiudad = req.params.id;
  try {
    const posibleCiudad= await Ciudades.findOne({
      where: {
          id:idCiudad,
      }
  })

  if(!posibleCiudad){
      res.status(404).json({
          error: `No existe ciudad con id ${idCiudad}`
      });
  }else{  

    const contactosCiudad = await Contactos.findAll({
      where:{ciudades_id: idCiudad}
      })
      
    const contactosId = contactosCiudad.map(contacto =>{
      return contacto.id
  })

  await ContactosHasCanales.destroy({
      where: {contacto_id: contactosId}
  })

   await Contactos.destroy({
      where: {ciudades_id: idCiudad}
  })
  await Companias.destroy({
    where: {ciudades_id: idCiudad}
})
  
   await Ciudades.destroy({
      where: {
        id:idCiudad,
      }
  }); 
  } 

  res.status(200).json("La Ciudad fue eliminada");
  } catch (error) {
    res.json(error.message)
  }
 
});



//LISTAR CIUDADES POR PAIS
server.get("/ciudades/:idPais", async(req,res)=>{
  const idPais = req.params.idPais
  try{
    const ciudades= await Ciudades.findAll({
      where: {paises_id: idPais}}
     );
    res.status(200).json(ciudades)
  }catch(error){
    res.status(400).json(error.message)
  }
});



// LISTAR TODAS LAS COMPANIAS
server.get("/companias", async(req,res)=>{
  try{
    const arrayCompanias = await Companias.findAll({
      include:[
        {model: Ciudades, attributes: ["nombre"]},
        {model: Paises, attributes: ["nombre"]},
        {model: Regiones, attributes: ["nombre"]}
      ]
    })

    res.status(200).json(arrayCompanias)
  } catch(error){
    res.status(400).json(error.message)
  }
})


// MODIFICAR UNA COMPANIA

server.put("/companias/:id", async(req,res)=>{
  const idCompania = req.params.id;
  const {nombre,direccion, correo, telefono, ciudades_id, paises_id, regiones_id} = req.body;
  try {
      await Companias.update({nombre,direccion, correo, telefono, ciudades_id, paises_id, regiones_id}, {where:{id: idCompania}});
      const compania= await Companias.findOne({where: {id: idCompania}});
      res.status(200).json(compania)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
})


// AGREGAR NUEVA COMPANIA
server.post("/companias",async (req,res) =>{
  try{const {nombre,direccion, correo, telefono, ciudades_id, paises_id, regiones_id} = req.body;
  const nuevaCompania = await Companias.create({
      nombre,
      direccion,
      correo,
      telefono,
      ciudades_id,
      paises_id,
      regiones_id
  });

  res.status(201).json(nuevaCompania);}
  catch(error){
   res.status(400).json({error:error.message});
  }
});

// ELIMINAR UNA COMPANIA
server.delete("/companias/:id", async (req,res) =>{
  const idCompania = req.params.id;
   
  try {
      const posibleCompania= await Companias.findOne({
          where: {
              id:idCompania,
          }
      })
    
      if(!posibleCompania){
          res.status(404).json({
              error: `No existe compania con id ${idCompania}`
          });
      }else{  
          
          const contactosCompania = await Contactos.findAll({
              where:{companias_id: idCompania}
          })

          const contactosId = contactosCompania.map(contacto =>{
              return contacto.id
          })

          await ContactosHasCanales.destroy({
              where: {contacto_id: contactosId}
          })

          await Contactos.destroy({
              where: {companias_id: idCompania}
          })
          
          await Companias.destroy({
              where: {
                id:idCompania,
              }
          }); 
      } 
    
      res.status(200).json("La Compania fue eliminada");
  } catch (error) {
      res.status(400).json(error.message)
  }
});


// LISTAR LOS CANALES
server.get("/canales/", async(req,res)=>{
  const canales = await Canales.findAll();
  res.status(200).json(canales)
});

// MODIFICAR UN CANAL
server.put("/canales/:id", async(req,res)=>{
  const idCanal = req.params.id;
  const {nombre} = req.body;
  try {
      await Canales.update({nombre}, {where:{id: idCanal}});
      const canal= await Canales.findOne({where: {id: idCanal}});
      res.status(200).json(canal)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
})

// AGREGAR CANAL
server.post("/canales", async (req,res) =>{
  try{const {nombre} = req.body;
  const nuevoCanal = await Canales.create({
      nombre
  });
  res.status(201).json(nuevoCanal);}
  catch(error){
   res.status(400).json({error:error.message});
  }
});

// ELIMINAR UN CANAL
server.delete("/canales/:id", async (req,res) =>{
  const idCanal = req.params.id;
   
  try {
      const posibleCanal= await Canales.findOne({
          where: {
              id:idCanal,
          }
      })
    
      if(!posibleCanal){
          res.status(404).json({
              error: `No existe canal con id ${idCanal}`
          });
      }else{  

          await ContactosHasCanales.destroy({
              where: {canale_id: idCanal}
          })

          await Canales.destroy({
              where: {id: idCanal}
          })
          
      } 
    
      res.status(200).json("El canal fue eliminado");
  } catch (error) {
      res.status(400).json(error.message)
  }
});



// BUSCADOR DE CONTACTOS POR NOMBRE, APELLIDO, ETC

//BUSCADOR
server.get("/buscar/:input", async (req, res)=>{
  const input = req.params.input

  let correo= await Contactos.findAll({
  where: {correo: input,usuarios_id: req.user.id },
  include: [
      { model: Canales},
      { model: Ciudades},
      { model: Companias},
      { model: Regiones},
      { model: Paises},

  ],
  })
  let nombre= await Contactos.findAll({
  where: {nombre: input,usuarios_id: req.user.id },
  include: [
      { model: Canales},
      { model: Ciudades},
      { model: Companias},
      { model: Regiones},
      { model: Paises},
  ],
  })
  let apellido=await  Contactos.findAll({
  where: {apellido: input,usuarios_id: req.user.id },
  include: [
      { model: Canales},
      { model: Ciudades},
      { model: Companias},
      { model: Regiones},
      { model: Paises},
  ],
  })
  let cargo= await  Contactos.findAll({
  where: {cargo: input,usuarios_id: req.user.id },
  include: [
      { model: Canales},
      { model: Ciudades},
      { model: Companias},
      { model: Regiones},
      { model: Paises},
  ],
  })
  
  await Promise.all([correo, apellido, cargo, nombre]).then(
  res.status(200).json([correo, apellido, cargo, nombre])
  )
})

//BUSCADOR PAIS
server.get("/buscadorPorPaises/:input", async(req,res)=>{
const input = req.params.input
try{
  const pais= await Paises.findOne({
      where: {nombre: input}}
  );

  if(pais){
      const content  = pais.id

      const ciudades = await Ciudades.findAll({
          where: {paises_id: content}}
      );
      const ciudadesId  = ciudades.map(ciudad=>{
          return ciudad.id
      })

      const contactos = await Contactos.findAll({
          where:{ciudades_id :ciudadesId},
          include: [
              { model: Canales},
              { model: Ciudades},
              { model: Companias},
              { model: Regiones},
              { model: Paises}, 
          ],
      })

      await Promise.all([pais, ciudades, ciudadesId]).then(
          res.status(200).json(contactos)
      );
  }else{
      res.status(200).json([])
  }
  

}catch(error){
  res.status(400).json(error.message)
}
});

//BUSCADOR CANALES
server.get("/buscadorPorCanales/:input", async(req,res)=>{
  const input = req.params.input
  try{
    const canal= await Canales.findOne({
      where: {nombre: input}}
     );

     if(canal){
      const idCanal  = canal.id

      const elementos = await ContactosHasCanales.findAll({
        where: {canale_id: idCanal}}
       );

       const elementosId  = elementos.map(elem=>{
            return elem.contacto_id
       })
  
       const contactos = await Contactos.findAll({
           where:{id:elementosId},
           include: [
              { model: Canales},
              { model: Ciudades},
              { model: Companias},
              { model: Regiones},
              { model: Paises},
           ],
         })
  
       await Promise.all([canal, elementos, contactos]).then(
        res.status(200).json(contactos)
       );
     }else{
          res.status(200).json([])
     }
    
  }catch(error){
    res.status(400).json(error.message)
  }
});


//BUSCADOR POR CIUDAD
server.get("/buscadorPorCiudades/:input", async(req,res)=>{
  const input = req.params.input
  try{
    const ciudad= await Ciudades.findOne({
      where: {nombre: input}},
     );

     if(ciudad){
      const content  = ciudad.id

     const contactos = await Contactos.findAll({
         where:{ciudades_id :content},
         include: [
          { model: Canales},
          { model: Ciudades},
          { model: Companias},
          { model: Regiones},
          { model: Paises},
      ],
       })


     await Promise.all([ciudad, content]).then(
      res.status(200).json(contactos)
     );
     }else{
          res.status(200).json([])

     }
  }catch(error){
    res.status(400).json(error.message)
  }
});

//BUSCADOR POR REGION
server.get("/buscadorPorRegion/:input", async(req,res)=>{
  const input = req.params.input
  try{
    const region= await Regiones.findOne({
      where: {nombre: input}},
     );

     if(region){
      const content  = region.id

     const contactos = await Contactos.findAll({
         where:{regiones_id :content},
         include: [
          { model: Canales},
          { model: Ciudades},
          { model: Companias},
          { model: Regiones},
          { model: Paises},
      ],
       })


     await Promise.all([region, content]).then(
      res.status(200).json(contactos)
     );
     }else{
      res.status(200).json([])

     }
    


  }catch(error){
    res.status(400).json(error.message)
  }
});

server.get("/buscarContactosporCompania/:input", async(req,res)=>{
  const input = req.params.input
  try{
    const compania= await Companias.findOne({
      where: {nombre: input}}
     );
     if(compania){

       const content  = compania.id
   
   
        const contactos = await Contactos.findAll({
            where:{companias_id :content},
            include: [
              { model: Canales},
              { model: Ciudades},
              { model: Companias},
              { model: Regiones},
              { model: Paises},
         ],
          })
   
   
        await Promise.all([compania, content]).then(
         res.status(200).json(contactos)
        );
     }else{
      res.status(200).json([])
     }


  }catch(error){
    res.status(400).json(error.message)
  }
});



//SERVER PORT LISTENER
server.listen(PORT, () => {
  console.log(`Servidor se ha iniciado en puerto ${PORT}`);
});


