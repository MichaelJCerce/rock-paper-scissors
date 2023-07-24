const actions = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return actions[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  playerChoice = playerChoice.toLowerCase();
  let result = "Draw!";
  if (playerChoice === computerChoice) {
    return result;
  }
  switch (playerChoice) {
    case "rock":
      computerChoice === "paper"
        ? (result = "You Lose! Paper beats Rock!")
        : (result = "You Win! Rock beats Scissors!");
      break;
    case "paper":
      computerChoice === "scissors"
        ? (result = "You Lose! Scissors beats Paper!")
        : (result = "You Win! Paper beats Rock!");
      break;
    case "scissors":
      computerChoice === "rock"
        ? (result = "You Lose! Rock beats Scissors!")
        : (result = "You Win! Scissors beats Paper!");
      break;
    default:
      result = "That's cheating! You can only use Rock, Paper, or Scissors!";
  }

  return result;
}
