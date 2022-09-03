$startButton.addEventListener("click", initGame);

function initGame() {
  $gameWrapper.classList.remove("-initial");
  let isTutoWatched = getFromLS("tutoWatched");
  if (isTutoWatched == null || isTutoWatched == false) {
    showTutorial();
    var tutoWatched = setToLS("tutoWatched", true);
  } else if (isTutoWatched == true) {
    startNewGame();
  }
}

function startNewGame() {
  $gameWrapper.dataset.screen = 2;
  characterList = [];
  $cardList.innerHTML = "";
  currentCardIndex = 0;
  score = 0;
  updateScoreDisplay();

  // Adds characters at start to see "deck"
  addCharacter();
  addCharacter();
  addCharacter();
  addCharacter();
}

createBackground();
