
const letterTiles = {}
const letterTileCanvases = []


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
ammount_tiles = 3;
for (i= 1; i< ammount_tiles + 1; i ++)
{
    letterTileCanvases.push("tile_"+i)
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

