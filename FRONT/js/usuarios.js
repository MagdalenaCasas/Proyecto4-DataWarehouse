// VARIABLES CREAR NUEVO USUARIO
const nombreNuevoUsuario = document.getElementById("input-first-name");
const apellidoNuevoUsuario = document.getElementById("input-last-name");
const correoNuevoUsuario = document.getElementById("input-email");
const perfilNuevoUsuario = document.getElementById("input-profile");
const contrasenaNuevoUSuario =  document.getElementById("input-password");
const confirmarcContrasenaNuevoUSuario =  document.getElementById("input-confirm-password")
const btnNuevoUsuario = document.getElementById("submit-pop-up");
const btnCancelarNuevoUsuario = document.getElementById("cancel-pop-up");
const agregarUsuarioPopUp = document.getElementById("pop-up-usuario");
const btnAddUsuario = document.getElementById("add-usuario");
const tableData = document.getElementById("tableData");
let btnEnviarCambiosUsuario = document.getElementById("edit-submit-pop-up")
let btncancelarCambiosUsuario = document.getElementById("edit-cancel-pop-up")
let token  = localStorage.getItem("token");


btnAddUsuario.addEventListener("click", ()=>{
 agregarUsuarioPopUp.style.display = "block"
});


btncancelarCambiosUsuario.addEventListener("click", ()=>{
  let editarUsuarioPopUp = document.getElementById("pop-up-editar-usuario")
  editarUsuarioPopUp.style.display= "none";
})
btnCancelarNuevoUsuario.addEventListener("click", ()=>{
  nombreNuevoUsuario.value = "";
  apellidoNuevoUsuario.value = "";
  correoNuevoUsuario.value= "";
  perfilNuevoUsuario.value= "";
  agregarUsuarioPopUp.style.display ="none"
})


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



btnNuevoUsuario.addEventListener("click", ()=>{

  if(contrasenaNuevoUSuario.innerText == confirmarcContrasenaNuevoUSuario.innerText){
    nuevoUsuario()
    agregarUsuarioPopUp.style.display = "none"

  }else{
    alert("la contraseña debe ser la misma")
  }

})

// POST USUARIOS-- ANDA BIEN
const nuevoUsuario = async () => {
  let resultado = document.getElementById("input-profile");
  const nombre = nombreNuevoUsuario.value;
  const apellido = apellidoNuevoUsuario.value;
  const correo = correoNuevoUsuario.value;
  const perfil = resultado.options[resultado.selectedIndex].text;
  const esAdmin = resultado.value
  const contrasena = contrasenaNuevoUSuario.value;

  try {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "nombre": nombre,
      "apellido": apellido,
      "correo": correo,
      "perfil": perfil,
      "esAdmin":  esAdmin,
      "contrasena": contrasena
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/registrar", requestOptions)
      .then(response => response.text())
      .then(result => alert(result), location.href = 'usuarios.html')
      .catch(error => console.log('error', error));
  } catch (error) {
    console.log(error);
  }



}


// ELIIMINAR USUARIO ANDA BIEN
const eliminarUsuario = async (id)=> {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));



 var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
 };

 fetch(`http://localhost:3000/usuarios/${id}`, requestOptions)
  .then(response => response.json())
  .then(result => location.href = 'usuarios.html')
  .catch(error => console.log('error', error));
}


// MODIFICAR USUARIO

const modificarUsuario = async (id, objeto)=>{
  


   var myHeaders = new Headers();
   myHeaders.append("Authorization", localStorage.getItem("token"));
   myHeaders.append("Content-Type", "application/json");

   var raw = JSON.stringify(objeto);

   var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(`http://localhost:3000/usuarios/${id}`, requestOptions)
   .then(response => response.text())
   .then(result => location.href = 'usuarios.html')
   .catch(error => console.log('error', error));

}
  
// TRAER E IMPRIMIR EN EL DOM LOS USUARIOS ANDA BIEN
const getUsuarios= async ()=>{

  var myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("token"));
  
  
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/usuarios", requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data)
   const usuarios =  data.map((usuario)=>({
      nombre: usuario.usuario.nombre,
      apellido: usuario.usuario.apellido,
      correo: usuario.usuario.correo,
      perfil:usuario.usuario.perfil,
      id: usuario.usuario.id,
      contrasena: usuario.usuario.contrasena
    }))


  displayusuario(usuarios)

})
}

