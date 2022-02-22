let token  = localStorage.getItem("token");

// VARIABLES VARIAS
// btn de adentro
const btnAgregarContacto = document.getElementById("submit-pop-up");
// boton de afuera
const agregarContactobtnInicio = document.getElementById("agregar-contacto");

const formularioAgregarContacto = document.getElementById("pop-up-nuevo-contacto");
const nombreNuevoContacto =  document.getElementById("input-nombre");
const apellidoNuevoContacto =  document.getElementById("input-apellido");
const cargoNuevoContacto =  document.getElementById("input-cargo");
const emailNuevoContacto =  document.getElementById("input-email");
const companiaNuevoContacto =  document.getElementById("compania");
const regionNuevoContacto =  document.getElementById("region");
const paisNuevoContacto =  document.getElementById("pais");
const ciudadNuevoContacto =  document.getElementById("ciudad");
const direccionNuevoContacto =  document.getElementById("direccion");
const canalNuevoContacto = document.getElementById("canal");
const preferenciasNuevoContacto = document.getElementById("input-preferencias");
const interesNuevoContacto = document.getElementById("input-interes");
const cuerpoTablaContactos = document.getElementById("tableData");
const buscarcontactos = document.getElementById("buscador-contactos");
const btncancelar = document.getElementById("cancel-pop-up")
const checkbox = document.getElementById("check-all-boxes");
const btnAgregarCanal = document.getElementById("btn-add-channel");


let preferenciaSeleccionada = () => {
    let preferencia = document.getElementById("input-preferencias").value;
    console.log("la preferencia es", preferencia);
    return preferencia;
}
  
let interesSeleccionado = () => {
    let interes = document.getElementById("input-interes").value;
    console.log("el interes es", interes);
    return interes;
}
  
let canalIdSeleccionado = () => {
    let canal = document.getElementById("canal").value;
    console.log("el id canal es", canal);
    return canal;
}
let RegionIdSeleccionada = ()=>{
    let region = document.getElementById("region").value;
    console.log("el id Region es", region);
    return region;
}
let paisIdSeleccionado = ()=>{
    let pais = document.getElementById("pais").value;
    console.log("el id pais es", pais);
    return pais;
}
let ciudadIdSeleccionada = () => {
    let ciudad = document.getElementById("ciudad").value;
    console.log("el id ciudad es", ciudad);
    return ciudad;
}
let companiaIdSeleccionada = ()=>{
    let compania = document.getElementById("compania").value;
    console.log("el id compania es", compania);
    return compania;
}


// OBTENER TODOS LOS DATOS

// GET REGIONES

const getRegiones = async()=>{
    
    
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:3000/regiones", requestOptions);
    const content = await response.json();
    console.log(content)
    
    // FOR EACH
    content.forEach(dato=>{
      console.log(dato.nombre)
      
      
      let opciones = document.createElement("option");
      opciones.classList.add('opciones-region')
      opciones.textContent = dato.nombre;
      opciones.value = dato.id
      region = document.getElementById("region")
      region.appendChild(opciones) 
    })
    
  } catch (error) {
    console.log(error)
  }
  
}
  
  //GET PAISES POR ID REGION
const getPaisesporid = async()=>{
    
    let regionID = document.getElementById("region").value;
    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("token"));
      
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetch(`http://localhost:3000/paises/${regionID}`, requestOptions);
      const content = await response.json();
      console.log(content)
      
      content.forEach(dato=>{
        console.log(dato.nombre)
        let opciones = document.createElement("option");
        opciones.textContent = dato.nombre;
        opciones.value= dato.id
        pais = document.getElementById("pais");
        pais.appendChild(opciones)

      });
      
      
    } catch (error) {
      console.log(error)
    }
    
}
   
  // GET CIUDADES POR ID PAIS
