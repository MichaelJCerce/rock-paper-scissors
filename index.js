const actions = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
    return actions[Math.floor(Math.random() * 3)]
}