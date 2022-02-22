let token  = localStorage.getItem("token");

function cerrarSesion(){
  localStorage.clear()
  location.href = 'index.html'
}



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
const canalNuevoContacto = document.querySelectorAll(".canal");
const preferenciasNuevoContacto = document.getElementById("input-preferencias");
const interesNuevoContacto = document.getElementById("input-interes");
const cuerpoTablaContactos = document.getElementById("tableData");
const buscarcontactos = document.getElementById("buscador-contactos");
const btncancelar = document.getElementById("cancel-pop-up")
const checkbox = document.getElementById("check-all-boxes");
const btnAgregarCanal = document.getElementById("btn-add-channel");
const btnAgregarCanalesModif = document.getElementById("btn-add-channel-edit")


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


//Funcion que verifica si es admin o no

// NUEVAS FUNCIONES----------
let esAdmin = () => {
  let resultado = document.getElementById("input-profile");
  let admin = resultado.value;
  let perfil = resultado.options[resultado.selectedIndex].text;
  console.log("es admin", admin);
  console.log(perfil)
  return admin;
}
function cerrarSesion(){
  localStorage.clear()
  location.href = 'index.html'
}

function verificar(){
  
  let pestañaUsuarios = document.getElementById("li-usuarios");
  const admin = localStorage.getItem("esAdmin");
  if(admin === "true"){
    pestañaUsuarios.style.display = "block"
  }else{
    pestañaUsuarios.style.display = "none" 
  }

}


//----------------------------------
//------------------------------
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
        
        let canal = document.querySelectorAll(".canal");
        console.log(canal)
        canal.forEach(element=>{
          
          let opciones = document.createElement("option");
          opciones.classList.add('opciones-canal')
          opciones.textContent = dato.nombre;
          opciones.value = dato.id


          element.appendChild(opciones)
          

         })
        
        
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
  companiaNuevoContacto.innerHTML = ` <option value="" disabled selected>Seleccionar Compañia</option>`
  await  getCompanias()
})
regionNuevoContacto.addEventListener("click", async ()=>{
  regionNuevoContacto.innerHTML = ` <option value="" disabled selected>Seleccionar Región</option>`
  await  getRegiones()
})
paisNuevoContacto.addEventListener("click", async ()=>{
  paisNuevoContacto.innerHTML = ` <option value="" disabled selected>Seleccionar Pais</option>`
    await  getPaisesporid()
})
ciudadNuevoContacto.addEventListener("click", async ()=>{
  ciudadNuevoContacto.innerHTML = `  <option value="" disabled selected>Seleccionar Ciudad</option>`
    await  getciudadesporid()
})


canalNuevoContacto.forEach(element=>{
  element.addEventListener("click", ()=>{
    element.innerHTML = `<option value="" disabled selected>Seleccionar Canal</option>`
    getCanales()
  })
})

btnAgregarContacto .addEventListener("click",async ()=>{

 agregarNuevocontacto()

})

// -----------------------------AGRGAR CANALES EN EL AGREGAR CONTACTO------------
btnAgregarCanal.addEventListener("click", ()=>{
 agregarCanalesHtml()
})







const agregarCanalesHtml = ()=>{
  let divPadre = document.createElement("div");
  let divHijo = document.createElement("div");
  divPadre.classList.add('tertiary-info')
  divHijo.classList.add("channel-info-row")
   divHijo.innerHTML =  ` 
                          
   <div class='tableDiv'>
   <label for="interes">Interés</label>
   <select name="interes" class="input-interes" >
       <option value="" disabled selected>Seleccionar Interes</option>
       <option value="0" selected>0%</option>
       <option value="25" >25%</option>
       <option value="50" >50%</option>
       <option value="75" >75%</option>
       <option value="100" >100%</option>
   </select>
</div>

<div class='tableDiv'>
   <label for="canal-Contacto">Canal de Contacto</label>
   <select name="canal" class="canal" >
       <option value="" disabled selected>Seleccionar Canal</option>
   </select>
</div>
<div class='tableDiv'>
   <label for="cuenta">Cuenta Contacto</label>
   <input type="text" name="cuenta" class="cuentaContacto">
</div>
<div class='tableDiv'>
   <label for="preferencias">Preferencias</label>
   <select name="preferencias" class="input-preferencias">
       <option value="Sin preferencia" selected>Sin preferencia</option>
       <option value="ACTIVO">Activo</option>
       <option value="NO MOLESTAR" >No molestar</option>
       <option value="EN EL TRABAJO" >En el trabajo</option>
       <option value="AUSENTE" >Ausente</option>

   </select>
</div>
`

  divPadre.appendChild(divHijo)
  let imprimir = document.getElementById("agregar-mas-canales");
  imprimir.appendChild(divPadre);
  let canales = document.querySelectorAll(".canal")

  canales.forEach(canal=>{
    canal.addEventListener("click", ()=>{
      element.innerHTML = `<option value="" disabled selected>Seleccionar Canal</option>`
      getCanales()
    })
  })



  
}