const getciudadesporid = async()=>{
    
    let paisID = document.getElementById("pais").value;
    
    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetch(`http://localhost:3000/ciudades/${paisID}`, requestOptions);
      const content = await response.json();
      console.log(content)
      
      content.forEach(dato=>{
        console.log(dato.nombre)
        let opciones = document.createElement("option");
        opciones.textContent = dato.nombre;
        opciones.value= dato.id
        ciudad = document.getElementById("ciudad")
        ciudad.appendChild(opciones);
      });
      
      
    } catch (error) {
      console.log(error)
    }
    
}

// GET CANALES
const getCanales = async()=>{
  
  
    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetch("http://localhost:3000/canales", requestOptions);
      const content = await response.json();
      console.log(content)
      
      // FOR EACH
      content.forEach(dato=>{
        console.log(dato.nombre)
        
        
        let opciones = document.createElement("option");
        opciones.classList.add('opciones-canal')
        opciones.textContent = dato.nombre;
        opciones.value = dato.id
        canal = document.getElementById("canal")
        canal.appendChild(opciones)
        
        
      })
      
    } catch (error) {
      console.log(error)
    }
    
}
  
  
// GET COMPANIAS
const getCompanias = async()=>{
    
    
    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", token);
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = await fetch("http://localhost:3000/companias", requestOptions);
      const content = await response.json();
      console.log(content)
      
      // FOR EACH
      content.forEach(dato=>{
        console.log(dato.nombre)
        
        
        let opciones = document.createElement("option");
        opciones.classList.add('opciones-canal')
        opciones.textContent = dato.nombre;
        opciones.value = dato.id
        compania = document.getElementById("compania")
        compania.appendChild(opciones) 
      })
      
    } catch (error) {
      console.log(error)
    }
    
  }
// ADD EVENT LISTENNER


agregarContactobtnInicio.addEventListener("click", ()=>{
    formularioAgregarContacto.style.display="block"
});

btncancelar.addEventListener("click", ()=>{
    formularioAgregarContacto.style.display="none"
})
  
companiaNuevoContacto.addEventListener("click", async ()=>{
  await  getCompanias()
})
regionNuevoContacto.addEventListener("click", async ()=>{
    await  getRegiones()
})
paisNuevoContacto.addEventListener("click", async ()=>{
    await  getPaisesporid()
})
ciudadNuevoContacto.addEventListener("click", async ()=>{
    await  getciudadesporid()
})

canalNuevoContacto.addEventListener("click", async()=>{
    await getCanales()
})

btnAgregarContacto .addEventListener("click",async ()=>{
    await agregarNuevocontacto()
})

btnAgregarCanal.addEventListener("click", ()=>{
  alert("apretaste agregar canal")
})


