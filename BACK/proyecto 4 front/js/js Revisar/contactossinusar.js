// VARIABLES CONTACTOS
let token  = localStorage.getItem("token");
const btnAgregarContacto = document.getElementById("submit-pop-up");
const agregarContactobtnInicio = document.getElementById("agregar-contacto")
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
const checkbox = document.getElementById("check-all-boxes")





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
    myHeaders.append("Authorization", token);
    
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
      opciones.value= dato.id
      let region = document.getElementById("region")
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
      pais = document.getElementById("pais")
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
      ciudad.appendChild(opciones)
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



// GET CONTACTOS- IMPRIMIR EN EL DOM
const getContactos= async ()=>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);
  
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/contactos/", requestOptions)
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

  console.log(contactos)

  const Html  = contactos.map( contacto =>`
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
 <td>
 <div class='section-meter'>${contacto.interes}</div>
 </td>
 <td>
   <div class='actions'>
     <span data-id=${contacto.id} class='edit-contact' onclick="editarContacto()"><i class="fas fa-edit"></i></span>
     <span data-id=${contacto.id} class='remove-contact' onclick="eliminarContacto()"><i class="fas fa-trash remove-contact" data-id=${contacto.id}></i></span>
   </div>
 </td>
 </tr>

  `).join("")


 cuerpoTablaContactos.innerHTML =  Html
 let btnEditar = document.querySelectorAll(".edit-contact");
 let btnEliminar = document.querySelectorAll(".remove-contact");


 // BOTON EDITAR USUAIRO
   btnEditar.forEach(btn=>{
     btn.addEventListener("click", ()=>{
      let id = btn.getAttribute('data-id')
      console.log(id)
     })
   })
 

  // BOTON ELIMINAR USUARIO
  btnEliminar.forEach(btn =>{
    btn.addEventListener("click", ()=>{
      let id = btn.getAttribute('data-id')
      console.log(id)
  })
})}


//POST CONTACTO NUEVO
const agregarNuevocontacto = async()=>{

  // VARIABLES
  let preferencia = document.getElementById("input-preferencias").value;
  let interes = document.getElementById("input-interes").value;
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
     myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "nombre": nombre,
      "apellido": apellido,
      "cargo": cargo,
      "correo": correo,
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
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    
  } catch (error) {
    console.log(error)
  }
}





//-------- ADD EVENT LISTENER----------------------


btnAgregarContacto.addEventListener("click",()=>{
  formularioAgregarContacto.style.display = "block"
})

agregarContactobtnInicio.addEventListener("click", async()=>{
  formularioAgregarContacto.style.display = "block"
})

regionNuevoContacto.addEventListener("click",async()=>{
  await  getRegiones()
})

paisNuevoContacto.addEventListener("click",async ()=>{
   await getPaisesporid();
})

ciudadNuevoContacto.addEventListener("click", async()=>{
   await getciudadesporid()
})


canalNuevoContacto.addEventListener("click",async()=>{
  await getCanales()
})

companiaNuevoContacto.addEventListener("click",async ()=>{
  await getCompanias()
})

btnAgregarContacto.addEventListener("click", async() =>{
  await agregarNuevocontacto();
  formularioAgregarContacto.style.display = "none" 
});

btncancelar.addEventListener("click", async ()=>{
  formularioAgregarContacto.style.display = "none"
})


getContactos()



