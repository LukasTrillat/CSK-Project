
const buttons = {}

function createButton() {}

buttons.test_button = new rive.Rive({
    src: "animations/rive_test_button.riv",
    canvas: document.getElementById("test_button_canvas"),
    stateMachines: "STATE-MACHINE",

    onLoad: () => {
        buttons.test_button.resizeDrawingSurfaceToCanvas();
    }
})



            // MOVING LETTER TILES //

let newX = 0, newY = 0, startX = 0, startY = 0;

const letterTile = document.getElementById('test_button_canvas')

letterTile.addEventListener('mousedown', mouseDown)

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

    letterTile.style.top = (letterTile.offsetTop - newY) + 'px'
    letterTile.style.left = (letterTile.offsetLeft - newX) + 'px'
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}