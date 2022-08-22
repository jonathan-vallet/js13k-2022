function generateCharacters() {
  var characters = [];
  for (var i = 0; i < 5; ++i) {
    characters.push(generateCharacter());
  }
  console.log(characters);
}

function generateCharacter() {
  // TODO: generate a random character from raceList, deathCauseList
  let race = getRandomItem(raceList);
  console.log(race);
}

generateCharacters();
