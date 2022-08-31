function updateScore(hasAccepted, currentCard) {
  if (
    (hasAccepted && currentCard.error) ||
    (!hasAccepted && !currentCard.error)
  ) {
    --score;
  } else {
    ++score;
  }
  score = Math.max(0, score);
  $score.innerHTML = score;
  $score.classList.remove("-success");
  $score.offsetWidth;
  $score.classList.add("-success");
}
