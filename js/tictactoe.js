// Tic-Tac-Toe Game Logic

// Game state
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let scores = {
  X: 0,
  O: 0,
  draw: 0,
};

// Winning combinations
const winningConditions = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// DOM elements
const cells = document.querySelectorAll(".cell");
const currentPlayerDisplay = document.getElementById("currentPlayer");
const gameStatusDisplay = document.getElementById("gameStatus");
const resetButton = document.getElementById("resetButton");
const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");
const scoreDrawDisplay = document.getElementById("scoreDraw");

// Initialize game
function initGame() {
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
  resetButton.addEventListener("click", resetGame);
  updateScoreDisplay();
  updateCurrentPlayerDisplay();
  cells[4].focus();
}

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // Check if cell is already taken or game is not active
  if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // Make move
  makeMove(clickedCell, clickedCellIndex);
}

// Make a move
function makeMove(cell, index) {
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  cell.classList.add(currentPlayer.toLowerCase());

  // Check for winner or draw
  checkResult();
}

// Check game result
function checkResult() {
  let roundWon = false;
  let winningCombination = null;

  // Check all winning conditions
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];

    if (gameBoard[a] === "" || gameBoard[b] === "" || gameBoard[c] === "") {
      continue;
    }

    if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      roundWon = true;
      winningCombination = [a, b, c];
      break;
    }
  }

  if (roundWon) {
    handleWin(winningCombination);
    return;
  }

  // Check for draw
  if (!gameBoard.includes("")) {
    handleDraw();
    return;
  }

  // Continue game - switch player
  switchPlayer();
}

// Handle win
function handleWin(winningCombination) {
  gameActive = false;
  gameStatusDisplay.textContent = `Player ${currentPlayer} wins! 🎉`;
  gameStatusDisplay.classList.add("winner");

  // Highlight winning cells
  winningCombination.forEach((index) => {
    cells[index].classList.add("winning");
  });

  // Update scores
  scores[currentPlayer]++;
  updateScoreDisplay();
}

// Handle draw
function handleDraw() {
  gameActive = false;
  gameStatusDisplay.textContent = "It's a draw! 🤝";
  gameStatusDisplay.classList.add("draw");

  // Update scores
  scores.draw++;
  updateScoreDisplay();
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateCurrentPlayerDisplay();
  gameStatusDisplay.textContent =
    "Play with arrows and Space, or simply click to place your mark.";
}

// Update current player display
function updateCurrentPlayerDisplay() {
  const playerClass = currentPlayer === "X" ? "player-x" : "player-o";
  currentPlayerDisplay.innerHTML = `Current Player: <span class="${playerClass}">${currentPlayer}</span>`;
}

// Update score display
function updateScoreDisplay() {
  scoreXDisplay.textContent = scores.X;
  scoreODisplay.textContent = scores.O;
  scoreDrawDisplay.textContent = scores.draw;
}

// Reset game
function resetGame() {
  gameActive = true;
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Clear all cells
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken", "x", "o", "winning");
  });

  // Reset displays
  gameStatusDisplay.textContent =
    "Play with arrows and Space, or simply click to place your mark.";
  gameStatusDisplay.classList.remove("winner", "draw");
  updateCurrentPlayerDisplay();

  cells[4].focus({ preventScroll: true }); // Prevents automatic scrolling

  // Scroll to center the game board
  document.getElementById("board").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// Keyboard navigation support
cells.forEach((cell, index) => {
  cell.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cell.click();
    }

    // Arrow key navigation
    let newIndex = index;
    if (event.key === "ArrowRight" && index % 3 < 2) {
      newIndex = index + 1;
    } else if (event.key === "ArrowLeft" && index % 3 > 0) {
      newIndex = index - 1;
    } else if (event.key === "ArrowDown" && index < 6) {
      newIndex = index + 3;
    } else if (event.key === "ArrowUp" && index > 2) {
      newIndex = index - 3;
    }

    if (newIndex !== index) {
      event.preventDefault();
      cells[newIndex].focus();

      // Keep the board centered when navigating with arrows
      document.getElementById("board").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });
});

// Start the game when page loads
document.addEventListener("DOMContentLoaded", initGame);
