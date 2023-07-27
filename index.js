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
    setStyle("");
});

playerScoreDisplay.addEventListener("transitionend", (e) => {
  setStyle("");
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
    setStyle("draw");
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
    setStyle("win");
  } else {
    roundResult.textContent = `Round lost! ${computerChoice} beats ${playerChoice}`;
    computerScoreDisplay.textContent = ++computerScore;
    setStyle("lose");
  }

  isGameOver();
}

function setStyle(result) {
  switch (result) {
    case "win":
      roundResult.classList.value = "round-result win-round";
      break;
    case "lose":
      roundResult.classList.value = "round-result lose-round";
      break;
    case "draw":
      roundResult.textContent = "Draw!";
      roundResult.classList.value = "round-result draw-round";
      break;
    case "reset":
      roundResult.textContent = "Select one of the options below to begin!";
      roundResult.classList.value = "round-result";
      playerScoreDisplay.classList.value = "player"
      computerScoreDisplay.classList.value = "computer"
    default:
      roundResult.classList.value = "round-result";
  }
}

function gameReset() {
  playerScore = 0;
  computerScore = 0;
  maxScore = +scoreSelector.value;
  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  gameOver = false;
  setStyle("reset");
}

function isGameOver() {
  if (gameOver) return;
  if (playerScore === maxScore) {
    roundResult.textContent = "You won!";
    playerScoreDisplay.classList.add('win-game');
    computerScoreDisplay.classList.add('lose-game');
    gameOver = true;
  } else if (computerScore === maxScore) {
    roundResult.textContent = "The computer won!";
    computerScoreDisplay.classList.add('win-game');
    playerScoreDisplay.classList.add('lose-game');
    gameOver = true;
  }
}
