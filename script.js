const dog = document.getElementById("dog");
const frameWidth = 66; // Width of each frame in pixels can be adjusted
let currentFrame = 0;
let actionInterval;
let isPaused = false;

// Define pixel rows and frames for each action based on the exact layout
const actions = {
    walk: { row: -130, frames: 4 },      // images location, 4 frames for walking
    sit: { row: -470, frames: 4 },      // images location, 4 frame for sitting (can be made static)
    lay: { row: -822, frames: 4 },      // images location, 4 frame for laying down (can be made static)
    run: { row: -245, frames: 4 },      // images location, 4 frames for running
};

// Set action to trigger animation
function setAction(action) {
    if (isPaused) return; // Do nothing if paused

    clearInterval(actionInterval); // Clear any previous action interval

    const actionDetails = actions[action];
    if (!actionDetails) return;

    currentFrame = 0; // Reset frame to start from the beginning of the animation
    actionInterval = setInterval(() => animateDog(actionDetails), 400);

}
    // For static images 
   /* if (action === "sit" || action === "lay") {
        // For static poses (sit and lay), show a single frame without cycling
        animateDog(actionDetails);
    } else {
        actionInterval = setInterval(() => animateDog(actionDetails), 200); // Adjust interval for speed
    }*/ 


// Function to animate the dog based on action frames
function animateDog({ row, frames }) {
    if (!isPaused) { // Only animate if not paused
        const offsetX = -currentFrame * frameWidth; // Cycle frames horizontally
        dog.style.backgroundPosition = `${offsetX}px ${row}px`;
        currentFrame = (currentFrame + 1) % frames; // Loop through frames
    }
}

// Toggle pause functionality
function togglePause() {
    const pauseButton = document.getElementById("pause-button");
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(actionInterval); // Stop the animation interval
        pauseButton.textContent = "Resume";
    } else {
        pauseButton.textContent = "Pause";
        setAction('walk'); // Default to "walk" when resuming
    }
}
