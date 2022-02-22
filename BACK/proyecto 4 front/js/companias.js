const btnAgregar =document.getElementById("add-company");
const popup = document.getElementById("pop-up-company");
const cancelarPopup =document.getElementById("cancel-pop-up");
const regionNuevaCompania =  document.getElementById("region");
const paisNuevaCompania =  document.getElementById("pais");
const ciudadNuevaCompania=  document.getElementById("ciudad");
const btnsubmitCompania = document.getElementById("submit-pop-up");
const nombrecompania = document.getElementById("input-name");
const direccioncompania = document.getElementById("input-address");
const correocompania = document.getElementById("input-email");
const telefonocompania = document.getElementById("input-telephone");
const regionEditCompania =  document.getElementById("edit-region");
const paisEditCompania =  document.getElementById("edit-pais");
const ciudadEditCompania=  document.getElementById("edit-ciudad");
let bntCancelarEdit = document.getElementById("edit-cancel-pop-up");
let btnEnviarCambios = document.getElementById("edit-submit-pop-up");


let  ciudad = document.getElementById("ciudad").value


let token  = localStorage.getItem("token");

console.log(regionNuevaCompania)

btnAgregar.addEventListener("click", ()=>{
    popup.style.display = "block"
})

cancelarPopup.addEventListener("click", ()=>{
    popup.style.display = "none"
});

bntCancelarEdit.addEventListener("click", ()=>{
  let popUpEdit  = document.getElementById("pop-up-edit-company")
  popUpEdit.style.display = "none"
})

btnsubmitCompania.addEventListener("click", ()=>{
    agregarCompania();

})



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

let paisEditSeleccionado = ()=>{
  let pais = document.getElementById("edit-pais").value;
  console.log("el id pais es", pais);
  return pais;
}
let ciudadEditSeleccionada = () => {
  let ciudad = document.getElementById("edit-ciudad").value;
  console.log("el id ciudad es", ciudad);
  return ciudad;
}

// VARIABLES AGREGAR COMPANIA


// GET
const getRegiones = async()=>{
   
    try {
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization",localStorage.getItem("token"));
      
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
        region.appendChild(opciones) ;  
      })
      
    } catch (error) {
      console.log(error)
    }
    
}

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
      myHeaders.append("Authorization", localStorage.getItem("token"));
      
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
        let ciudad = document.getElementById("ciudad")
        ciudad.appendChild(opciones)
      });
      
      
    } catch (error) {
      console.log(error)
    }
    
}

// GET DATOS PARA EDIT
const getRegionesEdit = async()=>{
   
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization",localStorage.getItem("token"));
    
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
      let regionEdit = document.getElementById("edit-region")
      regionEdit.appendChild(opciones) ;  
    })
    
  } catch (error) {
    console.log(error)
  }
  
}

const getPaisesporidEdit = async()=>{
  
  let regionEditID = document.getElementById("edit-region").value;
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch(`http://localhost:3000/paises/${regionEditID}`, requestOptions);
    const content = await response.json();
    console.log(content)
    
    content.forEach(dato=>{
      console.log(dato.nombre)
      let opciones = document.createElement("option");
      opciones.textContent = dato.nombre;
      opciones.value= dato.id
      paisEdit = document.getElementById("edit-pais")
      paisEdit.appendChild(opciones)
    });
    
    
  } catch (error) {
    console.log(error)
  }
  
}
const getCiudadesidEdit = async()=>{
  
  let paisID = document.getElementById("edit-pais").value;
  
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    
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
      let ciudadEdit = document.getElementById("edit-ciudad")
      ciudadEdit.appendChild(opciones)
    });
    
    
  } catch (error) {
    console.log(error)
  }
  
}


// OBTENER E IMPRIMIR TODAS LAS COMPANIAS CON BOTONES
const getCompanias = async ()=>{
    try {
        
     var myHeaders = new Headers();
     myHeaders.append("Authorization", localStorage.getItem("token"));
        
     var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
     };
    
     fetch("http://localhost:3000/companias", requestOptions)
     .then(response => response.json())
     .then(data => {
      console.log(data)

     const companias =  data.map((compania)=>({
        nombre: compania.nombre,
        direccion: compania.direccion,
        pais: compania.paise.nombre,
        region:compania.regione.nombre,
        telefono: compania.telefono,
        correo: compania.correo,
        id:compania.id,
      }))
  
  
    displayCompanias(companias)
  
  })
    
     




} catch (error) {
       console.log(error) 
    }
}

