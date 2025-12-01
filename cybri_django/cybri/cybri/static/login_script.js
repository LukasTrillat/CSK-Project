document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    if (container && registerBtn && loginBtn) {
        
        // Al hacer clic en "Registrarse" (Panel Derecho) -> Activa panel deslizante
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });

        // Al hacer clic en "Iniciar Sesión" (Panel Izquierdo) -> Desactiva panel deslizante
        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    } else {
        console.error("Error: No se encontraron los elementos del slider (container, registerBtn, loginBtn)");
    }
});