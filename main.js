const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector('.startGame');

let lastHole;
let timeUp = false;
let score = 0;

// Random time of mole appearing:
const randomTime = (min, max) => Math.round(Math.random() * (max - min) + min);

// Get me a random hole:
const randomHole = holes => {
  const randomIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[randomIndex];
  // prevent duplicate holes
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
};

// Mole popping up:
const peep = () => {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);

  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
};

const startGame = () => {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
};

startBtn.addEventListener('click', startGame);

// Hit & score
const bonk = e => {
  // not fake the click by JS:
  if (!e.isTrusted) return;
  score++;
  e.target.classList.remove('up');
  scoreBoard.textContent = score;
};
moles.forEach(mole => mole.addEventListener('click', bonk));

// Cursor:
const cursor = document.querySelector('.cursor');
const gameSquare = document.querySelector('.game');
gameSquare.addEventListener('mousemove', e => {
  cursor.setAttribute(
    'style',
    `top: ${e.pageY - 10}px; left: ${e.pageX - 10}px;`
  );
});

document.addEventListener('click', () => {
  cursor.classList.add('expand');
  setTimeout(() => {
    cursor.classList.remove('expand');
  }, 500);
});
