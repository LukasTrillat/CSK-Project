// WORLD CONSTRUCTION 
class Level {
    constructor(Name, FrontPage, GoToPage) {
        this.Name = Name
        this.FrontPage = FrontPage
        this.GoToPage = GoToPage
    }
}

class World {
    constructor(Name, RiveWorld, AmbientMusic) {
        // World main configurations
        this.Name = Name
        this.RiveWorld = RiveWorld
        this.AmbientMusic = AmbientMusic

        // World extra configurations
        this.ScrollEnabled = true

        // Technic variables
        this.AudioPlayer = null; 
    }

    loadContent() {
        // NAME
        const label = document.getElementById("WorldName");
        label.textContent = this.Name;
    }
}

// WORLD CAMERA
let WorldCamera = {
    x: 0,
    y: 0,
    zoom: 1,
    rotate: 0,
    easing: "smooth"
};

function UpdateCamera() {
    WorldContainer.style.transform = `translate(${-WorldCamera.x}px, ${-WorldCamera.y}px) scale(${WorldCamera.zoom})`;
    WorldContainer.style.transformOrigin = "0 0";
}

