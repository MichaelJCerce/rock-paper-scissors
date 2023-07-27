const playerScoreDisplay = document.querySelector(".player");
const computerScoreDisplay = document.querySelector(".computer");
const gameDialog = document.querySelector(".game-dialog");
const playButtons = document.querySelectorAll("button.play");
const scoreSelector = document.querySelector("#score");
const resetButton = document.querySelector(".reset-score");

let isGameOver = false;
let maxScore = +scoreSelector.value;
let playerScore = 0;
let computerScore = 0;

gameDialog.addEventListener("transitionend", (e) => {
  if (e.propertyName === "transform") {
    setStyle("");
  }
});
playButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    playRound(e.target.classList[0], getComputerChoice());
  })
);
scoreSelector.addEventListener("change", () => resetGame());
resetButton.addEventListener("click", () => resetGame());

function getComputerChoice() {
  const actions = ["Rock", "Paper", "Scissors"];
  return actions[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  if (isGameOver) {
    return;
  }

  playerChoice = playerChoice.toUpperCase()[0] + playerChoice.slice(1);

  if (playerChoice === computerChoice) {
    gameDialog.textContent = "Round tied!";
    setStyle("draw");
    return 0;
  }

  let isRoundWon;

  switch (playerChoice) {
    case "Rock":
      computerChoice === "Paper" ? (isRoundWon = false) : (isRoundWon = true);
      break;
    case "Paper":
      computerChoice === "Scissors" ? (isRoundWon = false) : (isRoundWon = true);
      break;
    case "Scissors":
      computerChoice === "Rock" ? (isRoundWon = false) : (isRoundWon = true);
      break;
    default:
      console.log("No cheating! You can only use Rock, Paper, or Scissors!");
      return 0;
  }

  if (isRoundWon) {
    gameDialog.textContent = `Round won! ${playerChoice} beats ${computerChoice}`;
    playerScoreDisplay.textContent = ++playerScore;
    setStyle("win");
  } else {
    gameDialog.textContent = `Round lost! ${computerChoice} beats ${playerChoice}`;
    computerScoreDisplay.textContent = ++computerScore;
    setStyle("lose");
  }

  checkGameState();
}

function setStyle(result) {
  //needed because button spam broke the transition
  gameDialog.classList.remove('grow');

  switch (result) {
    case "win":
      gameDialog.classList.value = "game-dialog win-round grow";
      break;
    case "lose":
      gameDialog.classList.value = "game-dialog lose-round grow";
      break;
    case "draw":
      gameDialog.classList.value = "game-dialog draw-round grow";
      break;
    case "reset":
      gameDialog.textContent = "Select an action to begin playing!";
      gameDialog.classList.value = "game-dialog";
      playerScoreDisplay.classList.value = "player"
      computerScoreDisplay.classList.value = "computer"
    default:
      gameDialog.classList.remove('grow');
  } 
}

function resetGame() {
  isGameOver = false;
  maxScore = +scoreSelector.value;
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  setStyle("reset");
}

function checkGameState() {
  if (isGameOver) return;
  if (playerScore === maxScore) {
    isGameOver = true;
    playerScoreDisplay.classList.add('win-game');
    computerScoreDisplay.classList.add('lose-game');
    gameDialog.textContent = "You won!";
  } else if (computerScore === maxScore) {
    isGameOver = true;
    playerScoreDisplay.classList.add('lose-game');
    computerScoreDisplay.classList.add('win-game');
    gameDialog.textContent = "The computer won!";
  }
}
