const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let car = {
    x: canvas.width / 2 - 50,  // Adjusted for new size
    y: canvas.height - 100,
    width: 100,  // Increased width
    height: 160,  // Increased height
    speed: 5,
    dx: 0,
    dy: 0,
    image: new Image(),
};

car.image.src = 'https://images.vexels.com/media/users/3/200775/isolated/preview/a07e43c30c7bf218fe156dcbaadc8e48-vehicle-car-red-pixel.png';  // Car image URL

let objects = [];
let objectSpeed = 3;
let score = 0;  // Initialize score

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Key event listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "w") keys.up = true;
    if (e.key === "ArrowDown" || e.key === "s") keys.down = true;
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "w") keys.up = false;
    if (e.key === "ArrowDown" || e.key === "s") keys.down = false;
    if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
    if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
});

// Home button functionality
const homeButton = document.getElementById('homeButton');
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';  // Redirects to 'index.html'
});

function updateCarPosition() {
    if (keys.up) car.dy = -car.speed;
    if (keys.down) car.dy = car.speed;
    if (keys.left) car.dx = -car.speed;
    if (keys.right) car.dx = car.speed;

    car.x += car.dx;
    car.y += car.dy;

    // Prevent car from going out of bounds
    if (car.x < 0) car.x = 0;
    if (car.x + car.width > canvas.width) car.x = canvas.width - car.width;
    if (car.y < 0) car.y = 0;
    if (car.y + car.height > canvas.height) car.y = canvas.height - car.height;

    car.dx = 0;
    car.dy = 0;
}

function createObject() {
    let x = Math.random() * (canvas.width - 30);
    let y = -30;
    let object = {
        x: x,
        y: y,
        width: 30,
        height: 30,
        speed: objectSpeed
    };
    objects.push(object);
}

function updateObjects() {
    for (let i = 0; i < objects.length; i++) {
        let object = objects[i];
        object.y += object.speed;

        // Collision detection
        if (object.x < car.x + car.width && object.x + object.width > car.x &&
            object.y < car.y + car.height && object.y + object.height > car.y) {
            resetGame();
            return;
        }

        // If the object reaches the bottom of the canvas, increment score
        if (object.y > canvas.height) {
            score++;  // Increase score when object hits the bottom
            objects.splice(i, 1);  // Remove the object from the game
            i--;  // Adjust index after removal
        }
    }
}

function drawCar() {
    ctx.drawImage(car.image, car.x, car.y, car.width, car.height);
}

function drawObjects() {
    ctx.fillStyle = "#000000";
    for (let object of objects) {
        ctx.fillRect(object.x, object.y, object.width, object.height);
    }
}

function increaseObjectSpeed() {
    if (objectSpeed < 10) objectSpeed += 0.01;  // Gradually increase the speed
}

function resetGame() {
    car.x = canvas.width / 2 - 25;
    car.y = canvas.height - 100;
    objects = [];  // Reset all objects
    objectSpeed = 3;  // Reset object speed
    score = 0;  // Reset score
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;  // Update score display
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateCarPosition();
    updateObjects();
    updateScore();  // Update the score display

    drawCar();
    drawObjects();

    increaseObjectSpeed();

    requestAnimationFrame(gameLoop);
}

// Create objects every 1.5 seconds
setInterval(createObject, 1500);

gameLoop();
