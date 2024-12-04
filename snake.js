// Game Variables
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let scoreElem = document.getElementById('score');
let highScoreElem = document.getElementById('highScore');

let grid = 20;
let count = 0;
let score = 0;
let highScore = 0;

let snake = [{x: 160, y: 160}];
let direction = 'RIGHT';
let food = {x: 0, y: 0};

// Difficulty settings
let difficulty = 'medium';
let speed = 4;

// Game state
let isPaused = false;

// Set difficulty
function adjustDifficulty(level) {
    difficulty = level;
    if (difficulty === 'easy') {
        speed = 6;
    } else if (difficulty === 'hard') {
        speed = 3;
    } else {
        speed = 5; // medium
    }
}

// Pause game
function togglePause() {
    isPaused = !isPaused;
    document.getElementById('pauseButton').textContent = isPaused ? 'Resume' : 'Pause';
    if (!isPaused) {
        requestAnimationFrame(gameLoop);
    }
}

// Generate food at random position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
    food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
}

// Update snake
function update() {
    if (isPaused) return;

    count++;
    if (count < speed) return;
    count = 0;

    let head = {x: snake[0].x, y: snake[0].y};

    if (direction === 'LEFT') head.x -= grid;
    if (direction === 'RIGHT') head.x += grid;
    if (direction === 'UP') head.y -= grid;
    if (direction === 'DOWN') head.y += grid;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElem.textContent = 'Score: ' + score;
        generateFood();
    } else {
        snake.pop();
    }

    if (
        head.x < 0 || 
        head.x >= canvas.width || 
        head.y < 0 || 
        head.y >= canvas.height || 
        collision(head)
    ) {
        resetGame();
    }

    if (score > highScore) {
        highScore = score;
        highScoreElem.textContent = 'High Score: ' + highScore;
    }
}



// Draw the canvas
function draw() {
    if (isPaused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
        ctx.fillRect(segment.x, segment.y, grid, grid);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, grid, grid);
}

// Collision detection
function collision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Reset the game
function resetGame() {
    score = 0;
    scoreElem.textContent = 'Score: ' + score;
    snake = [{x: 160, y: 160}];
    direction = 'RIGHT';
    generateFood();
}

// Keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Game loop
function gameLoop() {
    update();
    draw();
    if (!isPaused) requestAnimationFrame(gameLoop);
}

// Start the game
generateFood();
gameLoop();
