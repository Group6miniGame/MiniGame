const maze = [
    ['S', '0', 'W', '0', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', '0', 'W', '0', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['W', '0', 'W', '0', 'W', '0', '0', '0', 'W', 'W'],
    ['W', '0', 'W', '0', 'W', '0', 'W', '0', 'W', 'W'],
    ['W', '0', 'W', '0', 'W', '0', 'W', '0', 'W', 'W'],
    ['W', '0', 'W', '0', '0', '0', 'W', '0', '0', '0'],
    ['W', '0', 'W', '0', 'W', 'W', 'W', '0', 'W', '0'],
    ['W', '0', 'W', '0', 'W', 'W', 'W', 'W', 'W', '0'],
    ['W', '0', '0', '0', 'W', 'W', 'W', 'W', 'E', '0'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
  ];

  let playerPosition = { x: 0, y: 0 };
  let gameWon = false;

  function drawMaze() {
    const mazeContainer = document.getElementById('maze');
    mazeContainer.innerHTML = '';
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        if (maze[y][x] === 'W') {
          cell.classList.add('wall');
        } else if (maze[y][x] === 'S') {
          cell.classList.add('start');
        } else if (maze[y][x] === 'E') {
          cell.classList.add('end');
        }

        if (playerPosition.x === x && playerPosition.y === y) {
          cell.classList.add('player');
        }

        mazeContainer.appendChild(cell);
      }
    }
  }

  function movePlayer(direction) {
    if (gameWon) return;

    let newPosition = { ...playerPosition };

    switch (direction) {
      case 'up':
        newPosition.y--;
        break;
      case 'down':
        newPosition.y++;
        break;
      case 'left':
        newPosition.x--;
        break;
      case 'right':
        newPosition.x++;
        break;
    }

    // Check if the new position is within bounds and not a wall
    if (
      newPosition.x >= 0 && newPosition.x < maze[0].length &&
      newPosition.y >= 0 && newPosition.y < maze.length &&
      maze[newPosition.y][newPosition.x] !== 'W'
    ) {
      playerPosition = newPosition;

      // Check if player reached the end
      if (maze[playerPosition.y][playerPosition.x] === 'E') {
        alert('Congratulations! You reached the end!');
        gameWon = true;
        document.getElementById('maze').insertAdjacentHTML('afterend', '<div class="won-message">You won the game!</div>');
      }
    }

    drawMaze();
  }

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      movePlayer('up');
    } else if (e.key === 'ArrowDown') {
      movePlayer('down');
    } else if (e.key === 'ArrowLeft') {
      movePlayer('left');
    } else if (e.key === 'ArrowRight') {
      movePlayer('right');
    }
  });

  window.onload = () => {
    drawMaze();
  };
  // Function to play sound
function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

// Example: When the player clicks to make a move or button interaction
// You can call playSound() when a player interacts with the game
const mazeElement = document.getElementById('maze');
mazeElement.addEventListener('click', () => {
  // Play a sound when the maze is clicked (this could represent a move or other action)
  playSound('sounds/background.mp3');  // Path to your click sound
});
