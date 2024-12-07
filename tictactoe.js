// Get DOM elements
const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.getElementById('resetBtn');
const homeButton = document.getElementById('homeBtn');
const statusDisplay = document.getElementById('status');

// Sound effects
const moveSound = new Audio('sounds/tictac.mp3');
const winSound = new Audio('win-sound.mp3');
const resetSound = new Audio('reset-sound.mp3');

// Initialize game state
let currentPlayer = 'X'; // Player starts as 'X'
let gameActive = true; // Game is active initially
let gameState = ['', '', '', '', '', '', '', '', '']; // Empty board

// Define winning conditions (rows, columns, diagonals)
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a player's click on a cell
function handleCellClick(index) {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer.toLowerCase());

        moveSound.play(); // Play move sound

        if (checkWinner()) {
            gameActive = false;
            winSound.play(); // Play win sound
            statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        } else if (gameState.every(cell => cell !== '')) {
            gameActive = false;
            statusDisplay.textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to check if there's a winner
function checkWinner() {
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] === currentPlayer && gameState[b] === currentPlayer && gameState[c] === currentPlayer;
    });
}

// Function to reset the game
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    resetSound.play(); // Play reset sound
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to return home (go to home page)
function goBackHome() {
    window.location.href = 'index.html'; // Adjust this URL to point to your homepage
}

// Add event listeners for each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Add event listener for the reset button
resetButton.addEventListener('click', resetGame);

// Add event listener for the home button
homeButton.addEventListener('click', goBackHome);

// Set the initial status message
statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
