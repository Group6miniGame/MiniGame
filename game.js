// Memory Game Logic
var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

// Shuffle the memory tiles
Array.prototype.memory_tile_shuffle = function () {
  var i = this.length, j, temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

// Create the memory board
function newBoard() {
  tiles_flipped = 0;
  var output = '';
  memory_array.memory_tile_shuffle();
  for (var i = 0; i < memory_array.length; i++) {
    output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
}

// Flip a tile and check for a match
function memoryFlipTile(tile, val) {
  if (tile.innerHTML == "" && memory_values.length < 2) {
    tile.style.background = '#FFF';
    tile.innerHTML = val;
    tile.classList.add('flipped');
    if (memory_values.length == 0) {
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
    } else if (memory_values.length == 1) {
      memory_values.push(val);
      memory_tile_ids.push(tile.id);
      if (memory_values[0] == memory_values[1]) {
        tiles_flipped += 2;
        memory_values = [];
        memory_tile_ids = [];
        if (tiles_flipped == memory_array.length) {
          setTimeout(function() {
            alert("Congratulations! You have completed the game.");
            // Reset the board after completion
            document.getElementById('memory_board').innerHTML = "";
            newBoard();
          }, 500);
        }
      } else {
        function flip2Back() {
          var tile_1 = document.getElementById(memory_tile_ids[0]);
          var tile_2 = document.getElementById(memory_tile_ids[1]);
          tile_1.style.background = 'url(http://bit.ly/2y6iKE6) no-repeat';
          tile_1.innerHTML = "";
          tile_2.style.background = 'url(http://bit.ly/2y6iKE6) no-repeat';
          tile_2.innerHTML = "";
          tile_1.classList.remove('flipped');
          tile_2.classList.remove('flipped');
          memory_values = [];
          memory_tile_ids = [];
        }
        setTimeout(flip2Back, 700);
      }
    }
  }
}

// Initialize the game board when the page loads
window.onload = newBoard;
bit.ly