/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
// What is ASCIIART? Check the README.md or Workshop to see why ASCIIART is defined in your file.
const ASCIIART = [
  `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
      
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
];

class RopeDude {
  constructor(word) {
    this.remainingGuesses = 6;
    this.secretWord = word.toLowerCase().split('');
    this.lettersGuessed = [];
    this.gameState = 'playing';
    this.progress = word.split('').map((elm) => {
      if (elm === ' ') {
        return ' ';
      } else {
        return '#';
      }
    });
  }

  computeGameState() {
    if (!this.remainingGuesses) this.gameState = 'lost';
    let allGuessed = this.secretWord.every(
      (elm) => this.lettersGuessed.includes(elm) || elm === ' '
    );
    if (this.remainingGuesses && allGuessed) this.gameState = 'won';
  }

  getSecretWordPuzzle() {
    this.secretWord.forEach((elm, idx) => {
      if (this.lettersGuessed.includes(elm)) {
        this.progress[idx] = elm;
      }
    });
    return this.progress.join('');
  }

  getGameStateMessage() {
    if (this.gameState === 'playing') {
      return `There is a total of ${this.remainingGuesses} guesses remaining:
        ${ASCIIART[this.remainingGuesses]}`;
    } else if (this.gameState === 'lost') {
      return `Game Over, the word was "${this.secretWord.join('')}":
      ${ASCIIART[this.remainingGuesses]}`;
    } else {
      return 'Winner Winner Chicken Dinner, you won!';
    }
  }

  submitGuess(char) {
    if (this.gameState === 'playing') {
      char = char.toLowerCase();
      if (!this.lettersGuessed.includes(char)) {
        this.lettersGuessed.push(char);
        if (!this.secretWord.includes(char)) this.remainingGuesses--;
      }
    }
  }
}

const secretWordBank = [
  'plants',
  'food',
  'England',
  'dog',
  'Chocolate cake',
  'math',
  'road trip',
];

function simulateRopeDude() {
  const wordIdx = Math.floor(Math.random() * secretWordBank.length);
  const game = new RopeDude(secretWordBank[wordIdx]);

  function simulater() {
    let randomCharCode = Math.floor(Math.random() * 26) + 97;
    let currentGuess = String.fromCharCode(randomCharCode);

    while (game.gameState === 'playing') {
      game.submitGuess(currentGuess);
      game.computeGameState();
      game.getSecretWordPuzzle();
      game.getGameStateMessage();
      simulater();
    }
    return game.getGameStateMessage();
  }
  return simulater();
}