//POST CONTACTO NUEVO FUNCIONA BIEN
const agregarNuevocontacto = async()=>{

    // VARIABLES
    let preferencia = document.getElementById("input-preferencias").value;
    let interes = document.getElementById("input-interes").value;
    let direccion = document.getElementById("input-direccion").value;
    let canal = document.getElementById("canal").value;
    let ciudad = document.getElementById("ciudad").value;
    let compania = document.getElementById("compania").value;
    let nombre = document.getElementById("input-nombre").value;
    let apellido = document.getElementById("input-apellido").value;
    let cargo=  document.getElementById("input-cargo").value;
    let correo =  document.getElementById("input-email").value;
    let cuenta = document.getElementById("cuenta").value;
    let usuario = 1
  
  
  
    try {
      
       var myHeaders = new Headers();
       myHeaders.append("Authorization", localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "nombre": nombre,
        "apellido": apellido,
        "cargo": cargo,
        "correo": correo,
        "direccion": direccion,
        "ciudades_id": ciudad,
        "companias_id": compania,
        "usuarios_id": usuario,
        "interes": interes,
        "canales": [
          {
            "preferencias": preferencia,
            "canale_id": canal,
            "cuenta": cuenta
          },
        ]
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/contactos", requestOptions)
        .then(response => response.json())
        .then(result => location.href = 'contactos.html')
        .catch(error => console.log('error', error));
      
    } catch (error) {
      console.log(error)
    }
}



// ELIMINAR CONTACTO

const eliminarContacto = async (id)=> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token") );
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3000/contactos/${id}`, requestOptions)
      .then(response => response.text())
      .then(result => location.href = 'contactos.html')
      .catch(error => console.log('error', error));
}
  

// MOSTRAR LOS CONTACTOS
// GET CONTACTOS- IMPRIMIR EN EL DOM
const getContactos= async ()=>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    


    fetch("http://localhost:3000/contactos", requestOptions)
    .then(response => response.json())
    .then(data => {
  
  
      
    const contactos = data.map((data)=>({
      
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      imagen:data.imagen,
      id: data.id,
      cargo: data.cargo,
      pais: data.paise["nombre"],
      region: data.regione["nombre"],
      compania: data.compania["nombre"],
      canal:data.canales.map(canal=>{
        return canal.nombre
      }),
      interes: data.canales.map(canal=>{
        return canal.contactos_has_canales.interes
      }),
  
  
    }))
  
    displaycontacto(contactos);
  
  })
    
  
}



const displaycontacto = (contactos)=>{


    let porcentaje=0;
   for(let contacto of contactos){

    console.log("displayContacto" + contacto.interes)
   }
 
    

     


     
    const Html  = contactos.map( contacto =>
      `
   <tr>
   <td>
     <div class='tableDiv'>
       <input type="checkbox" name="delete" data-id="${contacto.id}" class="checkbox-del">
     </div>
    </td>
   <td>
    <div class='tableDiv'>
      <img src="${contacto.imagen}" class ="imagen-contacto"alt="imagen${contacto.nombre}">
     <span>${contacto.nombre} ${contacto.apellido}</span>
     <span class='subtext'>${contacto.correo}</span>
   </div>
   </td>
   <td>
     <div class='tableDiv'>
      <span>${contacto.pais}</span>
      <span class='subtext'>${contacto.region}</span>
    </div>
   </td>
   <td>${contacto.compania}</td>
   <td>${contacto.cargo}</td>
   <td>
    <div class='tableDiv channels-box'>${contacto.canal}</div>
   </td>
   <td><div class='section-meter'>
   <div class='meter-container'>
   <div><p>${contacto.interes}%</p></div>
   <div class="meter">
       <span data-interes = ${contacto.interes} class= "barra-interes m-${contacto.interes}"></span>
   </div>
</div>
   </div></td>
   <td>
   <div class='actions'>
       <span data-id=${contacto.id} data-nombre=${contacto.nombre} data-apellido=${contacto.apellido} data-correo=${contacto.correo} data-imagen=${contacto.imagen} data-cargo=${contacto.cargo} class='edit-contact'><i class="fas fa-edit"></i></span>
       <span data-id=${contacto.id} class='remove-contact'><i class="fas fa-trash remove-user" data-id=${contacto.id}></i></span>
   </div>
</td>
   </tr>
  
    `).join("")
  
    
   cuerpoTablaContactos.innerHTML =  Html;
   let btnEditar = document.querySelectorAll(".edit-contact");
   let btnEliminar = document.querySelectorAll(".remove-contact");
   let prueba= document.querySelectorAll(".barra-interes");
   console.log(prueba);
 

  
  
   // BOTON EDITAR CONTACTO
     btnEditar.forEach(btn=>{
       btn.addEventListener("click", ()=>{
        let id = btn.getAttribute('data-id')
        console.log(id)
        popUpEditarContacto.style.display = "block";

       // DATOS DEL CONTATCO SELECCIONADO
       let idContacto = btn.getAttribute('data-id');
       let nombre = btn.getAttribute('data-nombre');
       let apellido = btn.getAttribute('data-apellido');
       let correo = btn.getAttribute('data-correo');
       let imagen = btn.getAttribute('data-imagen');
       let cargo = btn.getAttribute('data-cargo');

       // poner datos en popup

       const  nombreModifContacto = document.getElementById("edit-input-nombre");
       const  apellidoModifContacto = document.getElementById("edit-input-apellido");
       const  cargoModifContacto = document.getElementById("edit-input-cargo");
       const  correoModifContacto = document.getElementById("edit-input-email");

       nombreModifContacto.value = nombre;
       apellidoModifContacto.value = apellido;
       correoModifContacto.value = correo;
       cargoModifContacto.value = cargo;


       btnEnviarModifContacto.addEventListener("click",()=>{
       
         modificarContacto(idContacto)

       })

       })
     })
   
  
    // BOTON ELIMINAR CONTACTO ANDA BIEN
    btnEliminar.forEach(btn =>{
      btn.addEventListener("click", async()=>{
        let id = btn.getAttribute('data-id')
       await eliminarContacto(id)
    });

    //BARRA DE INTERES
     
    
})}

getContactos();





//--------------------------------------- MODIFICAR UN CONTACTO------------------------------------

//VARIABLES
const popUpEditarContacto = document.getElementById("pop-up-editar-contacto")
const  nombreModifContacto = document.getElementById("edit-input-nombre").value;
const  apellidoModifContacto = document.getElementById("edit-input-apellido").value;
const  cargoModifContacto = document.getElementById("edit-input-cargo");
const  correoModifContacto = document.getElementById("edit-input-email");
const  companiaModifContacto = document.getElementById("edit-compania");
const  direccionModifContacto = document.getElementById("edit-input-direccion");
const  regionModifContacto = document.getElementById("edit-region");
const  paisModifContacto = document.getElementById("edit-pais");
const  ciudadModifContacto = document.getElementById("edit-ciudad");
const  interesModifContacto = document.getElementById("edit-input-interes");
const  canalModifContacto = document.getElementById("edit-canal");
const  cuentaModifContacto = document.getElementById("edit-cuenta");
const  preferenciasModifContacto = document.getElementById("edit-input-preferencias");
const btnEnviarModifContacto = document.getElementById("edit-submit-pop-up");
const btnCancelarModifContacto = document.getElementById("edit-cancel-pop-up");

console.log(paisModifContacto)



const modificarContacto = async (id)=>{
  let preferencia = document.getElementById("edit-input-preferencias").value;
  let interes = document.getElementById("edit-input-interes").value;
  let canal = document.getElementById("edit-canal").value;
  let ciudad = document.getElementById("edit-ciudad").value;
  let direccion = document.getElementById("edit-input-direccion").value;
  let compania = document.getElementById("edit-compania").value;
  let nombre = document.getElementById("edit-input-nombre").value;
  let apellido = document.getElementById("edit-input-apellido").value;
  let cargo=  document.getElementById("edit-input-cargo").value;
  let correo =  document.getElementById("edit-input-email").value;
  let cuenta = document.getElementById("edit-cuenta").value;
  let usuario = 1

  var myHeaders = new Headers();
  myHeaders.append("Authorization",localStorage.getItem("token"));
 myHeaders.append("Content-Type", "application/json");

 var raw = JSON.stringify({
  "nombre": nombre,
  "apellido": apellido,
  "cargo": cargo,
  "correo": correo,
  "direccion": direccion,
  "ciudades_id": ciudad,
  "companias_id": compania,
  "usuarios_id": usuario,
  "interes":interes,
  "canales": [
    {
      "preferencias": preferencia,
      "canale_id": canal,
      "cuenta":cuenta
    }
  ]
 });

 var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
 };

 fetch(`http://localhost:3000/contactos/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => location.href = 'contactos.html')
  .catch(error => console.log('error', error));

}

