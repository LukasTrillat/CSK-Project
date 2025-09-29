
    let angry;

    const riveInstance = new rive.Rive({
      src: "animations/rive_test_robot.riv",                  // Archivo .riv que contiene la animación
      canvas: document.getElementById("robot_canvas"),  // Elemento <canvas> donde se dibuja la animación, se puede modificar con css
      autoplay: true,                             // Comienza a reproducir apenas cargue
      stateMachines: "STATE_MACHINE",             // Nombre de la state machine definida en Rive

      // onLoad se ejecuta una vez que el archivo .riv se ha cargado completamente
      onLoad: () => {
        riveInstance.resizeDrawingSurfaceToCanvas();

      },
    });

    //Gets the canvas item
    const robo = document.getElementById("robot_canvas");
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

      if (mouseX > screenWidth/2) {targetX = e.clientX - robo.width / 2 + distance;}
      else {targetX = e.clientX - robo.width /2 - distance}

      if (mouseY > screenHeight/2) {targetY = e.clientY - robo.height/2 + distance;}
      else {targetY = e.clientY - robo.height/2 - distance;}

    });

    // Smoothly update canvas position
    function animate() {
      // Lerp: move current position a fraction toward target
      const speed = 0.05; // adjust between 0 (slow) and 1 (fast)
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;

      robo.style.left = currentX + "px";
      robo.style.top = currentY + "px";

      requestAnimationFrame(animate);
    }

    animate();
