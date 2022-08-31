$startButton.addEventListener("click", initGame);

function initGame() {
  // TODO: show tutorial only once
  $gameWrapper.classList.remove("-initial");
  if (true) {
    showTutorial();
  } else {
    startNewGame();
  }
}

function startNewGame() {
  $gameWrapper.classList.add("-game");
  characterList = [];
  $cardList.innerHTML = "";
  currentCardIndex = 0;
  score = 0;

  // Adds characters at start to see "deck"
  addCharacter();
  addCharacter();
  addCharacter();
  addCharacter();
}

createBackground();
