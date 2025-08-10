const colors = ["blue", "yellow", "green", "red"];
let sequence = [];
let playerSequence = [];
let round = 0;
let acceptingInput = false;

const boxButtons = document.querySelectorAll(".box");
const startButton = document.getElementById("start-btn");
const roundDisplay = document.getElementById("roundnum");

const sounds = {
  blue: new Audio("soundeffects/sound.mp3"),
  yellow: new Audio("soundeffects/sound.mp3"),
  green: new Audio("soundeffects/sound.mp3"),
  red: new Audio("soundeffects/sound.mp3"),
};

function flash(color) {
  const btn = document.querySelector(`.box.${color}`);
  btn.classList.add("flash");
  playSound(color);
  setTimeout(() => btn.classList.remove("flash"), 400);
}

function playSound(color) {
  if (sounds[color]) {
    sounds[color].currentTime = 0;
    sounds[color].play();
  }
}

async function playPattern() {
  acceptingInput = false;
  roundDisplay.textContent = `Round ${round}`;
  for (let color of sequence) {
    flash(color);
    await new Promise((res) => setTimeout(res, 600));
  }
  acceptingInput = true;
}

function nextRound() {
  playerSequence = [];
  round++;
  const nextColor = colors[Math.floor(Math.random() * 4)];
  sequence.push(nextColor);
  playPattern();
}

function handleClick(e) {
  if (!acceptingInput) return;

  const color = e.target.dataset.color;
  if (!color) return;

  flash(color);
  playerSequence.push(color);

  const currentIndex = playerSequence.length - 1;
  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    gameOver();
    return;
  }

  if (playerSequence.length === sequence.length) {
    setTimeout(nextRound, 1000);
  }
}

function startGame() {
  sequence = [];
  playerSequence = [];
  round = 0;
  roundDisplay.textContent = "Game Started!";
  nextRound();
}

function gameOver() {
  acceptingInput = false;
  roundDisplay.textContent = `Game Over! Click Start to try again.`;
}

boxButtons.forEach((btn) => btn.addEventListener("click", handleClick));
startButton.addEventListener("click", startGame);
