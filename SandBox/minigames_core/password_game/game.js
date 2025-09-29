
const letterTiles = {}
const letterTileCanvases = []
const all_characters = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890!?¿.,_-".split('')
const uppercase_letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
const letters = "abcdefghijklmnñopqrstuvwxyz".split('')
const special_characters = "!?¿.,_-".split('')
const numbers = "1234567890".split('')

function generateTileSet(total=25, numLetters=10, numSpecial_chars=4, numUppercases=6, numNumbers=5){
    let finalList = []
    for (i=0;i<numLetters;i++){ finalList.push(letters[Math.floor(Math.random() * letters.length)]) }
    for (i=0;i<numSpecial_chars;i++){ finalList.push(special_characters[Math.floor(Math.random() * special_characters.length)]) }
    for (i=0;i<numUppercases;i++){ finalList.push(uppercase_letters[Math.floor(Math.random() * uppercase_letters.length)]) }
    for (i=0;i<numNumbers;i++){ finalList.push(numbers[Math.floor(Math.random() * numbers.length)]) }
    console.log(finalList);
    finalList.sort(() => Math.random() - 0.5);
    return finalList
}

generateTileSet()


// Function to render the tiles
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
ammount_tiles = 20;
for (i= 1; i< ammount_tiles + 1; i ++)
{
    letterTileCanvases.push("tile_"+i)
    let canvas = document.createElement("canvas")
    canvas.id = "tile_"+i;
    document.body.appendChild(canvas)
}


// For each canvas, create a tile and give it movement
letterTileCanvases.forEach(function(tileName){
    renderTile(buttonName=tileName, sourceFile="animations/rive_test_button.riv",canvasId=tileName)

    let newX = 0, newY = 0, startX = 0, startY = 0;

    const card = document.getElementById(tileName)

    card.addEventListener('mousedown', mouseDown)

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

        card.style.top = (card.offsetTop - newY) + 'px'
        card.style.left = (card.offsetLeft - newX) + 'px'
    }

    function mouseUp(e){
        document.removeEventListener('mousemove', mouseMove)
    }

})

