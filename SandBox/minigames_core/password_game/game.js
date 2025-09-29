const animations = {}

const rive_bar_arrow = new rive.Rive({
    src: "animations/rive_bar_arrow.riv",
    canvas: document.getElementById("bar_arrow_canvas"),
    stateMachines: "STATE_MACHINE",

    onLoad: () => {
        rive_bar_arrow.resizeDrawingSurfaceToCanvas();
    }
})

const rive_bar_goal = new rive.Rive({
    src: "animations/rive_bar_goal.riv",
    canvas: document.getElementById("bar_goal_canvas"),
    stateMachines: "STATE-MACHINE",

    onLoad: () => {
        rive_bar_goal.resizeDrawingSurfaceToCanvas();
    }
})