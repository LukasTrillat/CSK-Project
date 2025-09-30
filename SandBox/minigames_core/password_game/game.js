
// ------ ALGORITHM TO GENERATE CHARACTERS  ------ // 

const all_characters = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890!?¿.,_-".split('')
const uppercase_letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
const letters = "abcdefghijklmnñopqrstuvwxyz".split('')
const special_characters = "!?¿.,_-".split('')
const numbers = "1234567890".split('')
function generateLetters(total=25, numLetters=10, numSpecial_chars=4, numUppercases=6, numNumbers=5){
    let finalList = []
    for (i=0;i<numLetters;i++){ finalList.push(letters[Math.floor(Math.random() * letters.length)]) }
    for (i=0;i<numSpecial_chars;i++){ finalList.push(special_characters[Math.floor(Math.random() * special_characters.length)]) }
    for (i=0;i<numUppercases;i++){ finalList.push(uppercase_letters[Math.floor(Math.random() * uppercase_letters.length)]) }
    for (i=0;i<numNumbers;i++){ finalList.push(numbers[Math.floor(Math.random() * numbers.length)]) }
    finalList.sort(() => Math.random() - 0.5);
    return finalList
}

// ------ RENDER LETTER TILES ------ // 


const letterTiles = {}
const letterTileCanvases_ID = []
const letterTileContainers_ID = []

function renderTile(buttonName,sourceFile, canvasId, stateMachine = "STATE_MACHINE") {
    const instance = new rive.Rive({
        src: sourceFile,
        canvas: document.getElementById(canvasId),
        stateMachines: stateMachine,
        onLoad: () => {instance.resizeDrawingSurfaceToCanvas()}
    })
    letterTiles[buttonName] = instance
}

//Creating the canvases
ammount_tiles = 25;
tile_canvas_size = 128
char_list = generateLetters()
console.log(char_list)

for (i= 1; i< ammount_tiles + 1; i ++)
{
    const container = document.createElement("div")
    container.id = "tile_container"+i;
    container.style.position = "absolute";
    container.style.top = "60px";
    container.style.left = 80 * i + "px";

    //Creates a separated canvas to render the letter
    const letter_canvas = document.createElement("canvas")
    letter_canvas.width = tile_canvas_size;
    letter_canvas.height = tile_canvas_size;
    letter_canvas.style.position = "absolute";
    letter_canvas.style.top = "0px";
    letter_canvas.style.left = "40px";
    

        //draw the text itself
        const ctx = letter_canvas.getContext("2d")
        ctx.font = "50px Arial";
        ctx.fillText(char_list[i],10,80)

    //Creates a canvas to render the tile, assign it the ID and fix size
    const rive_canvas = document.createElement("canvas")
    rive_canvas.id = "tile_"+i;
    rive_canvas.width = tile_canvas_size;
    rive_canvas.height = tile_canvas_size;

    container.appendChild(rive_canvas)
    container.appendChild(letter_canvas)
    document.body.appendChild(container)

    //Adds the canvas to the list
    letterTileCanvases_ID.push("tile_"+i)
    letterTileContainers_ID.push("tile_container"+i)
}

// For each canvas, render a tile
letterTileCanvases_ID.forEach(function(tile_id){
    renderTile(buttonName=tile_id, sourceFile="animations/rive_test_button.riv",canvasId=tile_id)})

// For each container, give it movement
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






// ------ PROGRESS BAR  ------ // 



