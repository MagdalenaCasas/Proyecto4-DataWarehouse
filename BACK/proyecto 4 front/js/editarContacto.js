


const editRegion =  document.getElementById("edit-region");
const editPais =  document.getElementById("edit-pais");
const editCiudad =  document.getElementById("edit-ciudad");
const popupEdit = document.getElementById("pop-up-editar-contacto");
const btnCancelarEdit  =  document.getElementById("edit-cancel-pop-up");


console.log(editRegion)



let EditCompania = () => {
    let compania = document.getElementById("edit-compania").value;
    console.log("la compania es", compania);
    return compania;
}
let EditPreferencia = () => {
    let preferencia = document.getElementById("edit-input-preferencias").value;
    console.log("la preferencia es", preferencia);
    return preferencia;
}
let EditInteres = () => {
    let interes = document.getElementById("edit-input-interes").value;
    console.log("el interes es", interes);
    return interes;
}
  
let EditCanal = () => {
    let canal = document.getElementById("edit-canal").value;
    console.log("el id canal es", canal);
    return canal;
}
let EditRegion = ()=>{
    let region = document.getElementById("edit-region").value;
    console.log("el id Region es", region);
    return region;
}
let EditPais= ()=>{
    let pais = document.getElementById("pais").value;
    console.log("el id pais es", pais);
    return pais;
}
let EditCiudad = () => {
    let ciudad = document.getElementById("ciudad").value;
    console.log("el id ciudad es", ciudad);
    return ciudad;
}


//GET DEL PUPUP


const getRegionesEdit = async()=>{
  
  
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
        let region = document.getElementById("edit-region")
        region.appendChild(opciones)   
        
      })
      
    } catch (error) {
      console.log(error)
    }
    
}

const getPaisesEdit= async()=>{
  
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
const getciudadesEdit= async()=>{
  
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
        ciudad.appendChild(opciones)
      });
      
      
    } catch (error) {
      console.log(error)
    }
    
}
  
  
  



// ADD EVENT LISTENER
/*

editRegion.addEventListener("click", async ()=>{
    await getRegionesEdit()
});

editPais.addEventListener("click", async ()=>{
     await getPaisesEdit()
})

editCiudad.addEventListener("click", async()=>{
    await getciudadesEdit()
})
btnCancelarEdit.addEventListener("click", ()=>{
    popupEdit.style.display = "none"
})
*/
