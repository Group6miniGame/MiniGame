const rows = 10;
const cols = 10;
const numBombs = 20;

const gameContainer = document.getElementById('game');
let board = [];

// Initialize the game
function initGame() {
    createHomeButton();
    board = createBoard();
    placeBombs();
    calculateNumbers();
    renderBoard();
}

// Create an empty board
function createBoard() {
    return Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
            row,
            col,
            bomb: false,
            revealed: false,
            flagged: false,
            adjacentBombs: 0,
        }))
    );
}

// Place bombs randomly on the board
function placeBombs() {
    let bombsPlaced = 0;
    while (bombsPlaced < numBombs) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        const cell = board[r][c];
        if (!cell.bomb) {
            cell.bomb = true;
            bombsPlaced++;
        }
    }
}

// Calculate the number of adjacent bombs for each cell
function calculateNumbers() {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    board.forEach(row => {
        row.forEach(cell => {
            if (cell.bomb) return;
            directions.forEach(([dr, dc]) => {
                const r = cell.row + dr;
                const c = cell.col + dc;
                if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c].bomb) {
                    cell.adjacentBombs++;
                }
            });
        });
    });
}

// Render the board
function renderBoard() {
    gameContainer.innerHTML = '';
    gameContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    board.flat().forEach(cell => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.row = cell.row;
        div.dataset.col = cell.col;

        if (cell.revealed) {
            div.classList.add('revealed');
            if (cell.bomb) {
                div.classList.add('bomb'); // Apply bomb class for animation
            } else if (cell.adjacentBombs > 0) {
                div.textContent = cell.adjacentBombs;
            }
        }

        div.addEventListener('click', () => handleCellClick(cell));
        gameContainer.appendChild(div);
    });
}

// Handle cell click
function handleCellClick(cell) {
    if (cell.revealed) return;

    cell.revealed = true;
    if (cell.bomb) {
        revealBombsWithAnimation();
    } else {
        if (checkWin()) {
            alert("You Win!");
            resetGame();
        } else if (cell.adjacentBombs === 0) {
            revealAdjacentCells(cell);
        }
    }
    renderBoard();
}

// Reveal bombs with a top-to-bottom animation
function revealBombsWithAnimation() {
    const bombCells = board.flat().filter(cell => cell.bomb);
    bombCells.sort((a, b) => a.row - b.row || a.col - b.col); // Sort by row, then by column

    bombCells.forEach((cell, index) => {
        setTimeout(() => {
            cell.revealed = true;
            renderBoard();
            if (index === bombCells.length - 1) {
                setTimeout(() => alert("Game Over!"), 500); // Slight delay before showing the alert
                setTimeout(resetGame, 1000); // Reset game after the animation
            }
        }, (4000 / bombCells.length) * index); // Spread the animation over 4 seconds
    });
}

// Reveal all cells
function revealAllCells() {
    board.flat().forEach(cell => (cell.revealed = true));
}

// Reveal adjacent cells recursively
function revealAdjacentCells(cell) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];
    directions.forEach(([dr, dc]) => {
        const r = cell.row + dr;
        const c = cell.col + dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            const adjacentCell = board[r][c];
            if (!adjacentCell.revealed && !adjacentCell.bomb) {
                adjacentCell.revealed = true;
                if (adjacentCell.adjacentBombs === 0) {
                    revealAdjacentCells(adjacentCell);
                }
            }
        }
    });
}

// Check if the player has won
function checkWin() {
    return board.flat().every(cell => cell.revealed || cell.bomb);
}

// Reset the game with a new randomized board
function resetGame() {
    initGame();
}

// Create a home button
function createHomeButton() {
    let homeButton = document.getElementById('homeButton');
    if (!homeButton) {
        homeButton = document.createElement('button');
        homeButton.id = 'homeButton';
        homeButton.textContent = 'Home';
        homeButton.style.margin = '20px';
        homeButton.style.padding = '10px';
        homeButton.style.fontSize = '16px';

        // Redirect to index.html when clicked
        homeButton.addEventListener('click', () => {
            window.location.href = 'index.html';  // Home button will take the player back to the homepage
        });

        document.body.appendChild(homeButton);
    }
}

// Start the game
initGame();
