
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
    let robotTargetX = 0;
    let robotTargetY = 0;
    let robotCurrentX = 0;
    let robotCurrentY = 0;
    const distance = 40;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Detect mouse movement
    document.addEventListener("mousemove", (e) => {

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (mouseX > screenWidth/2) {robotTargetX = e.clientX - robo.width / 2 + distance;}
      else {robotTargetX = e.clientX - robo.width /2 - distance}

      if (mouseY > screenHeight/2) {robotTargetY = e.clientY - robo.height/2 + distance;}
      else {robotTargetY = e.clientY - robo.height/2 - distance;}

    });

    // Smoothly update canvas position
    function animate() {
      // Lerp: move current position a fraction toward target
      const speed = 0.05; // adjust between 0 (slow) and 1 (fast)
      robotCurrentX += (robotTargetX - robotCurrentX) * speed;
      robotCurrentY += (robotTargetY - robotCurrentY) * speed;

      robo.style.left = robotCurrentX + "px";
      robo.style.top = robotCurrentY + "px";

      requestAnimationFrame(animate);
    }

    animate();
