
// Word Scramble Game Logic
const words = ['computer', 'rj45', 'javascript', 'website', '', 'technology', 'monitor', 'motherboard'];
let currentWord = '';

function scrambleWord(word) {
    const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
    return scrambled;
}

function setNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    const scrambled = scrambleWord(currentWord);
    document.getElementById('scrambledWord').textContent = scrambled;
}

function checkAnswer() {
    const userInput = document.getElementById('wordInput').value.toLowerCase().trim();
    const messageElement = document.getElementById('message');

    if (userInput === currentWord) {
        messageElement.textContent = 'Congratulations! You guessed the word correctly!';
        messageElement.style.color = '#4CAF50'; // Green for correct answer
        messageElement.classList.remove('incorrect');
    } else {
        messageElement.textContent = 'Oops! Try again!';
        messageElement.style.color = '#FF5733'; // Red for incorrect answer
        messageElement.classList.add('incorrect');
    }

    messageElement.style.display = 'block';

    // Delay resetting the word after a few seconds
    setTimeout(() => {
        setNewWord();
        document.getElementById('wordInput').value = '';
        messageElement.style.display = 'none';
    }, 2000);
}

function showClue() {
    const clue = `The word starts with: ${currentWord.charAt(0).toUpperCase()}`;
    alert(clue); // Show clue as an alert with the first letter of the word
}

// Initialize the game with a scrambled word
window.onload = setNewWord;
