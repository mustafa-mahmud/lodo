'use strict';

const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

let currentPlayer = 0;
let currentNumber = 0;
const sound = new Audio('sound.mp3');

function rollDice() {
  sound.play();

  let diceNumber = 0;

  const dice = [...document.querySelectorAll('.die-list')];
  dice.forEach((die) => {
    toggleClasses(die);
    diceNumber = getRandomNumber(1, 6);
    die.dataset.roll = diceNumber;
  });

  stopRolling();
  setTimeout(function () {
    playerActivity(diceNumber);
  }, 1800);
}

function playerActivity(diceNumber) {
  currentNumber += diceNumber;

  if (diceNumber === 1) {
    currentNumber = 0;
  }

  document.getElementById(`current--${currentPlayer}`).textContent =
    currentNumber;

  if (diceNumber === 1) {
    changePlayer();
  }
}

function changePlayer() {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');

  currentPlayer =
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
}

function stopRolling() {
  btnRoll.classList.add('stop-roll');

  setTimeout(function () {
    btnRoll.classList.remove('stop-roll');
  }, 1800);
}

function toggleClasses(die) {
  die.classList.toggle('odd-roll');
  die.classList.toggle('even-roll');
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function holdDice() {
  let getNums =
    +document.getElementById(`score--${currentPlayer}`).textContent +
    currentNumber;
  document.getElementById(`score--${currentPlayer}`).textContent = getNums;
  document.getElementById(`current--${currentPlayer}`).textContent = 0;

  if (getNums >= 100) {
    document.getElementById(`name--${currentPlayer}`).textContent = `WINNER 🥳`;
    btnRoll.classList.add('stop-roll');
    btnHold.classList.add('stop-roll');
    return;
  }
  currentNumber = 0;
  changePlayer();
}

btnRoll.addEventListener('click', function () {
  if (!this.classList.contains('stop-roll')) {
    rollDice();
  }
});
btnHold.addEventListener('click', function () {
  if (!this.classList.contains('stop-roll')) {
    holdDice();
  }
});
btnNew.addEventListener('click', function () {
  location.reload();
});
