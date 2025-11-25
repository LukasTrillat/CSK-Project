// ####################################################
//                   MAP CONTROL
// ####################################################
function Delay(Seconds) {
    ms = Seconds * 1000
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createLevelButton(level, xpos, ypos) {
    const button = document.createElement("button");

    button.textContent = level.Name;
    button.style.width = "100px";
    button.style.height = "100px";
    button.style.backgroundColor = "#007BFF"; 
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.cursor = "pointer";
    button.style.fontWeight = "bold";
    button.style.fontSize = "14px";
    button.style.margin = "10px";

    button.style.position = "absolute";
    button.style.left = xpos + "px";  
    button.style.top = ypos + "px";    
    button.style.zIndex = "1000";     
    
    button.addEventListener("click", () => {
        if (level.GoToPage) {
            window.location.href = level.GoToPage;
        } else {
            console.warn("Este nivel no tiene página");
        }
    });

    const uiContainer = document.getElementById("WorldContainer") || document.body;
    uiContainer.appendChild(button);
}

// ####################################################
//                   SCROLL CONTROL
// ####################################################
window.addEventListener("load", () => {
    const ScrollUI = document.getElementById("ScrollUI");
    const ScrollThumb = document.getElementById("ScrollThumb");
    const WorldContainer = document.getElementById("WorldContainer");

    let isDragging = false;
    let startX = 0;
    let thumbStartLeft = 0;

    let ScrollBlocked = false; 

    function updateThumb() {
        const worldWidth = WorldContainer.scrollWidth;  
        const viewportWidth = window.innerWidth;       
        const scrollUIWidth = ScrollUI.clientWidth;

        const visibleRatio = viewportWidth / worldWidth;
        const thumbWidth = Math.max(20, scrollUIWidth * visibleRatio);
        ScrollThumb.style.width = thumbWidth + "px";

        const maxCameraX = worldWidth - viewportWidth; 
        const thumbMax = scrollUIWidth - ScrollThumb.clientWidth;
        const ratio = maxCameraX > 0 ? WorldCamera.x / maxCameraX : 0;
        ScrollThumb.style.left = ratio * thumbMax + "px";
    }

    ScrollThumb.addEventListener("mousedown", e => {
        if (ScrollBlocked) return; 
        isDragging = true;
        startX = e.clientX;
        thumbStartLeft = ScrollThumb.offsetLeft;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });

    document.addEventListener("mousemove", e => {
        if (!isDragging) return;

        const scrollUIWidth = ScrollUI.clientWidth;
        const thumbMax = scrollUIWidth - ScrollThumb.clientWidth;

        let dx = e.clientX - startX;
        let newLeft = thumbStartLeft + dx;

        newLeft = Math.max(0, Math.min(newLeft, thumbMax));
        ScrollThumb.style.left = newLeft + "px";

        const maxCameraX = WorldContainer.scrollWidth - window.innerWidth;
        const ratio = thumbMax > 0 ? newLeft / thumbMax : 0;
        WorldCamera.x = ratio * maxCameraX;
        UpdateCamera();
    });

    function animateScrollThumb() {
        if (!isDragging) updateThumb();
        requestAnimationFrame(animateScrollThumb);
    }
    animateScrollThumb();

    const originalCameraPointTrigger = CameraPointTrigger;
    CameraPointTrigger = function(x, y, duration = 0, easing = "smooth") {
        ScrollBlocked = true;
        originalCameraPointTrigger(x, y, duration, easing);

        if (duration > 0) {
            setTimeout(() => ScrollBlocked = false, duration * 1000);
        } else {
            ScrollBlocked = false;
        }
    }
});

// ####################################################
//                TRIGGERS SECTION
// ####################################################

// ======= VARIABLES =======
const AnimationCurves = {
    linear: t => t,
    smooth: t => t * t * (3 - 2 * t),

    easeIn: t => t * t,
    easeOut: t => 1 - (1 - t) * (1 - t),
    easeInOut: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,

    cubicIn: t => t * t * t,
    cubicOut: t => 1 - Math.pow(1 - t, 3),
    cubicInOut: t =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

    expoIn: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
    expoOut: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    expoInOut: t =>
        t === 0 ? 0 :
        t === 1 ? 1 :
        t < 0.5
            ? Math.pow(2, 20 * t - 10) / 2
            : (2 - Math.pow(2, -20 * t + 10)) / 2,

    circIn: t => 1 - Math.sqrt(1 - t * t),
    circOut: t => Math.sqrt(1 - Math.pow(t - 1, 2)),
    circInOut: t =>
        t < 0.5
            ? (1 - Math.sqrt(1 - (2 * t) ** 2)) / 2
            : (Math.sqrt(1 - (-2 * t + 2) ** 2) + 1) / 2,

    backIn: t => {
        const c = 1.70158;
        return t * t * ((c + 1) * t - c);
    },
    backOut: t => {
        const c = 1.70158;
        return 1 + (--t) * t * ((c + 1) * t + c);
    },
    backInOut: t => {
        const c = 1.70158 * 1.525;
        return t < 0.5
            ? (t * 2) ** 2 * ((t * 2) * (c + 1) - c) / 2
            : ((t * 2 - 2) ** 2 * ((t * 2 - 2) * (c + 1) + c) + 2) / 2;
    },

    bounceOut: t => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
            return n1 * t * t;
        } else if (t < 2 / d1) {
            return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
            return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
            return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
    },
    bounceIn: t => 1 - AnimationCurves.bounceOut(1 - t),
    bounceInOut: t =>
        t < 0.5
            ? (1 - AnimationCurves.bounceOut(1 - 2 * t)) / 2
            : (1 + AnimationCurves.bounceOut(2 * t - 1)) / 2,

    elasticIn: t => {
        if (t === 0 || t === 1) return t;
        return -Math.pow(2, 10 * (t - 1)) *
            Math.sin((t - 1.075) * (2 * Math.PI) / 0.3);
    },
    elasticOut: t => {
        if (t === 0 || t === 1) return t;
        return Math.pow(2, -10 * t) *
            Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
    },
    elasticInOut: t => {
        if (t === 0 || t === 1) return t;
        if (t < 0.5) {
            return (
                -0.5 *
                Math.pow(2, 20 * t - 10) *
                Math.sin((20 * t - 11.125) * (2 * Math.PI) / 0.45)
            );
        }
        return (
            Math.pow(2, -20 * t + 10) *
                Math.sin((20 * t - 11.125) * (2 * Math.PI) / 0.45) *
                0.5 +
            1
        );
    }
};

