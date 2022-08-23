function generateCharacters() {
  var characters = [];
  for (var i = 0; i < 20; ++i) {
    characters.push(generateCharacter());
  }
}

function generateCharacter() {
  // TODO: generate a random character from raceList, deathCauseList
  let race = getRandomItem(raceList);
  let deathCause = getRandomItem(deathCauseList);

  let minHeight = raceList.map(e => e.minHeight);
  let maxHeight = raceList.map(e => e.maxHeight);

  let height = getRandomNumber(minHeight,maxHeight);

  let minWeight = raceList.map(e => e.minWeight);
  let maxWeight = raceList.map(e => e.maxWeight);

  let weight = getRandomNumber(minWeight,maxWeight);

  console.log(race, deathCause, height, weight);
}

generateCharacters();
