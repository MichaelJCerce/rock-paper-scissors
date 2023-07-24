const actions = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
  return actions[Math.floor(Math.random() * 3)];
}

function playRound(playerChoice, computerChoice) {
  playerChoice = playerChoice.toUpperCase()[0] + playerChoice.slice(1);
  let win;

  if (playerChoice === computerChoice) {
    console.log("Draw!");
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
    console.log(`You Win! ${playerChoice} beats ${computerChoice}`);
    return 1;
  } else {
    console.log(`You Lose! ${computerChoice} beats ${playerChoice}`);
    return -1;
  }
}

function game(rounds) {
  let score = 0;
  for (let i = 0; i < rounds; ++i) {
    let playerChoice = prompt("Rock, Paper, or Scissors?");
    let computerChoice = getComputerChoice();
    score += playRound(playerChoice, computerChoice);
  }

  if (score > 0) {
    console.log("You won!");
  } else if (score === 0) {
    console.log("You tied!");
  } else {
    console.log("You lost!");
  }
}

game(5);
