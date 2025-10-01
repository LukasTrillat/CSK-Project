function scrollToElement(elementSelector, instance = 0) {
    // Usa querySelectorAll para obtener una lista de todos los elementos que coinciden
    const elements = document.querySelectorAll(elementSelector);
    
    // Verifica si hay elementos y si la instancia solicitada existe
    if (elements.length > instance) { 
        // Desplaza el elemento específico a la vista
        elements[instance].scrollIntoView({ behavior: 'smooth' });
    }
}

// 1. Obtén los elementos de enlace correctamente, sin reasignar 'document'.
const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");

// 2. Asigna los event listeners
// Nota: 'link1' es el enlace de "Features", y 'link2' es el enlace de "About".

// Cuando se hace clic en "Features", desplázate a la sección con ID #features
link1.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace (recarga de página)
    scrollToElement("#features");
});

// Cuando se hace clic en "About", desplázate a la sección con ID #about
link2.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    scrollToElement("#about");
});