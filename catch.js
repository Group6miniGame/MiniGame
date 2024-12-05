// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let lives = 3;
let gameOver = false;
let basketWidth = 80;
let basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;
let ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2);
let ballY = 0;
let ballSpeed = 2;   // Initial speed of the ball
let basketSpeed = 7; // Initial speed of the basket

// Update score and lives on the screen
function updateScore() {
    document.getElementById('score').textContent = 'Score: ' + score;
    document.getElementById('lives').textContent = 'Lives: ' + lives;
}

// Draw the basket with shadows for effect
function drawBasket() {
    ctx.beginPath();
    ctx.rect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
    ctx.fillStyle = '#008CBA';  // Basket color
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    ctx.closePath();
}

// Draw the falling ball with a gradient fill effect
function drawBall() {
    const ballGradient = ctx.createRadialGradient(ballX, ballY, 0, ballX, ballY, ballRadius);
    ballGradient.addColorStop(0, '#ff7f7f');
    ballGradient.addColorStop(1, '#ff3d3d');

    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballGradient;
    ctx.fill();
    ctx.closePath();
}

// Move the basket based on keypress
function moveBasket() {
    if (rightPressed && basketX + basketWidth < canvas.width) {
        basketX += basketSpeed;
    } else if (leftPressed && basketX > 0) {
        basketX -= basketSpeed;
    }
}

// Check for ball collision with the basket
function checkBallCollision() {
    if (ballY + ballRadius > canvas.height - basketHeight && ballX > basketX && ballX < basketX + basketWidth) {
        score++;
        ballY = 0; // Reset ball position
        ballX = Math.random() * (canvas.width - ballRadius * 2);

        // Increase speed every 5 points
        if (score >= 5 && score < 20) {
            ballSpeed = 3;   // Increase the speed of the ball
            basketSpeed = 8; // Increase the speed of the basket
        } else if (score >= 20) {
            ballSpeed = 4;   // Make the ball fall even faster
            basketSpeed = 9; // Make the basket move faster
        }
    }
}

// Check if ball is missed (falls off the screen)
function checkBallMissed() {
    if (ballY + ballRadius > canvas.height) {
        lives--;
        if (lives <= 0) {
            gameOver = true;
            document.getElementById('gameOverMessage').style.display = 'block';  // Show game over message
        } else {
            ballY = 0; // Reset ball position
            ballX = Math.random() * (canvas.width - ballRadius * 2);
        }
    }
}

// Draw everything
function draw() {
    // Clear the canvas with a semi-transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the basket, ball, and update score and lives
    drawBasket();
    drawBall();
    updateScore();

    if (gameOver) return;

    // Move the ball
    ballY += ballSpeed;

    // Check for ball collision and missed ball
    checkBallCollision();
    checkBallMissed();

    // Move the basket
    moveBasket();

    // Repeat the game loop
    requestAnimationFrame(draw);
}

// Key press event listeners
let rightPressed = false;
let leftPressed = false;

document.addEventListener('keydown', function (e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

// Start the game loop
function startGame() {
    draw(); // Call draw function to start the game loop
}

// Call startGame to begin the game
startGame();