let getcanalesAgregar = async ()=>{
  
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
      
      let canal = document.querySelectorAll(".canal");
      console.log(canal)
      canal.forEach(element=>{
        
        let opciones = document.createElement("option");
        opciones.classList.add('opciones-canal')
        opciones.textContent = dato.nombre;
        opciones.value = dato.id


        element.appendChild(opciones)
        

       })
      
      
    })
    
  } catch (error) {
    console.log(error)
  }





}

//POST CONTACTO NUEVO FUNCIONA BIEN--- con varios canales incluidoss

const agregarNuevocontacto = async()=>{
  
  // VARIABLES
  let direccion = document.getElementById("input-direccion").value;
  let ciudad = document.getElementById("ciudad").value;
  let compania = document.getElementById("compania").value;
  let nombre = document.getElementById("input-nombre").value;
  let apellido = document.getElementById("input-apellido").value;
  let cargo =  document.getElementById("input-cargo").value;
  let correo =  document.getElementById("input-email").value;
  let usuario = localStorage.getItem("id")
  
  
  // contactos has canales
  let preferencia = document.querySelectorAll(".input-preferencias");
  let interes = document.querySelectorAll(".input-interes");
  let cuenta = document.querySelectorAll(".cuentaContacto");
  let canal = document.querySelectorAll(".canal");
  let canales = []

  for (let i = 0; i <  preferencia.length; i++) {
   const canalesObj = {
  
    interes: interes[i].value,
    preferencias: preferencia[i].value,
    canale_id: canal[i].value,
    cuenta: cuenta[i].value
    
   }
  canales.push(canalesObj)
  }





    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", localStorage.getItem("token"));
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify(
        {
          nombre: nombre,
          apellido: apellido,
          cargo: cargo,
          correo: correo,
          direccion: direccion,
         ciudades_id: ciudad,
         companias_id: compania,
         usuarios_id: usuario,
         canales: canales
          
        }
      );
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(raw);
      console.log(requestOptions);
      
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
let contactosId = []
console.log(contactosId)







  

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
  
     data.forEach(dato=>{
     console.log(dato)  
     })
      
    
    const contactos = data.map((data)=>({
      
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      imagen:data.imagen,
      id: data.id,
      cargo: data.cargo,
      pais: data.paise["nombre"],
      paisId : data.paises_id,
      ciudad: data.ciudade["nombre"],
      ciudadId : data.ciudades_id,
      region: data.regione["nombre"],
      regionId: data.regiones_id,
      companiaId: data.companias_id,
      compania: data.compania["nombre"],
      direccion: data.direccion,
      canal:data.canales.map(canal=>{
        let canales = canal.nombre
        return canales
      }),
      interes: data.canales.map(canal=>{
        let interes =canal.contactos_has_canales.interes
        return interes
      }),
      canalId:data.canales.map(canal=>{
        let canalesId = canal.id
        return JSON.parse(canalesId)
      }),
      preferencia: data.canales.map(canal=>{
        let preferencia=canal.contactos_has_canales.preferencias
        return preferencia
      }),
      cuenta: data.canales.map(canal=>{
        let cuenta=canal.contactos_has_canales.cuenta
        return cuenta
      })

    }))
    


    displaycontacto(contactos);
  
  })
    
  
}



