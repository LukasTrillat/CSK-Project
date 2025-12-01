// ======= WORLD CONSTRUCTION =======
const World1 = new World("MUNDO DE EJEMPLO","","Assets/Music/WorldExampleMusic.mp3")
const Level1 = new Level("Una nueva aventura","","Level.html")
const Level2 = new Level("Contraseñas seguras","","Level.html")
const Level3 = new Level("Mensajes peligrosos","","Level.html")
const Level4 = new Level("Aplicaciones engañosas","","Level.html")
const Level5 = new Level("Usuarios peligrosos","","Level.html")
const Level6 = new Level("Primer jefe","","Level.html")

// ======= SEQUENCES =======
// The sequences must be a list of triggers, then the list must be executed by the sequence trigger.
// The triggers work in SECONDS
const ExampleSequence = [
    () => Delay(1),
    () => CameraPointTrigger(1080,0,2,"expoInOut"),
    () => Delay(3),
    () => CameraPointTrigger(0,0,2,"expoInOut"),
    () => Delay(2),
    () => ZoomTrigger(1.1, 1, "backInOut")
];

// ======= LOAD WORLD DATA =======
window.addEventListener("load", () => {
    World1.loadContent();
    SequenceTrigger(ExampleSequence);
    createLevelButton(Level1,110,600);
    createLevelButton(Level2,750,590);
    createLevelButton(Level3,670,350);
    createLevelButton(Level4,960,380);
    createLevelButton(Level5,1300,330);
    createLevelButton(Level6,1970,380);
});