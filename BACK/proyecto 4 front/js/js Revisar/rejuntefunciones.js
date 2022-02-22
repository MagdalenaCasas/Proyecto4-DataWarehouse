/*const getUsuarios= async()=>{
 

  try {
     
     var myHeaders = new Headers();
     myHeaders.append("Authorization", localStorage.getItem("token").replace(/["']/g, ""));


   var requestOptions = {
     method: 'GET',
     headers: myHeaders,
     redirect: 'follow'
   };
   
   const response = await fetch("http://localhost:3000/usuarios", requestOptions);
   const content = await response.json();
   console.log(content)
     
   
 // REVISAR FOR EACH
   content.forEach(usuario=>{
    let dataHtml = '';

   // LLENAR TABLA
  
    dataHtml += `
   <tr>
      <td>${usuario.usuario.nombre}</td>
      <td>${usuario.usuario.apellido}</td>
      <td>${usuario.usuario.correo}</td>
      <td>${usuario.usuario.perfil}</td>
      <td>
          <div class='actions'>
              <span data-id=${usuario.usuario.id} class='edit-user'><i class="fas fa-edit"></i></span>
              <span data-id=${usuario.usuario.id} class='remove-user'><i class="fas fa-trash remove-user" data-id=${usuario.usuario.id}></i></span>
          </div>
      </td>
   </tr>
    `;

  
  
   tableData.innerHTML = dataHtml;
  })
  
  } catch (error) {
     console.log(error)
  }
}*/


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

// ELIIMINAR contacto ANDA BIEN
const eliminarContact = async (id)=> {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", token);



 var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
 };

 fetch(`http://localhost:3000/contactos/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => location.href = 'contactos.html')
  .catch(error => console.log('error', error));
}

let borrarInfo = ()=>{
  nombreNuevoContacto.value = "";
  apellidoNuevoContacto.value ="";
  cargoNuevoContacto.value = "";
  emailNuevoContacto.value = "";
  direccionNuevoContacto.value = "";
  companiaNuevoContacto.disabled = 'disabled';
  regionNuevoContacto.disabled = 'disabled';
  paisNuevoContacto.disabled = 'disabled';
  ciudadNuevoContacto.disabled =  'disabled';
  preferenciasNuevoContacto.disabled = 'disabled';
  interesNuevoContacto = 'disabled';


}

const mostrarRegiones = async()=>{

  
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
    opciones.value= dato.id
    let region = document.getElementById("region")
    region.appendChild(opciones)   
     
  })
  let seleccion = document.querySelectorAll(".opciones-region")
  console.log(seleccion);
   // ver por que no funciona
  seleccion.forEach(sel=>{
    sel.addEventListener("click",()=>{
     
    })
  })


  } catch (error) {
      console.log(error)
  }

}



const getRegiones= async()=>{
var myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem("token"));

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch("http://localhost:3000/regiones", requestOptions)
.then(response => response.json())
.then(result =>{
    result.forEach(res =>{
    let regionId = res.id
     let divContenedor = document.createElement("div")
     divContenedor.classList.add("div-contenedor-regiones")
     let h2 = document.createElement("h2")
     h2.innerText = res.nombre
     h2.classList.add("regiones-h2")
     let btnEditar = document.createElement("div");
     let txtEditar = document.createElement("p");
     txtEditar.innerText = "Editar";
     let txtEliminar= document.createElement("p");
     txtEliminar.innerText = "Eliminar"
     let btnEliminar = document.createElement("div");
     btnEliminar.appendChild(txtEliminar);
     btnEditar.appendChild(txtEditar);
     let divImpresion = document.createElement("div");
     divImpresion.classList.add("div-imprimir-paises", res.id);
     divContenedor.appendChild(h2);
     divContenedor.appendChild(btnEditar);
     divContenedor.append(btnEliminar)
     divContenedor.appendChild(divImpresion);
     let impresion  = document.querySelector(".impresion");
     impresion.appendChild(divContenedor);
      getPaises(regionId)
    })



})
.catch(error => console.log('error', error));
}

const getPaises= async(id)=>{
var myHeaders = new Headers();
myHeaders.append("Authorization", localStorage.getItem("token"));

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch("http://localhost:3000/paises", requestOptions)
.then(response => response.json())
.then(result =>{
    result.forEach(res =>{
     let paisId = res.id
     let region = res.regiones_id
     console.log(paisId)
     console.log(region)
     let divContenedor = document.createElement("div")
     divContenedor.classList.add("div-contenedor-paises")
     let h2 = document.createElement("h2")
     h2.innerText = res.nombre
     h2.classList.add("paises-h2", res.id)
     let btnEditar = document.createElement("div");
     let txtEditar = document.createElement("p");
     txtEditar.innerText = "Editar";
     let txtEliminar= document.createElement("p");
     txtEliminar.innerText = "Eliminar"
     let btnEliminar = document.createElement("div");
     btnEliminar.appendChild(txtEliminar);
     btnEditar.appendChild(txtEditar);
     let divImpresion = document.createElement("div");
     divImpresion.classList.add("div-imprimir-ciudades");
     divContenedor.appendChild(h2);
     divContenedor.appendChild(btnEditar);
     divContenedor.append(btnEliminar)
     divContenedor.appendChild(divImpresion);
     let impresion  = document.querySelectorAll("div-imprimir-paises");
     impresion.forEach(pais=>{
       if(impresion.classList.value == region){
        pais.appendChild(divContenedor)
       }
     })

    })



})
.catch(error => console.log('error', error));
}



getRegiones()