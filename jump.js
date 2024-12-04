const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const GRAVITY = 0.5;
const JUMP_STRENGTH = -10;
const DRAGON_WIDTH = 60;
const DRAGON_HEIGHT = 60;
const CACTUS_WIDTH = 30;
const CACTUS_HEIGHT = 50;
let isJumping = false;
let jumpSpeed = 0;
let dragonX = 50;
let dragonY = canvas.height - DRAGON_HEIGHT - 20;
let cactusX = canvas.width;
let cactusY = canvas.height - CACTUS_HEIGHT - 20;
let score = 0;
let gameOver = false;

let cactusSpeed = 5;

// Draw the dragon
function drawDragon() {
    ctx.fillStyle = "#32CD32";
    ctx.beginPath();
    ctx.arc(dragonX + DRAGON_WIDTH / 2, dragonY + DRAGON_HEIGHT / 2, DRAGON_WIDTH / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(dragonX + DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.arc(dragonX + 2 * DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(dragonX + DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 5, 0, Math.PI * 2);
    ctx.arc(dragonX + 2 * DRAGON_WIDTH / 3, dragonY + DRAGON_HEIGHT / 3, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

// Draw the cactus
function drawCactus() {
    ctx.fillStyle = "#228B22";
    ctx.fillRect(cactusX, cactusY, CACTUS_WIDTH, CACTUS_HEIGHT);

    ctx.fillStyle = "#8B4513";
    ctx.fillRect(cactusX + CACTUS_WIDTH / 4, cactusY - 10, CACTUS_WIDTH / 2, 10);
}

// Draw the score
function drawScore() {
    const scoreText = "Score: " + score;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "30px Arial";
    ctx.fillText(scoreText, 20, 40);
}

// Handle jumping logic
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

// Move the cactus and handle collision
function moveCactus() {
    cactusX -= cactusSpeed;

    if (cactusX + CACTUS_WIDTH < 0) {
        cactusX = canvas.width;
        cactusY = canvas.height - CACTUS_HEIGHT - 20;
        score++;
        adjustSpeed();
    }

    if (
        dragonX < cactusX + CACTUS_WIDTH &&
        dragonX + DRAGON_WIDTH > cactusX &&
        dragonY < cactusY + CACTUS_HEIGHT &&
        dragonY + DRAGON_HEIGHT > cactusY
    ) {
        gameOver = true;
        document.getElementById("gameOverMessage").style.display = "block";
        document.getElementById("finalScore").innerText = score;
    }
}

// Adjust speed based on score
function adjustSpeed() {
    if (score >= 20) {
        cactusSpeed = 12;
    } else if (score >= 5) {
        cactusSpeed = 8;
    }
}

// Main game loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDragon();
    drawCactus();
    drawScore();
    jump();
    moveCactus();

    requestAnimationFrame(gameLoop);
}

// Event listener for jumping (Spacebar)
document.addEventListener("keydown", (e) => {
    if (e.key === " " && !isJumping && !gameOver) {
        isJumping = true;
        jumpSpeed = JUMP_STRENGTH;
    }

    // Event listener to restart game when Spacebar is pressed and game is over
    if (e.key === " " && gameOver) {
        restartGame();
    }
});

// Restart the game
function restartGame() {
    score = 0;
    cactusSpeed = 5;
    cactusX = canvas.width;
    cactusY = canvas.height - CACTUS_HEIGHT - 20;
    dragonY = canvas.height - DRAGON_HEIGHT - 20;
    isJumping = false;
    jumpSpeed = 0;
    gameOver = false;
    document.getElementById("gameOverMessage").style.display = "none";
    gameLoop();
}

gameLoop();
