const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const startWithO = document.getElementById("startWithO");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let score = {
  X: 0,
  O: 0,
};

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startWithO.addEventListener("change", (e) => {
  console.log(e.target.checked);
  if (e.target.checked) {
    currentPlayer = "O";
    statusText.textContent = `Juegador actual ${currentPlayer}`;
  } else {
    currentPlayer = "X";
    statusText.textContent = `Juegador actual ${currentPlayer}`;
  }
});

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.indexNumber);

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;
  handleResultValidation();
};

const handleResultValidation = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    if (gameState.includes("")) {
      cells.forEach((cell) => !cell.textContent && (cell.textContent = "🎉"));
    }

    statusText.textContent = `Jugador ${currentPlayer} Gano!`;
    gameActive = false;
    score[currentPlayer] += 1;
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
    return;
  }

  const roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusText.textContent = "Empate!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Juegador actual ${currentPlayer}`;
};

const handleRestartGame = () => {
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Juegador actual ${currentPlayer}`;
  cells.forEach((cell) => (cell.textContent = ""));
};

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", handleRestartGame);
statusText.textContent = `Juegador actual ${currentPlayer}`;
