
    let angry;

    const riveInstance = new rive.Rive({
      src: "rive_animation.riv",                  // Archivo .riv que contiene la animación
      canvas: document.getElementById("canvas"),  // Elemento <canvas> donde se dibuja la animación, se puede modificar con css
      autoplay: true,                             // Comienza a reproducir apenas cargue
      stateMachines: "STATE_MACHINE",             // Nombre de la state machine definida en Rive

      // onLoad se ejecuta una vez que el archivo .riv se ha cargado completamente
      onLoad: () => {
        // Ajusta el tamaño del área de dibujo de Rive para que coincida con las dimensiones del <canvas>
        riveInstance.resizeDrawingSurfaceToCanvas();

        // Obtiene todos los inputs definidos en la state machine llamada
        angry = riveInstance
          .stateMachineInputs("STATE_MACHINE")
          .find(input => input.name === "click"); // se busca específicamente el input que se llame "click".
      },
    });

    //Gets the canvas item
    const robo = document.getElementById("canvas");
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const distance = 40;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Detect mouse movement
    document.addEventListener("mousemove", (e) => {

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (mouseX > screenWidth/2) {targetX = e.clientX - canvas.width / 2 + distance;}
      else {targetX = e.clientX - canvas.width /2 - distance}

      if (mouseY > screenHeight/2) {targetY = e.clientY - canvas.height/2 + distance;}
      else {targetY = e.clientY - canvas.height/2 - distance;}

    });

    // Smoothly update canvas position
    function animate() {
    // Lerp: move current position a fraction toward target
    const speed = 0.05; // adjust between 0 (slow) and 1 (fast)
    currentX += (targetX - currentX) * speed;
    currentY += (targetY - currentY) * speed;

    canvas.style.left = currentX + "px";
    canvas.style.top = currentY + "px";

    requestAnimationFrame(animate);
    }

    animate();

    //Al hacer click, correr animación
    document.addEventListener("click", (e) =>{
        angry.fire();
    })