// Game constants and variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.5;
const JUMP_STRENGTH = -10;
const DRAGON_WIDTH = 60;
const DRAGON_HEIGHT = 60;
const FLOWER_WIDTH = 30;
const FLOWER_HEIGHT = 50;
let isJumping = false;
let jumpSpeed = 0;
let dragonX = 50;
let dragonY = canvas.height - DRAGON_HEIGHT - 20;
let flowerX = canvas.width;
let flowerY = canvas.height - FLOWER_HEIGHT - 20;
let score = 0;
let gameOver = false;

// Flower speed and acceleration
let flowerSpeed = 5; // Initial speed for the flower

// Draw the dragon with a more polished design (simple round dragon)
function drawDragon() {
    ctx.fillStyle = "#32CD32"; // Dragon color (green)
    ctx.beginPath();
    ctx.arc(dragonX + DRAGON_WIDTH / 2, dragonY + DRAGON_HEIGHT / 2, DRAGON_WIDTH / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Add simple eyes to the dragon
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(dragonX + DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.arc(dragonX + 2 * DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Add simple pupils to the eyes
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(dragonX + DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 5, 0, Math.PI * 2);
    ctx.arc(dragonX + 2 * DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Draw the flower with improved design (simpler and more colorful)
function drawFlower() {
    ctx.fillStyle = "#8A2BE2"; // Flower color (purple)
    ctx.fillRect(flowerX, flowerY, FLOWER_WIDTH, FLOWER_HEIGHT);

    // Draw flower petals (for aesthetic effect)
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(flowerX + FLOWER_WIDTH / 2, flowerY + FLOWER_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.arc(flowerX + FLOWER_WIDTH / 4, flowerY + 2 * FLOWER_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.arc(flowerX + 3 * FLOWER_WIDTH / 4, flowerY + 2 * FLOWER_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Draw the score
function drawScore() {
    const scoreText = "Score: " + score;
    ctx.fillStyle = "#FFFFFF"; // White score text
    ctx.font = "30px Arial";
    ctx.fillText(scoreText, 20, 40);
}

// Handle the dragon's jumping logic
function jump() {
    if (isJumping) {
        jumpSpeed += GRAVITY;
        dragonY += jumpSpeed;

        if (dragonY >= canvas.height - DRAGON_HEIGHT - 20) {
            dragonY = canvas.height - DRAGON_HEIGHT - 20;
            isJumping = false;
            jumpSpeed = 0;
        }
    }
}

// Move the flower and check for collision with the dragon
function moveFlower() {
    flowerX -= flowerSpeed; // Move flower to the left based on the current speed

    if (flowerX + FLOWER_WIDTH < 0) {
        flowerX = canvas.width;
        flowerY = canvas.height - FLOWER_HEIGHT - 20; // Reset flower's position
        score++; // Increase score when flower passes
        adjustSpeed(); // Adjust flower speed based on score
    }

    // Check for collision between dragon and flower
    if (
        dragonX < flowerX + FLOWER_WIDTH &&
        dragonX + DRAGON_WIDTH > flowerX &&
        dragonY < flowerY + FLOWER_HEIGHT &&
        dragonY + DRAGON_HEIGHT > flowerY
    ) {
        gameOver = true;
        document.getElementById("gameOverMessage").style.display = "block";
        document.getElementById("finalScore").innerText = score; // Show final score
    }
}

// Adjust the speed of the flower based on the score
function adjustSpeed() {
    if (score >= 20) {
        flowerSpeed = 12; // Increase speed to 12 when the score reaches 20
    } else if (score >= 5) {
        flowerSpeed = 8; // Increase speed to 8 when the score reaches 5
    }
}

// Game loop
function gameLoop() {
    if (gameOver) return; // Stop the game if it's over

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawDragon();
    drawFlower();
    drawScore();
    jump();
    moveFlower();

    requestAnimationFrame(gameLoop); // Repeat the game loop
}

// Listen for the spacebar to make the dragon jump
document.addEventListener("keydown", (e) => {
    if (e.key === " " && !isJumping && !gameOver) {
        isJumping = true;
        jumpSpeed = JUMP_STRENGTH; // Set the initial jump speed
    }
});

// Restart the game after game over
function restartGame() {
    score = 0;
    flowerSpeed = 5; // Reset flower speed
    flowerX = canvas.width;
    flowerY = canvas.height - FLOWER_HEIGHT - 20;
    dragonY = canvas.height - DRAGON_HEIGHT - 20;
    isJumping = false;
    jumpSpeed = 0;
    gameOver = false;
    document.getElementById("gameOverMessage").style.display = "none";
    gameLoop(); // Start the game loop
}

// Start the game loop when the page loads
gameLoop();
