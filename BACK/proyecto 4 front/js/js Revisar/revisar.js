let llenarTablaContactos = async()=>{
    let dataHtml = '';
    let nombreCanal = contacto.canales.map(canal=>{
       return canal.nombre
     });
    
     let interes = contacto.canales.map(canal=>{
       return canal.contactos_has_canales.interes
     })
    
    
     if(contacto.imagen == null){
      contacto.imagen=  "./assets/images.png"
     }else{
       contacto.imagen = contacto.imagen
     }
     
    // LLENAR TABLA
    
    
    dataHtml += `
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
                <span>${contacto.paise.nombre}</span>
                <span class='subtext'>${contacto.regione.nombre}</span>
            </div>
        </td>
        <td>${contacto.compania.nombre}</td>
        <td>${contacto.cargo}</td>
        <td>
            <div class='tableDiv channels-box'>${nombreCanal}</div>
        </td>
        <td><div class='section-meter'>${interes}</div></td>
        <td>
            <div class='actions'>
                <span data-id=${contacto.id} class='edit-contact'><i class="fas fa-edit"></i></span>
                <span data-id=${contacto.id} class='remove-contact'><i class="fas fa-trash remove-contact" data-id=${contact.id}></i></span>
            </div>
        </td>
    </tr>
    `;
    
    cuerpoTablaContactos.innerHTML = dataHtml;

}

  /*const getContactos = async()=>{
  
  
  try {
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token").replace(/["']/g, ""));
    
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    const response = await fetch("http://localhost:3000/contactos", requestOptions);
    const content = await response.json();

    
    // REVISAR FOR EACH
    content.forEach(contacto=>{
      let dataHtml = '';
      let nombreCanal = contacto.canales.map(canal=>{
        return canal.nombre
      });
      
      let interes = contacto.canales.map(canal=>{
        return canal.contactos_has_canales.interes
      })
      
      
      if(contacto.imagen == null){
        contacto.imagen=  "./assets/images.png"
      }else{
        contacto.imagen = contacto.imagen
      }
      
      // LLENAR TABLA
      
      
      dataHtml += `
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
      <span>${contacto.paise.nombre}</span>
      <span class='subtext'>${contacto.regione.nombre}</span>
      </div>
      </td>
      <td>${contacto.compania.nombre}</td>
      <td>${contacto.cargo}</td>
      <td>
      <div class='tableDiv channels-box'>${nombreCanal}</div>
      </td>
      <td><div class='section-meter'>${interes}</div></td>
      <td>
      <div class='actions'>
      <span data-id=${contacto.id} class='edit-contact'><i class="fas fa-edit"></i></span>
      <span data-id=${contacto.id} class='remove-contact'><i class="fas fa-trash remove-contact" data-id=${contacto.id}></i></span>
      </div>
      </td>
      </tr>
      `;
      
      cuerpoTablaContactos.innerHTML = dataHtml;
      
    })
    
    
    
    
    
    
  } catch (error) {
    console.log(error)
  }
}*/

// anda bien
const prueba = async ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token").replace(/["']/g, "")
    );
    
    
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

    displaycontacto(contactos)

  })
    

}


// si anda
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
       <span data-id=${contacto.id} class='edit-contact'><i class="fas fa-edit"></i></span>
       <span data-id=${contacto.id} class='remove-contact'><i class="fas fa-trash remove-contact" data-id=${contacto.id}></i></span>
     </div>
   </td>
  </tr>
  
  `).join("")
  cuerpoTablaContactos.innerHTML =  Html
}




