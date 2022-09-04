function showTutorial() {
  ++currentTutorialStep;
  $gameWrapper.dataset.screen = 1;
  $gameWrapper.dataset.tutorial = 1;
  $("tutorial1Button").addEventListener("click", showTutorialStep2);
  $("tutorialEndButton").addEventListener("click", endTutorial);

  [...$$$(".next")].forEach(($e) =>
    $e.addEventListener("click", (e) => {
      $("tutorial-1").dataset.step++;
    })
  );
}

function showTutorialStep2() {
  $gameWrapper.dataset.tutorial = 2;
  $gameWrapper.classList.add("-demo");
  addCharacter();
  addCharacter();
  addCharacter();
  addCharacter();
}

function showTutorialStep3() {
  $gameWrapper.dataset.tutorial = 3;
  $gameWrapper.classList.add("-demo");
  ++currentTutorialStep;
}

function showTutorialStep4() {
  // Wait swipe animation to end
  setTimeout(() => {
    $gameWrapper.dataset.tutorial = 4;
  }, 300);
}

function endTutorial() {
  $gameWrapper.dataset.screen = 2;
  currentTutorialStep = 0;
  setToLS("tutoWatched", true);
  startNewGame();
}
