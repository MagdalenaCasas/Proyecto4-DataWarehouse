// VARIABLES DE LOGIN

const correoUsuario = document.getElementById("correoUsuario");
const contrasenaUsurio= document.getElementById("contrasenaUsuario");
const btnLogin = document.getElementById("login");
const form = document.querySelector('#login-form')


console.log(correoUsuario);
console.log(contrasenaUsurio)
console.log(btnLogin)




const login = async()=>{
    const usuario = correoUsuario.value;
    const contrasena = contrasenaUsurio.value;
    try {
      
      var myHeaders = new Headers();
  
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "correo": usuario,
        "contrasena": contrasena
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/login", requestOptions)
        .then(response => response.json())
        .then(result => localStorage.setItem("token", `Bearer ${result}`,location.href = 'contactos.html'))
        .catch(error => console.log('error', error));
      

    } catch (error) {
      console.log(error.message);
    }

}


//BOTONES
form.addEventListener('submit', async (event) =>{
   event.preventDefault();
    login() 
   /*location.href = 'contactos.html';*/
})
