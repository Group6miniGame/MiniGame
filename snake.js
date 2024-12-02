// Game Variables
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let scoreElem = document.getElementById('score');
let highScoreElem = document.getElementById('highScore');

let grid = 20;
let count = 0;
let score = 0;
let highScore = 0;  // High score variable

let snake = [{x: 160, y: 160}];
let direction = 'RIGHT';
let food = {x: 0, y: 0};

// Difficulty settings (in terms of game update speed)
let difficulty = 'medium'; // Default difficulty
let speed = 4; // Default speed for medium difficulty

// Set the difficulty level
function setDifficulty(level) {
    difficulty = level;
    if (difficulty === 'easy') {
        speed = 6;
    } else if (difficulty === 'hard') {
        speed = 2;
    } else {
        speed = 4; // medium
    }
}

// Generate food at a random position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
}

// Update the snake's position
function update() {
    count++;

    if (count < speed) {
        return;
    }
    count = 0;

    // Move the snake
    let head = {x: snake[0].x, y: snake[0].y};

    if (direction === 'LEFT') head.x -= grid;
    if (direction === 'RIGHT') head.x += grid;
    if (direction === 'UP') head.y -= grid;
    if (direction === 'DOWN') head.y += grid;

    // Add new head to the snake array
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElem.textContent = 'Score: ' + score;
        generateFood();
    } else {
        snake.pop();
    }

    // Game over conditions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)) {
        resetGame();
    }

    // Update high score
    if (score > highScore) {
        highScore = score;
        highScoreElem.textContent = 'High Score: ' + highScore;
    }
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the black border around the canvas
    ctx.strokeStyle = 'black';  // Set the border color to black
    ctx.lineWidth = 5;          // Border width (can adjust as needed)
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Draw the border

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
}

// Detect collision with itself
function collision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Reset the game
function resetGame() {
    if (score > highScore) {
        highScore = score;
    }
    score = 0;
    scoreElem.textContent = 'Score: ' + score;
    snake = [{x: 160, y: 160}];
    direction = 'RIGHT';
    generateFood();
}

// Handle keyboard input for snake movement
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    }
    if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    }
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    }
    if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
});

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
generateFood();
gameLoop();
