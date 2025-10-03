
// ------------ ALGORITHM TO GENERATE CHARACTERS  ------------ // 

const uppercase_letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
const letters = "abcdefghijklmnñopqrstuvwxyz".split('')
const special_characters = "!?¿.,_-".split('')
const numbers = "1234567890".split('')
function generateLetters(total=26, numLetters=11, numSpecial_chars=4, numUppercases=6, numNumbers=5){
    let finalList = []
    for (i=0;i<numLetters;i++){ finalList.push(letters[Math.floor(Math.random() * letters.length)]) }
    for (i=0;i<numSpecial_chars;i++){ finalList.push(special_characters[Math.floor(Math.random() * special_characters.length)]) }
    for (i=0;i<numUppercases;i++){ finalList.push(uppercase_letters[Math.floor(Math.random() * uppercase_letters.length)]) }
    for (i=0;i<numNumbers;i++){ finalList.push(numbers[Math.floor(Math.random() * numbers.length)]) }
    finalList.sort(() => Math.random() - 0.5);
    return finalList
}

// ------------ RENDER LETTER TILES ------------ // 

const letterTiles = {}
const letterTiles_ID = []
const letterTileCanvases_ID = []
const letterTileContainers_ID = []

// Function to import Rive Files
function renderTile(buttonName,sourceFile, canvasId, stateMachine = "STATE_MACHINE") {
    const instance = new rive.Rive({
        src: sourceFile,
        canvas: document.getElementById(canvasId),
        stateMachines: stateMachine,
        autoplay:true,
        onLoad: () => {instance.resizeDrawingSurfaceToCanvas()
        }
    })
    letterTiles[buttonName] = instance
}

//Creating the canvases
ammount_tiles = 26;
tile_canvas_size = 130
tile_canvas_x_offset = 100
tile_canvas_x_separation = 110

char_list = generateLetters()
for (i= 1; i< ammount_tiles + 1; i ++)
{
    // -- CANVAS CONTAINER ( RIVE - TEXT) --
    const container = document.createElement("div")
    container.id = "tile_container"+i;
    container.style.position = "absolute";

    //After 14 tiles, render them a bit lower
    if (i < 14)
    {
        container.style.top = "690px";
        container.style.left = tile_canvas_x_separation * i + tile_canvas_x_offset +"px";
    }
    else {
        container.style.top = "800px";
        container.style.left = tile_canvas_x_separation * (i -13) + tile_canvas_x_offset + "px";
    }

    // -- LETTER CANVAS --
    const letter_canvas = document.createElement("canvas")
    letter_canvas.width = tile_canvas_size;
    letter_canvas.height = tile_canvas_size;
    letter_canvas.style.position = "absolute";
    letter_canvas.style.top = "0px";
    letter_canvas.style.left = "0px";
        //Draws the letter itself
        const ctx = letter_canvas.getContext("2d")
        ctx.font = "40px Cherokee Mystique";
        ctx.textAlign = "center";  
        ctx.textBaseline = "middle";
        ctx.fillText(char_list[i - 1],tile_canvas_size / 2, tile_canvas_size / 2)

    // -- RIVE CANVAS --
    const rive_canvas = document.createElement("canvas")
    rive_canvas.id = "tile_canvas"+i;
    rive_canvas.width = tile_canvas_size;
    rive_canvas.height = tile_canvas_size;

    // -- APPEND CANVASES TO HTML AND LIST --
    container.appendChild(rive_canvas)
    container.appendChild(letter_canvas)
    document.body.appendChild(container)

    //Adds the canvas to the list
    letterTiles_ID.push("tile_"+i)
    letterTileCanvases_ID.push("tile_canvas"+i)
    letterTileContainers_ID.push("tile_container"+i)
}

// For each canvas, render a tile
for (i = 0; i < letterTiles_ID.length; i++){
    renderTile(buttonName=letterTiles_ID[i], sourceFile="animations/rive_button.riv",canvasId=letterTileCanvases_ID[i])
}

