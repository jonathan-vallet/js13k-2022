[...$$$(".startButton")].forEach(($button) => {
  $button.addEventListener("click", initGame);
});

$("tutorial-repeat").addEventListener("click", showTutorial);

function initGame() {
  zzfxP(...ambientMusicData);
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
  gameTimer = 60 * 1000;

  updateScoreDisplay();

  // Adds characters at start to see "deck"
  addCharacter();
  addCharacter();
  addCharacter();
  addCharacter();

  startTimer();
}

function endGame() {
  setToLS("bestScore", score);
  $("endscore").innerHTML = score;

  let character = setDemonFace();
  character.eye = customizationList.eye[3];
  character.mouth = customizationList.mouth[2];
  character.eyebrow = customizationList.eyebrow[3];
  $$("#end .card__image").innerHTML = drawCharacterFace(character);

  $gameWrapper.dataset.screen = 3;
}

createBackground();

// Display all score in list items
let bestScore = getFromLS("bestScore");
if (bestScore) {
  $("bestScore").innerHTML = `Best score: <b id="bestSscore">${bestScore}</b>`;
}

if (!getFromLS("tutoWatched")) {
  $("tutorial-repeat").style.display = "none";
}
