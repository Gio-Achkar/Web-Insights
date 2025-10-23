import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      box.id = `box${i}${j}`;
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}
initBoard();

document.addEventListener("DOMContentLoaded", function () {
  // --- All the code to create your keyboard goes inside this function ---

  console.log("The page's HTML is fully loaded. Now creating the keyboard!");

  // 1. Get the container where the keyboard will go
  const keyboardContainer = document.getElementById("keyboard-container");

  // 2. Define the keyboard layout
  const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "Submit"],
    ["z", "x", "c", "v", "b", "n", "m", "Del"],
  ];

  // 3. Loop through the layout and create the button elements
  keyboardLayout.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("keyboard-row");

    row.forEach((key) => {
      const keyElement = document.createElement("button");
      keyElement.textContent = key;
      keyElement.classList.add("key");

      // Add click listener for functionality
      keyElement.addEventListener("click", () => {
        console.log(`You clicked the '${key}' key!`);
      });

      rowElement.appendChild(keyElement);
    });

    keyboardContainer.appendChild(rowElement);
  });

  // --- End of keyboard creation code ---
});
