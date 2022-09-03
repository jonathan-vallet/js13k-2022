function updateScore(hasAccepted, currentCard) {
  if (
    (hasAccepted && currentCard.error) ||
    (!hasAccepted && !currentCard.error)
  ) {
    --score;
    displayErrorMessage(
      currentCard.error
        ? random() > 0.5
          ? `🤨️ ${currentCard.error.m}, really?`
          : `☠️️ Have you ever seen ${currentCard.error.m}?`
        : `🤨️ why did you reject him?`
    );
  } else {
    ++score;
  }
  score = Math.max(0, score);
  updateScoreDisplay();
}

function updateScoreDisplay() {
  $score.innerHTML = score;
  $score.classList.remove("-success");
  $score.offsetWidth;
  $score.classList.add("-success");
}

function displayErrorMessage(message) {
  clearTimeout(errorMessageTimeout);
  $errorMessage.innerHTML = message;
  $errorMessage.classList.remove("-hidden");
  errorMessageTimeout = setTimeout(() => {
    $errorMessage.classList.add("-hidden");
  }, 3000);
}