// ARMAR TABLA EN EL DOM DE USUARIOS Y BOTONES ANDA BIEN
const displayusuario = (usuarios)=>{


  const Html  = usuarios.map( usuario =>`
  <tr>
  <td>${usuario.nombre}</td>
  <td>${usuario.apellido}</td>
  <td>${usuario.correo}</td>
  <td>${usuario.perfil}</td>
 <td>
    <div class='actions'>
        <span data-id=${usuario.id} data-nombre=${usuario.nombre} data-apellido=${usuario.apellido} data-correo=${usuario.correo}  data-contrasena=${usuario.contrasena} data-perfil=${usuario.perfil} class='edit-user'><i class="fas fa-edit"></i></span>
        <span data-id=${usuario.id}  data-nombre=${usuario.nombre}  class='remove-user'><i class="fas fa-trash remove-user" data-nombre=${usuario.nombre}  data-id=${usuario.id}></i></span>
    </div>
</td>
</tr>

  `).join("")
  
  tableData.innerHTML =  Html
  
  let btnEditar = document.querySelectorAll(".edit-user");
  let btnEliminar = document.querySelectorAll(".remove-user");


  // BOTON EDITAR USUAIRO
  btnEditar.forEach(btn =>{

    btn.addEventListener("click", async()=>{
      let editarUsuarioPopUp = document.getElementById("pop-up-editar-usuario")
      editarUsuarioPopUp.style.display= "block";

      // DATOS DEL USUARIO SELECCIONADO
      let idUsuario = btn.getAttribute('data-id');
      let nombre = btn.getAttribute('data-nombre');
      let apellido = btn.getAttribute('data-apellido');
      let correo = btn.getAttribute('data-correo');
      let perfil = btn.getAttribute('data-perfil');
      let contrasena = btn.getAttribute('data-contrasena');

      // DATOS A PONER EN EL POPUP
      let nombreInput = document.getElementById("edit-input-first-name")
      let apellidoInput= document.getElementById("edit-input-last-name")
      let correoInput = document.getElementById("edit-input-email")
       let contrasenaVieja =  document.getElementById("input-password-vieja");
       nombreInput.value = nombre;
       apellidoInput.value = apellido;
       correoInput.value = correo;
       contrasenaVieja.value = contrasena
       console.log("btn editar" , idUsuario, nombre, apellido, correo, perfil, contrasena);

       btnEnviarCambiosUsuario.addEventListener("click",()=>{
         let contrasenaVieja = document.getElementById("input-password-vieja").value;
         let contrasenNueva = document.getElementById("edit-input-password").value;
         let confirmContrasena = document.getElementById("edit-input-confirm-password").value;
         console.log(contrasenaVieja );

         console.log(contrasenNueva)
         console.log(confirmContrasena)

         if(contrasenaVieja !== contrasena){
           alert("debes ingresar la contraseña vieja")
         } else if(confirmContrasena.value = ""){

          let resultado1 = document.getElementById("edit-input-profile");
          let nombre1 = document.getElementById("edit-input-first-name"). value;
          let apellido1= document.getElementById("edit-input-last-name"). value;
          let correo1 = document.getElementById("edit-input-email"). value;
          let contrasena1 =  document.getElementById("input-password-vieja").value;
          const perfil1 = resultado1.options[resultado1.selectedIndex].text;
          const esAdmin1 = resultado1.value



          let UsuarioContraseñaVieja = {
            "nombre": nombre1,
            "apellido": apellido1,
            "correo": correo1,
            "perfil": perfil1,
            "esAdmin":  esAdmin1,
            "contrasena": contrasena1
          }

          modificarUsuario(idUsuario, UsuarioContraseñaVieja)

         }else if(contrasenNueva !== confirmContrasena){
          alert("La contraseña Nueva y Repetir contraseña deben coincidir")
         } else if( contrasenNueva == confirmContrasena){
          

          let resultado2 = document.getElementById("edit-input-profile");
          let nombre2 = document.getElementById("edit-input-first-name"). value;
          let apellido2= document.getElementById("edit-input-last-name"). value;
          let correo2 = document.getElementById("edit-input-email"). value;
          let contrasena2 =  document.getElementById("edit-input-confirm-password").value;
          const perfil2 = resultado2.options[resultado2.selectedIndex].text;
          const esAdmin2= resultado2.value

          let UsuarioContraseñaNueva = {
            "nombre": nombre2,
            "apellido": apellido2,
            "correo": correo2,
            "perfil": perfil2,
            "esAdmin":  esAdmin2,
            "contrasena": contrasena2
          }
          
           modificarUsuario(idUsuario, UsuarioContraseñaNueva)
         }
       })
    })

  })

 // BOTON ELIMINAR usuario
 btnEliminar.forEach(btn =>{

  btn.addEventListener("click",async ()=>{
    let id = btn.getAttribute('data-id');
    let nombre = btn.getAttribute('data-nombre')
    console.log(id);
    console.log(nombre)
    let popup = document.getElementById("pop-up");
    let h2 = document.getElementById("title-name");
    h2.innerText = `¿Estas seguro que deseas eliminar el Usuario  ${nombre}?`
    
    let submit = document.getElementById("submit")
    let submitcancelar = document.getElementById("submitcancelar");
    
    submitcancelar.addEventListener("click", ()=>{
      popup.style.display = "none"
    })
    submit.addEventListener("click", async ()=>{
      await eliminarUsuario(id);
    })
   
    //h3.innerText = nombre
    popup.style.display= "block"
   
  })
})

}

getUsuarios()