function startGame() {
  characterList = [];
  currentCardIndex = 0;

  // Always add a character before to see it under current one
  addCharacter();
  addCharacter();
}

// Let's the game start!
startGame();
