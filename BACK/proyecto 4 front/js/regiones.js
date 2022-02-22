let popup = document.getElementById("pop-up");
let regionInput = document.getElementById("title-input")
let btnAgregarRegion = document.querySelector(".add-reg");
let btnAgregarNuevaRegion = document.getElementById("submit");
let btncancelar = document.querySelector(".cancel");
let tableData = document.querySelector("#tableData")
let impresion= document.querySelector(".impresion");
let inputRegion = document.getElementById("title-input");



let token  = localStorage.getItem("token");
console.log(btnAgregarRegion)

btnAgregarRegion.addEventListener("click", ()=>{
 popup.style.display = "block"
})

btnAgregarNuevaRegion.addEventListener("click",async ()=>{
    AgregarRegion()
})

btncancelar.addEventListener("click", ()=>{
  regionInput.value= " "
  popup.style.display="none"
})

 // --------------------------------------AGREGAR REGION------------------------
let AgregarRegion = async ()=>{
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
        idRegion = element.id;
        region= element.nombre
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
            editar.innerText= "Editar";
        let eliminar = document.createElement("span");
            eliminar.innerText= "Eliminar";
        let agregarPais = document.createElement("div");
            agregarPais.innerText= "Agregar pais a Region";
            agregarPais.classList.add("btn-agregar-pais")
        let divPaises= document.createElement("div");
           divPaises.classList.add("contenedor-paises");
           divPaises.setAttribute("id", `${idRegion}`)



           editar.addEventListener("click", ()=>{
            console.log("editar Region"+ element.id)
          });

          eliminar.addEventListener("click", ()=>{
            console.log("eliminar Region"+ element.id)
          });
           //appendChild
           let html = document.querySelector(".impresion");
            console.log(divPaises)

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
            editar.innerText= "Editar";
        let eliminar = document.createElement("span");
            eliminar.innerText= "Eliminar";
        let agregarCiudad = document.createElement("div");
          agregarCiudad.innerText= "Agregar Ciudad a Pais";
          agregarCiudad.classList.add("btn-agregar-ciudad")
        let divCiudades= document.createElement("div");
          divCiudades.classList.add("contenedor-ciudades");
          divCiudades.setAttribute("data-id", `${ paisId}`)

         
             console.log(regiones_id)
           botonesdiv.appendChild(editar);
           botonesdiv.appendChild(eliminar);
           botonesdiv.appendChild(agregarCiudad);
           contNombreybtn.appendChild(nombre);
           contNombreybtn.appendChild(botonesdiv);
           contenedorGral.appendChild(contNombreybtn);
           contenedorGral.appendChild(divCiudades);

           editar.addEventListener("click", ()=>{
            console.log("editar Pais"+ element.id)
          });

          eliminar.addEventListener("click", ()=>{
            console.log("eliminar Pais"+ element.id)
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
            editar.innerText= "Editar";
        let eliminar = document.createElement("span");
            eliminar.innerText= "Eliminar";

            editar.addEventListener("click", ()=>{
              console.log("editar Ciudad"+ element.id)
            });

            eliminar.addEventListener("click", ()=>{
              console.log("eliminar Ciudad"+ element.id)
            });


          console.log(paises_id)
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

