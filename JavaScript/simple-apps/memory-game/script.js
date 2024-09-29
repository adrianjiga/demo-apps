const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset-button');

let cards = [];
let flippedCards = [];
let moves = 0;
let timer = 0;
let timerInterval;

const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const gameSymbols = [...symbols, ...symbols];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCard(symbol) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.addEventListener('click', flipCard);
  return card;
}

function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.symbol;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      moves++;
      movesDisplay.textContent = moves;
      setTimeout(checkMatch, 500);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.removeEventListener('click', flipCard);
    card2.removeEventListener('click', flipCard);
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.textContent = '';
    card2.textContent = '';
  }
  flippedCards = [];

  if (document.querySelectorAll('.flipped').length === gameSymbols.length) {
    clearInterval(timerInterval);
    alert(`Congratulations! You won in ${moves} moves and ${timer} seconds!`);
  }
}

function startGame() {
  gameBoard.innerHTML = '';
  cards = [];
  flippedCards = [];
  moves = 0;
  timer = 0;
  movesDisplay.textContent = moves;
  timerDisplay.textContent = timer;

  shuffleArray(gameSymbols);
  gameSymbols.forEach((symbol) => {
    const card = createCard(symbol);
    cards.push(card);
    gameBoard.appendChild(card);
  });

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

resetButton.addEventListener('click', startGame);
startGame();
