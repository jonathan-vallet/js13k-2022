$startButton.addEventListener("click", initGame);

function initGame() {
  $gameWrapper.classList.remove("-initial");
  // const isTutoWatched = getFromLS('tutoWatched');
  if (true) {
    showTutorial();
    var tutoWatched = setToLS('tutoWatched', true);
  } else if (isTutoWatched == true) {
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
