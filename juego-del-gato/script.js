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

// Elementos del DOM
const cells = document.querySelectorAll(`.${CELL_CLASS}`);
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetButton");
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
  cells.forEach((cell, index) => {
    cell.dataset.indexNumber = index;
    cell.addEventListener("click", handleCellClick);
  });
  resetButton.addEventListener("click", handleRestartGame);
  startWithO.addEventListener("change", handleStartWithOChange);
  scoreX.textContent = score[PLAYER_X];
  scoreO.textContent = score[PLAYER_O];
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
};

const checkResult = () => {
  let roundWon = WINNING_CONDITIONS.some((condition) => {
    const [a, b, c] = condition.map((index) => gameState[index]);
    return a && a === b && b === c;
  });

  if (roundWon) {
    endGame(`${currentPlayer} Gano!`);
    updateScore();
    startWithO.disabled = false;
    return;
  }

  if (!gameState.includes("")) {
    endGame("Empate!");
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
  scoreX.textContent = score[PLAYER_X];
  scoreO.textContent = score[PLAYER_O];
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
  updateStatusText();
};

const updateStatusText = () => {
  statusText.textContent = `Jugador actual ${currentPlayer}`;
};

const handleRestartGame = () => {
  currentPlayer = PLAYER_X;
  gameState.fill("");
  gameActive = true;
  cells.forEach((cell) => (cell.textContent = ""));
  startWithO.disabled = false;
  updateStatusText();
};

// Inicialización del juego al cargar la página
initGame();