// ======================== TRIGGERS ========================
function ZoomTrigger(TargetZoom, Duration = 0, AnimationCurve = "smooth") {
    const duration = Duration * 1000
    const startZoom = WorldCamera.zoom;
    const curve = AnimationCurves[AnimationCurve] || AnimationCurves.linear;

    if (duration <= 0) {
        WorldCamera.zoom = TargetZoom;
        UpdateCamera();
        return;
    }

    const start = performance.now();
    function Animate(t) {
        const progress = Math.min((t - start) / duration, 1);
        WorldCamera.zoom = startZoom + (TargetZoom - startZoom) * curve(progress);
        UpdateCamera();
        if (progress < 1) requestAnimationFrame(Animate);
    }
    requestAnimationFrame(Animate);
}

// ====================================================
function CameraPointTrigger(targetX, targetY, Duration = 0, easing = "smooth") {
    const duration = Duration * 1000
    const startX = WorldCamera.x;
    const startY = WorldCamera.y;
    const curve = AnimationCurves[easing] || AnimationCurves.linear;

    if (duration <= 0) {
        WorldCamera.x = targetX;
        WorldCamera.y = targetY;
        UpdateCamera();
        return;
    }

    const start = performance.now();
    function animate(t) {
        const progress = Math.min((t - start) / duration, 1);
        WorldCamera.x = startX + (targetX - startX) * curve(progress);
        WorldCamera.y = startY + (targetY - startY) * curve(progress);

        UpdateCamera();
        if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}

// ====================================================
async function SequenceTrigger(sequence) {
    for (const step of sequence) {
        const result = step(); // Execute next step

        if (result instanceof Promise)
            await result;

        else
            await new Promise(resolve => {

                requestAnimationFrame(function wait() {
                    if (WorldCamera._animating)
                        requestAnimationFrame(wait);
                    else
                        resolve();
                });
            });
    }
}
// ==========================