const displaycontacto = (contactos)=>{
    
  let obj = []
 
    console.log( contactos)
    contactos.forEach(contacto =>{

      let canales={
        channel :contacto.canal,
        channelId :contacto.canalId,
        con: contacto.id,
        interes: contacto.interes,
        preferencias: contacto.preferencia,
        cuenta:contacto.cuenta,
        pais: contacto.pais,
        region: contacto.region,
        ciudad: contacto.ciudad,
        compania: contacto.compania,
        regionId: contacto.regionId,
        ciudadId: contacto.ciudadId,
        paisId:contacto.paisId,
        companiaId: contacto. companiaId,
        direccion:contacto.direccion
      }
      obj.push(canales)
    })
    console.log(obj)

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
    <div>
    <div class='tableDiv channels-box'>${contacto.canal}</div>
    </div>
   </td>
   <td><div class='section-meter'>
   <div class='meter-container'>
   <div><p>${contacto.interes[0]}%</p></div>
   <div class="meter">
       <span data-interes = ${contacto.interes[0]} class= "barra-interes m-${contacto.interes[0]}"></span>
   </div>
</div>
   </div></td>
   <td>
   <div class='actions'>
       <span data-id=${contacto.id} data-nombre=${contacto.nombre} data-apellido=${contacto.apellido} data-direccion=${contacto.direccion} data-correo=${contacto.correo} data-imagen=${contacto.imagen} data-canalid=${contacto.canalId} data-cargo=${contacto.cargo} class='edit-contact'><i class="fas fa-edit"></i></span>
       <span data-id=${contacto.id} data-nombre=${contacto.nombre} data-apellido=${contacto.apellido} class='remove-contact'><i class="fas fa-trash remove-user" data-id=${contacto.id}></i></span>
   </div>
</td>
   </tr>
  
    `)
  
    
   cuerpoTablaContactos.innerHTML =  Html.join("");








   let btnEditar = document.querySelectorAll(".edit-contact");
   let btnEliminar = document.querySelectorAll(".remove-contact");
   let checkHija = document.querySelectorAll(".checkbox-del");
   let contador = document.getElementById("contador-checkeados");
     contador.innerText = contactos.length
   let Contactoscheckeados = []
   

   checkHija.forEach(hija=>{
    hija.addEventListener("click", ()=>{

      if(hija.checked == true){
        let btnEliminarVarios= document.getElementById("eliminar-contactos");
        btnEliminarVarios.style.display = "block"
        let idContact= hija.getAttribute("data-id");
        console.log(idContact)
        Contactoscheckeados.push(idContact)

        contador.innerText = Contactoscheckeados.length

      } else{
        btnEliminarVarios.style.display = "none"
      }

    })
   })
    // Elimina varios contactos a la vez
   let btnEliminarVarios= document.getElementById("eliminar-contactos");
   btnEliminarVarios.addEventListener("click", ()=>{
       let popup = document.getElementById("pop-up");
       popup.style.display = "block"
       let h2 =document.getElementById("title-name");
       let btnaceptar = document.getElementById("submit");
       let cancelar = document.getElementById("submitcancelar")
       h2.innerText= "¿Estas seguro que quieres eliminar los contactos seleccionados?"

      cancelar.addEventListener("click", ()=>{
        popup.style.display = "none"
      })

     btnaceptar.addEventListener("click", ()=>{
       
           if(Contactoscheckeados.length > 0 ){
             for (let i = 0; i < Contactoscheckeados.length; i++) {
                const id = Contactoscheckeados[i];  
                eliminarContacto(id)
              }
           } else if (contactosId.length > 0 ){
                 
              for (let i = 0; i < contactosId.length; i++) {
                const id = contactosId[i]; 
                eliminarContacto(id)
              }
           }

     })
      
   })

 
  //-------ELIMINAR TODOS CONTACTOS DE UNA------
   let checkboxMadre = document.getElementById("check-all-boxes")
   checkboxMadre.addEventListener("click", ()=>{
     if(checkboxMadre.checked){
      let btnEliminarVarios= document.getElementById("eliminar-contactos");
      btnEliminarVarios.style.display = "block"
      let contador = document.getElementById("contador-checkeados");
      contador.innerText =contactosId.length
      
     }else{
      btnEliminarVarios.style.display = "none"
     }
      let checkHijas = document.querySelectorAll(".checkbox-del")
      checkHijas.forEach(hija=>{
       if(hija.checked == false){
         hija.checked = true
         let btnEliminarVarios= document.getElementById("eliminar-contactos");
         btnEliminarVarios.style.display = "block"
       }else if(!checkboxMadre.checked) {
        hija.checked = false
       }
      })
   })
  
   // ----------------------------BOTON EDITAR CONTACTO-------------------------------
     btnEditar.forEach(btn=>{
       btn.addEventListener("click", ()=>{

        popUpEditarContacto.style.display = "block";
       

       // DATOS DEL CONTACTOO SELECCIONADO
       let nombre = btn.getAttribute('data-nombre');
       let id= btn.getAttribute('data-id');
       let apellido = btn.getAttribute('data-apellido');
       let correo = btn.getAttribute('data-correo');
       let cargo = btn.getAttribute('data-cargo');
       let direccion= btn.getAttribute('data-direccion');
       let canalId = btn.getAttribute("data-canalid");
       console.log(id)

       console.log(obj)
       obj.forEach(ob=>{
         if(id == ob.con){
         let canales =  ob.channel;
         let canalesId =ob.channelId;
         let companiass = ob.compania
         console.log(companiass)
         console.log(canales)
         console.log(canalesId)
         console.log(ob.regionId)

         

         for (let index = 0; index < canales.length; index++) {
           const canales = ob.channel[index];
           const canalesId = ob.channelId[index];
           const interes= ob.interes[index];
           const preferencias= ob.preferencias[index];
           const cuenta = ob.cuenta[index];
           console.log(preferencias)

        
           let contenedor = document.querySelector(".imprimir-prueba-canales");
           let divPadre = document.createElement("div");
           divPadre.innerHTML=`
         
           <div class='channel-info-row'>
            <div class='tableDiv'>
             <label for="interes">Interés</label>
             <select name="interes"  class="edit-input-interes" >
                 <option value=${interes} disabled selected>${interes}</option>
                 <option value="0" >0%</option>
                 <option value="25" >25%</option>
                 <option value="50" >50%</option>
                 <option value="75" >75%</option>
                 <option value="100" >100%</option>
             </select>
           </div>

          <div class='tableDiv'>
             <label for="canal-Contacto">Canal de Contacto</label>
             <select name="canal"  class="edit-canal" >
                 <option value="${canalesId}" disabled selected>${canales}</option>
             </select>
         </div>
         <div class='tableDiv'>
             <label for="cuenta">Cuenta Contacto</label>
             <input type="text" name="cuenta" class="edit-cuentaContacto">
         </div>
         <div class='tableDiv'>
             <label for="preferencias">Preferencias</label>
             <select name="preferencias" class="edit-input-preferencias">
                 <option value=${preferencias} selected>${preferencias}</option>
                 <option value="ACTIVO">Activo</option>
                 <option value="NO MOLESTAR" >No molestar</option>
                 <option value="EN EL TRABAJO" >En el trabajo</option>
                 <option value="AUSENTE" >Ausente</option>

             </select>
         </div>
         <div class='actions'>
         <span class='remove-fila-canal'><i class="fas fa-trash remove-user"></i></span>
        </div>
         
        </div>
         
         `
         
         
         contenedor.appendChild(divPadre)
         
         let input = document.querySelectorAll(".edit-cuentaContacto");
         console.log(input)
         input.forEach(input=>{
           input.value = cuenta
         })
         
         let canalContact = document.querySelectorAll(".edit-canal");
          canalContact.forEach(canal=>{
            canal.addEventListener("click", ()=>{
              canal.innerHTML = `<option value="" disabled selected>Seleccionar Canal</option>`
              getCanalesModif()
            })
          })
          let remove= document.querySelectorAll(".remove-fila-canal");
          remove.forEach(btn=>{
            btn.addEventListener("click", ()=>{
              contenedor.removeChild(divPadre)
            })

          })

        }
        
        const  compania = document.getElementById("edit-compania");
        const optionCompania = document.createElement("option");
        optionCompania.innerText= ob.compania;
        optionCompania.value= ob.companiaId
        optionCompania.selected = true

        const paisContact= document.getElementById("edit-pais");
        const optionpais = document.createElement("option");
        optionpais.innerText= ob.pais;
        optionpais.value= ob.paisId
        optionpais.selected = true

        const regionContact= document.getElementById("edit-region");
        const optionregion = document.createElement("option");
        optionregion.innerText= ob.region;
        optionregion.value= ob.regionId
        optionregion.selected = true


        const ciudadContact= document.getElementById("edit-ciudad");
        const optionciudad= document.createElement("option");
        optionciudad.innerText= ob.ciudad;
        optionciudad.value= ob.ciudadId
        optionciudad.selected = true


        ciudadContact.appendChild(optionciudad)
        regionContact.appendChild(optionregion)
        paisContact.appendChild(optionpais)
        compania.appendChild(optionCompania)
        console.log(regionContact)
        
      }})
      
 

       // poner datos en popup--------------------------------------

       const  nombreModifContacto = document.getElementById("edit-input-nombre");
       const  apellidoModifContacto = document.getElementById("edit-input-apellido");
       const  cargoModifContacto = document.getElementById("edit-input-cargo");
       const  correoModifContacto = document.getElementById("edit-input-email");
       const  direccionModifContacto = document.getElementById("edit-input-direccion");
       

       direccionModifContacto.value = direccion;
       nombreModifContacto.value = nombre;
       apellidoModifContacto.value = apellido;
       correoModifContacto.value = correo;
       cargoModifContacto.value = cargo;
       
       btnCancelarModifContacto.addEventListener("click", ()=>{
       
        location.href = 'contactos.html'

       })
       let idContacto = btn.getAttribute('data-id')

       btnEnviarModifContacto.addEventListener("click", async()=>{
       
        await modificarcontactoSinCanales(idContacto)

       })

       })
     })
    //----------------------------------BOTONagregar canalesNO EDITA NADA---------
    btnAgregarCanalesModif.addEventListener("click", ()=>{
      console.log("hola")
     let divCanales = document.createElement("div");

     divCanales.innerHTML=`
     
     <div class='channel-info-row'>

     <div class='tableDiv'>
         <label for="interes">Interés</label>
         <select name="interes" class="edit-input-interes">
             <option value="" disabled selected>Seleccionar Interes</option>
             <option value="0" selected>0%</option>
             <option value="25" >25%</option>
             <option value="50" >50%</option>
             <option value="75" >75%</option>
             <option value="100" >100%</option>
         </select>
     </div>

     <div class='tableDiv'>
         <label for="canal-Contacto">Canal de Contacto</label>
         <select name="canal" class="edit-canal" >
             <option value="" disabled selected>Seleccionar Canal</option>
         </select>
     </div>
     <div class='tableDiv'>
         <label for="cuenta">Cuenta de usuario</label>
         <input type="text" name="cuenta" class="edit-cuentaContacto">
     </div>
     <div class='tableDiv'>
         <label for="preferencias">Preferencias</label>
         <select name="preferencias" class="edit-input-preferencias">
             <option value="Sin preferencia" selected>Sin preferencia</option>
             <option value="ACTIVO">Activo</option>
             <option value="NO MOLESTAR" >No molestar</option>
             <option value="EN EL TRABAJO" >En el trabajo</option>
             <option value="AUSENTE" >Ausente</option>

         </select>
     </div>
     <div class='actions'>
     <span class='remove-fila-canal'><i class="fas fa-trash remove-user"></i></span>
    </div>
     </div>
     
     
     `

     let contenedor = document.querySelector(".imprimir-prueba-canales");
     contenedor.appendChild(divCanales)
      
     let canalContacto = document.querySelectorAll(".edit-canal");
     canalContacto.forEach(canal=>{
       canal.addEventListener("click", ()=>{
         getCanalesModif()
       })
     })


     let deleteCanal = document.querySelectorAll(".remove-fila-canal");
      deleteCanal.forEach(btn=>{
        btn.addEventListener("click", ()=>{
          contenedor.removeChild(divCanales)
        })
      })
    })


    //-------------------- BOTON ELIMINAR CONTACTO ANDA BIEN--------------------------------

    btnEliminar.forEach(btn =>{
      btn.addEventListener("click", async()=>{
        let popupConfirmar = document.querySelector("#pop-up")
        let btnConfirmar = document.querySelector("#submit")
        let btnCancelar = document.querySelector("#submitcancelar")
        let h3 = document.querySelector("#title-name")
        let nombre = btn.getAttribute('data-nombre');
        let apellido = btn.getAttribute('data-apellido');
        popupConfirmar.style.display = "block";
        h3.innerText = `Estás deguro que deseas eliminar el contacto ${nombre} ${apellido}`
         
     
        btnCancelar.addEventListener("click", ()=>{
          location.href = 'contactos.html'
         })
        btnConfirmar.addEventListener("click", async ()=>{
            let id = btn.getAttribute('data-id')
            console.log(id)
            await eliminarContacto(id)
         })
    });
     
    
})}

getContactos();




// --------------------------------------------------------------CANALESSSS-----------------------------------------------------------------------------

let agregarCanales = async (id)=>{
  let preferencia = document.querySelectorAll(".edit-input-preferencias").value;
  let interes = document.querySelectorAll(".edit-input-interes").value;
  let cuenta = document.querySelectorAll(".edit-cuentaContacto").value;
  let canal = document.querySelectorAll(".edit-canal").value;


  var myHeaders = new Headers();
 myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");

 var raw = JSON.stringify({
  "canales": [
    {
      "canale_id": canal,
      "interes": interes,
      "cuenta": cuenta,
      "preferencias": preferencia
    }
  ]
 });

 var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
 };

 fetch(`http://localhost:3000/contactosHasCanales/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}

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
const  canalModifContacto = document.querySelectorAll(".edit-canal");
const  cuentaModifContacto = document.getElementById("edit-cuenta");
const  preferenciasModifContacto = document.getElementById("edit-input-preferencias");
const btnEnviarModifContacto = document.getElementById("edit-submit-pop-up");
const btnCancelarModifContacto = document.getElementById("edit-cancel-pop-up");



//--------------------------------------------------------------------------------MODIFICAR CONTACTO VER BIEN-------------------------

const modificarcontactoSinCanales = async (id)=>{

  let ciudad = document.getElementById("edit-ciudad").value;
  let direccion = document.getElementById("edit-input-direccion").value;
  let compania = document.getElementById("edit-compania").value;
  let nombre = document.getElementById("edit-input-nombre").value;
  let apellido = document.getElementById("edit-input-apellido").value;
  let cargo=  document.getElementById("edit-input-cargo").value;
  let correo =  document.getElementById("edit-input-email").value;
  let usuario = localStorage.getItem("id");


  // CANALES--------------------
  let interes = document.querySelectorAll(".edit-input-interes");
  let canal= document.querySelectorAll(".edit-canal");
  let cuenta = document.querySelectorAll(".edit-cuentaContacto");
  let preferencia = document.querySelectorAll(".edit-input-preferencias");
  let canalesVarios = []
  for (let index = 0; index <interes.length; index++) {


    let objCanales = {
      canale_id: canal[index].value,
      cuenta: cuenta[index].value,
      preferencias: preferencia[index].value,
      interes: interes[index].value
    }

    canalesVarios.push(objCanales)
  }


  console.log(canalesVarios)

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
    "canales": canalesVarios
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  
    let contactCanalsPromise = fetch(`http://localhost:3000/contactosHasCanales/${id}`, requestOptions)
    .then((response) => {return response})
        .then((result) => result.json().then())
        .catch(error => console.log('error', error));

  let contactPromise = fetch(`http://localhost:3000/contactos/${id}`, requestOptions)
  .then((response) => {return response})
      .then((result) => result.json().then())
      .catch(error => console.log('error', error));
  
  Promise.all([contactCanalsPromise, contactPromise]).then(()=>{location.href = 'contactos.html'})
  

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
  
    
    // FOR EACH
    content.forEach(dato=>{
      
      let canal = document.querySelectorAll(".edit-canal");
      canal.forEach(element=>{
        
        let opciones = document.createElement("option");
        opciones.classList.add('opciones-canal')
        opciones.textContent = dato.nombre;
        opciones.value = dato.id


        element.appendChild(opciones)
        

       })
      
      
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
  regionModifContacto.innerHTML = `<option value="" disabled selected>Seleccionar Region</option>`
  getRegionesModif()
});

paisModifContacto.addEventListener("click", ()=>{
  paisModifContacto.innerHTML = `<option value="" disabled selected>Seleccionar Pais</option>`
  getPaisesModif()
});
ciudadModifContacto.addEventListener("click", ()=>{
  ciudadModifContacto.innerHTML = `<option value="" disabled selected>Seleccionar Ciudad</option>`
  getciudadeModif()
});


canalModifContacto.forEach(element=>{
  element.addEventListener("click", ()=>{
    element.innerHTML = `<option value="" disabled selected>Seleccionar Canal</option>`
    getCanalesModif();
  })
})

companiaModifContacto.addEventListener("click", ()=>{
  companiaModifContacto.innerHTML = `<option value="" disabled selected>Seleccionar Compañia</option>`
  getCompaniasModif();
});

btnCancelarModifContacto.addEventListener("click", ()=>{
  popUpEditarContacto.style.display = "none"
})

//--------------------------------------- BUSCADOR UN CONTACTO------------------------------------

let buscadorInput = document.getElementById("buscador-contactos");
let buscarIcon = document.getElementById("search-icon");




function buscador(input){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };
  // ANDA BIEN
  fetch(`http://localhost:3000/buscar/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((res)=>{res.forEach(array =>{
              if(array.length !== 0){
              const contactos = array.map((data)=>({
      
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

                displaycontacto(contactos)
                 
              }
          })
      }
  ))
  .catch(error => console.log('error', error));



  //   
  fetch(`http://localhost:3000/buscadorPorPaises/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((array)=>{
    if(array.length !== 0){
      const contactos = array.map((data)=>({

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

        displaycontacto(contactos)
         
      }
  }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscadorPorCiudades/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((array)=>{
    if(array.length !== 0){
      const contactos = array.map((data)=>({

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

        displaycontacto(contactos)
         
      }
      }
  ))
  .catch(error => console.log('error', error));



  fetch(`http://localhost:3000/buscadorPorRegion/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((array)=>{
    if(array.length !== 0){
      const contactos = array.map((data)=>({

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

        displaycontacto(contactos)
         
      }
      }
  ))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscadorPorCanales/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((array)=>{
    
    
    if(array.length !== 0){
    const contactos = array.map((data)=>({

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

      displaycontacto(contactos)
       
    }
  }))
  .catch(error => console.log('error', error));

  fetch(`http://localhost:3000/buscarContactosporCompania/${input}`, requestOptions)
  .then((response) => {return response})
  .then((result) => result.json().then((array)=>{
        
    if(array.length !== 0){
      const contactos = array.map((data)=>({
  
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
  
        displaycontacto(contactos)
         
      }
      }
  ))
  .catch(error => console.log('error', error));
}


buscarIcon.addEventListener("click", ()=>{
 
  let informacion = buscadorInput.value
  if(informacion != ""){
    cuerpoTablaContactos.innerHTML = "";
    buscador(informacion)  
  }else{
    getContactos()
  }
})



buscadorInput.addEventListener("keypress",async (event)=>{
  let informacion = buscadorInput.value

  if(event.code == "Enter"){
    cuerpoTablaContactos.innerHTML = "";
     buscador(informacion)
   }
}) 

buscadorInput.addEventListener("keyup",(event)=>{
  let informacion = buscadorInput.value

  if(informacion == ""){
    getContactos()
   }
}) 


