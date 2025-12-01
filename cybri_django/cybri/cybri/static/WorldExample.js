// ======= WORLD CONSTRUCTION =======
const World1 = new World("MUNDO DE EJEMPLO","","Assets/Music/WorldExampleMusic.mp3")
const Level1 = new Level("Una nueva aventura","","Level.html")
const Level2 = new Level("Contraseñas seguras","","Level.html")
const Level3 = new Level("Mensajes peligrosos","","Level.html")
const Level4 = new Level("Aplicaciones engañosas","","Level.html")
const Level5 = new Level("Primer jefe","","Level.html")

// ======= SEQUENCES =======
// The sequences must be a list of triggers, then the list must be executed by the sequence trigger.
// The triggers work in SECONDS
const ExampleSequence = [
    () => Delay(1),
    () => ZoomTrigger(0.8, 1, "smooth"),
    () => CameraPointTrigger(1000,0,2,"expoInOut"),
    () => Delay(2),
    () => CameraPointTrigger(0,0,2,"expoInOut"),
    () => Delay(1),
    () => ZoomTrigger(1, 1, "expoInOut")
];

// ======= LOAD WORLD DATA =======
window.addEventListener("load", () => {
    World1.loadContent();
    SequenceTrigger(ExampleSequence);
    createLevelButton(Level1,170,460);
    createLevelButton(Level2,730,460);
    createLevelButton(Level3,650,240);
    createLevelButton(Level4,900,280);
    createLevelButton(Level5,1170,240);
});