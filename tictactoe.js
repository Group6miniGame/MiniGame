// tictactoe.js
const board = document.querySelector('.board');
const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.getElementById('resetBtn');
const homeButton = document.getElementById('homeBtn');
const statusDisplay = document.getElementById('status');

let currentPlayer = 'X';  // Start with player X
let gameActive = true;  // The game is initially active
let gameState = ['', '', '', '', '', '', '', '', ''];  // Holds the game state (board status)

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

// Sound files
const moveSound = new Audio('sounds/The Game Show Theme Music.mp3');


// Function to handle a player click
function handleCellClick(index) {
    if (gameState[index] === '' && gameActive) {
        gameState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        moveSound.play(); // Play move sound

        // Check if there's a winner
        if (checkWinner()) {
            winSound.play(); // Play win sound
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameState.every(cell => cell !== '')) {
            // If no empty cells left, it's a draw
            drawSound.play(); // Play draw sound
            statusDisplay.textContent = "It's a draw!";
            gameActive = false;
        } else {
            // Change the turn to the other player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Function to check for a winner
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
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    resetSound.play(); // Play reset sound
}

// Function to go back to the homepage
function goBackHome() {
    window.location.href = 'index.html'; // Replace with your home page URL
}

// Add event listeners to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Reset button event listener
resetButton.addEventListener('click', resetGame);

// Home button event listener
homeButton.addEventListener('click', goBackHome);

// Initial status message
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
