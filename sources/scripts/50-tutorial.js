function showTutorial() {
  ++currentTutorialStep;
  $gameWrapper.dataset.screen = 1;
  $gameWrapper.dataset.tutorial = 1;
  $("tutorial1Button").addEventListener("click", showTutorialStep2);
  $("tutorialEndButton").addEventListener("click", endTutorial);

  let character = {
    face: customizationList.face[2],
    faceCol: "ce3033",
    hair: customizationList.hair[2],
    hairCol: "3a2e34",
    eye: customizationList.eye[0],
    eyeCol: "fbbc0e",
    eyebrow: customizationList.eyebrow[1],
    eyebrowCol: "3a2e34",
    mouth: customizationList.mouth[4],
    ear: elfEars,
    earCol: "ce3033",
    clothesCol: "3a2e34",
  };

  $$$("#tutorial-1 .card__image").forEach(($tutorialCharacter, index) => {
    if (index === 2) {
      character.mouth = customizationList.mouth[1];
    }
    if (index === 3) {
      character.eye = customizationList.eye[3];
      character.mouth = customizationList.mouth[2];
      character.eyebrow = customizationList.eyebrow[3];
    }
    $tutorialCharacter.innerHTML = drawCharacterFace(character);
  });

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
