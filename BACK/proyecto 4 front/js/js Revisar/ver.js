let token  = localStorage.getItem("token");
// VARIABLES CONTACTOS

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
const checkbox = document.getElementById("check-all-boxes");



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






// MOSTRAR CONTACTOS Y TABLA--- ELIMINA BIEN EL CONTACTO
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

      data.forEach(contacto => {

          let cuerpoTablaContactos = document.getElementById("tableData")
          let row = document.createElement("tr");
          let check = document.createElement("td");
          let contact = document.createElement("td");
          let paisRegion = document.createElement("td");
          let compania = document.createElement("td");
          let cargo = document.createElement("td");
          let canal = document.createElement("td");
          let interes = document.createElement("td");
          let acciones = document.createElement("td");

          console.log(row)
           
           // CHECK
           let divCheck  =document.createElement("div");
           let checkbox = document.createElement("input")
           checkbox.type = "checkbox";
           checkbox.classList.add("imput-check")
           check.appendChild(checkbox)
           check.appendChild(divCheck)
           
           // CONTACTO
           let divContacto =  document.createElement("div");
           let divImagen = document.createElement("div");
           let span = document.createElement("span");
           let spanCorreo = document.createElement("span");
           let nombreContacto  = document.createElement("p");
           let apellidoContacto  = document.createElement("p");
           let correoContacto  = document.createElement("p");
           let imagenContacto  = document.createElement("img");
           contact.classList.add("contactoTabla")

           // clases
           imagenContacto.classList.add("imagen-contacto");
           span.classList.add("spanNombre")
           divContacto.classList.add("divcontacto")
           
           nombreContacto.innerText = contacto.nombre;
           apellidoContacto.innerText= contacto.apellido;
           correoContacto.innerText= contacto.correo;
           imagenContacto.src = contacto.imagen

            span.appendChild(nombreContacto);
            span.appendChild(apellidoContacto);
            spanCorreo.appendChild(correoContacto)
           
             divContacto.appendChild(span);
             divContacto.appendChild(spanCorreo);
             divImagen.appendChild(imagenContacto)
           
             contact.appendChild(divImagen);
            contact.appendChild(divContacto);
           
           // REGION
           let divpaisRegion =  document.createElement("div");
           let nombreRegion  = document.createElement("p");
           let nombrePais  = document.createElement("p");
           
           nombreRegion.innerText = contacto.regione["nombre"];
           nombrePais.innerText= contacto.paise["nombre"];
           divpaisRegion.appendChild(nombreRegion);
           divpaisRegion.appendChild(nombrePais);
           paisRegion.appendChild(divpaisRegion);
           
           // COMPANIA
           let divCompania =  document.createElement("div");
           let nombreCompania  = document.createElement("p");
           nombreCompania.innerText = contacto.compania["nombre"];
           divCompania.appendChild(nombreCompania);
           compania.appendChild(divCompania);
           
           
           //CARGO
           let divCargo =  document.createElement("div");
           let nombreCargo  = document.createElement("p");
           nombreCargo.innerText = contacto.cargo;
           divCargo.appendChild(nombreCargo);
           cargo.appendChild(divCargo);
           
           //CANAL
           let divCanal =  document.createElement("div");
           let nombreCanal  = document.createElement("p");
           nombreCanal.innerText = contacto.canales.map(canal=>{
               return canal.nombre
             }),
           divCanal.appendChild(nombreCanal);
           canal.appendChild(divCanal);
           
           //INTERES
           let divInteres =  document.createElement("div");
           divInteres.classList.add("cont-interes")
           let cantinteres  = document.createElement("p");
           let porcentage  = document.createElement("p");
           let barrainteres= document.createElement("div");
            barrainteres.classList.add("barra-interes")
           cantinteres.innerText = contacto.canales.map(canal=>{
               return canal.contactos_has_canales.interes
             }),

            porcentage.innerText ="%"
            divInteres.appendChild(cantinteres);
            divInteres.appendChild(porcentage)
            divInteres.appendChild(barrainteres)
            interes.appendChild(divInteres);
            if(cantinteres.innerText == "0"){
              barrainteres.classList.add("barra-interes")
            } else if(cantinteres.innerText == "25"){
              barrainteres.classList.add("m-2")
            } else if(cantinteres.innerText == "50"){
              barrainteres.classList.add("m-3")
            }else if(cantinteres.innerText == "75"){
              barrainteres.classList.add("m-4")
            }else if(cantinteres.innerText == "100"){
              barrainteres.classList.add("m-5")
            }
           
           //ACCIONES
           let divAcciones =  document.createElement("div");
           let btnEliminarContacto =  document.createElement("div"); 
           let btnEditarContacto =  document.createElement("div"); 
           let imgEliminar = document.createElement("img");
           let imgEditar = document.createElement("img");
           imgEditar.src="./assets/pen-to-square-solid.svg" 
           imgEditar.alt="editar-contacto"
           imgEliminar.src="./assets/trash-solid.svg";
           imgEliminar.alt="eliminar-contacto";
           imgEditar.classList.add("img-boton-editar")
           imgEliminar.classList.add("img-boton-eliminar")
           btnEditarContacto.appendChild(imgEditar);
           btnEditarContacto.classList.add("btn-editar-contacto")
           btnEliminarContacto.classList.add("btn-eliminar-contacto")
           btnEliminarContacto.appendChild(imgEliminar);
           divAcciones.appendChild(btnEditarContacto);
           divAcciones.appendChild(btnEliminarContacto);
           divAcciones.classList.add("botones-acciones")
           acciones.appendChild(divAcciones)

           
           //CARGAR TODO A LA FILA
           row.appendChild(check);
           row.appendChild(contact);
           row.appendChild(paisRegion)
           row.appendChild(compania);
           row.appendChild(cargo);
           row.appendChild(canal);
           row.appendChild(interes);
           row.appendChild(acciones);
           cuerpoTablaContactos.appendChild(row);
           console.log(cuerpoTablaContactos)
              // BTN ELIMINAR CONTACTO
           btnEliminarContacto.addEventListener("click", ()=>{
                eliminarContacto()
           })

           // BTN EDITAR CONTACTO
           btnEditarContacto.addEventListener("click", ()=>{
               editarContacto()
           })

           function eliminarContacto() {
                let contactoId = contacto.id
                try {
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", token);
                  
                    
                  var requestOptions = {
                    method: 'DELETE',
                    headers: myHeaders,
                    redirect: 'follow'
                  };
                  
                  fetch(`http://localhost:3000/contactos/${contactoId}`, requestOptions)
                    .then(response => response.json())
                    .then(result => console.log(result),cuerpoTablaContactos.removeChild(row))
                
                
                  } catch (error) {
                    console.log(error)
                  }
               
           }

           // en proceso. Ver popup
           function editarContacto() {

               let contactoId = contacto.id

               try {
                   var myHeaders = new Headers();
                   myHeaders.append("Authorization", token);
                   myHeaders.append("Content-Type", "application/json");


                   
                   var raw = JSON.stringify({
                    "nombre": "Magdalena",
                    "apellido": "Casas",
                    "cargo": "Jefa",
                    "correo": "mi@gmail.com",
                    "imagen": "",
                    "companias_id": 2,
                    "usuarios_id": 1,
                    "interes": "100",
                    "canales": [
                      {
                        "preferencias": "Activo",
                        "canale_id": 4,
                        "cuenta": "Magui"
                      },
                      {
                        "preferencias": "Activo",
                        "canale_id": 2,
                        "cuenta": "Magui"
                      }
                    ]
                  });
                   
                  var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                  };
                  
                 fetch(`http://localhost:3000/contactos/${contactoId}`, requestOptions)
                   .then(response => response.text())
                   .then(result => console.log(result),cuerpoTablaContactos.removeChild(row))
               
               
                   
                 } catch (error) {
                   console.log(error)
                 }
              
          }
          

      });
       
      checks = document.querySelectorAll(".imput-check");
      // no funciona
      checkbox.addEventListener("click", ()=>{
           alert("aca")
           checks.forEach(box=>{
                if(!checkbox.checked){
                     box.checked = true
                }else if (checkbox.checked){ 
                    box.checked = false  
                }
           })
      })





     })





}

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
         .then(result => console.log(result), location.reload())
         .catch(error => console.log('error', error));
       
     } catch (error) {
       console.log(error)
     }
}

     
     
getContactos()


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
   

