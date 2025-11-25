// Aquí esta el contendor pricnipal
const container = document.getElementById
('container')

//Este es el boton que activa el formulario de registro
const registerBtn = document.
getElementById('register');

// Este es el boton que activa el formulario de login
const loginBtn = document.getElementById
('login');

// Cuando se hace click en "Sign Up", se agrega la clase "activate" esto hace que el contenedor muestre el formulario de registro
registerBtn.addEventListener('click', () =>{
    container.classList.add('active');
});

// Cuando se hace click en "Sign In", se agrega la clase "activate" esto hace que el contenedor muestre el formulario de inicio de sesión
loginBtn.addEventListener('click', () =>{
    container.classList.remove('active');
});