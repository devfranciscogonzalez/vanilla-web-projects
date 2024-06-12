// Constantes
const CELL_CLASS = "cell";
const PLAYER_X = "X";
const PLAYER_O = "O";
const WINNING_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const STATUS_MESSAGES = {
  win: (player) => `Jugador ${player} Gano!`,
  draw: "Empate!",
  currentPlayer: (player) => `Jugador actual ${player}`,
};

// Elementos del DOM
const cells = document.querySelectorAll(`.${CELL_CLASS}`);
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
const againButton = document.getElementById("againButton");
const startWithO = document.getElementById("startWithO");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

// Estado del juego
let currentPlayer = PLAYER_X;
let gameState = Array(9).fill("");
let gameActive = true;
let score = {
  [PLAYER_X]: 0,
  [PLAYER_O]: 0,
};

// Inicializar juego
const initGame = () => {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
  resetButton.addEventListener("click", handleRestartGame);
  againButton.addEventListener("click", handleAgainGame);
  startWithO.addEventListener("change", handleStartWithOChange);
  updateScores();
  updateStatusText();
};

const handleStartWithOChange = (e) => {
  currentPlayer = e.target.checked ? PLAYER_O : PLAYER_X;
  updateStatusText();
};

const handleCellClick = (e) => {
  startWithO.disabled = true;
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.indexNumber);

  if (gameState[clickedCellIndex] !== "" || !gameActive) return;

  updateCell(clickedCell, clickedCellIndex);
  checkResult();
};

const updateCell = (cell, index) => {
  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  if (currentPlayer === PLAYER_X) {
    cell.classList.add("cell_color");
  }
};

const checkResult = () => {
  let roundWon = WINNING_CONDITIONS.some((condition) => {
    const [a, b, c] = condition.map((index) => gameState[index]);
    return a && a === b && b === c;
  });

  if (roundWon) {
    endGame(STATUS_MESSAGES.win(currentPlayer));
    updateScore();
    return;
  }

  if (!gameState.includes("")) {
    endGame(STATUS_MESSAGES.draw);
    return;
  }

  switchPlayer();
};

const endGame = (message) => {
  statusText.textContent = message;
  gameActive = false;
  fillEmptyCells();
};

const fillEmptyCells = () => {
  cells.forEach((cell) => {
    if (!cell.textContent) cell.textContent = "-";
  });
};

const updateScore = () => {
  score[currentPlayer]++;
  updateScores();
  highlightScore();
};

const updateScores = () => {
  scoreX.textContent = score[PLAYER_X];
  scoreO.textContent = score[PLAYER_O];
};

const highlightScore = () => {
  if (currentPlayer === PLAYER_X) {
    scoreO.classList.remove("cell_color_win");
    scoreX.classList.add("cell_color_win");
  } else {
    scoreX.classList.remove("cell_color_win");
    scoreO.classList.add("cell_color_win");
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  updateStatusText();
};

const updateStatusText = () => {
  statusText.textContent = STATUS_MESSAGES.currentPlayer(currentPlayer);
};

const handleRestartGame = () => {
  resetGame();
  resetScores();
};

const handleAgainGame = () => {
  resetGame();
};

const resetGame = () => {
  currentPlayer = PLAYER_X;
  gameState.fill("");
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("cell_color");
  });
  startWithO.checked = false;
  startWithO.disabled = false;
  updateStatusText();
};

const resetScores = () => {
  score[PLAYER_X] = 0;
  score[PLAYER_O] = 0;
  updateScores();
  scoreO.classList.remove("cell_color_win");
  scoreX.classList.remove("cell_color_win");
};

// Inicialización del juego al cargar la página
initGame();
