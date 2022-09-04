$startButton.addEventListener("click", initGame);

function initGame() {
  getFromLS("tutoWatched") ? startNewGame() : showTutorial();
}

function startNewGame() {
  $gameWrapper.dataset.screen = 2;
  characterList = [];
  $cardList.innerHTML = "";
  currentCardIndex = 0;
  score = 0;
  combo = 0;
  scoreMultiplier = 1;
  gameTimer = 30 * 1000;

  updateScoreDisplay();

  // Adds characters at start to see "deck"
  addCharacter();
  addCharacter();
  addCharacter();
  addCharacter();

  startTimer();
}

function endGame() {
  console.log("end game!");
}

createBackground();