const getRegionesModif = async()=>{
    
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:3000/regiones", requestOptions);
    const content = await response.json();
    console.log(content)
    
    // FOR EACH
    content.forEach(dato=>{
      console.log(dato.nombre)
      
      
      let opciones = document.createElement("option");
      opciones.classList.add('opciones-region')
      opciones.textContent = dato.nombre;
      opciones.value = dato.id
      region = document.getElementById("edit-region")
      region.appendChild(opciones) 
    })
    
  } catch (error) {
    console.log(error)
  }
  
}

const getCompaniasModif = async()=>{
    
    
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:3000/companias", requestOptions);
    const content = await response.json();
    console.log(content)
    
    // FOR EACH
    content.forEach(dato=>{
      console.log(dato.nombre)
      
      
      let opciones = document.createElement("option");
      opciones.classList.add('opciones-canal')
      opciones.textContent = dato.nombre;
      opciones.value = dato.id
      compania = document.getElementById("edit-compania")
      compania.appendChild(opciones) 
    })
    
  } catch (error) {
    console.log(error)
  }
  
}
const getPaisesModif = async()=>{
    
  let regionID = document.getElementById("edit-region").value;
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch(`http://localhost:3000/paises/${regionID}`, requestOptions);
    const content = await response.json();
    console.log(content)
    
    content.forEach(dato=>{
      console.log(dato.nombre)
      let opciones = document.createElement("option");
      opciones.textContent = dato.nombre;
      opciones.value= dato.id
  
      pais = document.getElementById("edit-pais")
      pais.appendChild(opciones)
     
    });
    
    
  } catch (error) {
    console.log(error)
  }
  
}
const getCanalesModif = async()=>{
  
  
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:3000/canales", requestOptions);
    const content = await response.json();
    console.log(content)
    
    // FOR EACH
    content.forEach(dato=>{
      console.log(dato.nombre)
      
      
      let opciones = document.createElement("option");
      opciones.classList.add('opciones-canal')
      opciones.textContent = dato.nombre;
      opciones.value = dato.id
      canal = document.getElementById("edit-canal")
      canal.appendChild(opciones)
      
      
    })
    
  } catch (error) {
    console.log(error)
  }
  
}
 


