function showTutorial() {
  ++currentTutorialStep;
  $gameWrapper.classList.add("-tutorial", "-step1");
  $("tutorial1Button").addEventListener("click", showTutorialStep2);
}

function showTutorialStep2() {
  $gameWrapper.classList.remove("-step1");
  $gameWrapper.classList.add("-step2", "-demo");
  addCharacter();
  addCharacter();
  addCharacter();
  addCharacter();
}

function showTutorialStep3() {
  ++currentTutorialStep;
  $gameWrapper.classList.remove("-step2");
  $gameWrapper.classList.add("-step3", "-demo");
}

function endTutorial() {
  currentTutorialStep = 0;
  setTimeout(() => {
    $gameWrapper.classList.remove("-tutorial", "-step3");
    startNewGame();
  }, 300);
}
