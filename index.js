// const rock = document.querySelector(".rock");
// const paper = document.querySelector(".paper");
// const scissors = document.querySelector(".scissors");
// const results = document.querySelector(".results");
const roundResult = document.querySelector(".round-result");
const buttons = document.querySelectorAll("button.play");
const playerScoreDisplay = document.querySelector(".player");
const computerScoreDisplay = document.querySelector(".computer");
const scoreSelector = document.querySelector("#score");
const resetButton = document.querySelector(".reset-score");
let maxScore = +scoreSelector.value;
let playerScore = 0;
let computerScore = 0;
let gameOver = false;

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    playRound(e.target.classList[0], getComputerChoice());
  })
);
resetButton.addEventListener("click", () => gameReset());
scoreSelector.addEventListener("change", () => gameReset());
roundResult.addEventListener("transitionend", (e) => {
  if (e.propertyName === "transform") {
    roundResult.classList.remove("win");
    roundResult.classList.remove("lose");
    roundResult.classList.remove("draw");
  }
});

function getComputerChoice() {
  const actions = ["Rock", "Paper", "Scissors"];
  return actions[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  if (gameOver) {
    return;
  }
  playerChoice = playerChoice.toUpperCase()[0] + playerChoice.slice(1);
  let win;

  if (playerChoice === computerChoice) {
    roundResult.textContent = "Draw!";
    roundResult.classList.add("draw");
    roundResult.classList.remove("win");
    roundResult.classList.remove("lose");
    return 0;
  }

  switch (playerChoice) {
    case "Rock":
      computerChoice === "Paper" ? (win = false) : (win = true);
      break;
    case "Paper":
      computerChoice === "Scissors" ? (win = false) : (win = true);
      break;
    case "Scissors":
      computerChoice === "Rock" ? (win = false) : (win = true);
      break;
    default:
      console.log("No cheating! You can only use Rock, Paper, or Scissors!");
      return 0;
  }

  if (win) {
    roundResult.textContent = `Round won! ${playerChoice} beats ${computerChoice}`;
    playerScoreDisplay.textContent = ++playerScore;
    roundResult.classList.add("win");
    roundResult.classList.remove("draw");
    roundResult.classList.remove("lose");
  } else {
    roundResult.textContent = `Round lost! ${computerChoice} beats ${playerChoice}`;
    computerScoreDisplay.textContent = ++computerScore;
    roundResult.classList.add("lose");
    roundResult.classList.remove("draw");
    roundResult.classList.remove("win");
  }
  isGameOver();
}

function gameReset() {
  playerScore = 0;
  computerScore = 0;
  maxScore = +scoreSelector.value;
  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  gameOver = false;
  roundResult.textContent = "Select one of the options below to begin!";
}

function isGameOver() {
  if (playerScore === maxScore) {
    roundResult.textContent = "You won!";
    gameOver = true;
  } else if (computerScore === maxScore) {
    roundResult.textContent = "The computer won!";
    gameOver = true;
  }
}