// GET CIUDADES POR ID PAIS
const getciudadeModif = async()=>{
  
  let paisID = document.getElementById("edit-pais").value;
  
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch(`http://localhost:3000/ciudades/${paisID}`, requestOptions);
    const content = await response.json();
    console.log(content)
    
    content.forEach(dato=>{
      console.log(dato.nombre)
      let opciones = document.createElement("option");
      opciones.textContent = dato.nombre;
      opciones.value= dato.id
      ciudad = document.getElementById("edit-ciudad")
      ciudad.appendChild(opciones);
  
    });
    
    
  } catch (error) {
    console.log(error)
  }
  
}
//add event listener de popup editar contactos

regionModifContacto.addEventListener("click", ()=>{
  getRegionesModif()
});

paisModifContacto.addEventListener("click", ()=>{
  getPaisesModif()
});
ciudadModifContacto.addEventListener("click", ()=>{
  getciudadeModif()
});
canalModifContacto.addEventListener("click", ()=>{
  getCanalesModif();
});
companiaModifContacto.addEventListener("click", ()=>{
  getCompaniasModif();
});

btnCancelarModifContacto.addEventListener("click", ()=>{
  popUpEditarContacto.style.display = "none"
})

//--------------------------------------- BUSCADOR UN CONTACTO------------------------------------

let buscadorInput = document.getElementById("buscador-contactos");
console.log(buscadorInput)


function buscador(input){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

  fetch(`http://localhost:3000/buscar/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
                  console.log(array)
              }
          })
      }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscarContactosporPaises/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
                  console.log(array)
              }
          })
      }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscarContactosporCiudades/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
                  console.log(array)
              }
          })
      }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscarContactosporRegion/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
                  console.log(array)
              }
          })
      }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscarContactosporCanales/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
                  console.log(array)
              }
          })
      }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscarContactosporCompania/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
                  console.log(array)
              }
          })
      }
  ))
  .catch(error => console.log('error', error));
}






buscadorInput.addEventListener("keypress",async (event)=>{
  let informacion = buscadorInput.value
  if(event.code == "Enter"){
     buscador(informacion)
     buscadorInput.value="";
   }
}) 