// BOTONES E IMPRESION GET COMPANIAS--- ANDA BIEN ELIMINAR, NO ANDA MODIFICAR
const displayCompanias= (companias)=>{


  const Html  = companias.map( compania =>`
  <tr>
  <td>${compania.nombre}</td>
  <td>${compania.direccion}</td>
  <td>
  <div class='tableDiv'>
   <span>${compania.pais}</span>
   <span class='subtext'>${compania.region}</span>
 </div>
</td>
  <td>${compania.telefono}</td>
  <td>${compania.correo}</td>
 <td>
    <div class='actions'>
        <span data-id=${compania.id} data-nombre=${compania.nombre} data-direccion=${compania.direccion} data-correo=${compania.correo} data-pais=${compania.pais} data-region=${compania.region} data-telefono=${compania.telefono} class='edit-company'><i class="fas fa-edit"></i></span>
        <span data-id=${compania.id} class='remove-company'><i class="fas fa-trash remove-company" data-id=${compania.id}></i></span>
    </div>
</td>
</tr>

  `).join("")
  
  tableData.innerHTML =  Html
  
  let btnEditar = document.querySelectorAll(".edit-company");
  let btnEliminar = document.querySelectorAll(".remove-company");


  // BOTON EDITAR COMPANIAS
  btnEditar.forEach(btn =>{

    btn.addEventListener("click", async()=>{
      
    
      let popupEdit = document.getElementById("pop-up-edit-company")
       popupEdit.style.display= "block";
  
      // DATOS DE COMPANIA SELECCIONADO
      let idCompania = btn.getAttribute('data-id');
      let nombre = btn.getAttribute('data-nombre');
      let direccion = btn.getAttribute('data-direccion');
      let correo = btn.getAttribute('data-correo');
      let pais = btn.getAttribute('data-pais');
      let region = btn.getAttribute('data-region');
      let telefono = btn.getAttribute('data-telefono');

      // DATOS A PONER EN EL POPUP
       let nombreInput = document.getElementById("edit-input-name");
       let direccionInput= document.getElementById("edit-input-address");
       let correoInput = document.getElementById("edit-input-email");
       let telefonoInput = document.getElementById("edit-input-telephone");

       nombreInput.value = nombre;
       direccionInput.value = direccion;
       correoInput.value = correo;
       telefonoInput.value = telefono;
       console.log("btn editar" , idCompania, nombre,direccion, correo, pais, region,telefono );

       btnEnviarCambios.addEventListener("click", ()=>{
         modificarCompania(idCompania)
      })
        

    })

  })

 // BOTON ELIMINAR COMPANIA
 btnEliminar.forEach(btn =>{

  btn.addEventListener("click",async ()=>{
    let id = btn.getAttribute('data-id')
    await eliminarCompania(id);
   
  })
})

}



// ELIIMINAR COMPANIA-- ANDA BIEN
const eliminarCompania = async (id)=> {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));



 var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
 };

 fetch(`http://localhost:3000/companias/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => location.href = 'companias.html')
  .catch(error => console.log('error', error));
}




// AGREGAR NUEVA COMPANIA-- ANDA BIEN
const agregarCompania = async()=>{

    // VARIABLES AGREGAR COMPANIA

   let nombrecompania = document.getElementById("input-name");
   let direccioncompania = document.getElementById("input-address");
   let correocompania = document.getElementById("input-email");
   let telefonocompania = document.getElementById("input-telephone");
   let regionCompania = document.getElementById("region").value;
   let paisCompania = document.getElementById("pais").value;
   let ciudadCompania = document.getElementById("ciudad").value;

    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));
        
       myHeaders.append("Content-Type", "application/json");
    
     var raw = JSON.stringify({
      "nombre": nombrecompania.value,
      "direccion": direccioncompania.value,
      "correo": correocompania.value,
      "telefono": telefonocompania.value,
      "ciudades_id": ciudadCompania,
      "paises_id": paisCompania,
      "regiones_id": regionCompania,
    });
    
   var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/companias", requestOptions)
      .then(response => response.json())
      .then(result => alert(result), location.href = 'companias.html')
      .catch(error => console.log('error', error));
      clear()
    } catch (error) {
        console.log(error)
        
    }
}

const modificarCompania = async(id)=>{

   // VARIABLES PARA MODIFICAR USUARIO

   let nombre = document.getElementById("edit-input-name"). value;
   let direccion = document.getElementById("edit-input-address"). value;
   let correo = document.getElementById("edit-input-email"). value;
   let telefono= document.getElementById("edit-input-telephone"). value;
   let region= document.getElementById("edit-region"). value;
   let pais = document.getElementById("edit-pais"). value;
   let ciudad = document.getElementById("edit-ciudad"). value;

  try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization",localStorage.getItem("token"));
      myHeaders.append("Content-Type", "application/json");
  
     var raw = JSON.stringify({
      "nombre": nombre,
      "direccion": direccion,
      "correo": correo,
      "telefono": telefono,
      "ciudades_id": ciudad,
      "paises_id": pais,
      "regiones_id": region
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
  fetch(`http://localhost:3000/companias/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => alert(result), location.href = 'companias.html')
    .catch(error => console.log('error', error));
    clear()
  } catch (error) {
      console.log(error)
      
  }
}








getCompanias()


regionNuevaCompania.addEventListener("click",async()=>{
    await  getRegiones()
})

paisNuevaCompania.addEventListener("click",async ()=>{
    await getPaisesporid();
})
  
ciudadNuevaCompania.addEventListener("click", async()=>{
    await getciudadesporid()
})
  

regionEditCompania.addEventListener("click",async()=>{
  await  getRegionesEdit()
})

paisEditCompania.addEventListener("click",async ()=>{
  await getPaisesporidEdit()
})

ciudadEditCompania.addEventListener("click", async()=>{
  await getCiudadesidEdit ()
})

