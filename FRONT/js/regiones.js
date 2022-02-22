let popup = document.getElementById("pop-up");
let titulo = document.getElementById("title-name")
let btnAgregarRegion = document.querySelector(".add-reg");
let btnEditar = document.getElementById("submitEditar");
let btnAgregarNuevaRegion = document.getElementById("submit");
let btncancelar = document.querySelector(".cancel");
let tableData = document.querySelector("#tableData")
let impresion= document.querySelector(".impresion");
let inputRegion = document.getElementById("title-input");



let token  = localStorage.getItem("token");
console.log(btnAgregarRegion)

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

btnAgregarRegion.addEventListener("click", ()=>{
  titulo.innerText= "Agregar Region";
 popup.style.display = "block";
})

btnAgregarNuevaRegion.addEventListener("click",async ()=>{
    AgregarRegion()
})


btncancelar.addEventListener("click", ()=>{
  popup.style.display="none";
  //location.href = 'regiones.html'
})

 // --------------------------------------AGREGAR REGION, PAIS Y CIUDAD ------------------------
let AgregarRegion = async ()=>{

  let regionInput = document.getElementById("title-input");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
   "nombre": regionInput.value
     });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
fetch("http://localhost:3000/regiones", requestOptions)
  .then(response => response.json())
  .then(result => location.href = 'regiones.html')
  .catch(error => console.log('error', error));

}
let agregarPaises = async(id)=>{

  let input = document.getElementById("title-input-edit-pais").value;


  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre": input,
    "regiones_id": id
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/paises", requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}
let agregarCiudades = async(id)=>{

  let input = document.getElementById("title-input-edit-ciudad").value;


  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre": input,
    "paises_id": id
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/ciudades", requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}
//--------------------------------------------------ELIMINAR REGION--------------------------------
 let eliminarRegion = async (id)=>{
  var myHeaders = new Headers();
   myHeaders.append("Authorization", localStorage.getItem("token"));
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/regiones/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}

//---------------------------------------------------EDITAR REGION-----------
let editarRegion = async (id)=>{
 let regionInput = document.getElementById("title-input").value;


  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre": regionInput
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/regiones/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}

//--------------------------------- GET Y MOSTRAR REGIONES-----------------------
const getRegiones= async ()=>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  


  fetch("http://localhost:3000/regiones", requestOptions)
  .then(response => response.json())
  .then(data => {

      data.forEach(element => {
       let  idRegion = element.id;
        let region= element.nombre
        let contenedorGral = document.createElement("div");
           contenedorGral.classList.add('contenedor-region')
        let contNombreybtn = document.createElement("div");
            contNombreybtn.classList.add('contenedor-nombre-ybtn')
        let nombre = document.createElement("h3");
           nombre.innerText = region;
           nombre.classList.add('h3-region')
        let botonesdiv= document.createElement("div");
            botonesdiv.classList.add('actions');
        let editar = document.createElement("span");
        let iconoEditar = document.createElement("i");
           iconoEditar.setAttribute("class", "fas fa-edit edit-btn")
        let eliminar = document.createElement("span");
        let icono = document.createElement("i");
            icono.setAttribute("class", "fas fa-trash  remove-btn")
        let agregarPais = document.createElement("div");
            agregarPais.innerText= "Agregar pais a Region";
            agregarPais.setAttribute("data-id", `${idRegion}`)
            agregarPais.classList.add("btn-agregar-pais")
        let divPaises= document.createElement("div");
           divPaises.classList.add("contenedor-paises");
           divPaises.setAttribute("id", `${idRegion}`)



           // AGREGAR PAIS
          agregarPais.addEventListener("click",()=>{

            //--------------- popup--------------
            let popup = document.getElementById("pop-up-editar-pais");
            let btnEditar = document.getElementById("editar-pais");
            btnEditar.style.display = "none";
            let h2 = document.getElementById("title-name-edit-pais")
            h2.innerText= "Agregar ";
            popup.style.display = "block";
           
            let btnAgregar= document.getElementById("agregar-pais");
            //-------------------------------------------------
            btnAgregar.addEventListener("click", ()=>{
                let idRegionSelc = agregarPais.getAttribute("data-id");
                console.log(idRegionSelc)
                agregarPaises(idRegionSelc)
              })



          });



          // EDITAR REGION
          editar.addEventListener("click",()=>{
            let btnSubmit = document.getElementById("submit");
            btnSubmit.style.display = "none";
            titulo.innerText= "Editar Region";
            popup.style.display = "block";
            console.log("editar Region"+ element.id)
            let btnEditarRegion= document.getElementById("submitEditar");
            btnEditarRegion.style.display = "block"
            btnEditarRegion.addEventListener("click", async()=>{
              await  editarRegion(element.id)
            })
          });
        // ELIMINAR REGION


          eliminar.addEventListener("click", ()=>{
           // console.log("eliminar Region"+ element.id)
           // eliminarRegion(element.id)

           let popup = document.getElementById("pop-up-confirm");
           let h2 = document.getElementById("title-name-confirm");
           h2.innerText = `¿Estas seguro que quieres eliminar la region ${region}?, Si eliminas la region, los paises , ciudades y Contactos de la región tambin se eliminarán.`
           popup.style.display= "block"

           let btnCancelar = document.getElementById("cancelar-confirm")
           btnCancelar.addEventListener("click", ()=>{
            popup.style.display= "none";
           })

           let btnConfirmar = document.getElementById("confirmar");
           btnConfirmar.addEventListener("click", ()=>{
            eliminarRegion(element.id)
           })



          });









           //appendChild
           let html = document.querySelector(".impresion");
            console.log(divPaises)

           editar.appendChild(iconoEditar) 
           eliminar.appendChild(icono)
           botonesdiv.appendChild(editar);
           botonesdiv.appendChild(eliminar);
           botonesdiv.appendChild(agregarPais)
           contNombreybtn.appendChild(nombre);
           contNombreybtn.appendChild(botonesdiv);
           contenedorGral.appendChild(contNombreybtn);
           contenedorGral.appendChild(divPaises);
           html.appendChild(contenedorGral)

           // buscar paises
           getPaises(idRegion)
    });






})
  

}


getRegiones();


//-------------------------------------------------PAISES-----------------------------
let getPaises = async (id)=>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 
  fetch(`http://localhost:3000/paises/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
      let divPaises = document.querySelectorAll(".contenedor-paises");
      console.log(divPaises);


      result.forEach(element=>{
        
         regiones_id = element.regiones_id;
          pais = element.nombre;
          paisId = element.id;


        let contenedorGral = document.createElement("div");
           contenedorGral.classList.add('contenedor-pais')
        let contNombreybtn = document.createElement("div");
            contNombreybtn.classList.add('contenedor-nombre-ybtn')
        let nombre = document.createElement("h3");
           nombre.innerText = pais;
           nombre.classList.add('h3-pais')
        let botonesdiv= document.createElement("div");
            botonesdiv.classList.add('actions');
        let editar = document.createElement("span");
        let iconoEditar = document.createElement("i");
          iconoEditar.setAttribute("class", "fas fa-edit edit-btn")
        let eliminar = document.createElement("span");
        let icono = document.createElement("i");
          icono.setAttribute("class", "fas fa-trash  remove-btn")
        let agregarCiudad = document.createElement("div");
          agregarCiudad.innerText= "Agregar Ciudad a Pais";
          agregarCiudad.classList.add("btn-agregar-ciudad")
          agregarCiudad.setAttribute("data-id", `${ paisId}` )
        let divCiudades= document.createElement("div");
          divCiudades.classList.add("contenedor-ciudades");
          divCiudades.setAttribute("data-id", `${ paisId}`)

         
          console.log(regiones_id)
           editar.appendChild(iconoEditar)
           eliminar.appendChild(icono)
           botonesdiv.appendChild(editar);
           botonesdiv.appendChild(eliminar);
           botonesdiv.appendChild(agregarCiudad);
           contNombreybtn.appendChild(nombre);
           contNombreybtn.appendChild(botonesdiv);
           contenedorGral.appendChild(contNombreybtn);
           contenedorGral.appendChild(divCiudades);


      //------------boton editar pias---------------------------
           editar.addEventListener("click",()=>{
              console.log(element.id)
            let popup = document.getElementById("pop-up-editar-pais");
            popup.style.display = "block"
            let h2 = document.getElementById("title-name-edit-pais");
            h2.innerText = `Deseas editar pais ${element.nombre}`
            let btnEdit =  document.getElementById("editar-pais");
            let btnAdd =  document.getElementById("agregar-pais");
            let btnCancel =  document.getElementById("cancelar-edit-pais");
            btnAdd.style.display = "none"
            console.log(btnCancel)
            btnCancel.addEventListener("click",async ()=>{

              console.log("btn putaso")
             // popup.style.display = "none"
            })
            btnEdit.addEventListener("click",async ()=>{
              await  editarPais(element.id)
            })
   
          });








      //-------------------------boton eliminar pais---------------------------------------------------
          eliminar.addEventListener("click", async()=>{
            //console.log("eliminar Pais"+ element.id)
            //await eliminarPais(element.id)

            let popup = document.getElementById("pop-up-confirm");
            let h2 = document.getElementById("title-name-confirm");
            h2.innerText = `¿Estas seguro que quieres eliminar el pais ${pais}?, Si eliminas el pais, las ciudades y Contactos del pais también se eliminarán.`
            popup.style.display= "block"
 
            let btnCancelar = document.getElementById("cancelar-confirm")
            btnCancelar.addEventListener("click", ()=>{
             popup.style.display= "none";
            })
 
            let btnConfirmar = document.getElementById("confirmar");
            btnConfirmar.addEventListener("click", async()=>{
             await eliminarPais(element.id)
            })
          });


       //------------------------boton agregar Ciudad---------------
      agregarCiudad.addEventListener("click",()=>{

        //--------------- popup--------------
        let btneditarCity= document.getElementById("editar-ciudad");
        btneditarCity.style.display = "none";

        let h2= document.getElementById("title-name-edit-ciudad")
        h2.innerText= `Agregar ciudad a pais ${element.nombre}`;
        let popup = document.getElementById("pop-up-editar-ciudad")
         popup.style.display = "block";
        let btnAceptar= document.getElementById("agregar-ciudad");
        //--------------------------------------------------

          btnAceptar.addEventListener("click", ()=>{
            let idPais = agregarCiudad.getAttribute("data-id");
            console.log(idPais)
            agregarCiudades(idPais)
          })



      });



          divPaises.forEach(elemento=>{

            if(elemento.id== regiones_id){

              elemento.appendChild(contenedorGral)
            }
          })


          // buscar ciudades
          getCiudades(paisId)
      })

    })
    .catch(error => console.log('error', error));

}

let editarPais = async(id)=>{

  let input = document.getElementById("title-input-edit-pais").value;


  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre": input
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/paises/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}


let eliminarPais = async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/paises/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}
//----------------------------------------------CIUDADES----------------------------------------------

let getCiudades = async (id)=>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
 
  fetch(`http://localhost:3000/ciudades/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      
    let divCiudades = document.querySelectorAll(".contenedor-ciudades");
      console.log(divCiudades);


      result.forEach(element=>{
        
          paises_id = element.paises_id;
          ciudad = element.nombre;
          ciudadId = element.id;


        let contenedorGral = document.createElement("div");
           contenedorGral.classList.add('contenedor-pais')
        let contNombreybtn = document.createElement("div");
            contNombreybtn.classList.add('contenedor-nombre-ybtn')
        let nombre = document.createElement("h3");
           nombre.innerText = ciudad;
           nombre.classList.add('h3-ciudad')
        let botonesdiv= document.createElement("div");
            botonesdiv.classList.add('actions');
       let editar = document.createElement("span");
        let iconoEditar = document.createElement("i");
          iconoEditar.setAttribute("class", "fas fa-edit edit-btn")
        let eliminar = document.createElement("span");
        let icono = document.createElement("i");
            icono.setAttribute("class", "fas fa-trash  remove-btn")



//---------------------------EDITAR CIUDAD------------------------
            editar.addEventListener("click",()=>{
              // saco btn agregar ciudad
              let btnAddCity = document.getElementById("agregar-ciudad");
              btnAddCity.style.display = "none";
              
             let h2 = document.getElementById("title-name-edit-ciudad");
              let popup = document.getElementById("pop-up-editar-ciudad");
             
              h2.innerText= `Editar Ciudad ${element.nombre}`;
              popup.style.display = "block";
              console.log("editar Ciudad"+ element.id)
             let btnEditCity = document.getElementById("editar-ciudad");
                       
             btnEditCity .addEventListener("click", async()=>{
                await  editarCiudad(element.id)
              })
            });


//---------------------------ELIMINAR CIUDAD------------------------            
  
            eliminar.addEventListener("click", async()=>{
             // console.log("eliminar Pais"+ element.id)
             // await eliminarCiudad(element.id)
             let popupConfirm = document.getElementById("pop-up-confirm");
             popupConfirm.style.display = "block"
             let h2 = document.getElementById("title-name-confirm");
             h2.innerText= `Estas seguro que deseas eñiminar la ciudad ${element.nombre}? Si la eliminas, los contactos que pertenecen a la Ciudad, también se eliminaran`;
             let btnCancel = document.getElementById("cancelar-confirm");
             let btnConfirm = document.getElementById("confirmar");


            btnCancel.addEventListener("click", async()=>{
              popupConfirm.style.display = "none"
            })  

            btnConfirm.addEventListener("click", async()=>{
             let id= element.id;
             eliminarCiudad(id)
            })  














            });


           console.log(paises_id)
           editar.appendChild(iconoEditar);
           eliminar.appendChild(icono)
           botonesdiv.appendChild(editar);
           botonesdiv.appendChild(eliminar);
           contNombreybtn.appendChild(nombre);
           contNombreybtn.appendChild(botonesdiv);
           contenedorGral.appendChild(contNombreybtn);
           
          divCiudades.forEach(elemento=>{
            let idCity = elemento.getAttribute('data-id')
            console.log(idCity);      
            if(idCity== paises_id){

             elemento.appendChild(contenedorGral)
            }
          })
      })

    })
    .catch(error => console.log('error', error));

}

let editarCiudad = async(id)=>{

  let input = document.getElementById("title-input-edit-ciudad").value;


  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre": input
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/ciudades/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}

let eliminarCiudad = async(id)=>{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  fetch(`http://localhost:3000/ciudades/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => location.href = 'regiones.html')
    .catch(error => console.log('error', error));
}

// add events cancelar

let btncancelarPais= document.getElementById("cancelar-edit-pais");
let popUpPais = document.getElementById("pop-up-editar-pais");
btncancelarPais.addEventListener("click", ()=>{
    popUpPais.style.display = "none"
})


let btncancelarCiudad= document.getElementById("cancelar-edit-ciudad");
let popUpciudad = document.getElementById("pop-up-editar-ciudad");


btncancelarCiudad.addEventListener("click", ()=>{
  popUpciudad.style.display = "none"
})