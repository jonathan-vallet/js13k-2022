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
if (!getFromLS("scores")) {
  let scoreList = [];
  for (let i = 0; i < 5; ++i) {
    // 5 scores with random 3 letters names
    scoreList.push({
      name: Math.random().toString(36).substring(2, 5),
      score: i * 10 + 50,
    });
  }
  setToLS("scores", scoreList);
}

// Display all score in list items
let scoreList = getFromLS("scores");
let $scoreList = $("scoreList");
scoreList.forEach((score, index) => {
  let $li = createElement("li");
  $li.innerHTML = `<span><b>${index + 1}.</b> ${score.name}</span> <b>${
    score.score
  }</b>`;
  $scoreList.appendChild($li);
});