// Give movement to each letter container
letterTileContainers_ID.forEach(function(container_id){
    let newX = 0, newY = 0, startX = 0, startY = 0;
    
    const container = document.getElementById(container_id)
    container.addEventListener('mousedown', mouseDown)

    function mouseDown(e){
        startX = e.clientX
        startY = e.clientY
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    function mouseMove(e){
        newX = startX - e.clientX 
        newY = startY - e.clientY 
    
        startX = e.clientX
        startY = e.clientY

        container.style.top = (container.offsetTop - newY) + 'px'
        container.style.left = (container.offsetLeft - newX) + 'px'
    }

    function mouseUp(e){
        document.removeEventListener('mousemove', mouseMove)
    }
})

// Adding animation to each tile
let counter = 0
letterTileContainers_ID.forEach(function(container_id, index){
    const container = document.getElementById(container_id);
    const tileId = letterTiles_ID[index]; // map container -> tile

    container.addEventListener('mouseover', function () {
        const riveInstance = letterTiles[tileId];
        if (!riveInstance || !riveInstance.loaded) return; // instance not loaded yet
        const inputs = riveInstance.stateMachineInputs("STATE_MACHINE");
        const trigger = inputs.find(i => i.name === "TRIGGER-MOUSEIN");
        if (trigger) trigger.fire();
    });

    container.addEventListener('mousedown', function () {
        const riveInstance = letterTiles[tileId];
        if (!riveInstance || !riveInstance.loaded) return; // instance not loaded yet
        const inputs = riveInstance.stateMachineInputs("STATE_MACHINE");
        const trigger = inputs.find(i => i.name === "TRIGGER-HOLD");
        if (trigger) trigger.fire();
    });

    container.addEventListener('mouseup', function () {
        const riveInstance = letterTiles[tileId];
        if (!riveInstance || !riveInstance.loaded) return; // instance not loaded yet
        const inputs = riveInstance.stateMachineInputs("STATE_MACHINE");
        const trigger = inputs.find(i => i.name === "TRIGGER-DROP");
        if (trigger) trigger.fire();
    });


    
});


// ------------ PROGRESS BAR LOGIC AND RENDERING ------------ // 

// Keeps track of both sprite, and sprite canvases
const progBarSprites = {}

// Rendering Function
function renderRiveSprite({spriteName ,sourceFile, left = 0 , top = 0, width = 300, height = 300, aut = false, debug=false,stateMachine="STATE_MACHINE"})
{

    //Creates and sets up the canvas for the sprite
    progBarSprites[spriteName +  "_canvas"] = document.createElement("canvas")
    progBarSprites[spriteName + "_canvas"].style.position = "absolute";
    progBarSprites[spriteName + "_canvas"].id = spriteName + "_id"
    progBarSprites[spriteName +  "_canvas"].style.left = left + "px"
    progBarSprites[spriteName +  "_canvas"].style.top = top + "px"
    progBarSprites[spriteName +  "_canvas"].style.width = width + "px"
    progBarSprites[spriteName +  "_canvas"].style.height = height + "px"

    document.body.appendChild(progBarSprites[spriteName + "_canvas"])

    //Adds an option to show the canvas size with a black background
    if (debug) {progBarSprites[spriteName +  "_canvas"].style.backgroundColor = "black"}

    //Creates the rive instance
    const instance = new rive.Rive({
        src: sourceFile,
        canvas: document.getElementById(spriteName + "_id"),
        stateMachines: stateMachine,
        autoplay: aut,
        onLoad: () => {instance.resizeDrawingSurfaceToCanvas()}
    })
    progBarSprites[spriteName] = instance
}

// Renders the bar sprites
renderRiveSprite({spriteName:"bar", sourceFile:"animations/rive_bar.riv", top:50, left:650, width:500, height:100})
renderRiveSprite({spriteName:"bar_goal", sourceFile:"animations/rive_bar_goal.riv", aut:true, top:6, left:700, width:150, height:150})
renderRiveSprite({spriteName:"bar_arrow", sourceFile:"animations/rive_bar_arrow.riv", aut:true, top:120, left:760,width:50, height:50})

// Animating movement
function animateMovement(canvas, targetX, targetY, speed = 5){
    let left = parseInt(canvas.style.left)
    let top = parseInt(canvas.style.top)

    const interval = setInterval(() => {
        if (left < targetX) left += speed;
        if (left > targetX) left -= speed;
        if (top < targetY) top += speed;
        if (top > targetY) top -= speed;

        canvas.style.left = left + "px";
        canvas.style.top = top + "px";

        if (left === targetX && top === targetY) clearInterval(interval);
    }, 16);
}

// Logic for the goal system
function progressCheck(){

    arrowPos = parseInt(progBarSprites["bar_goal_canvas"].style.left) + 50
    goalPos = parseInt(progBarSprites["bar_arrow_canvas"].style.left)

    if (arrowPos <= goalPos){
        const inputs = progBarSprites["bar_goal"].stateMachineInputs("STATE_MACHINE");
        const trigger = inputs.find(i => i.name === "TRIGGER-CORRECT");
        if (trigger) {trigger.fire()}

        animateMovement(progBarSprites["bar_goal_canvas"], targetX=goalPos+30, targetY=6, speed=3)
    }
    else{
        const inputs = progBarSprites["bar_goal"].stateMachineInputs("STATE_MACHINE");
        const trigger = inputs.find(i => i.name === "TRIGGER-INCORRECT");
        if (trigger) {trigger.fire()}
    }

}

document.addEventListener('keydown', function(event){

    if (event.key == "a") {
        progressCheck()    
    }
})

//temporary

safe = document.createElement("img")
safe.src="temp_safe.png"
safe.style.position = "absolute"
safe.style.left = "800px"
safe.style.top = "300px"
document.body.appendChild(safe)

